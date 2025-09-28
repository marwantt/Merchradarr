import {PortableTextReactComponents} from '@portabletext/react'
import Link from 'next/link'

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    callout: ({value}: {value: any}) => {
      const {type, title, content} = value
      const bgColors = {
        info: 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400',
        tip: 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400'
      }
      const textColors = {
        info: 'text-blue-800 dark:text-blue-300',
        warning: 'text-yellow-800 dark:text-yellow-300',
        tip: 'text-green-800 dark:text-green-300'
      }

      return (
        <div className={`${bgColors[type as keyof typeof bgColors]} p-6 mb-8`}>
          {title && (
            <h3 className={`text-lg font-semibold mb-2 ${textColors[type as keyof typeof textColors]}`}>
              {title}
            </h3>
          )}
          <p className={textColors[type as keyof typeof textColors]}>{content}</p>
        </div>
      )
    },

    codeBlock: ({value}: {value: any}) => {
      const {language, code} = value
      return (
        <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-sm text-gray-100">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      )
    },

    image: ({value}: {value: any}) => {
      return (
        <div className="my-8">
          <img
            src={value.asset?.url}
            alt={value.alt || ''}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      )
    }
  },

  block: {
    h2: ({children}) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
        {children}
      </h3>
    ),
    normal: ({children}) => (
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    code: ({children}) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({children, value}) => (
      <Link
        href={value.href}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
      >
        {children}
      </Link>
    ),
  },
}