<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();

const email = ref('');
const accept = ref(false);

const onSubmit = () => {
    if (!accept.value) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the terms first'
        });
    } else {
        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
        });
    }
};

const onReset = () => {
    accept.value = false;
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

            <q-form class="q-mt-lg full-width" @submit="onSubmit" @reset="onReset">
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
                        color="secondary"
                        style="width: 17.1875rem; opacity: 75%; border-radius: 0.375rem"
                        size="lg"
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
