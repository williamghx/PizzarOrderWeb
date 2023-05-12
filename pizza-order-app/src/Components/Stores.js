import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDataContext } from '../Contexts/DataContext';
import StoreList from "./StoreList";

const Stores = () => {
    
    const { stores, fetchStores } = useDataContext();

    useEffect(() => {
        fetchStores().catch(console.error);
    });

    return (
        <div className="container">
            <h2 className="mt-3 mb-5 text-center">Stores</h2>
            <div className="row">
                <StoreList stores={stores} />
            </div>
            <Outlet />
        </div>
    );
}

export default Stores;