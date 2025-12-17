import { acceptHMRUpdate, defineStore } from 'pinia';
import handleError from 'src/utils/handleError';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';

type GeneratedWord = {
    word: string;
    transcription: string;
    sentence: string;
};

export const useStoreGenerateCard = defineStore(
    'storeGenerateCard',
    () => {
        const imageData = ref<string>(''),
            pending = ref(false),
            error = ref<string | null>(null),
            generatedWords = ref<GeneratedWord[]>([]),
            wordData = ref<GeneratedWord | null>(null);

        const pickFirstNewWord = (
            generated: GeneratedWord[],
            existing: string[]
        ): GeneratedWord | null => generated.find((w) => !existing.includes(w.word)) ?? null;

        const findImage = async (name: string) => {
            pending.value = true;
            error.value = null;

            try {
                const pexelsRes = await fetch(
                    `https://api.pexels.com/v1/search?query=${encodeURIComponent(name)}&per_page=1`,
                    {
                        headers: {
                            Authorization: import.meta.env.VITE_PX_API_KEY
                        }
                    }
                );

                if (pexelsRes.ok) {
                    const pexelsData = await pexelsRes.json();

                    if (pexelsData.photos?.length > 0) {
                        imageData.value =
                            pexelsData.photos[0].src.large || pexelsData.photos[0].src.medium || '';

                        return;
                    }
                }

                const openverseRes = await fetch(
                    `https://api.openverse.org/v1/images/?q=${encodeURIComponent(name)}&page_size=1`
                );

                if (openverseRes.ok) {
                    const openverseData = await openverseRes.json();

                    if (openverseData.results?.length > 0) {
                        const url = openverseData.results?.[0]?.url || '';
                        imageData.value = url ? `${url}?t=${Date.now()}` : '';
                    }
                }
            } catch (err) {
                console.error(handleError(err));

                error.value = handleError(err);
            } finally {
                pending.value = false;
            }
        };

        const refreshImage = async () => {
            if (wordData.value) {
                await findImage(wordData.value.word);
            }
        };

        const sendWordCardData = async (
            language: string,
            // topics: string[],
            existingWord: string | null,
            level: string
        ) => {
            pending.value = true;
            error.value = null;

            const MAX_RETRIES = 3;
            let attempt = 0;

            try {
                let nextWord: GeneratedWord | null = null;

                while (attempt < MAX_RETRIES && !nextWord) {
                    attempt++;
                    const res = await fetch(
                        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/synque-card-generation`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`,
                                apikey: import.meta.env.VITE_SUPABASE_API_KEY
                            },
                            body: JSON.stringify({ language, existingWord, level })
                        }
                    );

                    if (!res.ok) throw new Error(await res.text());

                    const data = await res.json();
                    generatedWords.value = JSON.parse(data.content);

                    const { data: existingCards } = await supabase
                        .from('flashcards')
                        .select('word')
                        .eq('language', language);

                    const existingWords: string[] =
                        existingCards?.map((c) => c.word).filter((w): w is string => w !== null) ??
                        [];

                    nextWord = pickFirstNewWord(generatedWords.value, existingWords);

                    if (!nextWord && attempt < MAX_RETRIES) {
                        console.warn(`Attempt ${attempt} failed, retrying...`);
                    }
                }

                if (!nextWord) throw new Error('No new words found after retries');

                wordData.value = nextWord;

                await findImage(nextWord.word);
            } catch (err) {
                error.value = handleError(err);
            } finally {
                pending.value = false;
            }
        };

        const synthesizeSpeech = async (text: string, voiceId: string) => {
            try {
                pending.value = true;

                const res = await fetch('http://localhost:54321/functions/v1/synthesize-speech', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        apikey: import.meta.env.VITE_SUPABASE_API_KEY,
                        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`
                    },
                    body: JSON.stringify({ text, voiceId })
                });

                if (!res.ok) {
                    const err = await res.text();
                    throw new Error(`TTS error ${res.status}: ${err}`);
                }

                const data = await res.json();

                if (data.audio) {
                    const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
                    audio.play().catch((e) => console.error('Cannot be played:', e));
                }
            } catch (err) {
                console.error(handleError(err));
            } finally {
                pending.value = false;
            }
        };

        return {
            pending,
            wordData,
            imageData,
            findImage,
            sendWordCardData,
            synthesizeSpeech,
            refreshImage
        };
    },
    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreGenerateCard, import.meta.hot));
}
