<script setup lang="ts">
import { ref } from 'vue';

const modelSettings = ref(false);
const modelTab = ref('profile');
const modelSplitter = ref(20);
const modelNewCards = ref(2);
const modelMaxCards = ref(2);
const modelForgetSpeed = ref(true);
const modelFontSize = ref(1);
const theme = ref(0);
const themeOptions = ref(['Light', 'Dark', 'Coffee']);
const fontSizeOptions = ref(['Small', 'Medium', 'Large']);
const modelAvatar = ref(null);
const modelUpdatePassword = ref(null);
const modelConfirmUpdatePassword = ref(null);
const isUpdatePwd = ref(false);
const isConfirmUpdatePwd = ref(false);
</script>

<template>
    <Teleport to="body">
        <q-dialog v-model="modelSettings">
            <q-splitter
                v-model="modelSplitter"
                class="bg-secondary full-height"
                style="border-radius: 0.375rem; max-width: 60rem; width: 100%; max-height: 40rem"
            >
                <template #before>
                    <q-tabs v-model="modelTab" vertical class="col bg-secondary overflow-hidden">
                        <q-tab
                            :class="{ 'active-tab': modelTab === 'profile' }"
                            style="height: 6rem"
                            name="profile"
                            label="Profile"
                        />
                        <q-tab
                            :class="{ 'active-tab': modelTab === 'appearance' }"
                            style="height: 6rem"
                            name="appearance"
                            label="Appearance"
                        />
                        <q-tab
                            :class="{ 'active-tab': modelTab === 'study' }"
                            style="height: 6rem"
                            name="study"
                            label="Study"
                        />
                    </q-tabs>
                </template>

                <template #after>
                    <q-tab-panels
                        v-model="modelTab"
                        animated
                        swipeable
                        vertical
                        class="bg-secondary full-height overflow-hidden"
                    >
                        <q-tab-panel
                            name="profile"
                            class="column q-pb-none bg-secondary full-height overflow-hidden"
                        >
                            <h2 class="text-h5 q-py-lg">Profile</h2>
                            <div class="title flex items-center q-py-lg text-subtitle1">
                                <q-avatar color="red" text-color="white" />
                                <q-file
                                    v-model="modelAvatar"
                                    class="q-ml-sm"
                                    dark
                                    borderless
                                    label="Change Avatar"
                                />
                            </div>
                            <div class="title column justify-between q-pt-lg text-subtitle1">
                                Update password

                                <q-input
                                    v-model="modelUpdatePassword"
                                    class="q-pt-lg"
                                    filled
                                    dark
                                    :type="isUpdatePwd ? 'password' : 'text'"
                                    hint="New password"
                                >
                                    <template #append>
                                        <q-icon
                                            :name="isUpdatePwd ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isUpdatePwd = !isUpdatePwd"
                                        />
                                    </template>
                                </q-input>
                                <q-input
                                    v-model="modelConfirmUpdatePassword"
                                    filled
                                    dark
                                    :type="isConfirmUpdatePwd ? 'password' : 'text'"
                                    hint="Confirm New password"
                                >
                                    <template #append>
                                        <q-icon
                                            :name="
                                                isConfirmUpdatePwd ? 'visibility_off' : 'visibility'
                                            "
                                            class="cursor-pointer"
                                            @click="isConfirmUpdatePwd = !isConfirmUpdatePwd"
                                        />
                                    </template>
                                </q-input>
                            </div>
                            <q-btn
                                class="block q-mt-auto q-mb-md q-ml-auto bg-white text-primary"
                                label="Update"
                                style="
                                    max-width: 10rem;
                                    max-height: 2.5rem;
                                    height: 100%;
                                    width: 100%;
                                "
                            >
                            </q-btn>
                        </q-tab-panel>

                        <q-tab-panel
                            name="appearance"
                            class="overflow-hidden col bg-secondary full-height"
                        >
                            <h2 class="text-h5 q-py-lg">Appearance</h2>
                            <div class="title q-py-lg text-subtitle1">
                                <h4 class="q-mr-auto text-subtitle1">
                                    Current Theme: {{ themeOptions[theme] }}
                                </h4>
                                <div class="row q-mt-md q-gutter-md">
                                    <q-btn
                                        class="col bg-white text-primary"
                                        style="width: 100%; height: 150px"
                                        @click="theme = 0"
                                    >
                                        {{ themeOptions[0] }}
                                    </q-btn>
                                    <q-btn
                                        class="col bg-dark text-white"
                                        style="width: 100%; height: 150px"
                                        @click="theme = 1"
                                    >
                                        {{ themeOptions[1] }}
                                    </q-btn>
                                    <q-btn
                                        class="col bg-brown text-white"
                                        style="width: 100%; height: 150px"
                                        @click="theme = 2"
                                    >
                                        {{ themeOptions[2] }}
                                    </q-btn>
                                </div>
                            </div>

                            <div class="title q-py-lg text-subtitle1">
                                <div class="flex items-center">
                                    <span>Font Size:</span>
                                    <q-badge color="secondary text-subtitle1">
                                        {{ fontSizeOptions[modelFontSize] }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider v-model="modelFontSize" markers :min="0" :max="2" />
                                </div>
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="study" class="col bg-secondary full-height">
                            <h2 class="text-h5 q-py-lg">Study</h2>
                            <div class="title q-py-lg text-subtitle1">
                                <div class="flex items-center">
                                    <span>New cards/day:</span>
                                    <q-badge color="secondary  text-subtitle1">
                                        {{ modelNewCards }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider v-model="modelNewCards" markers :min="0" :max="10" />
                                </div>
                            </div>
                            <div class="title q-py-lg text-subtitle1">
                                <div class="flex items-center">
                                    <span>Max cards/day:</span>
                                    <q-badge color="secondary  text-subtitle1">
                                        {{ modelMaxCards }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider v-model="modelMaxCards" markers :min="0" :max="10" />
                                </div>
                            </div>
                            <div class="title text-subtitle1 q-py-lg">
                                <span> Forget speed </span>
                                <q-toggle
                                    v-model="modelForgetSpeed"
                                    size="xl"
                                    :label="modelForgetSpeed === true ? 'Slow' : 'Fast'"
                                />
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>
        </q-dialog>
    </Teleport>

    <q-layout view="lHh Lpr lFf">
        <div>
            <div class="q-mx-auto" style="max-width: 57.5rem">
                <q-header class="bg-primary" elevated>
                    <q-toolbar class="text-h6 justify-between q-mx-auto" style="max-width: 90rem">
                        <div class="flex items-center">
                            <q-btn to="/" unelevated round size="sm" class="q-pa-none">
                                <q-avatar size="32px">
                                    <img src="~assets/synque-logo.png" alt="Synque Logo" />
                                </q-avatar>
                            </q-btn>

                            <ul class="flex items-center q-ml-md">
                                <li>
                                    <q-btn to="/" flat color="info">Home</q-btn>
                                </li>
                                <li>
                                    <q-btn to="/" flat color="info">Words</q-btn>
                                </li>
                            </ul>
                        </div>

                        <div class="flex items-center q-gutter-x-sm">
                            <!-- <span class="text-body2 text-info">Logged as "name"</span> -->
                            <!-- <q-avatar class="bg-red" size="sm"> </q-avatar> -->
                            <q-btn
                                :to="{ name: 'login' }"
                                icon="account_circle"
                                color="info"
                                dense
                                flat
                            />
                            <!-- <q-btn icon="logout" color="info" dense flat /> -->

                            <q-btn
                                icon="settings"
                                dense
                                flat
                                color="info"
                                @click="modelSettings = true"
                            >
                            </q-btn>
                        </div>
                    </q-toolbar>
                </q-header>

                <q-page-container style="padding-top: 5.5rem">
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </q-page-container>
            </div>

            <footer class="bg-primary" elevated>
                <div class="flex justify-end q-mx-auto" style="max-width: 90rem; width: 100%">
                    <ul class="flex q-pa-sm q-gutter-x-md">
                        <li>
                            <q-btn
                                class="q-px-md"
                                :to="{ name: 'about' }"
                                flat
                                color="info"
                                padding="xs"
                                >About</q-btn
                            >
                        </li>
                        <li>
                            <q-btn
                                class="q-px-md"
                                :to="{ name: 'terms' }"
                                flat
                                color="info"
                                padding="xs"
                                >Terms</q-btn
                            >
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    </q-layout>
</template>

<style lang="scss" scoped>
.q-field__native span {
    color: $negative;
}

.title {
    border-top: 1px solid rgb(91, 91, 91);
}

.active-tab {
    background-color: $info;
}
</style>
