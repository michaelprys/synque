<script setup lang="ts">
import { useStoreFlashCard } from 'src/stores/storeFlashCard';
import { computed, ref } from 'vue';

const storeFlashCard = useStoreFlashCard(),
    pendingPrev = ref(false),
    pendingNext = ref(false);

const currentIndex = computed(() => {
    if (!storeFlashCard.selectedCard) return -1;

    return storeFlashCard.cardData.findIndex((card) => card.id === storeFlashCard.selectedCard!.id);
});

const prevCard = computed(() => {
    const prevIdx = currentIndex.value - 1;

    return prevIdx >= 0 ? storeFlashCard.cardData[prevIdx] : null;
});

const nextCard = computed(() => {
    const nextIdx = currentIndex.value + 1;

    return nextIdx < storeFlashCard.cardData.length ? storeFlashCard.cardData[nextIdx] : null;
});

const goPrev = () => {
    if (prevCard.value) {
        storeFlashCard.selectedCard = prevCard.value;
    }
};

const goNext = () => {
    if (nextCard.value) {
        storeFlashCard.selectedCard = nextCard.value;
    }
};
</script>

<template>
    <q-page class="q-mx-auto" style="max-width: 57.5rem">
        <section id="learn" class="text-center">
            <h1 class="sr-only">Review</h1>
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
                            {{ storeFlashCard.selectedCard?.word }}
                        </span>
                    </div>

                    <div class="flex-center q-mt-md q-gutter-x-sm flex">
                        <q-btn icon="volume_down" flat round size="lg" padding="xs" />
                        <span class="text-lowercase text-h6" style="opacity: 60%"></span>
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
                            width="720px"
                            height="370px"
                            :src="storeFlashCard.selectedCard?.image_url || ''"
                        />
                    </div>
                </q-card>

                <div class="column items-center">
                    <p class="text-h5 q-mt-lg full-width" style="max-width: 36.25rem">
                        {{ storeFlashCard.selectedCard?.sentence }}
                    </p>

                    <q-btn class="q-mt-md" icon="volume_down" flat round size="lg" padding="xs" />
                </div>

                <div class="flex q-gutter-x-xl q-mt-xl">
                    <q-btn
                        :loading="pendingPrev"
                        text-color="primary"
                        color="accent"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="goPrev"
                        >Prev
                        <template #loading>
                            <q-spinner-facebook />
                        </template>
                    </q-btn>

                    <q-btn
                        :loading="pendingNext"
                        text-color="primary"
                        color="accent"
                        style="width: 8rem; border-radius: 0.375rem"
                        size="lg"
                        @click="goNext"
                        >Next
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
