import {useState} from 'react';

const useStores = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    return {
        stores,
        selectedStore,
        setStores,
        setSelectedStore
    };
};

export default useStores;