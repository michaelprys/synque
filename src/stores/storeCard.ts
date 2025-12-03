import { acceptHMRUpdate, defineStore } from 'pinia';
import getErrorMessage from 'src/utils/getErrorMessage';
import { ref } from 'vue';

export const useStoreCard = defineStore(
    'card',
    () => {
        const result = ref(null);
        const pending = ref(false);
        const error = ref<string | null>(null);

        const sendCardData = async (prompt: string) => {
            try {
                const res = await fetch(
                    'https://qfwdugediwznexgeqqjz.supabase.co/functions/v1/synque-card-generation',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
                            apikey: import.meta.env.VITE_SUPABASE_KEY
                        },
                        body: JSON.stringify({ prompt })
                    }
                );

                if (!res.ok) {
                    const text = await res.text();

                    throw new Error(`${res.status}: ${text}`);
                }

                const data = await res.json();
                result.value = data;
            } catch (err) {
                error.value = getErrorMessage(err);
            } finally {
                pending.value = false;
            }
        };

        return {
            sendCardData,
            result
        };
    },

    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreCard, import.meta.hot));
}
