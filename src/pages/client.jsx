// supabase.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xencnuazrzvpgtpykvwo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlbmNudWF6cnp2cGd0cHlrdndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyNjIyNjQsImV4cCI6MjAyMDgzODI2NH0.QORncgHtFaetiyUqPS4NATBO-m9c5nlpkW6CBBo5nhI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };