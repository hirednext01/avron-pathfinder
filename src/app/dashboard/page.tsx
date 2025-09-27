'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Profile = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/login')
        return
      }
      setEmail(session.user.email ?? null)

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (!error) setProfile(data as Profile)
      setLoading(false)
    }

    init()

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session) router.replace('/login')
      else setEmail(session.user.email ?? null)
    })
    return () => { sub.subscription.unsubscribe() }
  }, [router])

  if (loading) return <div className="p-6">Loading…</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-700">Signed in as <strong>{email}</strong></p>

      {profile && (
        <div className="rounded border p-4">
          <div className="font-medium mb-2">Your Profile</div>
          <div>Full name: {profile.full_name ?? '—'}</div>
          <div>Email: {profile.email ?? '—'}</div>
        </div>
      )}

      <button
        onClick={async () => { await supabase.auth.signOut() }}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}
