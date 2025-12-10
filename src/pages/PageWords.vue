<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useStoreFlashCard } from 'src/stores/storeFlashCard';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import { onMounted, ref } from 'vue';

const storeStudySettings = useStoreStudySettings();

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
        <section class="q-mx-auto text-center" style="max-width: 60rem; width: 100%">
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
                                class="q-mx-auto bg-secondary"
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
                                <q-btn dense flat icon="sort" />
                                <q-btn
                                    dense
                                    :to="{ name: 'deleted-words' }"
                                    class="q-ml-xs"
                                    flat
                                    icon="history"
                                />
                            </div>
                        </div>
                    </div>

                    <q-infinite-scroll :offset="150" @load="onLoad">
                        <q-list class="word-list q-mt-sm" dark>
                            <q-item
                                v-for="(card, idx) in storeFlashCard.cardData"
                                :key="idx"
                                class="q-pa-sm"
                            >
                                <div
                                    class="bg-primary q-pa-md full-width rounded-borders flex justify-between"
                                >
                                    <q-item-section>
                                        <div class="q-gutter-x-md flex items-center">
                                            <q-img
                                                class="rounded-borders"
                                                style="width: 3rem; height: 3rem"
                                                width="3rem"
                                                height="3rem"
                                                :src="card.image_url ?? undefined"
                                            />
                                            <span class="text-subtitle1 block">
                                                {{ card.word }}
                                            </span>
                                        </div>
                                    </q-item-section>

                                    <q-item-section side class="q-pr-none action-buttons">
                                        <div class="flex q-gutter-x-sm">
                                            <q-btn
                                                :to="{ name: 'review' }"
                                                size="sm"
                                                flat
                                                color="gray"
                                                style="width: 2rem; height: 2rem"
                                                icon="import_contacts"
                                            ></q-btn>

                                            <q-btn
                                                size="sm"
                                                flat
                                                color="gray"
                                                style="width: 2rem; height: 2rem"
                                                icon="delete"
                                                @click="deleteWord"
                                            ></q-btn>
                                        </div>
                                    </q-item-section>
                                </div>
                            </q-item>
                        </q-list>

                        <template #loading>
                            <div class="row q-my-md justify-center">
                                <q-spinner-dots size="40px" />
                            </div>
                        </template>
                    </q-infinite-scroll>
                </div>

                <div v-else class="q-mt-xl">
                    <q-img
                        class="rounded-borders"
                        style="max-width: 20rem; max-height: 15rem"
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
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}
</style>
