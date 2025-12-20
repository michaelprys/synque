<script setup lang="ts">
import type { Database } from 'app/database.types';
import { useQuasar } from 'quasar';
import { useStoreFlashCard } from 'src/stores/storeFlashCard';
import { useStoreGenerateCard } from 'src/stores/storeGenerateCard';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const storeStudySettings = useStoreStudySettings(),
    storeGenerateCard = useStoreGenerateCard(),
    router = useRouter();

defineProps({
    title: {
        type: String,
        default: ''
    }
});

type FlashcardRow = Database['public']['Tables']['flashcards']['Row'];

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

const handleSelectCard = (card: FlashcardRow) => {
    storeFlashCard.selectCard(card);

    router.push({ name: 'review', params: { word: card.word } });
};

onMounted(async () => {
    await storeFlashCard.loadFlashCard();
});
</script>

<template>
    <q-page class="q-ma-sm flex">
        <section class="q-mx-auto text-center" style="max-width: 1280px; width: 100%">
            <div style="width: 100%; border-radius: 8px" class="q-mb-xl q-pa-lg">
                <div v-if="storeFlashCard.cardData.length !== 0">
                    <h3 class="text-h4">
                        {{ storeStudySettings.currentTargetLanguage }}:
                        {{ storeFlashCard.cardData.length }} words
                    </h3>

                    <div class="column">
                        <div class="full-width q-mt-lg flex items-center">
                            <q-btn
                                :to="{ name: 'review' }"
                                style="max-width: 192px; width: 100%"
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
                                class="q-pa-sm full-width"
                                clickable
                                @click="handleSelectCard(card)"
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
                                                    height: 64px;
                                                    border-top-left-radius: 0.1875rem;
                                                    border-top-right-radius: 0.1875rem;
                                                "
                                                width="48px"
                                                height="48px"
                                                no-spinner
                                                :src="card.image_url ?? undefined"
                                            >
                                                <template #default>
                                                    <q-skeleton
                                                        v-if="storeGenerateCard.pending"
                                                        style="width: 100%; height: 100%"
                                                        type="rect"
                                                        width="6.25rem"
                                                        height="6.25rem"
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
                                        style="inset-inline-end: 8px; inset-block-start: 8px"
                                        class="absolute q-pr-none action-buttons"
                                    >
                                        <div class="flex q-gutter-x-sm">
                                            <q-btn
                                                size="sm"
                                                style="width: 16px; height: 16px"
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
                                <q-spinner-dots size="2.5rem" />
                            </div>
                        </template>
                    </q-infinite-scroll>
                </div>

                <div v-else style="margin-top: 120px">
                    <q-img
                        class="rounded-borders"
                        style="max-width: 320px; max-height: 240px"
                        width="20rem"
                        height="15rem"
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
    grid-template-columns: repeat(auto-fit, minmax(208px, 1fr));
}

.word-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 192px;
    padding: 16px;
    border-radius: 8px;
    background-color: var(--q-color-primary);
    overflow: hidden;
    text-align: center;
}

.word-card q-img {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: 8px;
    margin-bottom: 8px;
}

.word-card span {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
