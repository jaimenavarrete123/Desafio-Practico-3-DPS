import React, { useState, useContext } from 'react';

import Swal from 'sweetalert2';

import { db } from './../../firebase';

import { UserContext } from './../../Context/UserContext';

function Sucursales() {
    let { Sucursales } = useContext(UserContext);
    const [currentId, setCurrentId] = useState("");

    const [nombre, setNombre] = useState("");
    const [ganancias, setGanancias] = useState("");
    const [empleados, setEmpleados] = useState("");

    const sucursal = { nombre, ganancias, empleados };

    const selectSucursal = id => {
        const findSucursal = Sucursales.filter(sucursal => sucursal.id == id);

        setNombre(findSucursal[0].nombre);
        setGanancias(findSucursal[0].ganancias);
        setEmpleados(findSucursal[0].empleados);

        setCurrentId(id);
    };

    const clearInfo = () => {
        setCurrentId("")

        setNombre("");
        setGanancias("");
        setEmpleados("");
    }

    const deleteSucursal = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "Se eliminará la sucursal seleccionada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                db.collection("Sucursales").doc(id).delete()
                .then(() => {
                    Swal.fire('Sucursal eliminada', 'La sucursal se eliminó correctamente', 'success')
                })
                .catch(error => {
                    Swal.fire('Error', error.message, 'error')
                });
            }
        })
    };

    const addOrEditSucursal = async (sucursalObject) => {
        try {
            if(sucursalObject.nombre !== "" && sucursalObject.ganancias !== "" && sucursalObject.empleados !== "") {
                if(sucursalObject.ganancias >= 1000 && sucursalObject.empleados >= 10) {
                    if (currentId === "") {
                        await db.collection("Sucursales").doc().set(sucursalObject)
                        .then(() => {
                            Swal.fire('Sucursal agregada', 'La sucursal se agregó correctamente', 'success')
                            clearInfo();
                        })
                        .catch(error => {
                            Swal.fire('Error', error.message, 'error')
                        });
                    }
                    else {
                        await db.collection("Sucursales").doc(currentId).update(sucursalObject)
                        .then(() => {
                            Swal.fire('Sucursal modificada', 'La sucursal se modificó correctamente', 'success')
                            clearInfo();
                        })
                        .catch(error => {
                            Swal.fire('Error', error.message, 'error')
                        });
                    }
                }
                else {
                    Swal.fire('Error', 'Debe ingresar ganancias iguales o mayores a $1000 y empleados iguales o mayores a 10', 'error')
                }
            }
            else {
                Swal.fire('Error', 'Debe llenar todos los datos', 'error')
            }
            
        } 
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1 className="p-2 mt-4 mb-4 text-center">SUCURSALES</h1>
            <div className="row">

                {/* Formulario para agregar sucursales */}

                <div id="formSucursal" className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h4>Registrar sucursal</h4>
                        </div>
                        <div id="sucursal-form-inputs" className="card-body">
                            <div className="form-group">
                                <input type="text" id="nombre" className="form-control" placeholder="Nombre de la sucursal" value={nombre} onChange={e => setNombre(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="number" id="ganancia" className="form-control" placeholder="Ganancias de la sucursal" min="1000" max="50000" value={ganancias} onChange={e => setGanancias(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="number" id="empleados" className="form-control" placeholder="Empleados de la sucursal" min="10" max="20" value={empleados} onChange={e => setEmpleados(e.target.value)} />
                            </div>

                            <button id="enviar" className="btn btn-primary btn-block" onClick={() => addOrEditSucursal(sucursal)}>
                                {currentId === "" ? "Agregar sucursal" : "Modificar sucursal"}
                            </button>
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
                                Sucursales.map(sucursal => (                                    
                                    <tr key={sucursal.id}>
                                        <td>{sucursal.id}</td>
                                        <td>{sucursal.nombre}</td>
                                        <td>{sucursal.ganancias}</td>
                                        <td>{sucursal.empleados}</td>
                                        <td>
                                            {
                                                currentId === sucursal.id
                                                ?
                                                    <button className="btn btn-warning mr-1" onClick={() => clearInfo()}>Quitar</button>
                                                :
                                                    <button className="btn btn-primary mr-1" onClick={() => selectSucursal(sucursal.id)}>Editar</button>
                                            }
                                            <button className="btn btn-danger" onClick={() => deleteSucursal(sucursal.id)}>Eliminar</button>
                                        </td>
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

export default Sucursales;