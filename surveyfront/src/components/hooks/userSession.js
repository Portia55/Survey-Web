/*
Author: Portia Maile
Date: June 5, 2023

This component stores the logged in user session
*/

import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";


const useUserSession = () => {
    // null - the user is not logged in
    const [user, setUser] = useState(null); 

    // determines if the user state has been loaded or not 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //cancel subscription to avoid memory leaks
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            //
            setUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return {user, isLoading};
}

export default useUserSession;