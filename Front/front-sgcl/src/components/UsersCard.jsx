import React, { useState } from 'react';
import { apiUrls, usersApi, security } from "./api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export function UsersCard(props) {
    const { userName, role, password, email, numberEmployee, userId } = props;

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const update = async (event) => {
        event.preventDefault();
        try {

            const userData = {
                userName: document.getElementById("Name" + userId).value,
                email: document.getElementById("Email" + userId).value,
                numberEmployee: document.getElementById("NoEmployee" + userId).value,
                password: document.getElementById("Password" + userId).value,
                role: selectedOption
            };
            let token = localStorage.getItem('token');
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
            const response = await usersApi.put(`${apiUrls.updateUser}${userId}`, userData);
            toast.success("Usuario actualizado")
        } catch (error) {
            toast.error("Error al actualizar usuario")
            console.error('Error al actualizar el usuario:', error);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await usersApi.put(`${apiUrls.deleteUser}${userId}`);
            localStorage.setItem('toastMessageW', 'Usuario eliminado');
            window.location.reload();

        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            toast.error("Error al eliminar usuario")
        }
    };

    const alert = (event)=>{
        event.preventDefault();
        Swal.fire({
            title: '¿Estás seguro que lo quieres eliminar?',
            html: '<span style="font-size: 20px;">Al eliminar el usuario se eliminarán sus solicitudes, horarios, solicitudes de servicios y todos sus datos relacionados.</span>',
            icon: 'warning',
            width: '70%',
            customClass: {
                title: 'custom-title',
                htmlContainer: 'custom-html-container',
                popup: 'custom-popup',
                confirmButton: 'custom-confirm-button',
                denyButton: 'custom-deny-button',
                icon: 'custom-icon'
            },
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteUser();
                }
        })
    }

    const [selectedOption, setSelectedOption] = useState(role);

    return (
        <>
            <ToastContainer/>
            <form className="usrsCard" onSubmit={update}>
                <div>
                    <label htmlFor="Name">Nombre</label>
                    <input type="text" id={'Name' + userId} placeholder="Nombre completo" defaultValue={userName} required maxLength={50}/>
                </div>
                <div>
                    <label htmlFor="Email">Correo</label>
                    <input type="email" id={"Email" + userId} placeholder="Correo" defaultValue={email} required maxLength={50} pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}"/>

                </div>
                <div>
                    <label htmlFor="NoEmployee">No. Empleado</label>
                    <input type="number" id={"NoEmployee" + userId} placeholder="Numero de empleado" defaultValue={numberEmployee} required/>

                </div>
                <div>
                    <label htmlFor="Password">Contraseña</label>
                    <input type="password" id={"Password" + userId} placeholder="Contraseña" defaultValue={password} minLength={8} required maxLength={16}/>

                </div>
                <div>
                    <label>Role</label>
                    <select className='usr-Label' id={"options" + userId} defaultValue={selectedOption} onChange={handleChange} required>
                        <option value="">-Selecciona un role-</option>
                        <option value="Teacher">Docente</option>
                        <option value="Managerial">Administrativo</option>
                    </select>


                </div>
                <div className="usrs-button">
                    <button type='submit'>
                        Actualizar
                    </button>

                    <button onClick={alert}>
                        Eliminar
                    </button>
                </div>
            </form>
        </>
    )
}

export default UsersCard;