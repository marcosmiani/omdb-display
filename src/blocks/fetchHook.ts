import { useState } from "react";

const DEBOUNCE_TIME = 500;
export const DEFAULT_TOKEN = '6c3a2d45';

const debounceMap = new Map();

const debounce = (fnc: Function, id: string) => {
  if (debounceMap.get(id)) clearTimeout(debounceMap.get(id))
  debounceMap.set(id, setTimeout(fnc, DEBOUNCE_TIME))
}

export type ErrorType = {
  Error: string,
  Response: string
}

export type FetchHookAPI<DataType> = [boolean, Error | undefined, DataType | undefined, () => void]

export function useFetchData<DataType>(url: string, id?: string): FetchHookAPI<DataType> {
  const [data, setData] = useState<DataType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const cacheId = id || url

  const fetchData = () => {
    setLoading(true);
    debounce(() =>
      fetch(
        url
      ).then(async (response) => {
        const detail: DataType & ErrorType = await response.json();
        if (detail.Response === 'False') {
          setError(new Error(detail.Error))  
        } else {
          setData(detail);
        }
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      }),
      cacheId
    )
  }
  
  return [loading, error, data, fetchData];
}