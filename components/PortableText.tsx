import { PortableText as ReactPortableText } from '@portabletext/react'

const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 italic mb-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => <u className="underline">{children}</u>,
    link: ({ children, value }: any) => (
      
        <a href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 underline"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableText({ value }: { value: any }) {
  return <ReactPortableText value={value} components={components} />
}