import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    // Check if ANY admin exists in the system
    const { data: existingAdmins, error: adminCheckError } = await supabaseAdmin
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1)

    const hasExistingAdmins = !adminCheckError && existingAdmins && existingAdmins.length > 0

    // If admins exist, require caller to be admin
    if (hasExistingAdmins) {
      const authHeader = req.headers.get('Authorization')
      if (!authHeader?.startsWith('Bearer ')) {
        return new Response(
          JSON.stringify({ success: false, error: 'Authentication required' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const callerClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } }
      })

      const token = authHeader.replace('Bearer ', '')
      const { data: claims, error: claimsError } = await callerClient.auth.getClaims(token)
      if (claimsError || !claims?.claims?.sub) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid token' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const callerId = claims.claims.sub as string

      const { data: callerRole } = await supabaseAdmin
        .from('user_roles')
        .select('role')
        .eq('user_id', callerId)
        .eq('role', 'admin')
        .maybeSingle()

      if (!callerRole) {
        return new Response(
          JSON.stringify({ success: false, error: 'Admin access required' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Read credentials from secrets
    const adminEmail = Deno.env.get('ADMIN_EMAIL')
    const adminPassword = Deno.env.get('ADMIN_PASSWORD')

    if (!adminEmail || !adminPassword) {
      console.error('Admin credentials not configured in secrets')
      return new Response(
        JSON.stringify({ success: false, error: 'Admin credentials not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = existingUsers?.users?.find(u => u.email?.toLowerCase() === adminEmail.toLowerCase())

    if (existingUser) {
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        existingUser.id,
        { password: adminPassword, email_confirm: true }
      )
      
      if (updateError) throw updateError

      // Role assignment strictly in user_roles only (NOT profiles)
      await supabaseAdmin.from('user_roles').upsert({
        user_id: existingUser.id,
        role: 'admin'
      }, { onConflict: 'user_id,role' })

      // Profile: only set id, email, full_name — NO role field
      await supabaseAdmin.from('profiles').upsert({
        id: existingUser.id,
        email: adminEmail,
      full_name: 'Naveen Bharat Admin',
      }, { onConflict: 'id' })

      return new Response(
        JSON.stringify({ success: true, message: 'Admin updated successfully', userId: existingUser.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create new admin user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    })

    if (createError) throw createError

    await supabaseAdmin.from('user_roles').insert({
      user_id: newUser.user.id,
      role: 'admin'
    })

    // Profile: only set id, email, full_name — NO role field
    await supabaseAdmin.from('profiles').upsert({
      id: newUser.user.id,
      email: adminEmail,
      full_name: 'Naveen Bharat Admin',
    }, { onConflict: 'id' })

    return new Response(
      JSON.stringify({ success: true, message: 'Admin user created', userId: newUser.user.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    console.error('Error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
