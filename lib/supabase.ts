import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://twhrplxeeslcfnqojghq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3aHJwbHhlZXNsY2ZucW9qZ2hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDYzNTEsImV4cCI6MjA3MzE4MjM1MX0.v7aflh_MquduhydQqyh6hQ07uZCBdq5b5WLBlRBKw7M';

export const supabase = createClient(supabaseUrl, supabaseKey);