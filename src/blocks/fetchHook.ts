import { useState } from 'react'

const DEBOUNCE_TIME = 500
export const DEFAULT_TOKEN = import.meta.env.VITE_API_TOKEN

const debounceMap = new Map()

const debounce = (fnc: () => void, id: string): void => {
  if (debounceMap.get(id) !== undefined) clearTimeout(debounceMap.get(id))
  debounceMap.set(id, setTimeout(fnc, DEBOUNCE_TIME))
}

export interface ErrorType {
  Error: string
  Response: string
}

export type FetchHookAPI<DataType> = [boolean, Error | undefined, DataType | undefined, () => void]

export function useFetchData<DataType> (url: string, id?: string): FetchHookAPI<DataType> {
  const [data, setData] = useState<DataType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  const cacheId = id ?? url

  const fetchData = (): void => {
    setLoading(true)
    setError(undefined)
    debounce(() => {
      fetch(
        url
      ).then(async (response) => {
        const detail: DataType & ErrorType = await response.json()
        if (detail.Response === 'False') {
          setError(new Error(detail.Error))
        } else {
          setData(detail)
        }
        setLoading(false)
      }).catch(err => {
        setError(err)
        setLoading(false)
      })
    },
    cacheId
    )
  }

  return [loading, error, data, fetchData]
}
