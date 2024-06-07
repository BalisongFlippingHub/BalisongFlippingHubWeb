import { useEffect, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:8080" 

const useAxios = () => {
    const [response, setResponse] = useState<AxiosResponse | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const callApi = async(endpoint: string, methodType: string, body?: any, headerObj?:any) => {
        setResponse(null)
        setError(null)
        setIsLoading(true)
        await axios.request({
            method: methodType,
            url: endpoint,
            headers: headerObj,
            data: body
        })
        .then((res: AxiosResponse) => {
            console.log(`Axios response from ${endpoint}: `, res)
            setResponse(res)
        })
        .catch((err: AxiosError) => {
            console.log(`Axios error from ${endpoint}: `, err)
            setError(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return { response, error, isLoading, callApi }
}

export default useAxios; 