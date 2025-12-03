<script setup lang="ts">
import { useQuasar } from 'quasar';
import BtnClose from 'src/components/BtnClose.vue';
import { themes } from 'src/data/themes';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import { useStoreTheme } from 'src/stores/storeThemes';
import getErrorMessage from 'src/utils/getErrorMessage';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const storeTheme = useStoreTheme(),
    modelTab = ref('study'),
    router = useRouter(),
    modelSplitter = ref(20),
    modelNewCards = ref(2),
    modelMaxCards = ref(2),
    $q = useQuasar(),
    modelForgetSpeed = ref(true),
    modelFontSize = ref(1),
    fontSizeOptions = ref(['Small', 'Medium', 'Large']),
    modelAvatar = ref(null),
    isUpdatePwd = ref(true),
    pending = ref(false),
    isConfirmUpdatePwd = ref(true),
    password = ref(''),
    modelDialog = ref(false),
    confirmPassword = ref('');

const updatePassword = async () => {
    if (password.value !== confirmPassword.value) {
        $q.notify({
            color: 'negative',
            icon: 'warning',
            message: "Passwords don't match"
        });

        return;
    }

    pending.value = true;

    try {
        const { error } = await supabase.auth.updateUser({
            password: password.value
        });

        if (error) throw error;

        $q.notify({
            type: 'positive',
            message: 'The password was updated'
        });
        router.push({ name: 'home' });
    } catch (err) {
        $q.notify({
            type: 'negative',
            message: getErrorMessage(err) ?? 'Something went wrong'
        });
    } finally {
        pending.value = false;
        password.value = '';
        confirmPassword.value = '';
    }
};

const onReset = () => {
    password.value = '';
    confirmPassword.value = '';
};

const openDialog = () => {
    modelDialog.value = true;
};

defineExpose({
    openDialog
});

const storeStudySettings = useStoreStudySettings();
const languages = ref(storeStudySettings.languages);
const topics = ref(storeStudySettings.studyTopics);

const filterFn = (val: string, doneFn: (cb: () => void) => void) => {
    doneFn(() => {
        const search = val.toLowerCase();

        languages.value = storeStudySettings.languages.filter((l) =>
            l.name.toLowerCase().includes(search)
        );
    });
};
</script>

