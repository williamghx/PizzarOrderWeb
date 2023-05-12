import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDataContext } from '../Contexts/DataContext';
import { Button } from "react-bootstrap";
import NewStore from "./NewStore";
import StoreList from "./StoreList";

const Admin = () => {
    
    const { stores, fetchStores } = useDataContext();

    const [newStoreOpen, setNewStoreOpen] = useState(false);

    useEffect(() => {
        fetchStores().catch(console.error);
    });

    return (
        <div className="container">
            <h2 className="mt-3 mb-5 text-center">Manage Stores</h2>
            <div className="row">
                <StoreList stores={stores} />
                <div className="col-10 col-lg-8 max-auto mb-5">
                    <Button onClick={()=> setNewStoreOpen(true)}>Add New Store</Button>
                </div>
            </div>
            
            <NewStore isActive={newStoreOpen} handleClose={()=> setNewStoreOpen(false)} />

            <Outlet />
        </div>
    );
}

export default Admin;