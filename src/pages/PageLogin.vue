<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import supabase from 'src/utils/supabase';
import getErrorMessage from 'src/utils/getErrorMessage';

const $q = useQuasar();
const pending = ref(false);
const email = ref('');
const password = ref('');
const isPwd = ref(true);

const login = async () => {
    pending.value = true;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        });

        if (error) throw error;

        $q.notify({
            color: 'positive',
            icon: 'arrow',
            message: `Hello, ${data.user?.user_metadata}!`
        });
    } catch (err) {
        $q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'warning',
            message: getErrorMessage(err) ?? 'Incorrect login or password'
        });
    } finally {
        pending.value = false;
    }
};

const onReset = () => {
    email.value = '';
    password.value = '';
};
</script>

<template>
    <q-page class="q-ma-sm">
        <section
            id="login"
            class="column q-pa-lg bg-dark q-mx-auto items-center text-center"
            style="max-width: 33rem; margin-top: 13rem; border-radius: 0.5rem"
        >
            <h1 class="sr-only">Login</h1>
            <span content class="text-h4 col-2" style="grid-column: 2; justify-self: center"
                >Login</span
            >

            <q-form class="q-mt-lg full-width" @submit="login" @reset="onReset">
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

                <div class="q-mt-lg">
                    <q-btn
                        type="submit"
                        color="secondary"
                        style="width: 17.1875rem; opacity: 75%; border-radius: 0.375rem"
                        size="lg"
                        :loading="pending"
                    >
                        Login
                    </q-btn>
                </div>

                <div class="q-mt-lg flex-center flex">
                    <RouterLink
                        class="text-subtitle1"
                        :to="{ name: 'forgot-password' }"
                        style="width: 6.875rem"
                    >
                        Forgot</RouterLink
                    >
                    <RouterLink
                        class="text-subtitle1"
                        :to="{ name: 'sign-up' }"
                        style="width: 6.875rem"
                    >
                        Sign Up
                    </RouterLink>
                </div>
            </q-form>
        </section>
    </q-page>
</template>

<style lang="scss" scoped></style>
