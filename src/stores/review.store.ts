import { acceptHMRUpdate, defineStore } from 'pinia';
import { getAuthUserUtils } from 'src/utils/getAuthUser.utils';
import supabaseApi from 'src/api/supabase.api';
import { ref } from 'vue';

export const useStoreReview = defineStore('storeReview', () => {
    const learned = ref<{ id: string }[] | null>(null);

    const reviewLearned = async () => {
        const user = await getAuthUserUtils();

        const { data } = await supabaseApi.from('flashcards').select('id').eq('user_id', user!.id);

        learned.value = data;
    };

    return {
        learned,
        reviewLearned,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreReview, import.meta.hot));
}
