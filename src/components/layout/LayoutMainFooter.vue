<script setup lang="ts"></script>

<template>
    <footer class="bg-primary" elevated>
        <div class="q-mx-auto flex justify-end" style="max-width: 90rem; width: 100%">
            <ul class="q-pa-sm q-gutter-x-md flex">
                <li>
                    <q-btn class="q-px-md" :to="{ name: 'about' }" flat padding="xs"> About </q-btn>
                </li>
                <li>
                    <q-btn class="q-px-md" :to="{ name: 'terms' }" flat padding="xs"> Terms </q-btn>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style scoped lang="scss"></style>
