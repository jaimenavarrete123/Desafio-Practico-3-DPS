import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { fire } from "./../firebase";
import firebase from "firebase/app";

import Swal from 'sweetalert2';

function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    // Autenticacion con email

    const handleLoginWithEmail = e => {
        e.preventDefault();

        fire.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            Swal.fire(
                'Error!',
                error.message,
                'error'
            )
        });
    }

    // Autenticacion con Google

    const handleLoginWithGoogle = e => {
        e.preventDefault();

        const provider = new firebase.auth.GoogleAuthProvider();

        fire.auth().signInWithPopup(provider)
        .catch(error => {
            Swal.fire(
                'Error!',
                error.message,
                'error'
            )
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 mx-auto mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">LOGIN</h1>
                            <hr className="mb-4" />
                            <div className="text-center">
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Ingrese email" onChange={ e => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="password" placeholder="Ingrese password" onChange={ e => setPassword(e.target.value)} required />
                                </div>
                                <button className="btn btn-primary mb-4 col-md-12" onClick={ e => handleLoginWithEmail(e) }>Ingresar</button>

                                <p>O ingrese con:</p>
                                <button className="btn btn-outline-primary mb-3 col-md-6" onClick={ e => handleLoginWithGoogle(e) }><i className="lab la-google-plus-g"></i> Google</button>

                                <p>¿No tiene una cuenta?</p>
                                <p><Link to="/registro" className="mb-3">Regístrese aquí</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;