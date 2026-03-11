import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://roqqtxmuvrdnzpisdxpd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcXF0eG11dnJkbnpwaXNkeHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDAwMzIsImV4cCI6MjA4ODgxNjAzMn0.GTdDzxoJ4D4VcqWzmL347DUncHSeKQw3DzEJps-8ca8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
