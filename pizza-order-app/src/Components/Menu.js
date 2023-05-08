import { useEffect, useCallback } from "react";
import useAuth from "../Hooks/useAuth";
import useStores from "../Hooks/useStores";
import { GetToken, GetStores } from "../Functions/DataFetch";

const Menu = () => {

    const { token, expiry, setToken, setExpiry } = useAuth();
    const { stores, selectedStore, setStores, setSelectedStore } = useStores();

    const loadData = useCallback(async() => {
        let stores;
        if(token === null){
            let tokenRes = await (await GetToken()).json();
            setToken(tokenRes.token);

            stores = await (await GetStores(tokenRes.token)).json();
        }
        else{
            stores = await (await GetStores(token)).json();
        }
        console.log(stores);
        setStores(stores);
        
    }, []);

    useEffect(() => {
        loadData().catch(console.error);
    }, [loadData]);

    return (
        <div className="container">
            <div>
            {
                stores.map(store => (
                    <p>
                        {store.name}
                    </p>
                ))
            }
            </div>
            <h1>
                Menu
            </h1>
            
        </div>
    );
}

export default Menu;