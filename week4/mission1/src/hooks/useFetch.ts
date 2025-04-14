// src/hooks/useFetch.ts
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string, config?: AxiosRequestConfig) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<T>(url, config);
        setState({ data: res.data, loading: false, error: null });
      } catch (err: any) {
        setState({ data: null, loading: false, error: err.message });
      }
    };

    fetchData();
  }, [url]);

  return state;
}

export default useFetch;
