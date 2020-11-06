import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { fire } from "./../firebase";
import firebase from "firebase/app";

import Swal from 'sweetalert2';

function Registro() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    // Creacion de cuenta de usuario

    const handleRegister = e => {
        e.preventDefault();

        fire.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            Swal.fire(
                'Cuenta creada',
                'La cuenta se registró correctamente',
                'success'
            )
        })
        .catch(error => {
            Swal.fire(
                'Error',
                error.message,
                'error'
            )
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 mx-auto mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">REGISTRO</h1>
                            <hr className="mb-4" />
                            <div className="text-center">
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Ingrese email" onChange={ e => setEmail(e.target.value) } required />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="password" placeholder="Ingrese password" onChange={ e => setPassword(e.target.value) } required />
                                </div>
                                <button className="btn btn-primary mb-4 col-md-12" onClick={ e => handleRegister(e) }>Registrarse</button>

                                <p>¿Ya tiene una cuenta?</p>
                                <p><Link to="/login" className="mb-3">Inicie sesión aquí</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro;