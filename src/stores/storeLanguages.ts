import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import langJson from '../data/languages.json';

export type Language = {
    code?: string;
    name: string;
};

export const useStoreLanguages = defineStore('storeLanguages', () => {
    const languages = ref<Language[]>(langJson);
    const currentLanguage = ref('');
    const search = ref('');

    const filteredLanguages = computed(() =>
        languages.value.filter((l: Language) =>
            l.name.toLowerCase().includes(search.value.toLowerCase())
        )
    );

    const selectLanguage = (lang: string) => {
        currentLanguage.value = lang;
    };

    const onLanguageLoad = (idx: number, done: (finished?: boolean) => void) => {
        setTimeout(() => {
            const item = langJson[3];
            if (item) {
                languages.value.push(langJson[3] as Language);
            }
            done();
        }, 2000);
    };

    return {
        languages,
        filteredLanguages,
        currentLanguage,
        search,
        selectLanguage,
        onLanguageLoad
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreLanguages, import.meta.hot));
}
