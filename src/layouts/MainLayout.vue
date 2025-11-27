<script setup lang="ts">
import { onMounted, ref } from 'vue';
import supabase from 'src/utils/supabase';
import getErrorMessage from 'src/utils/getErrorMessage';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();
const modelSettings = ref(false);
const modelTab = ref('profile');
const modelSplitter = ref(20);
const modelNewCards = ref(2);
const modelMaxCards = ref(2);
const modelForgetSpeed = ref(true);
const modelFontSize = ref(1);
const theme = ref(0);
const themeOptions = ref(['Ivory', 'Midnight', 'Jade', 'Earth', 'Crimson', 'Frost']);
const fontSizeOptions = ref(['Small', 'Medium', 'Large']);
const modelAvatar = ref(null);
const modelUpdatePassword = ref(null);
const modelConfirmUpdatePassword = ref(null);
const isUpdatePwd = ref(false);
const isConfirmUpdatePwd = ref(false);
const email = ref<string | undefined>(undefined);
const pending = ref(false);
const user = ref();

const logout = async () => {
    pending.value = true;

    try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        $q.notify({
            type: 'positive',
            message: 'Logout successful!'
        });
        router.push({ name: 'home' });
    } catch (err) {
        $q.notify({
            type: 'negative',
            message: getErrorMessage(err) ?? 'Something went wrong'
        });
    } finally {
        pending.value = false;
    }
};

onMounted(async () => {
    try {
        await supabase.auth.onAuthStateChange((event, session) => {
            user.value = session?.user ?? null;
            email.value = session?.user.email;
        });

        console.log(email.value);
        console.log('Session is active');
    } catch (err) {
        console.error(getErrorMessage(err) || 'Something went wrong');
    }
});
</script>

