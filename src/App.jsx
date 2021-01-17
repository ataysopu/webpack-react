import React from 'react';
import axios from "axios";

export const App = () => {
    let [products, setProducts] = React.useState([])
    React.useEffect(() => {
        let fetchData = async () => {
            let result = await axios.get(
                'api/todos',
            );
            setProducts(result.data)
        };
        console.log('aaa')
        fetchData();
    }, [])

    let renderProds = products?.map(item => <div>{item.name}</div>)

    return (
        <div>
            {renderProds}
        </div>
    );
};