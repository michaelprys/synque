import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/LayoutMain.vue'),
        children: [
            { path: '', component: () => import('pages/PageIndex.vue'), name: 'home' },
            {
                path: 'learn',
                component: () => import('pages/PageLearn.vue'),
                name: 'learn',
                meta: { requiresAuth: true },
            },
            {
                path: 'words',
                component: () => import('pages/PageWords.vue'),
                name: 'words',
                props: true,
                meta: { requiresAuth: true },
            },
            {
                path: 'review/:word',
                component: () => import('pages/PageReview.vue'),
                name: 'review',
                meta: { requiresAuth: true },
            },
            { path: 'login', component: () => import('pages/PageLogin.vue'), name: 'login' },
            { path: 'sign-up', component: () => import('pages/PageSignUp.vue'), name: 'sign-up' },
            {
                path: 'forgot-password',
                component: () => import('pages/PageForgot.vue'),
                name: 'forgot-password',
            },
            {
                path: 'reset-password',
                component: () => import('pages/PageReset.vue'),
                name: 'reset-password',
            },
            {
                path: 'about',
                component: () => import('pages/PageAbout.vue'),
                name: 'about',
            },
            {
                path: 'terms',
                component: () => import('pages/PageTerms.vue'),
                name: 'terms',
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/PageNotFound.vue'),
    },
];

export default routes;
