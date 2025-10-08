'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  source: string
  buttonColor?: string
}

export default function NewsletterForm({ source, buttonColor = 'white' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error)
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  const buttonClass = buttonColor === 'white' 
    ? 'bg-white text-black hover:bg-gray-200'
    : 'bg-purple-600 hover:bg-purple-700 text-white'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-full w-full sm:flex-1 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
      />
      <button 
        type="submit"
        disabled={status === 'loading'}
        className={`${buttonClass} px-8 py-3 rounded-full font-semibold transition w-full sm:w-auto whitespace-nowrap disabled:opacity-50`}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      
      {message && (
        <p className={`w-full text-center text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </form>
  )
}