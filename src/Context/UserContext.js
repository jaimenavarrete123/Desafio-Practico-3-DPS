import React, { createContext, useState, useEffect } from 'react';
import { fire } from './../firebase';

import Swal from 'sweetalert2';

let UserContext = createContext();
let { Provider, Consumer } = UserContext;

function UserProvider({children}) {
    let [user, setUser] = useState(null);
    let [load, setLoad] = useState(false);

    // Cerrar sesion
    const handleLogOut = () => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "Se cerrará la sesión actual",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                fire.auth().signOut();
            }
          })
    }

    const getUser = () => {
        setLoad(false);

        fire.auth().onAuthStateChanged(userAuth => {
            if(userAuth) {
                setUser(userAuth);
            }
            else {
                setUser(null);
            }

            setLoad(true);
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Provider value={{user, setUser, handleLogOut, load}}>
            {children}
        </Provider>
    );
}

export { UserContext, UserProvider };