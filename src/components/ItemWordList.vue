<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

defineProps({
    title: {
        type: String,
        default: ''
    }
});

const search = ref(null);
const words = ref(['word']);
// const val = ref(null);

const createItems = () => Array.from({ length: 30 }, () => ({}));

const items = ref(createItems());

const onLoad = (index: number, done: () => void) => {
    setTimeout(() => {
        items.value.push(...createItems());
        done();
    }, 2000);
};

const $q = useQuasar();

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
</script>

<template>
    <q-page class="q-ma-sm flex">
        <section class="q-mx-auto text-center" style="max-width: 60rem; width: 100%">
            <div style="width: 100%; border-radius: 0.5rem" class="q-mb-xl q-pa-lg">
                <div v-if="words.length != 0">
                    <h3 class="text-h4">Total words: 132</h3>

                    <div class="column">
                        <div class="full-width q-mt-lg flex items-center">
                            <!-- <q-btn -->
                            <!-- style="width: 14rem" -->
                            <!-- class="bg-info" -->
                            <!-- disable -->
                            <!-- icon="repeat" -->
                            <!-- label="Practice Selected" -->
                            <!-- /> -->
                            <q-btn
                                style="max-width: 12rem; width: 100%"
                                class="q-mx-auto bg-secondary"
                                icon="repeat"
                                label="Review"
                            />
                        </div>

                        <q-tabs
                            dense
                            class="q-mt-lg"
                            active-color="accent"
                            indicator-color="accent"
                            align="justify"
                            narrow-indicator
                        >
                            <q-tab class="bg-primary" name="learned" label="Learned" />
                            <q-tab class="bg-primary" name="in-progress" label="In progress" />
                        </q-tabs>

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

                        <!-- <div class="flex justify-between items-center q-mt-lg">
                            <div class="flex items-center">
                                <q-checkbox v-model="val" class="text-h6 q-ml-md" dark>
                                    <template #default>
                                        <span class="block text-h6 q-ml-md">All</span>
                                    </template>
                                </q-checkbox>
                            </div>

                            <div class="flex q-gutter-x-md q-mr-md">
                                <q-btn
                                    size="sm"
                                    class="bg-negative"
                                    style="width: 2rem; height: 2rem"
                                    icon="delete"
                                ></q-btn>
                            </div>
                        </div> -->
                    </div>

                    <q-infinite-scroll :offset="150" @load="onLoad">
                        <q-list class="word-list q-mt-sm" dark>
                            <q-item v-for="(item, index) in items" :key="index" class="q-pa-sm">
                                <div
                                    class="bg-primary q-pa-md full-width rounded-borders flex justify-between"
                                >
                                    <q-item-section>
                                        <div class="q-gutter-x-md flex items-center">
                                            <!-- <q-checkbox v-model="val" dark /> -->
                                            <q-img
                                                class="rounded-borders"
                                                style="width: 3rem; height: 3rem"
                                                width="3rem"
                                                height="3rem"
                                                src="https://unsplash.it/500"
                                            />
                                            <span class="text-subtitle1 block">Word</span>
                                        </div>
                                    </q-item-section>

                                    <q-item-section side class="q-pr-none">
                                        <div class="flex">
                                            <q-btn
                                                :to="{ name: 'review' }"
                                                size="xs"
                                                flat
                                                color="gray"
                                                style="width: 2rem; height: 2rem"
                                                icon="import_contacts"
                                            ></q-btn>
                                            <!-- <q-btn
                                                :to="{ name: 'review' }"
                                                size="xs"
                                                flat
                                                color="gray"
                                                style="width: 2rem; height: 2rem"
                                                icon="arrow_forward"
                                            ></q-btn> -->
                                            <q-btn
                                                size="xs"
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

                <div v-else class="q-mt-lg text-h6">
                    <q-img style="max-height: 25rem" src="https://unsplash.it/500" />
                    <span class="q-mt-lg text-warning block">
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
