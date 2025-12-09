import supabase from 'src/utils/supabase';

export const getAuthUser = async () => {
    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error) throw error;
    if (!user) throw new Error('Not authenticated');

    return user;
};
