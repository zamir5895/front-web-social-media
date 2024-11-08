import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [isLogged, setIsLogged] = useState(false);    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
        navigate('/login');
    };

    return { isLogged, logout };
};

export default useAuth;