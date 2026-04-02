import type { Database } from 'app/database.types';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStoreStudySettings } from 'stores/studySettings.store';
import { getAuthUserUtils } from 'src/utils/getAuthUser.utils';
import handleErrorUtils from 'src/utils/handleError.utils';
import supabaseApi from 'src/api/supabase.api';
import type { Rating, RecordLogItem, State } from 'ts-fsrs';
import { createEmptyCard, fsrs, generatorParameters } from 'ts-fsrs';
import { ref } from 'vue';

const f = fsrs(generatorParameters({ enable_fuzz: true }));

type FlashcardRow = Database['public']['Tables']['flashcards']['Row'];
type FlashcardInsert = Database['public']['Tables']['flashcards']['Insert'];

export const useStoreFlashCard = defineStore(
    'storeFlashCard',
    () => {
        const pending = ref(false),
            error = ref<string | null>(null),
            cardData = ref<FlashcardRow[]>([]),
            storeStudySettings = useStoreStudySettings(),
            selectedCard = ref<FlashcardRow | null>(null);

        const addCard = async (
            cardId: number | null,
            rating: Rating,
            flashcardData: Omit<FlashcardInsert, 'user_id'>,
        ) => {
            pending.value = true;
            error.value = null;

            try {
                const user = await getAuthUserUtils();
                let card = createEmptyCard();

                if (cardId) {
                    const { data } = await supabaseApi
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
                            state: (data.state as unknown as State) ?? card.state,
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
                    state: newCard.state.toString(),
                };

                if (!cardId) {
                    await supabaseApi.from('flashcards').insert({
                        user_id: user!.id,
                        word: flashcardData.word ?? null,
                        sentence: flashcardData.sentence ?? null,
                        transcription: flashcardData.transcription ?? null,
                        image_url: flashcardData.image_url ?? null,
                        language: flashcardData.language ?? null,
                        ...fsrsFields,
                    });
                } else {
                    await supabaseApi
                        .from('flashcards')
                        .update(fsrsFields)
                        .eq('id', cardId.toString());
                }
            } catch (err) {
                error.value = handleErrorUtils(err);
            } finally {
                pending.value = false;
            }
        };

        const loadFlashCard = async () => {
            pending.value = true;
            error.value = null;

            try {
                const user = await getAuthUserUtils();
                const { data } = await supabaseApi
                    .from('flashcards')
                    .select('*')
                    .eq('user_id', user!.id)
                    .eq('language', storeStudySettings.currentTargetLanguage)
                    .returns<FlashcardRow[]>();

                cardData.value = data ?? [];
            } catch (err) {
                error.value = handleErrorUtils(err);
                console.error(error.value);
            } finally {
                pending.value = false;
            }
        };

        const selectCard = (card: FlashcardRow) => {
            selectedCard.value = card;
        };

        return { cardData, selectedCard, addCard, loadFlashCard, selectCard };
    },
    { persist: true },
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreFlashCard, import.meta.hot));
}
