<script setup lang="ts">
import { useQuasar } from 'quasar';
import getErrorMessage from 'src/utils/getErrorMessage';
import supabase from 'src/utils/supabase';
import { ref } from 'vue';

const $q = useQuasar();
const email = ref('');
const pending = ref(false);
const redirectTo = import.meta.env.VITE_APP_URL + '/#/reset-password';

const sendResetLink = async () => {
    pending.value = true;

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
            redirectTo
        });

        if (error) throw error;

        $q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'check',
            message: 'If this email exists, a reset link has been sent'
        });
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
    email.value = '';
};
</script>

<template>
    <q-page class="q-ma-sm">
        <section
            id="forgot-password"
            class="column q-pa-lg bg-dark q-mx-auto items-center text-center"
            style="max-width: 33rem; margin-top: 14rem; border-radius: 0.5rem"
        >
            <h1 class="sr-only">Forgot Password</h1>
            <span content class="text-h4 col-2" style="grid-column: 2; justify-self: center"
                >Reset Password</span
            >

            <q-form class="q-mt-lg full-width" @submit="sendResetLink" @reset="onReset">
                <div class="column">
                    <q-input
                        v-model="email"
                        standout
                        type="email"
                        dark
                        label="Email"
                        hint="Enter your email where the reset link will be sent"
                    >
                        <template #prepend>
                            <q-icon name="mail" />
                        </template>
                    </q-input>
                </div>

                <div class="q-mt-lg">
                    <q-btn
                        type="submit"
                        color="secondary"
                        style="width: 17.1875rem; opacity: 75%; border-radius: 0.375rem"
                        size="lg"
                        :loading="pending"
                        >Send Reset Link
                    </q-btn>
                </div>

                <div class="q-mt-lg flex-center flex">
                    <RouterLink class="text-subtitle1" :to="{ name: 'login' }">
                        Back to Login
                    </RouterLink>
                </div>
            </q-form>
        </section>
    </q-page>
</template>

<style lang="scss" scoped></style>
