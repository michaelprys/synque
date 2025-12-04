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
        const levels = ref(['Beginner', 'Intermediate', 'Advanced', 'Native']);

        const currentLanguage = ref<Language>({ code: 'en', name: 'English' });
        const currentTopics = ref<string[]>([]);
        const currentLevel = ref(0);

        const setStudyTopics = (topics: string[]) => {
            currentTopics.value = topics;
        };

        const setLevel = (level: number) => {
            currentLevel.value = level;
        };

        return {
            languages,
            studyTopics,
            currentLanguage,
            currentTopics,
            currentLevel,
            levels,
            setStudyTopics,
            setLevel
        };
    },
    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreStudySettings, import.meta.hot));
}
