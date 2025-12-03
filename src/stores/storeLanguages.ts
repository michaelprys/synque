import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import langJson from '../data/languages.json';

export type Language = {
    code?: string;
    name: string;
};

export const useStoreLanguages = defineStore('storeLanguages', () => {
    const languages = ref<Language[]>(langJson);
    const currentLanguage = ref('English');

    const selectLanguage = (lang: string) => {
        currentLanguage.value = lang;
    };

    return {
        languages,
        currentLanguage,
        selectLanguage
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreLanguages, import.meta.hot));
}
