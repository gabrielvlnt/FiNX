import { useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider2';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('https://faltaaapi.com.br', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => res.json())
            .then(data => {
                if (data.valid) {
                    setUser(data.user);
                } else {
                    localStorage.removeItem('token')
                }
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem('token')
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }

    return(
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};