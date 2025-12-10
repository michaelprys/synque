import { acceptHMRUpdate, defineStore } from 'pinia';
import { setCssVar } from 'quasar';
import { Theme, themes } from 'src/data/themes';
import { ref, watch } from 'vue';

export const useStorePreferences = defineStore(
    'storePreferences',
    () => {
        const theme = ref('Bluemoon');

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

        // const changeAvatar = (avatar_url: string) => {};ъ

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
            applyTheme
            // changeAvatar
        };
    },

    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStorePreferences, import.meta.hot));
}
