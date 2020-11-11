import React, { createContext, useState, useEffect } from 'react';
import { fire, db } from './../firebase';

import Swal from 'sweetalert2';

let UserContext = createContext();
let { Provider, Consumer } = UserContext;

function UserProvider({children}) {
    let [user, setUser] = useState(null);
    let [load, setLoad] = useState(false);

    // Obtener sucursales actuales

    const [Sucursales, setSucursales] = useState([]);
    const [SucursalesSelect, setSucursalesSelect] = useState([]);

    const getSucursales = async () => {
        await db.collection("Sucursales").onSnapshot((querySnapshot) => {
            const docs = [];
            
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            
            setSucursales(docs);
        });
    };

    const getSucursalesSelect = async () => {
        await db.collection("Seleccionadas").onSnapshot((querySnapshot) => {
            const docs = [];
            
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), idAdd: doc.id });
            });
            
            setSucursalesSelect(docs);
            console.log(docs);
        });
    };

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
        getSucursales();
        getSucursalesSelect();
    }, []);

    return (
        <Provider value={{user, setUser, handleLogOut, load, Sucursales, SucursalesSelect}}>
            {children}
        </Provider>
    );
}

export { UserContext, UserProvider };