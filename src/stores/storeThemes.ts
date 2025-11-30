import { acceptHMRUpdate, defineStore } from 'pinia';
import { setCssVar } from 'quasar';
import { Theme, themes } from 'src/data/themes';
import { ref } from 'vue';

export const useStoreTheme = defineStore(
    'theme',
    () => {
        const theme = ref('Bluemoon');
        const savedTheme = localStorage.getItem('theme');

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

        if (savedTheme) {
            const themeObj = JSON.parse(savedTheme);
            applyTheme(themeObj.theme);
        }

        return {
            theme,
            applyTheme
        };
    },

    { persist: true }
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreTheme, import.meta.hot));
}
