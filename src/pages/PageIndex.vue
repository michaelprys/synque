<script setup lang="ts">
import { ref } from 'vue';
import { useStoreLanguages } from 'src/stores/storeLanguages';

const modelLanguage = ref(false);
const storeLanguages = useStoreLanguages();
</script>

<template>
    <q-page class="q-ma-sm">
        <Teleport to="body">
            <q-dialog v-model="modelLanguage">
                <q-card dark style="max-width: 37rem; width: 100%">
                    <q-card-section>
                        <div class="text-h5 text-center">Select a language</div>
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
                            class="block text-subtitle1 text-warning q-pt-md"
                            >Such a language does not exist</span
                        >
                        <div class="scroll" style="max-height: 20rem; overflow-y: auto">
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
                                    class="full-width q-px-md flex items-start q-py-sm text-h6 bg-secondary"
                                    clickable
                                    square
                                    @click="storeLanguages.selectLanguage(lang.name)"
                                >
                                    {{ lang.name }}
                                </q-btn>

                                <template #loading>
                                    <div class="row justify-center q-my-md">
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
        <section class="column items-center" style="margin-top: 13rem">
            <q-img src="~assets/synque-logo.png" width="120px" />
            <span class="text-h4 q-mt-md" style="color: #005a8b">Synque</span>
            <!-- <span class="text-h4 text-center q-mt-lg">Learn in sync with your mind</span> -->
            <span class="text-h4 text-center q-mt-lg"
                >True memory is forged in the moment <br />
                just before forgetting</span
            >
            <div class="flex q-gutter-x-lg q-mt-xl">
                <!-- <q-btn
                    size="lg"
                    text-color="white"
                    color="accent"
                    style="
                        width: 12.8769rem;
                        font-weight: 400;
                        font-size: 1rem;
                        background-color: #002e5a;
                    "
                    @click="modelLanguage = true"
                >
                    Choose Language
                </q-btn>
                <q-btn
                    :to="{ name: 'learn' }"
                    size="lg"
                    text-color="white"
                    style="
                        width: 12.8769rem;
                        font-weight: 400;
                        font-size: 1rem;
                        background-color: #002e5a;
                    "
                >
                    Learn recent
                </q-btn> -->
                <q-btn
                    :to="{ name: 'learn' }"
                    size="lg"
                    text-color="white"
                    style="
                        width: 12.8769rem;
                        font-weight: 400;
                        font-size: 1rem;
                        background-color: #002e5a;
                    "
                >
                    Start Learning
                </q-btn>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped></style>
