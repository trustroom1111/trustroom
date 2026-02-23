import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qksvmdmweznuhgnyupha.supabase.co'
const supabaseKey = 'sb_publishable_0k0V2YV71EVfvKhZEwhs8Q_ezBRZUVy'

export const supabase = createClient(supabaseUrl, supabaseKey)