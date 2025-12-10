<script setup lang="ts">
import type { TablesInsert } from 'app/database.types';
import { useStoreFlashCard } from 'src/stores/storeFlashCard';
import { useStoreGenerateCard } from 'src/stores/storeGenerateCard';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import { Rating } from 'ts-fsrs';
import { computed, onMounted } from 'vue';

const storeGenerateCard = useStoreGenerateCard();
const storeFlashCard = useStoreFlashCard();
const storeStudySettings = useStoreStudySettings();

const flashcardData = computed<Omit<TablesInsert<'flashcards'>, 'user_id'>>(() => ({
    image_url: storeGenerateCard.imageData ?? null,
    sentence: storeGenerateCard.wordData?.sentence ?? null,
    word: storeGenerateCard.wordData?.word ?? null,
    transcription: storeGenerateCard.wordData?.transcription ?? null,
    language: storeStudySettings.currentTargetLanguage ?? null
}));

const payload = flashcardData;

onMounted(() => {
    storeGenerateCard.sendWordCardData(
        storeStudySettings.currentTargetLanguage,
        storeStudySettings.currentTopics,
        storeStudySettings.levels[storeStudySettings.currentLevel] || 'Easy'
    );
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
                        <q-btn
                            class="refresh-btn absolute-top-right"
                            icon="refresh"
                            size="sm"
                            round
                            flat
                            style="width: 2rem; height: 2rem; top: 0.3rem; right: 0.3rem"
                            @click="storeGenerateCard.refreshImage"
                        />
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
                        color="negative"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="storeFlashCard.review(null, Rating.Again, payload)"
                        >Again
                    </q-btn>
                    <q-btn
                        color="warning"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="storeFlashCard.review(null, Rating.Hard, payload)"
                        >Hard
                    </q-btn>
                    <q-btn
                        color="positive"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="storeFlashCard.review(null, Rating.Good, payload)"
                        >Good
                    </q-btn>
                    <q-btn
                        color="accent"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="storeFlashCard.review(null, Rating.Easy, payload)"
                        >Easy</q-btn
                    >
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
