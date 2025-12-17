import { useStoreGenerateCard } from 'src/stores/storeGenerateCard';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';

export const useSendWordCardData = () => {
    const storeGenerateCard = useStoreGenerateCard(),
        storeStudySettings = useStoreStudySettings();

    const handleSendWordCardData = async () =>
        await storeGenerateCard.sendWordCardData(
            storeStudySettings.currentTargetLanguage,
            // storeStudySettings.currentTopics,
            storeGenerateCard.wordData?.word ?? null,
            storeStudySettings.levels[storeStudySettings.currentLevel] || 'Easy'
        );

    return { handleSendWordCardData };
};
