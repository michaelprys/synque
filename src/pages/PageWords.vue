<script setup lang="ts">
import type { Database } from 'app/database.types';
import { useQuasar } from 'quasar';
import { useStoreFlashCard } from 'src/stores/storeFlashCard';
import { useStoreGenerateCard } from 'src/stores/storeGenerateCard';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import supabase from 'src/utils/supabase';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const storeStudySettings = useStoreStudySettings(),
    storeGenerateCard = useStoreGenerateCard(),
    router = useRouter();

defineProps({
    title: {
        type: String,
        default: ''
    }
});

type FlashcardRow = Database['public']['Tables']['flashcards']['Row'];

const storeFlashCard = useStoreFlashCard(),
    search = ref(''),
    $q = useQuasar(),
    PAGE_SIZE = 10,
    hasMore = ref(true),
    totalCards = ref(0),
    pending = ref(false);

const onLoad = async (index: number, done: () => void) => {
    const from = index * PAGE_SIZE,
        to = from + PAGE_SIZE - 1;

    pending.value = true;

    const { data, error, count } = await supabase
        .from('flashcards')
        .select('*', { count: 'exact' })
        .ilike('word', `%${search.value}%`)
        .range(from, to);

    if (error) {
        done();
        return;
    }

    if (!data || data.length === 0) {
        done();
        return;
    }

    if (!search.value) {
        totalCards.value = count ?? 0;
    }

    if (data.length < PAGE_SIZE) {
        hasMore.value = false;
    }

    storeFlashCard.cardData.push(...data);

    pending.value = false;

    done();
};

const deleteWord = (cardId: FlashcardRow['id']) => {
    $q.dialog({
        title: 'Delete word',
        message: `Are you sure you want to delete this word"?`,
        persistent: true,
        color: 'negative',
        // @ts-expect-error - quasar types are broken for dialog options
        cardClass: 'bg-secondary text-white',
        titleClass: 'text-white',
        ok: {
            label: 'Delete',
            color: 'white',
            textColor: 'primary'
        },
        cancel: {
            label: 'Cancel',
            flat: true,
            color: 'white'
        }
    }).onOk(async () => {
        const { error } = await supabase.from('flashcards').delete().eq('id', cardId);

        if (error) {
            $q.notify({
                position: 'bottom-right',
                type: 'negative',
                message: `Error deleting word: ${error.message}`
            });
            return;
        }

        storeFlashCard.cardData = storeFlashCard.cardData.filter((c) => c.id !== cardId);

        $q.notify({ position: 'bottom-right', type: 'positive', message: 'Word deleted' });
    });
};

const handleSelectCard = (card: FlashcardRow) => {
    storeFlashCard.selectCard(card);

    router.push({ name: 'review', params: { word: card.word } });
};

const reviewCard = () => {
    const cards = storeFlashCard.cardData;

    if (cards.length === 0) return;

    const firstCard = cards[0]!;

    storeFlashCard.selectCard(firstCard);

    router.push({
        name: 'review',
        params: { word: firstCard.word ?? 'unknown' }
    });
};

watch(
    search,
    async () => {
        storeFlashCard.cardData = [];
        hasMore.value = true;
        await onLoad(0, () => {});
    },
    { immediate: true }
);
</script>

