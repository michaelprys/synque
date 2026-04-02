<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import type { User } from '@supabase/supabase-js';
import { useStorePreferences } from 'stores/preferences.store';
import { useStoreStudySettings } from 'stores/studySettings.store';
import BaseSettings from 'components/base/BaseSettings.vue';
import supabaseApi from 'src/api/supabase.api';
import handleErrorUtils from 'src/utils/handleError.utils';

interface BaseSettingsExpose {
    openDialog: () => void;
}

const router = useRouter();
const $q = useQuasar();

const storeStudySettings = useStoreStudySettings();
const storePreferences = useStorePreferences();

const pending = ref(false);
const user = ref<User | null>(null);
const refDialogSettings = ref<BaseSettingsExpose | null>(null);

const email = computed(() => user.value?.email ?? '');

let authSubscription: { unsubscribe: () => void } | null = null;

const logout = async () => {
    pending.value = true;
    try {
        const { error } = await supabaseApi.auth.signOut();
        if (error) throw error;

        $q.notify({ position: 'bottom-right', type: 'positive', message: 'Logout successful!' });
        void router.push({ name: 'login' });
    } catch (err) {
        $q.notify({ position: 'bottom-right', type: 'negative', message: handleErrorUtils(err) });
    } finally {
        pending.value = false;
    }
};

onMounted(async () => {
    const {
        data: { subscription },
    } = supabaseApi.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user ?? null;
    });
    authSubscription = subscription;

    await storePreferences.loadAvatar();
});

onUnmounted(() => {
    if (authSubscription) authSubscription.unsubscribe();
});
</script>

<template>
    <q-header class="bg-primary" elevated>
        <BaseSettings ref="refDialogSettings" />

        <q-toolbar class="text-h6 q-mx-auto justify-between" style="max-width: 90rem">
            <div class="flex items-center">
                <q-btn to="/" unelevated round size="sm" class="q-pa-none">
                    <q-avatar size="2rem">
                        <q-img
                            src="~assets/synque-logo.png"
                            alt="Synque Logo"
                            width="2rem"
                            height="2rem" />
                    </q-avatar>
                </q-btn>

                <ul class="q-ml-md flex items-center no-list-style">
                    <li><q-btn :to="{ name: 'home' }" flat label="Home" no-caps /></li>
                    <li><q-btn :to="{ name: 'words' }" flat label="Words" no-caps /></li>
                </ul>
            </div>

            <div class="q-gutter-x-sm flex items-center">
                <q-btn class="q-ml-md" flat no-caps>
                    <q-avatar size="1.5rem" class="q-mr-sm" color="grey-3">
                        <q-img
                            v-if="storePreferences.avatarUrl"
                            :src="storePreferences.avatarUrl" />
                        <q-icon v-else name="person" color="primary" size="1.2rem" />
                    </q-avatar>
                    <span>Account</span>

                    <q-menu dark class="bg-dark text-white">
                        <div class="row no-wrap q-pa-md" style="min-width: 220px">
                            <div class="column items-center full-width">
                                <template v-if="user">
                                    <q-avatar size="4rem" class="q-mb-sm" color="grey-3">
                                        <q-img
                                            v-if="storePreferences.avatarUrl"
                                            :src="storePreferences.avatarUrl" />
                                        <q-icon v-else name="person" color="primary" size="3rem" />
                                    </q-avatar>

                                    <div
                                        class="text-subtitle1 q-mb-xs text-center text-weight-bold text-white">
                                        {{ email }}
                                    </div>

                                    <div
                                        class="q-px-sm q-py-xs q-mb-md bg-negative rounded-borders text-caption text-dark text-uppercase text-weight-bolder">
                                        Lang: {{ storeStudySettings.currentTargetLanguage }}
                                    </div>
                                </template>

                                <q-list class="full-width text-white">
                                    <template v-if="user">
                                        <q-item
                                            v-close-popup
                                            clickable
                                            @click="refDialogSettings?.openDialog">
                                            <q-item-section avatar>
                                                <q-icon name="settings" size="xs" color="white" />
                                            </q-item-section>
                                            <q-item-section>Properties</q-item-section>
                                        </q-item>
                                        <q-separator dark class="q-my-xs" />
                                        <q-item v-close-popup clickable @click="void logout()">
                                            <q-item-section avatar>
                                                <q-icon name="logout" color="negative" size="xs" />
                                            </q-item-section>
                                            <q-item-section class="text-negative">
                                                Logout
                                            </q-item-section>
                                        </q-item>
                                    </template>

                                    <template v-else>
                                        <q-item v-close-popup clickable :to="{ name: 'login' }">
                                            <q-item-section avatar>
                                                <q-icon name="login" color="white" size="xs" />
                                            </q-item-section>
                                            <q-item-section>Login</q-item-section>
                                        </q-item>
                                        <q-item v-close-popup clickable :to="{ name: 'sign-up' }">
                                            <q-item-section avatar>
                                                <q-icon name="person_add" color="white" size="xs" />
                                            </q-item-section>
                                            <q-item-section>Sign Up</q-item-section>
                                        </q-item>
                                    </template>
                                </q-list>
                            </div>
                        </div>
                    </q-menu>
                </q-btn>
            </div>
        </q-toolbar>
    </q-header>
</template>

<style scoped lang="scss">
.no-list-style {
    list-style: none;
    padding: 0;
    margin: 0;
}

.q-item {
    color: white !important;
}

.text-negative {
    color: $negative !important;
}

.current-language {
    display: none;
}

@media (min-width: 35rem) {
    .current-language {
        display: block;
    }
}

.q-avatar img {
    object-fit: cover;
}
</style>
