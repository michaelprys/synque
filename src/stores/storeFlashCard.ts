import type { Tables, TablesInsert } from 'app/database.types';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { getAuthUser } from 'src/utils/getAuthUser';
import handleError from 'src/utils/handleError';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';

export const useStoreFlashCard = defineStore(
    'storeFlashCard',
    () => {
        const pending = ref(false),
            error = ref<string | null>(null);
        const cardData = ref<Tables<'flashcards'>[]>([]);
        const resetInterval = async (card: Omit<TablesInsert<'flashcards'>, 'user_id'>) => {
            pending.value = true;
            error.value = null;

            try {
                const user = await getAuthUser();

                const { error: flashCardsError } = await supabase.from('flashcards').insert({
                    ...card,
                    user_id: user.id
                });

                if (flashCardsError) throw flashCardsError;
            } catch (err) {
                error.value = handleError(err);
            } finally {
                pending.value = false;
            }
        };

        const extendInterval = async (card: Omit<TablesInsert<'flashcards'>, 'user_id'>) => {
            pending.value = true;
            error.value = null;

            try {
                const user = await getAuthUser();

                const { error: flashCardsError } = await supabase.from('flashcards').insert({
                    ...card,
                    user_id: user.id
                });

                if (flashCardsError) throw flashCardsError;
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

                const { data, error: flashCardError } = await supabase
                    .from('flashcards')
                    .select('*')
                    .eq('user_id', user.id)
                    .returns<Tables<'flashcards'>[]>();

                if (flashCardError) throw new Error(handleError(flashCardError));

                cardData.value = data ?? [];
                console.log('cardData: ', cardData.value);
            } catch (err) {
                console.error(handleError(err));

                error.value = handleError(err);
            } finally {
                pending.value = false;
            }
        };

        return {
            resetInterval,
            extendInterval,
            loadFlashCard,
            cardData
        };
    },

    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreFlashCard, import.meta.hot));
}