<template>
    <q-page class="q-ma-sm flex">
        <section class="q-mx-auto text-center" style="max-width: 80rem; width: 100%">
            <div style="width: 100%; border-radius: 0.5rem" class="q-mb-xl q-pa-lg">
                <div>
                    <h3 class="text-h4">
                        {{ storeStudySettings.currentTargetLanguage }}:
                        {{ storeFlashCard.cardData.length }} words
                    </h3>

                    <div class="column">
                        <div class="full-width q-mt-lg flex items-center">
                            <q-btn
                                :to="{ name: 'review' }"
                                style="max-width: 12rem; width: 100%"
                                class="q-mx-auto bg-positive"
                                icon="repeat"
                                label="Review"
                                @click="reviewCard"
                            />
                        </div>

                        <div class="row q-mt-xl items-center justify-between">
                            <div class="col flex justify-center">
                                <q-input
                                    v-model="search"
                                    class="q-px-sm text-h6 full-width"
                                    style="max-width: 40rem; width: 100%"
                                    dark
                                    dense
                                    filled
                                    debounce="300"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="storeFlashCard.cardData.length > 0">
                    <q-infinite-scroll :offset="150" @load="onLoad">
                        <div class="word-list-container q-mt-lg">
                            <div class="word-list">
                                <q-item
                                    v-for="(card, idx) in storeFlashCard.cardData"
                                    :key="idx"
                                    class="q-pa-sm full-width"
                                    style="
                                        border-top-left-radius: 3px;
                                        border-top-right-radius: 3px;
                                    "
                                >
                                    <q-btn
                                        class="q-pa-none bg-primary full-width rounded-borders flex justify-between"
                                        @click="handleSelectCard(card)"
                                    >
                                        <q-item-section class="q-mt-none q-pt-none">
                                            <div
                                                class="column items-center"
                                                style="
                                                    border-top-left-radius: 3px;
                                                    border-top-right-radius: 3px;
                                                "
                                            >
                                                <q-img
                                                    style="
                                                        width: 100%;
                                                        height: 64px;
                                                        border-top-left-radius: 3px;
                                                        border-top-right-radius: 3px;
                                                    "
                                                    width="3rem"
                                                    height="3rem"
                                                    no-spinner
                                                    :src="
                                                        card.image_url
                                                            ? card.image_url.includes(
                                                                  'images.pexels.com'
                                                              )
                                                                ? card.image_url.split('?')[0] +
                                                                  '?auto=compress&cs=tinysrgb&w=400&h=400'
                                                                : card.image_url
                                                            : undefined
                                                    "
                                                    loading="lazy"
                                                >
                                                    <template #default>
                                                        <q-skeleton
                                                            v-if="storeGenerateCard.pending"
                                                            style="width: 100%; height: 100%"
                                                            type="rect"
                                                            width="100px"
                                                            height="100px"
                                                        />
                                                    </template>
                                                </q-img>
                                            </div>

                                            <span class="q-my-md text-subtitle2 block">
                                                {{ card.word }}
                                            </span>
                                        </q-item-section>

                                        <q-item-section
                                            side
                                            style="
                                                inset-inline-end: 0.5rem;
                                                inset-block-start: 0.5rem;
                                            "
                                            class="absolute q-pr-none action-buttons"
                                        >
                                            <div class="flex q-gutter-x-sm">
                                                <q-btn
                                                    size="sm"
                                                    style="width: 1rem; height: 1rem"
                                                    icon="delete"
                                                    @click.stop="deleteWord(card.id)"
                                                ></q-btn>
                                            </div>
                                        </q-item-section>
                                    </q-btn>
                                </q-item>
                            </div>
                        </div>

                        <template #loading>
                            <div v-if="hasMore" class="row q-my-md justify-center">
                                <q-spinner-dots size="40px" />
                            </div>
                        </template>

                        <span
                            v-if="!hasMore && storeFlashCard.cardData.length"
                            class="block q-mt-xl text-subtitle1"
                            >No more words to load.</span
                        >
                    </q-infinite-scroll>
                </div>

                <span v-else-if="search" class="block q-mt-xl text-subtitle1"
                    >No words found for "{{ search }}"</span
                >

                <div v-else-if="totalCards === 0" style="margin-top: 7.5rem">
                    <q-img
                        class="rounded-borders"
                        style="max-width: 20rem; max-height: 15rem"
                        width="320px"
                        height="240px"
                        src="https://unsplash.it/400"
                    />
                    <span class="q-mt-xl text-h4 block">
                        No words yet. Start learning and your words will appear here.
                    </span>
                </div>
            </div>
        </section>
    </q-page>
</template>

<style lang="scss" scoped>
.word-list-container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.word-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 15rem);
    gap: 0.5rem;
    justify-content: center;
    width: fit-content;
    max-width: 100%;
}

.word-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 12rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--q-color-primary);
    overflow: hidden;
    text-align: center;
}

.word-card q-img {
    flex-shrink: 0;
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
}

.word-card span {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
