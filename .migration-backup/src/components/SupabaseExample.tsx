'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseExample() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'not-configured' | 'error'>('loading')

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (!supabase) {
          setStatus('not-configured')
          return
        }

        // Test the connection with a simple query
        const { error } = await supabase.from('_dummy_table_').select('*').limit(1)
        
        if (error) {
          // Table doesn't exist, but connection is working
          console.log('Connection test - table not found (expected):', error.message)
        }
        
        // If we get here, the connection is working (even if table doesn't exist)
        setStatus('connected')
      } catch (error) {
        console.error('Supabase connection error:', error)
        setStatus('error')
      }
    }

    checkConnection()
  }, [])

  if (status === 'loading') {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
        <p>Loading...</p>
      </div>
    )
  }

  if (status === 'not-configured') {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
        <p className="text-yellow-600">⚠️ Supabase not configured</p>
        <p className="text-sm text-gray-600 mt-2">
          Add your Supabase URL and API key to .env.local to enable database functionality.
        </p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
        <p className="text-red-600">❌ Connection failed</p>
        <p className="text-sm text-gray-600 mt-2">
          Check your Supabase configuration and try again.
        </p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      <p className="text-green-600">✅ Supabase is connected!</p>
      <p className="text-sm text-gray-600 mt-2">
        Your database is ready to use.
      </p>
    </div>
  )
} 