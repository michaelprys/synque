<script setup lang="ts"></script>

<template>
    <q-page class="q-ma-sm">
        <section id="home" class="column items-center" style="margin-top: 13rem">
            <h1 class="sr-only">Home</h1>
            <q-img src="~assets/synque-logo.png" width="7.5rem" height="7.625rem" />
            <span class="text-h4 q-mt-md text-accent">Synque</span>
            <span class="text-h4 q-mt-lg text-center">Learn in sync with your mind</span>

            <div class="q-gutter-x-lg q-mt-xl flex">
                <q-btn
                    size="lg"
                    color="secondary"
                    :to="{ name: 'learn' }"
                    style="width: 12.8769rem; font-weight: 400; font-size: 1rem"
                >
                    Start Learning
                </q-btn>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped></style>
