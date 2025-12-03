<script setup lang="ts">
import { useStoreCard } from 'src/stores/storeCard';
import { onMounted } from 'vue';

const storeCard = useStoreCard();

onMounted(async () => {
    storeCard.sendCardData('Generate a random word only');
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
                            {{ storeCard.result.text }}
                        </span>
                        <!-- <span
                            class="text-sm text-lowercase"
                            style="grid-column: 3; justify-self: end"
                            >321</span
                        > -->
                    </div>

                    <div class="flex-center q-mt-md q-gutter-x-sm flex">
                        <q-btn icon="volume_down" flat round size="lg" padding="xs"></q-btn>
                        <span class="text-lowercase text-h6" style="opacity: 60%"
                            >[transcription]</span
                        >
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
                            src="https://unsplash.it/1920/1080"
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
                        />
                    </div>
                </q-card>

                <div class="column items-center">
                    <p class="text-h5 q-mt-lg full-width" style="max-width: 36.25rem">
                        {{ storeCard.result.text }}
                    </p>

                    <q-btn
                        class="q-mt-md"
                        icon="volume_down"
                        flat
                        round
                        size="lg"
                        padding="xs"
                    ></q-btn>
                </div>

                <div class="flex-center q-gutter-x-lg q-mt-xl">
                    <q-btn
                        color="secondary"
                        style="width: 8.75rem; border-radius: 0.375rem"
                        size="lg"
                        >I Know
                    </q-btn>
                    <q-btn
                        color="secondary"
                        style="width: 8.75rem; border-radius: 0.375rem"
                        size="lg"
                        >Next</q-btn
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