<template>
    <Teleport to="body">
        <q-dialog v-model="modelSettings" backdrop-filter="brightness(60%)">
            <q-splitter
                v-model="modelSplitter"
                class="bg-dark full-height"
                style="border-radius: 0.5rem; max-width: 65rem; width: 100%; max-height: 40rem"
            >
                <template #before>
                    <q-tabs v-model="modelTab" vertical class="col bg-dark overflow-hidden">
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
                        class="bg-dark full-height overflow-hidden"
                    >
                        <q-tab-panel
                            name="profile"
                            class="column q-pa-md bg-dark full-height overflow-hidden"
                        >
                            <h2 class="text-h5 q-py-lg">Profile</h2>
                            <div class="title q-py-lg text-subtitle1 flex items-center">
                                <q-avatar color="red" text-color="white" />
                                <q-file
                                    v-model="modelAvatar"
                                    class="q-ml-sm"
                                    dark
                                    borderless
                                    label="Change Avatar"
                                />
                            </div>
                            <div class="title column q-pt-lg text-subtitle1 justify-between">
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
                                class="q-mb-md q-ml-auto text-primary block bg-white"
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
                            class="q-pa-md col bg-dark full-height overflow-hidden"
                        >
                            <h2 class="text-h5 q-py-lg">Appearance</h2>
                            <div class="title q-py-lg text-subtitle1">
                                <div>
                                    Current Theme:
                                    <q-badge
                                        class="q-ml-xs text-subtitle1 flex-center flex"
                                        color="secondary"
                                    >
                                        {{ themeOptions[theme] }}
                                    </q-badge>
                                </div>
                                <div class="themes q-mt-md">
                                    <q-btn
                                        class="col text-primary"
                                        style="background-color: #f7f4e9"
                                        @click="theme = 0"
                                    >
                                        {{ themeOptions[0] }}
                                    </q-btn>

                                    <q-btn
                                        class="col"
                                        style="background-color: #445668"
                                        @click="theme = 1"
                                    >
                                        {{ themeOptions[1] }}
                                    </q-btn>

                                    <q-btn
                                        class="col"
                                        style="background-color: #5fae8f"
                                        @click="theme = 2"
                                    >
                                        {{ themeOptions[2] }}
                                    </q-btn>

                                    <q-btn style="background-color: #b89472" @click="theme = 3">
                                        {{ themeOptions[3] }}
                                    </q-btn>

                                    <q-btn style="background-color: #a85a5a" @click="theme = 4">
                                        {{ themeOptions[4] }}
                                    </q-btn>

                                    <q-btn style="background-color: #7fb7d4" @click="theme = 5">
                                        {{ themeOptions[5] }}
                                    </q-btn>
                                </div>
                            </div>

                            <div class="title q-py-lg text-subtitle1">
                                <div class="flex items-center">
                                    <span>Font Size:</span>
                                    <q-badge class="q-ml-sm text-subtitle1" color="secondary">
                                        {{ fontSizeOptions[modelFontSize] }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider
                                        v-model="modelFontSize"
                                        color="info"
                                        markers
                                        :min="0"
                                        :max="2"
                                    />
                                </div>
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="study" class="col q-pa-md bg-dark full-height">
                            <h2 class="text-h5 q-py-lg">Study</h2>
                            <div class="title q-py-lg text-subtitle1">
                                <div class="flex items-center">
                                    <span>New cards/day:</span>
                                    <q-badge class="q-ml-sm text-subtitle1" color="secondary">
                                        {{ modelNewCards }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider
                                        v-model="modelNewCards"
                                        color="info"
                                        markers
                                        :min="0"
                                        :max="10"
                                    />
                                </div>
                            </div>
                            <div class="title q-py-lg text-subtitle1">
                                <div class="flex items-center">
                                    <span>New cards/day:</span>
                                    <q-badge class="q-ml-sm text-subtitle1" color="secondary">
                                        {{ modelMaxCards }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider
                                        v-model="modelMaxCards"
                                        color="info"
                                        markers
                                        :min="0"
                                        :max="10"
                                    />
                                </div>
                            </div>
                            <div class="title text-subtitle1 q-py-lg">
                                <span> Forget speed </span>
                                <q-toggle
                                    v-model="modelForgetSpeed"
                                    size="xl"
                                    color="accent"
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
            <q-header class="bg-primary" elevated>
                <q-toolbar class="text-h6 q-mx-auto justify-between" style="max-width: 90rem">
                    <div class="flex items-center">
                        <q-btn to="/" unelevated round size="sm" class="q-pa-none">
                            <q-avatar size="2rem">
                                <img src="~assets/synque-logo.png" alt="Synque Logo" />
                            </q-avatar>
                        </q-btn>

                        <ul class="q-ml-md flex items-center">
                            <li>
                                <q-btn :to="{ name: 'home' }" flat color="info">Home</q-btn>
                            </li>
                            <li>
                                <q-btn :to="{ name: 'words' }" flat color="info">Words</q-btn>
                            </li>
                        </ul>
                    </div>

                    <div class="q-gutter-x-sm flex items-center">
                        <q-btn label="Account" icon="account_circle" text-color="info" flat>
                            <q-menu dark>
                                <div class="row no-wrap q-pa-md" style="width: 100%">
                                    <div class="column items-center q-mx-auto">
                                        <q-avatar v-if="user" size="72px">
                                            <img src="https://unsplash.it/100" />
                                        </q-avatar>

                                        <div v-if="user" class="text-subtitle1 q-mt-md q-mb-xs">
                                            {{ email }}
                                        </div>

                                        <span
                                            v-if="user"
                                            class="q-px-sm q-py-xs q-mb-md bg-secondary rounded-borders current-language text-caption text-uppercase"
                                            >Language: <span class="text-blue">Chinese</span>
                                        </span>

                                        <q-list class="full-width text-center">
                                            <q-item
                                                v-if="user"
                                                v-close-popup
                                                clickable
                                                active-class="text-white"
                                            >
                                                <q-item-section @click="modelSettings = true"
                                                    >Settings</q-item-section
                                                >
                                            </q-item>
                                            <q-item
                                                v-if="!user"
                                                v-close-popup
                                                clickable
                                                active-class="text-white"
                                                :to="{ name: 'login' }"
                                            >
                                                <q-item-section>Login</q-item-section>
                                            </q-item>
                                            <q-item
                                                v-close-popup
                                                active-class="text-white"
                                                clickable
                                                :to="{ name: 'sign-up' }"
                                            >
                                                <q-item-section> Sign Up </q-item-section>
                                            </q-item>
                                            <q-item
                                                v-if="user"
                                                v-close-popup
                                                clickable
                                                active-class="text-white"
                                                @click="logout"
                                            >
                                                <q-item-section>Logout</q-item-section>
                                            </q-item>
                                        </q-list>
                                    </div>
                                </div>
                            </q-menu>
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
            <div class="q-mx-auto flex justify-end" style="max-width: 90rem; width: 100%">
                <ul class="q-pa-sm q-gutter-x-md flex">
                    <li>
                        <q-btn
                            class="q-px-md"
                            :to="{ name: 'about' }"
                            flat
                            color="info"
                            padding="xs"
                            >About
                        </q-btn>
                    </li>
                    <li>
                        <q-btn
                            class="q-px-md"
                            :to="{ name: 'terms' }"
                            flat
                            color="info"
                            padding="xs"
                            >Terms
                        </q-btn>
                    </li>
                </ul>
            </div>
        </footer>
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
    background-color: $secondary;
}

.themes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 6rem;
    gap: 1rem;
}

.current-language {
    display: none;
}
.current-language-alias {
    display: block;
}

@media (width >= 35rem) {
    .current-language {
        display: block;
    }
    .current-language-alias {
        display: none;
    }
}
</style>
