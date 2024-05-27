import { useCallback,useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "somethig went wrong...");
  }
  return resData;
}
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setLIsLoading] = useState(false);
  const [error, setError] = useState();

 function clearData(){
  setData(initialData)
 }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setLIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {...config, body: data});
        setData(resData);
      } catch (error) {
        setError(
          error.message || "somethig went wrong, failed to send request."
        );
      }
      setLIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
