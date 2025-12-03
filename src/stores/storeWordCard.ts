import { acceptHMRUpdate, defineStore } from 'pinia';
import getErrorMessage from 'src/utils/getErrorMessage';
import { ref } from 'vue';

export const useStoreWordCard = defineStore(
    'card',
    () => {
        const result = ref<{ word: string; transcription: string; sentence: string } | null>(null);
        const pending = ref(false);
        const error = ref<string | null>(null);

        const sendWordCardData = async (themes: string[], level: string) => {
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
                        body: JSON.stringify({ themes, level })
                    }
                );

                if (!res.ok) {
                    const errMsg = await res.text();

                    throw new Error(`${res.status}: ${errMsg}`);
                }

                const data = await res.json();

                result.value = JSON.parse(data.text);
            } catch (err) {
                error.value = getErrorMessage(err);
            } finally {
                pending.value = false;
            }
        };

        return {
            sendWordCardData,
            result
        };
    },

    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreWordCard, import.meta.hot));
}
