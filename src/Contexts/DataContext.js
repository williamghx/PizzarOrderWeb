import { useState, createContext, useContext } from 'react'

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);


const DataContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loginError, setLoginError] = useState("");
    const [token, setToken] = useState(null);
    const [states, setStates] = useState([]);
    const [streetTypes, setStreetTypes] = useState([]);
    const [stores, setStores] = useState([]);
    const [menu, setMenu] = useState([]);
    const [availablePizzas, setAvailablePizzas] = useState([]);
    const [toppings, setToppings] = useState([]);

    const login = async(userName, password) => {

        const tokenRes = await fetch(
            `${process.env.REACT_APP_API_URL}Auth`,
            {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        userName: userName,
                        password: password
                    }
                )
            }
        );

        if(tokenRes.status === 401)
        {
            console.log(tokenRes.status);
            setLoginError("Incorrect user name or password");
        }
        else{
            const jwt = (await tokenRes.json()).token;
            setToken(jwt);
            const userRes = await fetch(
                `${process.env.REACT_APP_API_URL}Auth`,
                {
                    method: "GET",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwt}`
                    }
                }
            );
            console.log(token);
            const loginUser = await userRes.json();
            console.log(`user: ${loginUser.user}, role: ${loginUser.role}`);
            if(!loginUser.role){
                setLoginError("The logged-in user is unauthorised");
            }
            else{
                setUser(loginUser);
                setLoginError(null);
            }  
        }
        
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

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

    const fetchAvailablePizzas = async(storeId) => {
        if(token === null){
            await fetchToken();
        }

        const res = await fetch(
            `${process.env.REACT_APP_API_URL}Menu/AvailablePizzas/${storeId}`,
            {
                method: "GET",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        setAvailablePizzas(await res.json());
    }

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
        user,
        loginError,
        states, 
        streetTypes, 
        stores, 
        menu, 
        availablePizzas,
        toppings,
        login,
        logout,
        fetchStates,
        fetchStreetTypes,
        fetchStores, 
        fetchMenu,
        fetchAvailablePizzas,
        fetchToppings,
        addStore,
        addMenu,
        modifyMenu 
    };

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    );

    
};

export default DataContextProvider;
