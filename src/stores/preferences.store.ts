import { acceptHMRUpdate, defineStore } from 'pinia';
import { setCssVar } from 'quasar';
import type { Theme } from 'src/data/themes';
import { themes } from 'src/data/themes';
import { getAuthUserUtils } from 'src/utils/getAuthUser.utils';
import handleErrorUtils from 'src/utils/handleError.utils';
import supabaseApi from 'src/api/supabase.api';
import { ref, watch } from 'vue';

export const useStorePreferences = defineStore(
    'storePreferences',
    () => {
        const theme = ref('Bluemoon'),
            pending = ref(false),
            error = ref<string | null>(null),
            avatarUrl = ref<string | null>(null),
            currentFontSize = ref(1);

        const applyTheme = (name: string) => {
            const selectedTheme: Theme | undefined = themes[name];

            if (!selectedTheme) return;

            setCssVar('primary', selectedTheme.primary);
            setCssVar('secondary', selectedTheme.secondary);
            setCssVar('accent', selectedTheme.accent);
            setCssVar('dark', selectedTheme.dark);
            setCssVar('dark-page', selectedTheme.darkPage);
            setCssVar('positive', selectedTheme.positive);
            setCssVar('negative', selectedTheme.negative);
            setCssVar('info', selectedTheme.info);
            setCssVar('warning', selectedTheme.warning);

            theme.value = name;
        };

        const fontSizes = ['12px', '14px', '16px'];

        const changeFontSize = (size: number) => {
            setCssVar('theme-btn-font-size', fontSizes[size] ?? (fontSizes[1] as string));
            setCssVar('theme-font-size', fontSizes[size] ?? (fontSizes[1] as string));
        };

        const changeAvatar = async (avatarFile: File | null) => {
            if (!avatarFile) return;

            pending.value = true;
            error.value = null;

            try {
                const user = await getAuthUserUtils();
                const filePath = `${user!.id}/avatar`;

                const { error: uploadError } = await supabaseApi.storage
                    .from('avatars')
                    .upload(filePath, avatarFile, { cacheControl: '3600', upsert: true });

                if (uploadError) throw uploadError;

                const {
                    data: { publicUrl },
                } = supabaseApi.storage.from('avatars').getPublicUrl(filePath);

                if (!publicUrl) throw new Error('Failed to get public URL');

                const { error: dbError } = await supabaseApi
                    .from('profiles')
                    .upsert({ id: user!.id, avatar_url: publicUrl });

                if (dbError) throw dbError;

                return true;
            } catch (err: unknown) {
                console.error('changeAvatar error:', handleErrorUtils(err));
                error.value = err instanceof Error ? err.message : String(err);
            } finally {
                pending.value = false;
            }
        };

        const loadAvatar = async () => {
            try {
                const user = await getAuthUserUtils();
                if (!user) throw new Error('User not logged in');

                const { data, error } = await supabaseApi.storage
                    .from('avatars')
                    .createSignedUrl(`${user.id}/avatar`, 60);

                if (error) throw error;

                avatarUrl.value = data.signedUrl;
            } catch (err: unknown) {
                console.error('loadAvatar error:', err);
                return null;
            }
        };

        watch(
            theme,
            (newTheme) => {
                applyTheme(newTheme);
            },
            { immediate: true },
        );

        watch(
            currentFontSize,
            (newSize) => {
                changeFontSize(newSize);
            },
            { immediate: true },
        );

        return {
            theme,
            avatarUrl,
            currentFontSize,
            applyTheme,
            changeFontSize,
            changeAvatar,
            loadAvatar,
        };
    },

    { persist: true },
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStorePreferences, import.meta.hot));
}
