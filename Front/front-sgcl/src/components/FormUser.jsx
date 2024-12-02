import React, { useState, useEffect } from 'react';
import { UsersCard } from './UsersCard';
import { AddUserCard } from './AddUserCard';
import { usersApi, apiUrls, security } from "./api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function GridUser() {
    const [users, setUsers] = useState([]);
    const [mostrarComponente, setMostrarComponente] = useState(false);
    const [mostrarComponenteAutorizador, setMostrarComponenteAutorizador] = useState(false);
    const [transicion, setTransicion] = useState(false);
    const [authorizers, setAuthorizers] = useState("");

    const handleMostrarComponente = () => {
        setMostrarComponente(!mostrarComponente);
        setTimeout(() => {
            setTransicion(true);
        }, 200);
    };

    const handleMostrarComponenteAutorizador = () => {
        setMostrarComponenteAutorizador(!mostrarComponenteAutorizador);
        setTimeout(() => {
            setTransicion(true);
        }, 200);
    };

    const createAuthorizer = (event) => {
        event.preventDefault();
        const autherizerDirector = {
            idAuthorizers: 1,
            name: document.getElementById("NameDirec").value,
            email: document.getElementById("EmailDirec").value,
            area: document.getElementById("AreaDirec").value,
            position: "Director"
        }
        const autherizerCoord = {
            idAuthorizers: 2,
            name: document.getElementById("NameCoord").value,
            email: document.getElementById("EmailCoord").value,
            area: document.getElementById("AreaCoord").value,
            position: "Coordinador"
        }
        const autherizerSec = {
            idAuthorizers: 3,
            name: document.getElementById("NameSec").value,
            email: document.getElementById("EmailSec").value,
            area: document.getElementById("AreaSec").value,
            position: "Secretario facultad"
        }
        const autherizerLab = {
            idAuthorizers: 4,
            name: document.getElementById("NameEnc").value,
            email: document.getElementById("EmailEnc").value,
            area: document.getElementById("AreaEnc").value,
            position: "Encargado de los laboratorios"
        }
        usersApi.post(apiUrls.updateAuthorizers, autherizerDirector)
            .then(
                usersApi.post(apiUrls.updateAuthorizers, autherizerCoord)
                    .then(
                        usersApi.post(apiUrls.updateAuthorizers, autherizerSec)
                            .then(
                                usersApi.post(apiUrls.updateAuthorizers, autherizerLab)
                                    .then(() => {
                                        localStorage.setItem('toastMessage', 'Autorizadores actualizados');
                                        window.location.reload()
                                    }

                                    )
                                    .catch(error => {
                                        console.error('Error fetching authorizer encargado:', error);
                                        toast.error("Error al actualizar")

                                    })
                            )
                            .catch(error => {
                                console.error('Error fetching authorizer secretario:', error);
                                toast.error("Error al actualizar")
                            })
                    )
                    .catch(error => {
                        console.error('Error fetching authorizer coordinador:', error);
                        toast.error("Error al actualizar")
                    })
            )
            .catch(error => {
                console.error('Error fetching authorizer director:', error);
                toast.error("Error al actualizar")
            })
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        usersApi.get(apiUrls.getAllUser)
            .then(respUsers => {
                setUsers(respUsers.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
        usersApi.get(apiUrls.getAllAuthorizers)
            .then(respAuth => {
                setAuthorizers(respAuth.data)
                console.log(respAuth.data)
            })
            .catch(error => {
                console.error('Error fetching authorizers:', error);
            })
        setTimeout(() => {
            const toastMessage = localStorage.getItem('toastMessage');
            const toastMessageW = localStorage.getItem('toastMessageW');

            if (toastMessage) {
                toast.success(toastMessage)
                localStorage.removeItem('toastMessage');
            }
            if (toastMessageW) {
                toast.warn(toastMessageW)
                localStorage.removeItem('toastMessageW');
            }
        }, 1000);

    }, []);

    return (
        <div>
            <ToastContainer />
            <div style={{ textAlign: "right" }}>
                <button className='bt adUsr' onClick={handleMostrarComponente}>
                    Agregar usuario
                </button>
            </div>
            <div style={{ textAlign: "right", marginTop: "10px" }}>
                <button className='bt adAuth' onClick={handleMostrarComponenteAutorizador}>
                    Gestionar Autorizadores
                </button>
            </div>
            {mostrarComponenteAutorizador && (
                <div style={{ transition: 'opacity 0.5s, height 0.5s', opacity: transicion ? 1 : 0, height: transicion ? 'auto' : 0 }}>
                    <h1>Autorizadores</h1>
                    <div style={{ transition: 'opacity 0.5s, height 0.5s', opacity: transicion ? 1 : 0, height: transicion ? 'auto' : 0 }}>

                        <form className="usrsCard" onSubmit={createAuthorizer}>
                            <div>
                                <label htmlFor="NameDirec">Director</label>
                                <input defaultValue={authorizers[0].name} type="text" id="NameDirec" name="NameDirec" placeholder="Nombre completo" required maxLength={50} />
                            </div>
                            <div>
                                <label htmlFor="EmailDirec">Correo</label>
                                <input defaultValue={authorizers[0].email} type="email" id="EmailDirec" name="EmailDirec" placeholder="Correo" required maxLength={35} pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" />
                            </div>
                            <div>
                                <label htmlFor="NoEmployeeDirec">Área</label>
                                <input defaultValue={authorizers[0].area} type="text" id="AreaDirec" name="AreaDirec" placeholder="Area" required />
                            </div>
                            <div>
                                <label htmlFor="NameCoord">Coordinador</label>
                                <input defaultValue={authorizers[1].name} type="text" id="NameCoord" name="NameCoord" placeholder="Nombre completo" required maxLength={50} />
                            </div>
                            <div>
                                <label htmlFor="EmailCoord">Correo</label>
                                <input defaultValue={authorizers[1].email} type="email" id="EmailCoord" name="EmailCoord" placeholder="Correo" required maxLength={35} pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" />
                            </div>
                            <div>
                                <label htmlFor="NoEmployeeCoord">Área</label>
                                <input defaultValue={authorizers[1].area} type="text" id="AreaCoord" name="AreaCoord" placeholder="Area" required />
                            </div>
                            <div>
                                <label htmlFor="NameSec">Secretario de facultad</label>
                                <input defaultValue={authorizers[2].name} type="text" id="NameSec" name="NameSec" placeholder="Nombre completo" required maxLength={50} />
                            </div>
                            <div>
                                <label htmlFor="EmailSec">Correo</label>
                                <input defaultValue={authorizers[2].email} type="email" id="EmailSec" name="EmailSec" placeholder="Correo" required maxLength={35} pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" />
                            </div>
                            <div>
                                <label htmlFor="NoEmployeSec">Área</label>
                                <input defaultValue={authorizers[2].area} type="text" id="AreaSec" name="AreaSec" placeholder="Area" required />
                            </div>
                            <div>
                                <label htmlFor="NameEnc">Encargado de laboratorios</label>
                                <input defaultValue={authorizers[3].name} type="text" id="NameEnc" name="NameEnc" placeholder="Nombre completo" required maxLength={50} />
                            </div>
                            <div>
                                <label htmlFor="EmailEnc">Correo</label>
                                <input defaultValue={authorizers[3].email} type="email" id="EmailEnc" name="EmailEnc" placeholder="Correo" required maxLength={35} pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" />
                            </div>
                            <div>
                                <label htmlFor="AreaEnc">Área</label>
                                <input defaultValue={authorizers[3].area} type="text" id="AreaEnc" name="AreaEnc" placeholder="Área" required />
                            </div>
                            <div className="usrs-button">
                                <button type="submit">Actualizar</button>
                                <button type="button" onClick={() => setMostrarComponenteAutorizador(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {mostrarComponente && (
                <>
                    <h1>Agregar usuarios</h1>
                    <div style={{ transition: 'opacity 0.5s, height 0.5s', opacity: transicion ? 1 : 0, height: transicion ? 'auto' : 0 }}>
                        <AddUserCard />
                    </div>
                </>
            )}
            <h1>Usuarios</h1>
            {users.map(user => (
                <UsersCard key={user.id} userId={user.id} userName={user.userName} role={user.role} password={user.password} email={user.email} numberEmployee={user.numberEmployee} />
            ))}
            <div style={{ height: '50px' }}></div>
        </div>
    );
}

export default GridUser;
