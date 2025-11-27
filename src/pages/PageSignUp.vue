<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import supabase from 'src/utils/supabase';
import getErrorMessage from 'src/utils/getErrorMessage';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();
const termsAccepted = ref(false);
const email = ref('');
const password = ref('');
const pending = ref(false);
const confirmPassword = ref('');
const isPwd = ref(true);
const isConfirmPwd = ref(true);

const signUp = async () => {
    if (!termsAccepted.value) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the terms first'
        });

        return;
    }

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
        const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value
        });

        if (error) throw error;

        $q.notify({
            color: 'positive',
            icon: 'check',
            message: 'Sign up successful!'
        });

        router.push({ name: 'login' });
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
    termsAccepted.value = false;
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
};
</script>

<template>
    <q-page class="q-ma-sm">
        <section
            id="sign-up"
            class="column q-pa-lg bg-dark q-mx-auto items-center text-center"
            style="max-width: 33rem; margin-top: 9rem; border-radius: 0.5rem"
        >
            <h1 class="sr-only">Sign Up</h1>
            <span content class="text-h4 col-2" style="grid-column: 2; justify-self: center"
                >Sign Up</span
            >

            <q-form class="q-mt-lg full-width" @submit.prevent="signUp" @reset="onReset">
                <div class="column">
                    <q-input v-model="email" standout type="email" dark label="Email">
                        <template #prepend>
                            <q-icon name="mail" />
                        </template>
                    </q-input>

                    <q-input
                        v-model="password"
                        class="q-mt-md"
                        label="Password"
                        filled
                        dark
                        :type="isPwd ? 'password' : 'text'"
                    >
                        <template #prepend>
                            <q-icon name="lock" />
                        </template>

                        <template #append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>

                    <q-input
                        v-model="confirmPassword"
                        class="q-mt-md"
                        label="Confirm Password"
                        filled
                        dark
                        :type="isConfirmPwd ? 'password' : 'text'"
                    >
                        <template #prepend>
                            <q-icon name="lock" />
                        </template>

                        <template #append>
                            <q-icon
                                :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isConfirmPwd = !isConfirmPwd"
                            />
                        </template>
                    </q-input>

                    <div class="q-mt-md flex items-center">
                        <q-toggle v-model="termsAccepted" color="accent" dark> </q-toggle>
                        <div class="q-ml-sm">
                            <span> I accept </span>
                            <router-link
                                class="text-warning"
                                style="text-decoration: underline; text-underline-offset: 0.2rem"
                                :to="{ name: 'terms' }"
                            >
                                terms
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="q-mt-lg">
                    <q-btn
                        type="submit"
                        color="secondary"
                        style="width: 17.1875rem; opacity: 75%; border-radius: 0.375rem"
                        size="lg"
                        :loading="pending"
                        >Sign Up
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
