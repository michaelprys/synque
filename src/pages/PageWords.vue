<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useStoreFlashCard } from 'src/stores/storeFlashCard';
import { useStoreGenerateCard } from 'src/stores/storeGenerateCard';

import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import { onMounted, ref } from 'vue';

const storeStudySettings = useStoreStudySettings(),
    storeGenerateCard = useStoreGenerateCard();

defineProps({
    title: {
        type: String,
        default: ''
    }
});

const createItems = () => Array.from({ length: 30 }, () => ({}));
const storeFlashCard = useStoreFlashCard(),
    search = ref(null),
    items = ref(createItems()),
    $q = useQuasar();

const onLoad = (index: number, done: () => void) => {
    setTimeout(() => {
        items.value.push(...createItems());
        done();
    }, 2000);
};

const deleteWord = () => {
    $q.dialog({
        title: 'Delete',
        message: 'Are you sure you want to delete the word?',
        ok: { push: true, color: 'info' },
        cancel: { push: true, color: 'info' },
        persistent: false
    })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
};

onMounted(async () => {
    await storeFlashCard.loadFlashCard();
});
</script>

<template>
    <q-page class="q-ma-sm flex">
        <section class="q-mx-auto text-center" style="max-width: 80rem; width: 100%">
            <div style="width: 100%; border-radius: 0.5rem" class="q-mb-xl q-pa-lg">
                <div v-if="storeFlashCard.cardData.length !== 0">
                    <h3 class="text-h4">
                        {{ storeStudySettings.currentTargetLanguage }}:
                        {{ storeFlashCard.cardData.length }} words
                    </h3>

                    <div class="column">
                        <div class="full-width q-mt-lg flex items-center">
                            <q-btn
                                style="max-width: 12rem; width: 100%"
                                class="q-mx-auto bg-positive"
                                icon="repeat"
                                label="Review"
                            />
                        </div>

                        <div class="row q-mt-lg items-center justify-between">
                            <div class="col">
                                <q-input
                                    v-model="search"
                                    class="q-px-sm text-h6"
                                    dark
                                    dense
                                    filled
                                    debounce="300"
                                    placeholder="Search..."
                                />
                            </div>

                            <div class="q-pr-sm">
                                <q-btn-dropdown icon="sort" flat>
                                    <q-list class="bg-primary">
                                        <q-item v-close-popup clickable>
                                            <q-item-section>
                                                <q-item-label>Photos</q-item-label>
                                            </q-item-section>
                                        </q-item>

                                        <q-item v-close-popup clickable>
                                            <q-item-section>
                                                <q-item-label>Videos</q-item-label>
                                            </q-item-section>
                                        </q-item>

                                        <q-item v-close-popup clickable>
                                            <q-item-section>
                                                <q-item-label>Articles</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-btn-dropdown>
                            </div>
                        </div>
                    </div>

                    <q-infinite-scroll :offset="150" @load="onLoad">
                        <q-list class="word-list q-mt-sm q-gutter-xs" dark>
                            <q-item
                                v-for="(card, idx) in storeFlashCard.cardData"
                                :key="idx"
                                class="q-pa-sm"
                            >
                                <q-btn
                                    class="q-pa-none bg-primary full-width rounded-borders flex justify-between"
                                >
                                    <q-item-section class="q-mt-none q-pt-none">
                                        <div class="column items-center">
                                            <q-img
                                                class=""
                                                style="
                                                    width: 100%;
                                                    height: 4rem;
                                                    border-top-left-radius: 3px;
                                                    border-top-right-radius: 3px;
                                                "
                                                width="3rem"
                                                height="3rem"
                                                no-spinner
                                                :src="card.image_url ?? undefined"
                                            >
                                                <template #default>
                                                    <q-skeleton
                                                        v-if="storeGenerateCard.pending"
                                                        style="width: 100%; height: 100%"
                                                        type="rect"
                                                        width="100px"
                                                        height="100px"
                                                    />
                                                </template>
                                            </q-img>
                                        </div>

                                        <span class="q-my-md text-subtitle2 block">
                                            {{ card.word }}
                                        </span>
                                    </q-item-section>

                                    <q-item-section
                                        side
                                        style="inset-inline-end: 0.5rem; inset-block-start: 0.5rem"
                                        class="absolute q-pr-none action-buttons"
                                    >
                                        <div class="flex q-gutter-x-sm">
                                            <q-btn
                                                size="sm"
                                                style="width: 1rem; height: 1rem"
                                                icon="delete"
                                                @click="deleteWord"
                                            ></q-btn>
                                        </div>
                                    </q-item-section>
                                </q-btn>
                            </q-item>
                        </q-list>

                        <template #loading>
                            <div class="row q-my-md justify-center">
                                <q-spinner-dots size="40px" />
                            </div>
                        </template>
                    </q-infinite-scroll>
                </div>

                <div v-else style="margin-top: 7.5rem">
                    <q-img
                        class="rounded-borders"
                        style="max-width: 20rem; max-height: 15rem"
                        width="320px"
                        height="240px"
                        src="https://unsplash.it/400"
                    />
                    <span class="q-mt-xl text-h4 block">
                        No words yet. Start learning and your words will appear here.
                    </span>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped>
.word-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
}

.word-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 12rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--q-color-primary);
    overflow: hidden;
    text-align: center;
}

.word-card q-img {
    flex-shrink: 0;
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
}

.word-card span {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
