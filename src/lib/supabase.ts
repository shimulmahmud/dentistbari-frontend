// Supabase integration removed. This file provides a harmless stub
// to avoid runtime errors if something still imports it.

export const supabase = {
  from: () => ({
    insert: async () => ({ error: new Error('Supabase integration removed') }),
    select: async () => ({ data: [], error: null }),
  }),
  auth: {
    signIn: async () => ({ error: new Error('Supabase integration removed') }),
    signOut: async () => ({ error: new Error('Supabase integration removed') }),
  },
};
