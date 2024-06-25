
    import { useState, useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useProductsData = (page) => {
    const [productsData, setProductsData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://stageapi.monkcommerce.app/task/products/search?search=Hat&page=${page}&limit=1`, API_OPTIONS);
                const data = await response.json();
                setProductsData(data);
            } catch (err) {
                setError(err);
            }
        };
        fetchProducts();
    }, [page]);

    return { productsData, error };
};


export default useProductsData