<script setup lang="ts">
import type { Database } from 'app/database.types';
import { useStoreFlashCard } from 'src/stores/storeFlashCard';
import { useStoreGenerateCard } from 'src/stores/storeGenerateCard';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import { Rating } from 'ts-fsrs';
import type { Ref } from 'vue';
import { computed, onMounted, ref } from 'vue';

const storeGenerateCard = useStoreGenerateCard(),
    storeFlashCard = useStoreFlashCard(),
    storeStudySettings = useStoreStudySettings();

type FlashcardInsert = Database['public']['Tables']['flashcards']['Insert'];

const flashcardData = computed<Omit<FlashcardInsert, 'user_id'>>(() => ({
    image_url: storeGenerateCard.imageData ?? null,
    sentence: storeGenerateCard.wordData?.sentence ?? null,
    word: storeGenerateCard.wordData?.word ?? null,
    transcription: storeGenerateCard.wordData?.transcription ?? null,
    language: storeStudySettings.currentTargetLanguage ?? null
}));

const handleSendWordCardData = async () =>
    await storeGenerateCard.sendWordCardData(
        storeStudySettings.currentTargetLanguage,
        storeStudySettings.currentTopics,
        storeGenerateCard.wordData?.word ?? null,
        storeStudySettings.levels[storeStudySettings.currentLevel] || 'Easy'
    );

const pendingAgain = ref(false);
const pendingHard = ref(false);
const pendingGood = ref(false);
const pendingEasy = ref(false);

const handleReview = async (rating: Rating) => {
    let btn: Ref<boolean> | undefined;

    switch (rating) {
        case Rating.Again:
            btn = pendingAgain;
            break;
        case Rating.Hard:
            btn = pendingHard;
            break;
        case Rating.Good:
            btn = pendingGood;
            break;
        case Rating.Easy:
            btn = pendingEasy;
            break;
        default:
            throw new Error('Invalid rating');
    }

    btn.value = true;
    await storeFlashCard.review(null, rating, flashcardData.value);
    await handleSendWordCardData();
    btn.value = false;
};

onMounted(() => {
    if (storeFlashCard.cardData.length > 0) return;

    handleSendWordCardData();
});
</script>

<template>
    <q-page class="q-mx-auto" style="max-width: 57.5rem">
        <section id="learn" class="text-center">
            <h1 class="sr-only">Learn</h1>
            <div
                class="column bg-primary q-pa-lg q-ma-sm items-center"
                style="border-radius: 0.5rem"
            >
                <div class="full-width">
                    <div
                        class="items-center"
                        style="display: grid; grid-template-columns: repeat(3, 1fr)"
                    >
                        <span
                            content
                            class="text-h3 text-lowercase col-2"
                            style="grid-column: 2; justify-self: center"
                        >
                            {{ storeGenerateCard.wordData?.word }}
                        </span>
                    </div>

                    <div class="flex-center q-mt-md q-gutter-x-sm flex">
                        <q-btn
                            icon="volume_down"
                            flat
                            round
                            size="lg"
                            padding="xs"
                            @click="
                                storeGenerateCard.synthesizeSpeech(
                                    storeGenerateCard.wordData?.word ?? '',
                                    storeStudySettings.currentVoiceId ?? ''
                                )
                            "
                        ></q-btn>
                        <span class="text-lowercase text-h6" style="opacity: 60%">{{
                            storeGenerateCard.wordData?.transcription
                        }}</span>
                    </div>
                </div>

                <q-card
                    class="q-mt-lg flex-center full-width flex bg-dark"
                    style="border-radius: 0.375rem"
                >
                    <div class="full-width relative bg-dark">
                        <q-img
                            class="full-width"
                            style="border-radius: 0.375rem"
                            :src="storeGenerateCard.imageData"
                            width="720px"
                            height="370px"
                        />
                        <!-- <q-btn
                            class="refresh-btn absolute-top-right"
                            icon="refresh"
                            size="sm"
                            round
                            flat
                            style="width: 2rem; height: 2rem; top: 0.3rem; right: 0.3rem"
                            @click="storeGenerateCard.refreshImage"
                        /> -->
                    </div>
                </q-card>

                <div class="column items-center">
                    <p class="text-h5 q-mt-lg full-width" style="max-width: 36.25rem">
                        {{ storeGenerateCard.wordData?.sentence }}
                    </p>

                    <q-btn
                        class="q-mt-md"
                        icon="volume_down"
                        flat
                        round
                        size="lg"
                        padding="xs"
                        @click="
                            storeGenerateCard.synthesizeSpeech(
                                storeGenerateCard.wordData?.sentence ?? '',
                                storeStudySettings.currentVoiceId ?? ''
                            )
                        "
                    ></q-btn>
                </div>

                <div class="flex-center q-gutter-x-lg q-mt-xl">
                    <q-btn
                        :loading="pendingAgain"
                        text-color="primary"
                        color="negative"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="handleReview(Rating.Again)"
                        >Again
                        <template #loading>
                            <q-spinner-facebook />
                        </template>
                    </q-btn>
                    <q-btn
                        :loading="pendingHard"
                        text-color="primary"
                        color="warning"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="handleReview(Rating.Hard)"
                        >Hard
                        <template #loading>
                            <q-spinner-facebook />
                        </template>
                    </q-btn>
                    <q-btn
                        :loading="pendingGood"
                        text-color="primary"
                        color="positive"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="handleReview(Rating.Good)"
                        >Good
                        <template #loading>
                            <q-spinner-facebook />
                        </template>
                    </q-btn>
                    <q-btn
                        :loading="pendingEasy"
                        text-color="primary"
                        color="accent"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        l
                        @click="handleReview(Rating.Easy)"
                        >Easy
                        <template #loading>
                            <q-spinner-facebook />
                        </template>
                    </q-btn>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped>
.refresh-btn {
    background-color: rgba($dark, 25%);
}
</style>
