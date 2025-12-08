import { defineBoot } from '#q-app/wrappers';
import type { Session } from '@supabase/supabase-js';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import supabase from 'src/utils/supabase';

export default defineBoot(async () => {
    const store = useStoreStudySettings();

    const handleLoadSettings = async (session: Session | null) => {
        if (session?.user) {
            await store.loadSettings(session.user.id);
        }
    };

    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            handleLoadSettings(session);
        }
    });

    const { data: session } = await supabase.auth.getUser();

    await handleLoadSettings(session);
});
