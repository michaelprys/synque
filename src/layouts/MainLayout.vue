<script setup lang="ts">
import { ref } from 'vue';

const modelTerms = ref(false);
const modelAbout = ref(false);
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
        <q-dialog v-model="modelTerms">
            <q-layout
                view="Lhh lpR fff"
                container
                class="bg-secondary"
                style="max-height: 50rem; max-width: 75rem"
            >
                <q-page-container>
                    <q-page padding>
                        <div class="flex flex-center">
                            <h3>Terms</h3>
                            <p class="text-h6 q-mt-lg text-justify">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt optio
                                praesentium dolorem illum aspernatur debitis aut quibusdam dolore.
                                Non adipisci vitae soluta dolorem vero quaerat voluptates voluptatem
                                minus blanditiis totam. Cupiditate est fugit excepturi aliquid cum
                                eum impedit rerum tempora, ut eos. Culpa necessitatibus sequi
                                maiores magni aspernatur fugiat modi qui ullam molestiae, ducimus
                                soluta tenetur incidunt, voluptatem quasi ipsum. Cumque nemo
                                consequatur tempora iure similique adipisci perferendis sed facere
                                deleniti autem illum sit suscipit ad assumenda officia obcaecati
                                optio dolorum, corrupti amet dicta quaerat earum ducimus? Corporis,
                                labore sunt. Porro, ipsum natus fugiat tenetur culpa qui eos eaque
                                ipsa adipisci nihil eum numquam ipsam, nobis provident officia fuga
                                debitis quibusdam temporibus, nulla pariatur autem reiciendis
                                nostrum ratione odit. Obcaecati? Possimus earum fuga recusandae
                                quisquam, totam voluptate. Natus porro, debitis necessitatibus a
                                error repellendus aliquam sed delectus neque ullam repudiandae atque
                                quis autem cupiditate voluptates repellat, perspiciatis facilis eos.
                                Impedit? Unde ab officiis error fugiat, accusantium ipsam in? Atque
                                omnis consequuntur deserunt quidem cum a, molestias reprehenderit
                                inventore in tempora facilis commodi consectetur numquam voluptatem
                                hic? Nam rerum odio at. Alias fugit doloribus accusamus tempora.
                                Molestias suscipit nihil quod repudiandae. Tenetur, dicta quis ex
                                quaerat nisi quibusdam perferendis, libero consectetur natus
                                molestias excepturi inventore minima doloribus asperiores quidem
                                voluptatem illum. Quo nulla ut dolores provident laboru. Atque omnis
                                consequuntur deserunt quidem cum a, molestias reprehenderit
                                inventore in tempora facilis commodi consectetur numquam voluptatem
                                hic? Nam rerum odio at. Alias fugit doloribus accusamus tempora.
                                Molestias suscipit nihil quod repudiandae. Tenetur, dicta quis ex
                                quaerat nisi quibusdam perferendis, libero consectetur natus
                                molestias excepturi inventore minima doloribus asperiores quidem
                                voluptatem illum.
                            </p>

                            <q-btn
                                v-close-popup
                                size="lg"
                                class="q-mt-lg q-mx-auto"
                                color="dark"
                                style="width: 200px"
                                >Close</q-btn
                            >
                        </div>
                    </q-page>
                </q-page-container>
            </q-layout>
        </q-dialog>
    </Teleport>

    <Teleport to="body">
        <q-dialog v-model="modelAbout">
            <q-layout
                view="Lhh lpR fff"
                container
                class="bg-secondary"
                style="max-height: 50rem; max-width: 75rem"
            >
                <q-page-container>
                    <q-page padding>
                        <div class="flex flex-center">
                            <h3>What is Synque?</h3>
                            <p class="q-mt-lg text-h6 text-justify">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt optio
                                praesentium dolorem illum aspernatur debitis aut quibusdam dolore.
                                Non adipisci vitae soluta dolorem vero quaerat voluptates voluptatem
                                minus blanditiis totam. Cupiditate est fugit excepturi aliquid cum
                                eum impedit rerum tempora, ut eos. Culpa necessitatibus sequi
                                maiores magni aspernatur fugiat modi qui ullam molestiae, ducimus
                                soluta tenetur incidunt, voluptatem quasi ipsum. Cumque nemo
                                consequatur tempora iure similique adipisci perferendis sed facere
                                deleniti autem illum sit suscipit ad assumenda officia obcaecati
                                optio dolorum, corrupti amet dicta quaerat earum ducimus? Corporis,
                                labore sunt. Porro, ipsum natus fugiat tenetur culpa qui eos eaque
                                ipsa adipisci nihil eum numquam ipsam, nobis provident officia fuga
                                debitis quibusdam temporibus, nulla pariatur autem reiciendis
                                nostrum ratione odit. Obcaecati? Possimus earum fuga recusandae
                                quisquam, totam voluptate. Natus porro, debitis necessitatibus a
                                error repellendus aliquam sed delectus neque ullam repudiandae atque
                                quis autem cupiditate voluptates repellat, perspiciatis facilis eos.
                                Impedit? Unde ab officiis error fugiat, accusantium ipsam in? Atque
                                omnis consequuntur deserunt quidem cum a, molestias reprehenderit
                                inventore in tempora facilis commodi consectetur numquam voluptatem
                                hic? Nam rerum odio at. Alias fugit doloribus accusamus tempora.
                                Molestias suscipit nihil quod repudiandae. Tenetur, dicta quis ex
                                quaerat nisi quibusdam perferendis, libero consectetur natus
                                molestias excepturi inventore minima doloribus asperiores quidem
                                voluptatem illum. Quo nulla ut dolores provident laboru. dicta quis
                                ex quaerat nisi quibusdam perferendis, libero consectetur natus
                                molestias excepturi inventore minima doloribus asperiores quidem
                                voluptatem illum. Quo nulla ut dolores provident laboru. dicta quis
                                ex quaerat nisi quibusdam perferendis, libero consectetur natus
                                molestias excepturi inventore minima doloribus asperiores quidem
                                voluptatem illum. Quo nulla ut dolores provident laboru. Quo nulla
                                ut dolores provident laboru. dicta quis ex quaerat nisi quibusdam
                                perferendis, libero consectetur natus molestias excepturi inventore
                                minima doloribus asperiores quidem voluptatem illum. Quo nulla ut
                                dolores provident laboru. Quo nulla ut dolores provident laboru.
                                dicta quis ex quaerat nisi quibusdam perferendis, libero consectetur
                                natus molestias excepturi inventore minima doloribus asperiores
                                quidem voluptatem illum. Quo nulla ut dolores provident laboru. Quo
                                nulla ut dolores provident laboru. dicta quis ex quaerat nisi
                                quibusdam perferendis, libero consectetur natus molestias excepturi
                                inventore minima doloribus asperiores quidem voluptatem illum. Quo
                                nulla ut dolores provident laboru. Quo nulla ut dolores provident
                                laboru. dicta quis ex quaerat nisi quibusdam perferendis, libero
                                consectetur natus molestias excepturi inventore minima doloribus
                                asperiores quidem voluptatem illum. Quo nulla ut dolores provident
                                laboru. Quo nulla ut dolores provident laboru. dicta quis ex quaerat
                                nisi quibusdam perferendis, libero consectetur natus molestias
                                excepturi inventore minima doloribus asperiores quidem voluptatem
                                illum. Quo nulla ut dolores provident laboru. Quo nulla ut dolores
                                provident laboru. dicta quis ex quaerat nisi quibusdam perferendis,
                                libero consectetur natus molestias excepturi inventore minima
                                doloribus asperiores quidem voluptatem illum. Quo nulla ut dolores
                                provident laboru. Quo nulla ut dolores provident laboru. dicta quis
                                ex quaerat nisi quibusdam perferendis, libero consectetur natus
                                molestias excepturi inventore minima doloribus asperiores quidem
                                voluptatem illum. Quo nulla ut dolores provident laboru. Quo nulla
                                ut dolores provident laboru. dicta quis ex quaerat nisi quibusdam
                                perferendis, libero consectetur natus molestias excepturi inventore
                                minima doloribus asperiores quidem voluptatem illum. Quo nulla ut
                                dolores provident laboru.
                            </p>

                            <q-btn
                                v-close-popup
                                class="q-mt-lg q-mx-auto"
                                color="dark"
                                size="lg"
                                style="width: 300px"
                                >Close</q-btn
                            >
                        </div>
                    </q-page>
                </q-page-container>
            </q-layout>
        </q-dialog>
    </Teleport>

    <Teleport to="body">
        <q-dialog v-model="modelSettings">
            <q-splitter
                v-model="modelSplitter"
                class="bg-secondary full-height"
                style="border-radius: 0.375rem; max-width: 60rem; width: 100%; max-height: 40rem"
            >
                <template #before>
                    <q-tabs v-model="modelTab" vertical class="col bg-secondary overflow-hidden">
                        <q-tab style="height: 6rem" name="profile" label="Profile" />
                        <q-tab style="height: 6rem" name="appearance" label="Appearance" />
                        <q-tab style="height: 6rem" name="study" label="Study" />
                    </q-tabs>
                </template>

                <template #after>
                    <q-tab-panels
                        v-model="modelTab"
                        animated
                        swipeable
                        vertical
                        class="bg-secondary overflow-hidden"
                    >
                        <q-tab-panel
                            name="profile"
                            class="q-pb-none column bg-secondary full-height overflow-hidden"
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
                            <div class="title q-pt-lg text-subtitle1">
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
                                <q-btn
                                    class="q-mb-auto q-mt-md block q-ml-auto bg-white text-primary"
                                    label="Update"
                                    style="max-width: 9.375rem; width: 100%"
                                >
                                </q-btn>
                            </div>
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
                            <q-btn to="/" flat dense>
                                <img src="~assets/synque-logo.png" width="32" height="32" />
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
                                @click="modelAbout = true"
                                >About</q-btn
                            >
                        </li>
                        <li>
                            <q-btn
                                class="q-px-md"
                                flat
                                color="info"
                                padding="xs"
                                @click="modelTerms = true"
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
</style>
