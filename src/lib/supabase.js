import { createClient } from '@supabase/supabase-js'

const supabaseUrl = https://bqyruhgumtcczeqctvfy.supabase.co
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxeXJ1aGd1bXRjY3plcWN0dmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MjU2OTEsImV4cCI6MjA3OTQwMTY5MX0.JZiSxBnd_PEOsnE-owQEHI45wADHMMkN7UrPFrfGN5g

export const supabase = createClient(supabaseUrl, supabaseKey)
