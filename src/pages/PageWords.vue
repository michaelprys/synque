<script setup lang="ts">
import { ref } from 'vue';

const search = ref(null);
const words = ref(['word']);
const val = ref(null);

const items = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

function onLoad(index: number, done: () => void) {
    setTimeout(() => {
        items.value.push({}, {}, {}, {}, {}, {}, {});
        done();
    }, 2000);
}
</script>

<template>
    <q-page class="flex justify-center q-mt-sm">
        <section class="text-center">
            <div
                style="min-width: 50rem; width: 100%; border-radius: 0.75rem"
                class="bg-dark q-pa-lg q-mb-xl"
            >
                <h3 class="text-h4">Total words: 132</h3>

                <div v-if="words.length != 0">
                    <div class="column">
                        <div class="flex items-center q-mx-auto q-mt-lg">
                            <q-btn
                                style="width: 14rem"
                                class="bg-info"
                                disable
                                icon="repeat"
                                label="Practice Selected"
                            />
                            <q-btn
                                style="width: 14rem"
                                class="bg-accent q-ml-sm"
                                icon="repeat"
                                label="Practice All"
                            />
                        </div>

                        <div class="row items-center q-mt-lg q-gutter-sm">
                            <div class="col">
                                <q-input
                                    v-model="search"
                                    dark
                                    dense
                                    filled
                                    debounce="300"
                                    placeholder="Search..."
                                />
                            </div>

                            <div class="col-auto">
                                <q-btn flat icon="sort" />
                                <q-btn class="q-ml-xs" flat icon="history" />
                            </div>
                        </div>

                        <div class="flex justify-between items-center q-mt-lg">
                            <div class="flex items-center">
                                <q-checkbox v-model="val" class="text-h6 q-ml-md" dark>
                                    <template #default>
                                        <span class="block text-h6 q-ml-md text-info">All</span>
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
                        </div>
                    </div>

                    <q-infinite-scroll @load="onLoad">
                        <q-list class="q-mt-sm" dark separator>
                            <q-item
                                v-for="(item, index) in items"
                                :key="index"
                                v-ripple
                                class="flex justify-between"
                            >
                                <div class="flex">
                                    <q-item-section class="text-left">
                                        <div class="flex items-center q-gutter-x-md">
                                            <q-checkbox v-model="val" dark />
                                            <span class="block text-h6">Word</span>
                                            <q-img
                                                style="width: 2rem; height: 2rem"
                                                width="32"
                                                height="32"
                                                src="https://unsplash.it/500"
                                            />
                                        </div>
                                    </q-item-section>
                                </div>

                                <q-item-section side class="q-pr-none">
                                    <div class="flex q-gutter-x-md">
                                        <q-btn
                                            size="sm"
                                            class="bg-info"
                                            style="width: 2rem; height: 2rem"
                                            icon="menu_book"
                                        ></q-btn>
                                        <q-btn
                                            size="sm"
                                            class="bg-negative"
                                            style="width: 2rem; height: 2rem"
                                            icon="delete"
                                        ></q-btn>
                                    </div>
                                </q-item-section>
                            </q-item>
                        </q-list>

                        <template #loading>
                            <div class="row justify-center q-my-md">
                                <q-spinner-dots size="40px" />
                            </div>
                        </template>
                    </q-infinite-scroll>
                </div>

                <div v-else class="q-mt-lg text-h6">
                    <q-img style="max-height: 25rem" src="https://unsplash.it/500" />
                    <span class="block q-mt-lg text-warning">
                        No words yet. Start learning and your words will appear here.
                    </span>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped></style>
