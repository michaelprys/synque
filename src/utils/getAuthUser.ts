import handleError from 'src/utils/handleError';
import supabase from 'src/utils/supabase';

export const getAuthUser = async () => {
    try {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser();

        if (error) throw error;

        return user ?? null;
    } catch (err) {
        console.error(handleError(err));
        return null;
    }
};
