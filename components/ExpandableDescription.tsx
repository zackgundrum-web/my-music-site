'use client'

import { useState } from 'react'
import PortableText from './PortableText'

export default function ExpandableDescription({ description }: { description: any }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Don't render if description is empty
  if (!description || description.length === 0) {
    return null
  }

  return (
    <div className="mb-4">
      {/* Collapsed/Expanded Content */}
      <div className={`text-gray-400 text-sm md:text-base prose prose-invert prose-sm max-w-none overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-0'}`}>
        <PortableText value={description} />
      </div>

      {/* Gradient Fade Effect (when collapsed) */}
      {!isExpanded && (
        <div className="h-8 bg-gradient-to-t from-gray-900/30 to-transparent -mt-8 relative" />
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-purple-400 hover:text-purple-300 text-sm font-semibold mt-2 transition flex items-center gap-1"
      >
        {isExpanded ? (
          <>
            Show Less
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </>
        ) : (
          <>
            View Description
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  )
}