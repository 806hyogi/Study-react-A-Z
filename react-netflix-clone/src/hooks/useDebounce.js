import { useState, useEffect } from 'react'

export const useDebounce = (value, delay) => {

  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay) // 타이핑을 하면 delay가 지나고 나서 searchPage index에 호출된다.

      return () => {
        clearTimeout(handler) // 다시 타이핑하면 초기화된다.
      }
    },
    [value, delay]
  )
  return debouncedValue
}
