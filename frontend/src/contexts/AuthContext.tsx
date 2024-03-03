import React, { useState } from 'react'

const AuthContext = React.createContext<ContextType>({
    isAuthenticated: false
});


type ContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAuth() {
    return React.useContext(AuthContext);

}

export const AuthProvider = (props: React.PropsWithChildren<{}>) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const value = {
        isAuthenticated,
        setIsAuthenticated
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}