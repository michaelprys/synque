import { acceptHMRUpdate, defineStore } from 'pinia';
import langJson from 'src/data/languages.json';
import { ref, watch } from 'vue';

type Voice = {
    voiceId: string;
    type: string;
};

export type Language = {
    name: string;
    voices: Voice[];
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
        const voiceTypes = ref(['Male', 'Female']);
        const currentTopics = ref<string[]>([]);
        const currentLevel = ref(0);
        const currentLanguage = ref('English');
        const currentVoiceType = ref('Male');
        const currentVoiceId = ref<string>('');

        const updateVoiceId = () => {
            const lang = languages.find((l) => l.name === currentLanguage.value);
            if (!lang) {
                currentVoiceId.value = '';
                return;
            }

            let voice = lang.voices.find(
                (v) => v.type.toLowerCase() === currentVoiceType.value.toLowerCase()
            );

            if (!voice) {
                voice = lang.voices[0];
                currentVoiceType.value =
                    voice!.type.charAt(0).toUpperCase() + voice!.type.slice(1).toLowerCase();
            }

            currentVoiceId.value = voice!.voiceId;
        };

        watch([currentLanguage, currentVoiceType], updateVoiceId, { immediate: true });

        return {
            languages,
            studyTopics,
            voiceTypes,
            currentLanguage,
            currentTopics,
            currentVoiceType,
            currentVoiceId,
            currentLevel,
            levels,
            updateVoiceId
        };
    },
    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreStudySettings, import.meta.hot));
}
