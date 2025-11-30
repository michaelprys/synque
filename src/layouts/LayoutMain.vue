<script setup lang="ts">
import LayoutMainFooter from 'src/components/layout/LayoutMainFooter.vue';
import LayoutMainHeader from 'src/components/layout/LayoutMainHeader.vue';
</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <LayoutMainHeader />

        <q-page-container style="padding-top: 5.5rem">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </q-page-container>

        <LayoutMainFooter />
    </q-layout>
</template>
