<script setup lang="ts">
import { useQuasar } from 'quasar';
import getErrorMessage from 'src/utils/getErrorMessage';
import supabase from 'src/utils/supabase';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();
const newPassword = ref('');
const confirmNewPassword = ref('');
const isPwd = ref(true);
const isConfirmPwd = ref(true);
const pending = ref(false);
const isReady = ref(false);

const setNewPassword = async () => {
    if (!isReady.value) {
        $q.notify({ color: 'negative', message: 'Link is invalid or expired' });
    }

    if (newPassword.value !== confirmNewPassword.value) {
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
            password: newPassword.value
        });

        if (error) throw error;

        $q.notify({
            color: 'positive',
            icon: 'check',
            message: 'New password has been successfully set!'
        });

        router.push({ name: 'home' });
    } catch (err) {
        $q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'warning',
            message: getErrorMessage(err) ?? 'Something went wrong'
        });
    } finally {
        pending.value = false;
    }
};

const onReset = () => {
    newPassword.value = '';
    confirmNewPassword.value = '';
};

onMounted(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session);

        if (event === 'PASSWORD_RECOVERY') {
            isReady.value = true;
            $q.notify({
                color: 'positive',
                message: 'Link is valid - please enter new password'
            });
        }
    });

    onUnmounted(() => {
        data.subscription.unsubscribe();
    });
});
</script>

<template>
    <q-page class="q-ma-sm">
        <section
            id="reset-password"
            class="column q-pa-lg bg-dark q-mx-auto items-center text-center"
            style="max-width: 33rem; margin-top: 14rem; border-radius: 0.5rem"
        >
            <h1 class="sr-only">Reset Password</h1>
            <span class="text-h4 col-2" content style="grid-column: 2; justify-self: center"
                >Reset Password</span
            >

            <q-form class="q-mt-lg full-width" @submit.prevent="setNewPassword" @reset="onReset">
                <q-input
                    v-model="newPassword"
                    class="q-mt-md"
                    label="New Password"
                    filled
                    dark
                    :type="isPwd ? 'password' : 'text'"
                >
                    <template #prepend=""> <q-icon name="lock"> </q-icon></template>

                    <template #append="">
                        <q-icon
                            class="cursor-pointer"
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            @click="isPwd = !isPwd"
                        >
                        </q-icon
                    ></template>
                </q-input>

                <q-input
                    v-model="confirmNewPassword"
                    class="q-mt-md"
                    label="Confirm New Password"
                    filled
                    dark
                    :type="isConfirmPwd ? 'password' : 'text'"
                >
                    <template #prepend=""> <q-icon name="lock"> </q-icon></template>

                    <template #append="">
                        <q-icon
                            class="cursor-pointer"
                            :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                            @click="isConfirmPwd = !isConfirmPwd"
                        >
                        </q-icon
                    ></template>
                </q-input>

                <div class="q-mt-lg">
                    <q-btn
                        type="submit"
                        color="secondary"
                        style="width: 17.1875rem; opacity: 75%; border-radius: 0.375rem"
                        size="lg"
                        >Set New Password
                    </q-btn>
                </div>

                <div class="q-mt-lg flex-center flex">
                    <RouterLink class="text-subtitle1" :to="{ name: 'login' }">
                        Go to Login
                    </RouterLink>
                </div>
            </q-form>
        </section>
    </q-page>
</template>

<style lang="scss" scoped></style>
