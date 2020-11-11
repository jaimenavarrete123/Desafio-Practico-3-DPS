import React, { useState, useContext} from 'react';

import Swal from 'sweetalert2';

import { db } from './../../firebase';

import { UserContext } from './../../Context/UserContext';

function Dashboard() {

    let { Sucursales, SucursalesSelect } = useContext(UserContext);

    const [currentId, setCurrentId] = useState("");

    const addSucursalSelect = async (id) => {
        if(id !== "") {
            const sucursalObject = Sucursales.filter(sucursal => sucursal.id === id);
            const exists = SucursalesSelect.filter(sucursal => sucursal.id === sucursalObject[0].id);

            if(!exists[0]) {
                await db.collection("Seleccionadas").doc().set(sucursalObject[0])
                .then(() => {
                    Swal.fire('Sucursal seleccionada', 'La sucursal se seleccionó correctamente', 'success')
                })
                .catch(error => {
                    Swal.fire('Error', error.message, 'error')
                });
            }
            else {
                Swal.fire('Error', 'No puede agregar la misma sucursal 2 veces', 'error')
            }
        }
        else {
            Swal.fire('Error', 'Debe seleccionar una sucursal existente', 'error')
        }
    }

    const deleteSucursalSelect = id => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "Se quitará esta sucursal del cálculo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                db.collection("Seleccionadas").doc(id).delete()
                .then(() => {
                    Swal.fire('Sucursal quitada', 'La sucursal se quitó correctamente', 'success')
                })
                .catch(error => {
                    Swal.fire('Error', error.message, 'error')
                });
            }
        })
    };

    return (
        <div className="container">
            <h2 className="p-2 mt-4 mb-4 text-center">Dashboard</h2>
            <div className="row">

                {/* Formulario para agregar sucursales */}

                <div id="formSucursal" className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h4>Agregar sucursal</h4>
                        </div>
                        <div id="sucursal-form-inputs" className="card-body">
                            <div className="form-group" >
                                <select id="nombre" className="form-control" onChange={e => setCurrentId(e.target.value)}>
                                    <option value="">Seleccionar sucursal</option>
                                    {
                                        Sucursales.map(sucursal => (
                                            <option value={sucursal.id} key={sucursal.id}>{sucursal.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <button id="enviar" className="btn btn-primary btn-block" onClick={() => addSucursalSelect(currentId)}>Agregar sucursal</button>
                        </div>
                    </div>
                </div>

                {/* Tabla para visualizar sucursales */}

                <div id="listaRegistros" className="col-md-9">
                    <table id="tablaClientes" className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Ganancias ($)</th>
                                <th scope="col">Empleados</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                SucursalesSelect.map(sucursal => (                                    
                                    <tr key={sucursal.id}>
                                        <td>{sucursal.id}</td>
                                        <td>{sucursal.nombre}</td>
                                        <td>{sucursal.ganancias}</td>
                                        <td>{sucursal.empleados}</td>
                                        <td><button className="btn btn-danger" onClick={() => deleteSucursalSelect(sucursal.idAdd)}>Eliminar</button></td>
                                    </tr>                                    
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;