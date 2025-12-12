import { acceptHMRUpdate, defineStore } from 'pinia';
import { setCssVar } from 'quasar';
import { Theme, themes } from 'src/data/themes';
import { getAuthUser } from 'src/utils/getAuthUser';
import handleError from 'src/utils/handleError';
import supabase from 'src/utils/supabase';
import { ref, watch } from 'vue';

export const useStorePreferences = defineStore(
    'storePreferences',
    () => {
        const theme = ref('Bluemoon'),
            pending = ref(false),
            error = ref<string | null>(null),
            avatarUrl = ref<string | null>(null);

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

        const changeAvatar = async (avatarFile: File | null) => {
            if (!avatarFile) return;

            pending.value = true;
            error.value = null;

            try {
                const user = await getAuthUser();
                const filePath = `${user.id}/avatar`;

                const { error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(filePath, avatarFile, { cacheControl: '3600', upsert: true });

                if (uploadError) throw uploadError;

                const {
                    data: { publicUrl }
                } = supabase.storage.from('avatars').getPublicUrl(filePath);

                if (!publicUrl) throw new Error('Failed to get public URL');

                const { error: dbError } = await supabase
                    .from('profiles')
                    .upsert({ id: user.id, avatar_url: publicUrl });

                if (dbError) throw dbError;

                return true;
            } catch (err: unknown) {
                console.error('changeAvatar error:', handleError(err));
                error.value = err instanceof Error ? err.message : String(err);
            } finally {
                pending.value = false;
            }
        };

        const loadAvatar = async () => {
            try {
                const user = await getAuthUser();
                if (!user) throw new Error('User not logged in');

                const { data, error } = await supabase.storage
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
            {
                immediate: true
            }
        );

        return {
            theme,
            avatarUrl,
            applyTheme,
            changeAvatar,
            loadAvatar
        };
    },

    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStorePreferences, import.meta.hot));
}
