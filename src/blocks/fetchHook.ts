import { useState } from "react";
import debounce from 'lodash/debounce';

const DEBOUNCE_TIME = 100;
export const DEFAULT_TOKEN = '6c3a2d45';

export type FetchHookAPI<DataType> = [boolean, Error | undefined, DataType | undefined, (query: string) => Promise<void>]

export function useFetchData<DataType>(): FetchHookAPI<DataType> {
  const [data, setData] = useState<DataType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const fetchData = debounce(async (url: string) => await fetch(
    url
  ).then(async (response) => {
    const detail: DataType = await response.json();
    setTimeout(() => {
      setData(detail);
      setLoading(false);
    }, 1000)
  }).catch(err => {
    setError(err);
    setLoading(false);
  }), DEBOUNCE_TIME, {
    'leading': true,
    'trailing': false
  })

  const getData = async (url: string) => {
    if (!loading) {
      setLoading(true);
      fetchData(url);
    }
  }

  return [loading, error, data, getData];
}