<script setup lang="ts">
import MainFooter from 'components/layout/MainFooter.vue';
import MainHeader from 'components/layout/MainHeader.vue';
</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <MainHeader />

        <q-page-container style="padding-top: 5.5rem">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </q-page-container>

        <MainFooter />
    </q-layout>
</template>
