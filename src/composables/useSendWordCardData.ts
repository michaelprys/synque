import { useStoreGenerateCard } from 'stores/generateCard.store';
import { useStoreStudySettings } from 'stores/studySettings.store';

export const useSendWordCardData = () => {
    const storeGenerateCard = useStoreGenerateCard(),
        storeStudySettings = useStoreStudySettings();

    const handleSendWordCardData = async () =>
        await storeGenerateCard.sendWordCardData(
            storeStudySettings.currentTargetLanguage,
            // storeStudySettings.currentTopics,
            storeGenerateCard.wordData?.word ?? null,
            storeStudySettings.levels[storeStudySettings.currentLevel] || 'Easy',
        );

    return { handleSendWordCardData };
};
