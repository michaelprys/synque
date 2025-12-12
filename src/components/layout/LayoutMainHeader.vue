<script setup lang="ts">
import { useQuasar } from 'quasar';
import ItemSettings from 'src/components/ItemSettings.vue';
import { useStorePreferences } from 'src/stores/storePreferences';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import handleError from 'src/utils/handleError';
import supabase from 'src/utils/supabase';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const storeStudySettings = useStoreStudySettings(),
    storePreferences = useStorePreferences(),
    pending = ref(false),
    error = ref<string | null>(null);

const router = useRouter(),
    $q = useQuasar(),
    email = ref<string | undefined>(undefined),
    user = ref();

const logout = async () => {
    pending.value = true;
    error.value = null;

    try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        $q.notify({
            type: 'positive',
            message: 'Logout successful!'
        });
        router.push({ name: 'login' });
    } catch (err) {
        $q.notify({
            type: 'negative',
            message: handleError(err)
        });
    } finally {
        pending.value = false;
    }
};

const refDialogSettings = ref<InstanceType<typeof ItemSettings> | null>(null);

onMounted(async () => {
    pending.value = true;
    error.value = null;

    try {
        await supabase.auth.onAuthStateChange((event, session) => {
            user.value = session?.user ?? null;
            email.value = session?.user.email;
        });
    } catch (err) {
        console.error(handleError(err));

        error.value = handleError(err);
    } finally {
        pending.value = false;
    }

    await storePreferences.loadAvatar();
});
</script>

<template>
    <q-header class="bg-primary" elevated>
        <ItemSettings ref="refDialogSettings" />

        <q-toolbar class="text-h6 q-mx-auto justify-between" style="max-width: 90rem">
            <div class="flex items-center">
                <q-btn to="/" unelevated round size="sm" class="q-pa-none">
                    <q-avatar size="2rem">
                        <q-img
                            src="~assets/synque-logo.png"
                            alt="Synque Logo"
                            width="2rem"
                            height="2rem"
                        />
                    </q-avatar>
                </q-btn>

                <ul class="q-ml-md flex items-center">
                    <li>
                        <q-btn :to="{ name: 'home' }" flat>Home</q-btn>
                    </li>
                    <li>
                        <q-btn :to="{ name: 'words' }" flat>Words</q-btn>
                    </li>
                </ul>
            </div>

            <div class="q-gutter-x-sm flex items-center">
                <q-btn class="q-ml-md" flat>
                    <img
                        :src="storePreferences.avatarUrl ?? ''"
                        style="
                            width: 1.5rem;
                            height: 1.5rem;
                            border-radius: 50%;
                            margin-right: 0.5rem;
                        "
                    />
                    Account

                    <q-menu dark>
                        <div class="row no-wrap q-pa-md" style="width: 100%">
                            <div class="column items-center q-mx-auto">
                                <q-avatar v-if="user">
                                    <q-img
                                        :src="storePreferences.avatarUrl ?? ''"
                                        style="
                                            width: 2.5rem;
                                            height: 2.5rem;
                                            border-radius: 50%;
                                            margin-right: 0.5rem;
                                        "
                                    />
                                </q-avatar>

                                <div v-if="user" class="text-subtitle1 q-mt-md q-mb-xs">
                                    {{ email }}
                                </div>

                                <span
                                    v-if="user"
                                    class="q-px-sm q-py-xs q-mb-md bg-negative rounded-borders current-language text-caption text-dark text-uppercase"
                                    >Language:
                                    <span>{{ storeStudySettings.currentTargetLanguage }}</span>
                                </span>

                                <q-list class="full-width text-center">
                                    <q-item v-if="user" v-close-popup class="text-white" clickable>
                                        <q-item-section @click="refDialogSettings?.openDialog"
                                            >Properties</q-item-section
                                        >
                                    </q-item>
                                    <q-item
                                        v-if="!user"
                                        v-close-popup
                                        class="text-white"
                                        clickable
                                        :to="{ name: 'login' }"
                                    >
                                        <q-item-section>Login</q-item-section>
                                    </q-item>
                                    <q-item
                                        v-close-popup
                                        class="text-white"
                                        clickable
                                        :to="{ name: 'sign-up' }"
                                    >
                                        <q-item-section> Sign Up </q-item-section>
                                    </q-item>
                                    <q-item
                                        v-if="user"
                                        v-close-popup
                                        class="text-white"
                                        clickable
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
</template>

<style scoped lang="scss">
.q-field__native span {
    color: $negative;
}

.active {
    color: $negative;
}

.title {
    border-top: 1px solid rgb(91, 91, 91);
}

.tabs {
    transition: none;
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
