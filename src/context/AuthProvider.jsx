import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

  useEffect(() => {
        if (auth === false) {
            localStorage.clear();
        } else {
            localStorage.setItem('auth', JSON.stringify(auth));
        }
    }, [auth]);

    const login = (token) => {
        setAuth(true);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        localStorage.clear()
        setAuth(false);
    };
    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;