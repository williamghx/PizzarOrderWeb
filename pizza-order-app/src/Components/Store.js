import { useParams } from 'react-router-dom'
import { useDataContext } from '../Contexts/DataContext'
import Menu from './Menu';

const Store = () => {
    const { storeId } = useParams();
    const { stores } = useDataContext();
    
    const store = stores.find(s => s.id === Number(storeId));

    const address = `${store.location.streetNo} ${store.location.streetName} ${store.location.streetType}, ${store.location.suburb}, ${store.location.state} ${store.location.postcode}`;

    return (
        <>
            <h2>{store.name}</h2>
            <p>{address}</p>
            <p>{store.phone}</p>
            <Menu storeId = {Number(storeId)}></Menu>
        </>
    );
};

export default Store;