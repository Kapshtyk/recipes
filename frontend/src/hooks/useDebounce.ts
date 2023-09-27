import { useEffect } from 'react'

export function useDebounce(value: string, callback: (arg0: string) => void, delay: number) {
  useEffect(() => {
    const debounceId = setTimeout(() => callback(value), delay)
    return () => clearTimeout(debounceId)
  }, [value, delay])
}
