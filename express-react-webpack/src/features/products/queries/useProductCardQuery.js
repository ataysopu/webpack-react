import {useQuery, QueryCache, useMutation} from 'react-query';
import axios from "../../../utils/axios-config";
import {PRODUCTS_QUERY_KEYS} from "./queryKeys";


export const useProductCardQuery = (id) => {
    const queryCache = new QueryCache()
    const {data: readProduct, isFetching, refetch} = useQuery(
        PRODUCTS_QUERY_KEYS.PRODUCT_READ,
        async () => {
            const {data: product} = await axios.get(`api/todos/${id}`)
            return product
        },
        {
            enabled: !queryCache.find(PRODUCTS_QUERY_KEYS.PRODUCT_READ),
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    )

    const [mutate] = useMutation(async (id) => {
        const {data: product} = await axios.get(`api/todos/${id}`)
        return product
    }, {
        onSuccess: (data) => {
            queryCache.setQueryData(PRODUCTS_QUERY_KEYS.PRODUCT_READ, data)
        }
    })

    return {readProduct, isFetching, refetch, mutate};
}