<template>
    <Teleport to="body">
        <q-dialog v-model="modelDialog" backdrop-filter="brightness(40%)">
            <q-splitter
                v-model="modelSplitter"
                class="bg-primary full-height"
                style="border-radius: 0.5rem; max-width: 65rem; width: 100%; max-height: 40rem"
            >
                <template #before>
                    <q-tabs v-model="modelTab" vertical class="tabs col">
                        <q-tab style="height: 6rem" name="study" label="Study" />
                        <q-tab style="height: 6rem" name="profile" label="Profile" />
                        <q-tab style="height: 6rem" name="preferences" label="preferences" />
                    </q-tabs>
                </template>

                <template #after>
                    <q-tab-panels
                        v-model="modelTab"
                        swipeable
                        vertical
                        class="bg-primary full-height overflow-hidden"
                        animated
                    >
                        <q-tab-panel name="study" class="col q-pa-md full-height">
                            <h2 class="text-h5 q-py-lg">Study</h2>

                            <BtnClose />

                            <div class="title text-subtitle1">
                                <span>Target language:</span>

                                <q-select
                                    v-model="storeStudySettings.currentLanguage"
                                    color="accent"
                                    class="q-mt-lg"
                                    :options="languages"
                                    dark
                                    filled
                                    option-label="name"
                                    emit-value
                                    map-options
                                    style="width: 33.33%"
                                    use-input
                                    fill-input
                                    hide-selected
                                    input-debounce="0"
                                    @filter="filterFn"
                                >
                                    <template #no-option>
                                        <q-item>
                                            <q-item-section class="text-grey">
                                                No such language
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                </q-select>
                            </div>

                            <div class="title q-mt-lg text-subtitle1">
                                <span>Preferred Topics:</span>

                                <q-select
                                    v-model="storeStudySettings.currentTopics"
                                    class="q-mt-lg"
                                    filled
                                    dark
                                    color="negative"
                                    multiple
                                    :options="topics"
                                    counter
                                    style="width: 33.33%"
                                />
                            </div>

                            <div class="title text-subtitle1">
                                <div class="flex items-center">
                                    <span>Level:</span>
                                    <q-badge class="q-ml-sm text-subtitle1" color="secondary">
                                        {{
                                            storeStudySettings.levels[
                                                storeStudySettings.currentLevel
                                            ]
                                        }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider
                                        v-model="storeStudySettings.currentLevel"
                                        color="accent"
                                        track-color="secondary"
                                        markers
                                        :min="0"
                                        :max="3"
                                    />
                                </div>
                            </div>
                            <div class="title text-subtitle1">
                                <div class="flex items-center">
                                    <span>New cards/day:</span>
                                    <q-badge class="q-ml-sm text-subtitle1" color="secondary">
                                        {{ modelNewCards }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider
                                        v-model="modelNewCards"
                                        color="accent"
                                        track-color="secondary"
                                        markers
                                        :min="0"
                                        :max="10"
                                    />
                                </div>
                            </div>
                            <div class="title q-mt-lg text-subtitle1">
                                <div class="flex items-center">
                                    <span>New cards/day:</span>
                                    <q-badge class="q-ml-sm text-subtitle1" color="secondary">
                                        {{ modelMaxCards }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider
                                        v-model="modelMaxCards"
                                        color="accent"
                                        track-color="secondary"
                                        markers
                                        :min="0"
                                        :max="10"
                                    />
                                </div>
                            </div>
                            <div class="title q-mt-lg text-subtitle1">
                                <span> Forget speed </span>
                                <q-toggle
                                    v-model="modelForgetSpeed"
                                    size="xl"
                                    color="accent"
                                    :label="modelForgetSpeed === true ? 'Slow' : 'Fast'"
                                />
                            </div>
                        </q-tab-panel>

                        <q-tab-panel name="profile" class="column q-pa-md bg-primary full-height">
                            <h2 class="text-h5 q-py-lg">Profile</h2>

                            <BtnClose />

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
                            <q-form
                                class="title column q-pt-lg text-subtitle1 justify-between"
                                @submit.prevent="updatePassword"
                                @reset="onReset"
                            >
                                <div>
                                    Update password

                                    <q-input
                                        v-model="password"
                                        class="q-pt-lg"
                                        filled
                                        dark
                                        :type="isUpdatePwd ? 'password' : 'text'"
                                        hint="New password"
                                    >
                                        <template #append>
                                            <q-icon
                                                :name="
                                                    isUpdatePwd ? 'visibility_off' : 'visibility'
                                                "
                                                class="cursor-pointer"
                                                @click="isUpdatePwd = !isUpdatePwd"
                                            />
                                        </template>
                                    </q-input>
                                    <q-input
                                        v-model="confirmPassword"
                                        filled
                                        dark
                                        :type="isConfirmUpdatePwd ? 'password' : 'text'"
                                        hint="Confirm New password"
                                    >
                                        <template #append>
                                            <q-icon
                                                :name="
                                                    isConfirmUpdatePwd
                                                        ? 'visibility_off'
                                                        : 'visibility'
                                                "
                                                class="cursor-pointer"
                                                @click="isConfirmUpdatePwd = !isConfirmUpdatePwd"
                                            />
                                        </template>
                                    </q-input>

                                    <q-btn
                                        type="submit"
                                        class="q-mb-md q-ml-auto block"
                                        color="accent"
                                        label="Update"
                                        text-color="black"
                                        style="
                                            max-width: 10rem;
                                            max-height: 2.5rem;
                                            height: 100%;
                                            width: 100%;
                                        "
                                    >
                                    </q-btn>
                                </div>
                            </q-form>
                        </q-tab-panel>

                        <q-tab-panel name="preferences" class="q-pa-md col bg-primary full-height">
                            <h2 class="text-h5 q-py-lg">Preferences</h2>

                            <BtnClose />

                            <div class="text-subtitle1 q-ma-none">Interface language:</div>

                            <q-select
                                v-model="storeStudySettings.currentLanguage"
                                class="q-mt-lg"
                                dark
                                filled
                                use-input
                                color="accent"
                                hide-selected
                                option-label="name"
                                fill-input
                                input-debounce="0"
                                style="width: 32%"
                                :options="languages"
                                @filter="filterFn"
                            >
                                <template #no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            No such language
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>

                            <div class="title q-py-lg text-subtitle1">
                                <div>
                                    Current Theme:
                                    <q-badge
                                        class="q-ml-xs text-subtitle1 flex-center flex"
                                        color="secondary"
                                        :style="{
                                            color: themes[storeTheme.theme]?.textColor
                                        }"
                                    >
                                        {{ storeTheme.theme }}
                                    </q-badge>
                                </div>
                                <div class="themes q-mt-md">
                                    <q-btn
                                        v-for="(theme, key) in themes"
                                        :key="key"
                                        class="col"
                                        :style="{
                                            color: theme.textColor,
                                            backgroundColor: theme.secondary
                                        }"
                                        @click="storeTheme.applyTheme(key)"
                                    >
                                        {{ key }}
                                    </q-btn>
                                </div>
                            </div>

                            <div class="title q-mt-lg text-subtitle1">
                                <div class="flex items-center">
                                    <span>Font Size:</span>
                                    <q-badge class="q-ml-sm text-subtitle1" color="secondary">
                                        {{ fontSizeOptions[modelFontSize] }}
                                    </q-badge>
                                </div>
                                <div>
                                    <q-slider
                                        v-model="modelFontSize"
                                        color="accent"
                                        track-color="secondary"
                                        markers
                                        :min="0"
                                        :max="2"
                                    />
                                </div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>
        </q-dialog>
    </Teleport>
</template>

<style scoped lang="scss">
.themes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(max(7.8125rem, calc(100% / 4)), 1fr));
    grid-auto-rows: 7rem;
    gap: 1rem;
}
</style>
