import {useState} from 'react';

const useAuth = () => {
    const [token, setToken] = useState(null);
    const [expiry, setExpiry] = useState(null);

    return {
        token,
        expiry,
        setToken,
        setExpiry
    };
};

export default useAuth;