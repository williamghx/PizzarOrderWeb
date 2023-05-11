import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDataContext } from '../Contexts/DataContext';

const Stores = () => {
    
    const { stores, fetchStores } = useDataContext();

    useEffect(() => {
        fetchStores().catch(console.error);
    });

    return (
        <div className="container">
            <h1>
                Stores
            </h1>
            <ul>
            {
                
                stores.map(store => (
                    <li key={store.id}>
                        <Link className="nav-link" to={String(store.id)}>{store.name}</Link>
                    </li>
                ))
            }
            </ul>
            <Outlet />
        </div>
    );
}

export default Stores;