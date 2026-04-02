import handleErrorUtils from 'src/utils/handleError.utils';
import supabaseApi from 'src/api/supabase.api';

export const getAuthUserUtils = async () => {
    try {
        const {
            data: { user },
            error,
        } = await supabaseApi.auth.getUser();

        if (error) throw error;

        return user ?? null;
    } catch (err) {
        console.error(handleErrorUtils(err));
        return null;
    }
};
