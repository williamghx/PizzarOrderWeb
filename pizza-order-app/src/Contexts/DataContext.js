import { useState, createContext, useContext } from 'react'

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);


const DataContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [states, setStates] = useState([]);
    const [streetTypes, setStreetTypes] = useState([]);
    const [stores, setStores] = useState([]);
    const [menu, setMenu] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [orders, setOrders] = useState([]);

    const fetchToken = async() => {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Auth`,
            {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        userName: process.env.REACT_APP_CLIENT,
                        password: process.env.REACT_APP_SECRET
                    }
                )
            }
        );
    
        setToken((await res.json()).token);
    };

    const fetchStates = async() => {
        if(token === null){
            await fetchToken();
        }

        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Address/States`,
            {
                method: "GET",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    
        setStates(await res.json());
    };

    const fetchStreetTypes = async() => {
        if(token === null){
            await fetchToken();
        }

        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Address/StreetTypes`,
            {
                method: "GET",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    
        setStreetTypes(await res.json());
    };

    const fetchStores = async() => {
        if(token === null){
            await fetchToken();
        }

        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Stores`,
            {
                method: "GET",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    
        setStores(await res.json());
    };

    const fetchMenu = async(storeId) => {
        if(token === null){
            await fetchToken();
        }

        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Menu?storeid=${storeId}`,
            {
                method: "GET",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        setMenu(await res.json());
    };

    const fetchToppings = async() => {
        if(token === null){
            await fetchToken();
        }

        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Menu/Toppings`,
            {
                method: "GET",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        setToppings(await res.json());
    };

    const addStore = async(store) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Stores`,
            {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(store)
            }
        );
        return res;
    };

    const addMenu = async(menu) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Menu`,
            {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(menu)
            }
        );

        return res;
    };

    const modifyMenu = async(id, menu) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Menu/${id}`,
            {
                method: "PUT",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(menu)
            }
        );
    };

    const value = {
        states, 
        streetTypes, 
        stores, 
        menu, 
        toppings,
        fetchStates,
        fetchStreetTypes,
        fetchStores, 
        fetchMenu,
        fetchToppings,
        addStore 
    };

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    );

    
};

export default DataContextProvider;
