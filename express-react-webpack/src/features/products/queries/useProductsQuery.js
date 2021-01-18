import {useQuery, QueryCache} from 'react-query';
import axios from "../../../utils/axios-config";
import {PRODUCTS_QUERY_KEYS} from "./queryKeys";

export const useProductsQuery = () => {
    const queryCache = new QueryCache()
    const {data: products, isFetching, refetch} = useQuery(
        PRODUCTS_QUERY_KEYS.PRODUCTS_LIST,
        async () => {
            const {data: productsList} = await axios.get('api/todos')
            return productsList
        },
        {
            enabled: !queryCache.find(PRODUCTS_QUERY_KEYS.PRODUCTS_LIST),
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    )

    const create = async (title, price) => {
        await axios.post('api/todos',
            {
                title,
                price
            }
        )
        await refetch();
    }

    const update = async (id, title, price) => {
        await axios.put(`api/todos/${id}`, {
            title,
            price
        })
        await refetch();
    }

    const deleteProduct = async (id) => {
        await axios.delete(`api/todos/${id}`)
        await refetch();
    }

    const getProduct = async (id) => {
        const {data: product} = await axios.get(`api/todos/${id}`)
        return product
    }

    return {products, isFetching, refetch, create, update, deleteProduct, getProduct};
}