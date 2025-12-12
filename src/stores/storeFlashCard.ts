import type { Database } from 'app/database.types';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import { getAuthUser } from 'src/utils/getAuthUser';
import handleError from 'src/utils/handleError';
import supabase from 'src/utils/supabase';
import { createEmptyCard, fsrs, generatorParameters, Rating, RecordLogItem, State } from 'ts-fsrs';
import { ref } from 'vue';

const f = fsrs(generatorParameters({ enable_fuzz: true }));

type FlashcardRow = Database['public']['Tables']['flashcards']['Row'];
type FlashcardInsert = Database['public']['Tables']['flashcards']['Insert'];

export const useStoreFlashCard = defineStore(
    'storeFlashCard',
    () => {
        const pending = ref(false);
        const error = ref<string | null>(null);
        const cardData = ref<FlashcardRow[]>([]);
        const storeStudySettings = useStoreStudySettings();

        const review = async (
            cardId: number | null,
            rating: Rating,
            flashcardData: Omit<FlashcardInsert, 'user_id'>
        ) => {
            pending.value = true;
            error.value = null;

            try {
                const user = await getAuthUser();
                let card = createEmptyCard();

                if (cardId) {
                    const { data } = await supabase
                        .from('flashcards')
                        .select('*')
                        .eq('id', cardId.toString())
                        .single();

                    if (data) {
                        card = {
                            ...card,
                            due: new Date(data.due!),
                            last_review: data.last_review ? new Date(data.last_review) : new Date(),
                            stability: data.stability ?? card.stability,
                            difficulty: data.difficulty ?? card.difficulty,
                            reps: data.reps ?? card.reps,
                            lapses: data.lapses ?? card.lapses,
                            state: (data.state as unknown as State) ?? card.state
                        };
                    }
                }

                const scheduling = f.repeat(card, new Date()) as unknown as Record<
                    Rating,
                    RecordLogItem
                >;

                const newCard = scheduling[rating]?.card;
                if (!newCard) throw new Error('FSRS returned empty card');

                const fsrsFields = {
                    due: newCard.due.toISOString(),
                    last_review: newCard.last_review
                        ? newCard.last_review.toISOString()
                        : new Date().toISOString(),
                    stability: newCard.stability,
                    difficulty: newCard.difficulty,
                    reps: newCard.reps,
                    lapses: newCard.lapses,
                    state: newCard.state.toString()
                };

                if (!cardId) {
                    await supabase.from('flashcards').insert({
                        user_id: user.id,
                        word: flashcardData.word ?? null,
                        sentence: flashcardData.sentence ?? null,
                        transcription: flashcardData.transcription ?? null,
                        image_url: flashcardData.image_url ?? null,
                        language: flashcardData.language ?? null,
                        ...fsrsFields
                    });
                } else {
                    await supabase
                        .from('flashcards')
                        .update(fsrsFields)
                        .eq('id', cardId.toString());
                }
            } catch (err) {
                error.value = handleError(err);
            } finally {
                pending.value = false;
            }
        };

        const loadFlashCard = async () => {
            pending.value = true;
            error.value = null;

            try {
                const user = await getAuthUser();
                const { data } = await supabase
                    .from('flashcards')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('language', storeStudySettings.currentTargetLanguage)
                    .returns<FlashcardRow[]>();

                cardData.value = data ?? [];
            } catch (err) {
                error.value = handleError(err);
                console.error(error.value);
            } finally {
                pending.value = false;
            }
        };

        return { cardData, review, loadFlashCard };
    },
    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreFlashCard, import.meta.hot));
}
