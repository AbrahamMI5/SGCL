import React, { useState } from 'react';
import { apiUrls, usersApi, security } from './api/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AddUserCard(props) {
    const [selectedOption, setSelectedOption] = useState();



    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const userData = {
                userName: document.getElementById("Name").value,
                email: document.getElementById("Email").value,
                numberEmployee: document.getElementById("NoEmployee").value,
                password: document.getElementById("Password").value,
                role: selectedOption
            };
            let token = localStorage.getItem('token');
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
            const response = await usersApi.post(`${apiUrls.createUser}`, userData);
            localStorage.setItem('toastMessage', 'Usuario agregado');
            window.location.reload();
        } catch (error) {
            toast.error("Error al crear usuario")
            console.error('Error al crear el usuario:', error);
        }

        
    };

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <>
        <ToastContainer/>
        <form className="usrsCard" onSubmit={handleSubmit}>
            
            <div>
                <label htmlFor="Name">Nombre</label>
                <input type="text" id="Name" name="name" placeholder="Nombre completo" required maxLength={50} />
            </div>
            <div>
                <label htmlFor="Email">Correo</label>
                <input type="email" id="Email" name="email" placeholder="Correo" required maxLength={35} pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}"/>
            </div>
            <div>
                <label htmlFor="NoEmployee">No. Empleado</label>
                <input type="number" id="NoEmployee" name="employeeNumber" placeholder="Numero de empleado" required />
            </div>
            <div>
                <label htmlFor="Password">Contraseña</label>
                <input type="password" id="Password" name="password" placeholder="Contraseña" minLength={8} required maxLength={16}/>
            </div>
            <div>
                <label>Role</label>
                <select className="usr-Label" id="options" name="role" onChange={handleChange} required>
                    <option value="">-Selecciona un role-</option>
                    <option value="Teacher">Docente</option>
                    <option value="Managerial">Administrativo</option>
                </select>
            </div>
            <div className="usrs-button">
                <button type="submit">Crear</button>
                <button type="button" onClick={handleCancel}>Cancelar</button>
            </div>
        </form>
        </>
        
    );
}

export default AddUserCard;
