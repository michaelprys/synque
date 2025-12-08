import { acceptHMRUpdate, defineStore } from 'pinia';
import getErrorMessage from 'src/utils/getErrorMessage';
import { ref } from 'vue';

export const useStoreFlashCard = defineStore(
    'storeFlashCard',
    () => {
        const pending = ref(false),
            error = ref<string | null>(null);

        const resetInterval = async () => {
            try {
                pending.value = true;

                const res = await fetch('http://localhost:54321/functions/v1/synthesize-speech', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        apikey: import.meta.env.VITE_SUPABASE_API_KEY,
                        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`
                    },
                    body: JSON.stringify({})
                });

                if (!res.ok) {
                    const err = await res.text();
                    throw new Error(`Error ${res.status}: ${err}`);
                }

                const data = await res.json();
            } catch (err) {
                error.value = getErrorMessage(err);
            } finally {
                pending.value = false;
            }
        };

        const extendInterval = async () => {
            try {
                pending.value = true;

                const res = await fetch('http://localhost:54321/functions/v1/synthesize-speech', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        apikey: import.meta.env.VITE_SUPABASE_API_KEY,
                        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`
                    },
                    body: JSON.stringify({})
                });

                if (!res.ok) {
                    const err = await res.text();
                    throw new Error(`Error ${res.status}: ${err}`);
                }

                const data = await res.json();
            } catch (err) {
                error.value = getErrorMessage(err);
            } finally {
                pending.value = false;
            }
        };

        return {
            resetInterval,
            extendInterval
        };
    },
    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreFlashCard, import.meta.hot));
}
