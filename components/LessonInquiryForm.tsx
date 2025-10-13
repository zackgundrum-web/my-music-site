'use client'

import { useState } from 'react'
import { client } from '@/lib/sanity'

export default function LessonInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skillLevel: '',
    lessonType: '',
    goals: '',
    availability: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await client.create({
        _type: 'lessonInquiry',
        ...formData,
        submittedAt: new Date().toISOString()
      })

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        skillLevel: '',
        lessonType: '',
        goals: '',
        availability: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-400">
          Thank you for your inquiry! I'll get back to you within 24-48 hours.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400">
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          />
        </div>

        {/* Skill Level */}
        <div>
          <label htmlFor="skillLevel" className="block text-sm font-medium mb-2">
            Current Skill Level
          </label>
          <select
            id="skillLevel"
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          >
            <option value="">Select your level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Lesson Type */}
        <div>
          <label htmlFor="lessonType" className="block text-sm font-medium mb-2">
            Lesson Type Preference
          </label>
          <select
            id="lessonType"
            name="lessonType"
            value={formData.lessonType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          >
            <option value="">Select preference</option>
            <option value="in-person">In-Person</option>
            <option value="online">Online (Zoom/Skype)</option>
            <option value="either">Either</option>
          </select>
        </div>

        {/* Goals */}
        <div>
          <label htmlFor="goals" className="block text-sm font-medium mb-2">
            What are your musical goals?
          </label>
          <textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            placeholder="e.g., Learn my favorite songs, improve technique, prepare for performances..."
          />
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium mb-2">
            Preferred Days/Times
          </label>
          <textarea
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            placeholder="e.g., Weekday evenings, Saturday mornings..."
          />
        </div>

        {/* Additional Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            placeholder="Anything else you'd like me to know?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  )
}