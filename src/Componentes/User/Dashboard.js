import React, { useState, useContext} from 'react';

import Swal from 'sweetalert2';

import { db } from './../../firebase';

import { UserContext } from './../../Context/UserContext';

function Dashboard() {

    let { Sucursales, SucursalesSelect, setSucursalesSelect } = useContext(UserContext);

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

    const deleteAllSucursaleslSelect = () => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "Se quitarán todas las sucursales del cálculo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                
                // SucursalesSelect.forEach(sucursal => {
                //     db.collection("Seleccionadas").doc(sucursal.id).delete()
                // })

                await db.collection("Seleccionadas").get()
                .then((querySnapshot) => {                    
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                })
                .then(() => {
                    setSucursalesSelect([]);
                    Swal.fire('Sucursales quitadas', 'Las sucursales se quitaron correctamente', 'success')
                })
                .catch(error => {
                    Swal.fire('Error', error.message, 'error')
                });
            }
        })
    };

    return (
        <div className="container">
            <h1 className="p-2 mt-4 mb-4 text-center">DASHBOARD</h1>
            <div className="row mb-5 justify-content-center">

                {/* Formulario para agregar sucursales */}

                <div id="formSucursal" className="col-md-3">
                    <div className="card">
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
            </div>
            <h2 className="p-2 mt-4 mb-4 text-center">Resultados</h2>
            <button className="btn btn-danger mb-3" onClick={() => deleteAllSucursaleslSelect()}>Quitar todas las sucursales</button>
            <div className="row">
                <table id="tablaClientes" className="table text-center table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Ganancias</th>
                            <th scope="col">Empleados</th>
                            <th scope="col">Resultado</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            SucursalesSelect.length === 0 
                            ?
                                <tr className="bg-light text-dark">
                                    <td colSpan="6"><strong>DEBE AGREGAR SUCURSALES PARA EL CÁLCULO</strong></td>
                                </tr>
                            :
                                SucursalesSelect.map(sucursal => (                                    
                                    <tr key={sucursal.id} className={sucursal.ganancias >= 30000 ? "bg-success" : "bg-light text-dark"}>
                                        <td>{sucursal.id}</td>
                                        <td>{sucursal.nombre}</td>
                                        <td><strong>${sucursal.ganancias}</strong></td>
                                        <td>{sucursal.empleados}</td>
                                        <td className="font-weight-bold">
                                            {sucursal.ganancias >= 30000 ? "EXCELENTE TRABAJO" : "BUEN TRABAJO"}
                                        </td>
                                        <td><button className="btn btn-danger" onClick={() => deleteSucursalSelect(sucursal.idAdd)}>Eliminar</button></td>
                                    </tr>                                    
                                ))
                        }
                        {
                            SucursalesSelect.length !== 0 &&
                            <tr>
                                <td colSpan="6" className="font-weight-bold" style={{fontSize: 1.5 + 'em'}}>TOTAL: ${ SucursalesSelect.reduce((total, sucursal) => total + Number(sucursal.ganancias), 0) }</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;