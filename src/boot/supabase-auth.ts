import { defineBoot } from '#q-app/wrappers';
import type { User } from '@supabase/supabase-js';
import { useStoreStudySettings } from 'stores/studySettings.store';
import { getAuthUserUtils } from 'src/utils/getAuthUser.utils';
import supabaseApi from 'src/api/supabase.api';

export default defineBoot(async () => {
    const store = useStoreStudySettings();

    const handleLoadSettings = async (user: User | null) => {
        if (user?.id) {
            await store.loadSettings(user.id);
        }
    };

    supabaseApi.auth.onAuthStateChange((event, session) => {
        const user = session?.user ?? null;
        const validEvents = ['INITIAL_SESSION', 'SIGNED_IN', 'TOKEN_REFRESHED'];

        if (validEvents.includes(event) && user) {
            void handleLoadSettings(user);
        }
    });

    try {
        const user = await getAuthUserUtils();
        if (user) {
            await handleLoadSettings(user);
        }
    } catch (err) {
        console.error('Auth boot error:', err);
    }
});
