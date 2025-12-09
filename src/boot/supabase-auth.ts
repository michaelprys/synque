import { defineBoot } from '#q-app/wrappers';
import { useStoreStudySettings } from 'src/stores/storeStudySettings';
import { getAuthUser } from 'src/utils/getAuthUser';
import supabase from 'src/utils/supabase';

export default defineBoot(async () => {
    const store = useStoreStudySettings();

    const handleLoadSettings = async (session) => {
        if (session?.user) {
            await store.loadSettings(session.user.id);
        }
    };

    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            handleLoadSettings(session);
        }
    });

    const user = await getAuthUser();

    await handleLoadSettings(user);
});
