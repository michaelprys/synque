import { acceptHMRUpdate, defineStore } from 'pinia';
import langJson from 'src/data/languages.json';
import { ref } from 'vue';

export type Language = {
    code?: string;
    name: string;
};

export const useStoreStudySettings = defineStore(
    'storeStudySettings',
    () => {
        const languages: Language[] = langJson;
        const studyTopics = [
            'Sports',
            'Clothing',
            'Food',
            'Travel',
            'Work',
            'School',
            'Animals',
            'Nature',
            'Technology',
            'Music',
            'Art',
            'Emotions',
            'Greetings',
            'Numbers',
            'Colors',
            'Family',
            'House',
            'Actions'
        ];

        const currentLanguage = ref('English');
        const currentTopics = ref<string[]>([]);

        const setLanguage = (lang: string) => {
            currentLanguage.value = lang;
        };

        const setStudyTopics = (topics: string[]) => {
            currentTopics.value = topics;
        };

        return {
            languages,
            studyTopics,
            currentLanguage,
            currentTopics,
            setLanguage,
            setStudyTopics
        };
    },
    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreStudySettings, import.meta.hot));
}
