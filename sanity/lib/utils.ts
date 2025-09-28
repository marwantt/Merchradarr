export const categoryConfig = {
  policy: {
    label: 'Policy Guide',
    bgColor: 'bg-red-100 dark:bg-red-900',
    textColor: 'text-red-800 dark:text-red-200'
  },
  strategy: {
    label: 'Strategy',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    textColor: 'text-blue-800 dark:text-blue-200'
  },
  research: {
    label: 'Research',
    bgColor: 'bg-green-100 dark:bg-green-900',
    textColor: 'text-green-800 dark:text-green-200'
  },
  tips: {
    label: 'Tips',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    textColor: 'text-purple-800 dark:text-purple-200'
  },
  'case-study': {
    label: 'Case Study',
    bgColor: 'bg-orange-100 dark:bg-orange-900',
    textColor: 'text-orange-800 dark:text-orange-200'
  },
  tools: {
    label: 'Tools',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900',
    textColor: 'text-indigo-800 dark:text-indigo-200'
  }
}

export function getCategoryStyle(category: string) {
  return categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.strategy
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}