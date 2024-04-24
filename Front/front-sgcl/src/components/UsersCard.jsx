import React, { useState, useEffect } from 'react';
import { apiUrls, usersApi } from "./api/userApi";

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
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await usersApi.put(`${apiUrls.updateUser}${userId}`, userData);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    const deleteUser = async (event) => {
        event.preventDefault();
        try {
            const response = await usersApi.put(`${apiUrls.deleteUser}${userId}`);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
        window.location.reload();
    };

    const [selectedOption, setSelectedOption] = useState(role);

    return (
        <>
            <form className="usrsCard">
                <div>
                    <label htmlFor="Name">Nombre</label>
                    <input type="text" id={'Name' + userId} placeholder="Nombre completo" defaultValue={userName} />
                </div>
                <div>
                    <label htmlFor="Email">Correo</label>
                    <input type="text" id={"Email" + userId} placeholder="Correo" defaultValue={email} />

                </div>
                <div>
                    <label htmlFor="NoEmployee">No. Empleado</label>
                    <input type="text" id={"NoEmployee" + userId} placeholder="Numero de empleado" defaultValue={numberEmployee} />

                </div>
                <div>
                    <label htmlFor="Password">Contraseña</label>
                    <input type="password" id={"Password" + userId} placeholder="Contraseña" defaultValue={password} />

                </div>
                <div>
                    <label>Role</label>
                    <select className='usr-Label' id={"options" + userId} defaultValue={selectedOption} onChange={handleChange}>
                        <option >-Selecciona un role-</option>
                        <option value="Teacher">Docente</option>
                        <option value="Managerial">Administrativo</option>
                    </select>


                </div>
                <div className="usrs-button">
                    <button onClick={update}>
                        Actualizar
                    </button>

                    <button onClick={deleteUser}>
                        Eliminar
                    </button>
                </div>
            </form>
        </>
    )
}

export default UsersCard;