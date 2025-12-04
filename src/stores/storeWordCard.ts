import { acceptHMRUpdate, defineStore } from 'pinia';
import getErrorMessage from 'src/utils/getErrorMessage';
import { ref } from 'vue';

export const useStoreWordCard = defineStore(
    'card',
    () => {
        const wordData = ref<{ word: string; transcription: string; sentence: string } | null>(
            null
        );
        const imageData = ref<string>('');
        const pending = ref(false);
        const error = ref<string | null>(null);

        const findImage = async (name: string) => {
            try {
                pending.value = true;

                const res = await fetch(
                    `https://api.openverse.org/v1/images/?q=${encodeURIComponent(name)}`
                );

                if (!res.ok) {
                    const errMsg = await res.text();
                    throw new Error(`${res.status}: ${errMsg}`);
                }

                const data = await res.json();
                imageData.value = data.results?.[0]?.url || '';
            } catch (err) {
                console.error(getErrorMessage(err) || 'Something went wrong');
            } finally {
                pending.value = false;
            }
        };

        const sendWordCardData = async (language: string, topics: string[], level: string) => {
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
                        body: JSON.stringify({ language, topics, level })
                    }
                );

                if (!res.ok) {
                    const errMsg = await res.text();

                    throw new Error(`${res.status}: ${errMsg}`);
                }

                const data = await res.json();
                wordData.value = JSON.parse(data.text);

                if (wordData.value) {
                    await findImage(wordData.value.word);
                }
            } catch (err) {
                error.value = getErrorMessage(err);
            } finally {
                pending.value = false;
            }
        };

        return {
            sendWordCardData,
            findImage,
            wordData,
            imageData
        };
    },

    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreWordCard, import.meta.hot));
}
