import { useCallback, useEffect, useState } from "react"

import { api } from "../services/api"
import axios from "axios"

/**
 *
 * @param {string} url
 * @param {"products"|"deals"|"orders"} dataSelector
 */

const cancelToken = axios.CancelToken;
export const useData = (url, dataSelector) => {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [rawResponse, setRawResponse] = useState({})
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecords, setTotalRecords] = useState(0)


    const onNextPage = () => {
        if (rawResponse.hasNext !== false) {
            setPage(page => page + 1);
        }
    }

    const onPreviousPage = () => {
        if (rawResponse.hasPrev !== false && page !== 1) {
            setPage(page => page - 1);
        }
    }

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await api.get(url, { params: { page }, cancelToken: cancelToken.source().token });
            if (dataSelector) {
                setData(data[dataSelector])
            }
            setRawResponse(data)
            setTotalPages(data.result.totalPages)
            setTotalRecords(data.result.total)
        } finally {
            setLoading(false)
        }
    }, [page, url, dataSelector])

    useEffect(() => {
        fetchData()
        return () => {
            cancelToken.source().cancel()
        }
    }, [fetchData])

    /**
     *
     * @param {React.MouseEvent<HTMLAnchorElement>} e
     */
    const onDelete = async (e) => {
        const { id } = e.currentTarget.dataset
        if (!id) return
        const confirm = window.confirm("Are you sure you want to delete it?")
        if (confirm) {
            await api.delete(`${url}/${id}`);
            setData(data => {
                const items = [...data];
                return items.filter(item => item._id !== id)
            })
        }
    }

    return {
        onNextPage,
        onPreviousPage,
        data,
        rawResponse,
        totalPages,
        totalRecords,
        loading,
        onDelete
    }
}