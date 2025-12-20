import { defineBoot } from '#q-app/wrappers';
import type { User } from '@supabase/supabase-js';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import { getAuthUser } from 'src/utils/getAuthUser';
import supabase from 'src/utils/supabase';

export default defineBoot(async () => {
    const store = useStoreStudySettings();

    const handleLoadSettings = async (user: User | null) => {
        if (user) {
            await store.loadSettings(user.id);
        }
    };

    supabase.auth.onAuthStateChange((event, session) => {
        const user = session?.user ?? null;

        if (
            (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') &&
            user
        ) {
            handleLoadSettings(user);
        }
    });

    let user: User | null = null;

    try {
        user = await getAuthUser();
    } catch (err) {
        console.error(err);
    }

    await handleLoadSettings(user);
});
