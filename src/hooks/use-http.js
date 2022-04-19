import {useCallback, useState} from "react";

const useHttp = () => { //requestConfig è un oggetto che contiene le configurazioni - applyData applica i dati
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                    headers: requestConfig.headers ? requestConfig.headers : {}
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data) //nell\'hook viene passata la funzione e i dati (sostituisce la parte sotto)

            // const loadedTasks = [];
            //
            // for (const taskKey in data) {
            //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            // }
            //
            // setTasks(loadedTasks);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp