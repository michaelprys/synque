import { acceptHMRUpdate, defineStore } from 'pinia';
import { getAuthUser } from 'src/utils/getAuthUser';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';

export const useStoreReview = defineStore('storeReview', () => {
    const learned = ref<{ id: string }[] | null>(null);

    const reviewLearned = async () => {
        const user = await getAuthUser();

        const { data } = await supabase.from('flashcards').select('id').eq('user_id', user!.id);

        learned.value = data;
    };

    return {
        learned,
        reviewLearned
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreReview, import.meta.hot));
}
