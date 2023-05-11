import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDataContext } from '../Contexts/DataContext';

const Admin = () => {
    
    const { stores, fetchStores } = useDataContext();

    useEffect(() => {
        fetchStores().catch(console.error);
    });

    return (
        <div className="container">
            <h1>
                Manage Stores
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
            <button>Add New Store</button>
            {/* <Outlet /> */}
        </div>
    );
}

export default Admin;