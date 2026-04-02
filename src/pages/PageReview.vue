<script setup lang="ts">
import { useStoreFlashCard } from 'stores/flashCard.store';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const storeFlashCard = useStoreFlashCard();
const route = useRoute();
const router = useRouter();

const currentIndex = computed(() => {
    if (!storeFlashCard.selectedCard) return -1;
    return storeFlashCard.cardData.findIndex((card) => card.id === storeFlashCard.selectedCard!.id);
});

const updateUrl = async (word: string) => {
    if (route.params.word !== word) {
        await router.replace({ name: 'review', params: { word } });
    }
};

const goPrev = async () => {
    const prevIdx = currentIndex.value - 1;
    if (prevIdx >= 0 && prevIdx < storeFlashCard.cardData.length) {
        const prevCard = storeFlashCard.cardData[prevIdx];
        if (prevCard) {
            storeFlashCard.selectedCard = prevCard;
            if (prevCard.word) {
                await updateUrl(prevCard.word);
            }
        }
    }
};

const goNext = async () => {
    const nextIdx = currentIndex.value + 1;
    if (nextIdx >= 0 && nextIdx < storeFlashCard.cardData.length) {
        const nextCard = storeFlashCard.cardData[nextIdx];
        if (nextCard) {
            storeFlashCard.selectedCard = nextCard;
            if (nextCard.word) {
                await updateUrl(nextCard.word);
            }
        }
    }
};

watch(
    () => route.params.word as string,
    async (newWord) => {
        if (!newWord) return;

        const card = storeFlashCard.cardData.find((c) => c.word === newWord);
        if (card) {
            storeFlashCard.selectedCard = card;
        } else if (storeFlashCard.cardData.length > 0) {
            const first = storeFlashCard.cardData[0];
            if (first) {
                storeFlashCard.selectedCard = first;
                if (first.word) {
                    await updateUrl(first.word);
                }
            }
        }
    },
    { immediate: true },
);
</script>

<template>
    <q-page class="q-mx-auto" style="max-width: 57.5rem">
        <section id="learn" class="text-center">
            <h1 class="sr-only">Review</h1>
            <div
                class="column bg-primary q-pa-lg q-ma-sm items-center"
                style="border-radius: 0.5rem">
                <div class="full-width">
                    <div
                        class="items-center"
                        style="display: grid; grid-template-columns: repeat(3, 1fr)">
                        <span
                            class="text-h3 text-lowercase col-2"
                            style="grid-column: 2; justify-self: center">
                            {{ storeFlashCard.selectedCard?.word }}
                        </span>
                    </div>
                    <div class="flex-center q-mt-md q-gutter-x-sm flex">
                        <q-btn icon="volume_down" flat round size="lg" padding="xs" />
                    </div>
                </div>

                <q-card
                    class="q-mt-lg flex-center full-width flex bg-dark"
                    style="border-radius: 0.375rem">
                    <div class="full-width relative bg-dark">
                        <q-img
                            class="full-width"
                            style="border-radius: 0.375rem"
                            width="720px"
                            height="370px"
                            :src="storeFlashCard.selectedCard?.image_url || ''" />
                    </div>
                </q-card>

                <div class="column items-center">
                    <p class="text-h5 q-mt-lg full-width" style="max-width: 36.25rem">
                        {{ storeFlashCard.selectedCard?.sentence }}
                    </p>
                    <q-btn class="q-mt-md" icon="volume_down" flat round size="lg" padding="xs" />
                </div>

                <div class="flex q-gutter-x-lg q-mt-xl">
                    <q-btn
                        :disable="currentIndex <= 0"
                        text-color="primary"
                        color="accent"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="void goPrev()">
                        Prev
                    </q-btn>
                    <q-btn
                        :disable="currentIndex === storeFlashCard.cardData.length - 1"
                        text-color="primary"
                        color="accent"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="void goNext()">
                        Next
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
