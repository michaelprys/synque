<script setup lang="ts">
import { useStoreLanguages } from 'src/stores/storeLanguages';
import { ref } from 'vue';

const modelLanguage = ref(false);
const storeLanguages = useStoreLanguages();
</script>

<template>
    <q-page class="q-ma-sm">
        <Teleport to="body">
            <q-dialog v-model="modelLanguage">
                <q-card dark style="max-width: 50rem; width: 100%">
                    <q-card-section>
                        <div class="text-h5 q-mt-xs text-center">Select a language</div>
                    </q-card-section>

                    <q-card-section>
                        <q-input
                            v-model="storeLanguages.search"
                            class="text-subtitle1"
                            dark
                            placeholder="Search"
                        />
                        <span
                            v-if="storeLanguages.filteredLanguages.length === 0"
                            class="text-subtitle1 text-negative q-pt-md block"
                            >Such a language does not exist
                        </span>
                        <div class="scroll" style="max-height: 30rem; overflow-y: auto">
                            <q-infinite-scroll
                                :scroll-target="'.scroll'"
                                class="q-mt-md"
                                bordered
                                separator
                                :offset="77.16"
                                @load="storeLanguages.onLanguageLoad"
                            >
                                <q-btn
                                    v-for="(lang, idx) in storeLanguages.filteredLanguages"
                                    :key="idx"
                                    class="full-width q-px-md q-py-sm text-h6 bg-primary flex items-start"
                                    clickable
                                    square
                                    @click="storeLanguages.selectLanguage(lang.name)"
                                >
                                    {{ lang.name }}
                                </q-btn>

                                <template #loading>
                                    <div class="row q-my-md justify-center">
                                        <q-spinner-dots color="white" size="40px" />
                                    </div>
                                </template>
                            </q-infinite-scroll>
                        </div>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn v-close-popup flat label="Close" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </Teleport>

        <section id="home" class="column items-center" style="margin-top: 13rem">
            <h1 class="sr-only">Home</h1>
            <q-img src="~assets/synque-logo.png" width="7.5rem" height="7.625rem" />
            <span class="text-h4 q-mt-md text-accent">Synque</span>
            <span class="text-h4 q-mt-lg text-center">Learn in sync with your mind</span>
            <!-- <span class="text-h4 text-center q-mt-lg"
                >True memory is forged in the moment <br />
                just before forgetting</span
            > -->
            <div class="q-gutter-x-lg q-mt-xl flex">
                <q-btn
                    size="lg"
                    color="secondary"
                    style="width: 12.8769rem; font-weight: 400; font-size: 1rem"
                    @click="modelLanguage = true"
                >
                    Choose Language
                </q-btn>
                <!-- <q-btn
                    :to="{ name: 'learn' }"
                    size="lg"
                    style="
                        width: 12.8769rem;
                        font-weight: 400;
                        font-size: 1rem;

                    "
                >
                    Learn recent
                </q-btn> -->

                <q-btn
                    color="secondary"
                    :to="{ name: 'learn' }"
                    size="lg"
                    style="width: 12.8769rem; font-weight: 400; font-size: 1rem"
                >
                    Start Learning
                </q-btn>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped></style>
