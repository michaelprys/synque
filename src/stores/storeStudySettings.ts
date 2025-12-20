import { Database } from 'app/database.types';
import { acceptHMRUpdate, defineStore } from 'pinia';
import langJson from 'src/data/languages.json';
import { getAuthUser } from 'src/utils/getAuthUser';
import supabase from 'src/utils/supabase';
import { ref, watch } from 'vue';

type Voice = {
    voiceId: string;
    type: string;
};

export type Language = {
    name: string;
    voices: Voice[];
};

type StudySettings = Database['public']['Tables']['study_settings']['Row'];

export const useStoreStudySettings = defineStore(
    'storeStudySettings',
    () => {
        const languages: Language[] = langJson,
            // studyTopics = [
            //     'Sports',
            //     'Clothing',
            //     'Food',
            //     'Travel',
            //     'Work',
            //     'School',
            //     'Animals',
            //     'Nature',
            //     'Technology',
            //     'Music',
            //     'Art',
            //     'Emotions',
            //     'Greetings',
            //     'Numbers',
            //     'Colors',
            //     'Family',
            //     'House',
            //     'Actions'
            // ],
            levels = ref(['Any', 'Beginner', 'Intermediate', 'Advanced', 'Native']),
            voiceTypes = ref(['Male', 'Female']),
            // currentTopics = ref<string[]>([]),
            currentLevel = ref(0),
            currentTargetLanguage = ref('English'),
            currentVoiceType = ref('Male'),
            currentVoiceId = ref('2qfp6zPuviqeCOZIE9RZ'),
            currentNewCardsPerDay = ref(20),
            currentMaxReviewsPerDay = ref(120);

        const updateVoiceId = () => {
            const lang = languages.find((l) => l.name === currentTargetLanguage.value);
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

        const loadSettings = async (userId: string) => {
            const { data, error } = await supabase
                .from('study_settings')
                .select<'*', StudySettings>('*')
                .eq('user_id', userId)
                .single();

            if (error) return;

            if (data) {
                // currentTopics.value = (data.topics as string[] | null) ?? [];
                currentLevel.value = levels.value.indexOf(data.level ?? 'Easy');
                currentTargetLanguage.value = data.target_language ?? 'English';
                currentVoiceType.value = data.voice_type ?? 'Male';
                currentNewCardsPerDay.value = data.new_cards_per_day ?? 20;
                currentMaxReviewsPerDay.value = data.max_reviews_per_day ?? 120;
            }
        };

        const updateSettings = async (field: string, value: string | string[] | number | null) => {
            try {
                const user = await getAuthUser();

                await supabase
                    .from('study_settings')
                    .upsert({ [field]: value, user_id: user!.id }, { onConflict: 'user_id' });
            } catch (err) {
                console.error(err);
            }
        };

        watch([currentTargetLanguage, currentVoiceType], updateVoiceId, { immediate: true });

        return {
            languages,
            // studyTopics,
            voiceTypes,
            currentTargetLanguage,
            // currentTopics,
            currentVoiceType,
            currentVoiceId,
            currentLevel,
            levels,
            updateVoiceId,
            loadSettings,
            updateSettings,
            currentNewCardsPerDay,
            currentMaxReviewsPerDay
        };
    },
    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreStudySettings, import.meta.hot));
}
