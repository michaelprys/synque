<script setup lang="ts"></script>

<template>
    <q-page class="q-ma-sm">
        <section id="home" class="column items-center" style="margin-top: 13rem">
            <h1 class="sr-only">Home</h1>

            <q-img src="~assets/synque-logo.png" width="7.5rem" height="7.625rem" />

            <div class="text-center q-mt-md column items-center">
                <span class="text-h4 text-accent">Synque</span>
                <span class="text-h4 q-mt-md text-center">Learn in sync with your mind</span>

                <q-btn
                    class="q-mt-lg"
                    size="lg"
                    color="secondary"
                    :to="{ name: 'learn' }"
                    style="width: 12.8769rem; font-weight: 400; font-size: 1rem">
                    Start Learning
                </q-btn>
            </div>

            <!-- <div v-else class="text-center q-mt-lg">
                <div class="text-h4">All set for today</div>
                <div class="text-grey-6 text-h6 q-mt-sm">
                    Great job! Come back tomorrow or review cards.
                </div>
                <q-btn
                    class="q-mt-lg"
                    color="secondary"
                    label="Review cards"
                    icon="refresh"
                    :to="{ name: 'review' }"
                />
            </div> -->
        </section>
    </q-page>
</template>

<style lang="scss" scoped></style>
