'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-black/90">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold hover:text-gray-300 transition">
            idontwannadieever
          </Link>
         
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-lg">
            <Link href="/" className="hover:text-gray-300 transition">Home</Link>
            <Link href="/music" className="hover:text-gray-300 transition">Music</Link>
            <Link href="/gallery" className="hover:text-gray-300 transition">Gallery</Link>
            {/*<Link href="/tour" className="hover:text-gray-300 transition">Tour</Link> */}
            {/*<Link href="/merch" className="hover:text-gray-300 transition">Merch</Link>*/}
            <Link href="/about" className="hover:text-gray-300 transition">About</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-4 text-lg">
              <Link
                href="/"
                className="hover:text-gray-300 transition py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/music"
                className="hover:text-gray-300 transition py-2"
                onClick={() => setIsOpen(false)}
              >
                Music
              </Link>
              <Link
                href="/gallery"
                className="hover:text-gray-300 transition py-2"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              {/* <Link href="/tour" className="hover:text-gray-300 transition py-2" onClick={() => setIsOpen(false)}>Tour </Link> */}
              <Link
                href="/about"
                className="hover:text-gray-300 transition py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}