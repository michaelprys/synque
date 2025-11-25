import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/PageIndex.vue'), name: 'home' },
            { path: 'learn', component: () => import('pages/PageLearn.vue'), name: 'learn' },
            {
                path: 'words',
                component: () => import('pages/PageWords.vue'),
                name: 'words'
            },
            { path: 'login', component: () => import('pages/PageLogin.vue'), name: 'login' },
            { path: 'sign-up', component: () => import('pages/PageSignUp.vue'), name: 'sign-up' },
            {
                path: 'forgot-password',
                component: () => import('pages/PageForgot.vue'),
                name: 'forgot-password'
            },
            {
                path: 'reset-password',
                component: () => import('pages/PageReset.vue'),
                name: 'reset-password'
            },
            {
                path: 'about',
                component: () => import('pages/PageAbout.vue'),
                name: 'about'
            },
            {
                path: 'terms',
                component: () => import('pages/PageTerms.vue'),
                name: 'terms'
            }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
];

export default routes;
