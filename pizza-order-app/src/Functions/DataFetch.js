const GetToken = async() => {
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

    return res
};

const GetStores = async(token) => {
    
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

    return res;
};

export {GetToken, GetStores};

