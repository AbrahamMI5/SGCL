import { usersApi, apiUrls } from "./api/userApi";
import { useEffect, useState } from "react";

export function AddLabCard(props) {

    const { labName, idLaboratories } = props;

    const update = async (event) => {
        event.preventDefault();
        try {

            const labData = {
                labName: document.getElementById("labName" + idLaboratories).value,
            };
            let token = localStorage.getItem('token');
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await usersApi.put(`${apiUrls.updateLab}${idLaboratories}`, labData);
            window.location.reload()
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    const deleteLab = async (event) => {
        event.preventDefault();
        try {
            let token = localStorage.getItem('token');
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await usersApi.put(`${apiUrls.deleteLab}${idLaboratories}`);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    return (
        <div className="addLab">
            <div className="addLab-Menu">
                Nombre del laboratorio
            </div>
            <div className="addLab-Input">
                <input type="text" defaultValue={labName} id={"labName" + idLaboratories} />
            </div>
            <div className="addLab-Buttons">
                <button className="bt" onClick={update}>Actualizar</button>
                <button className="bt" onClick={deleteLab}>Eliminar</button>
            </div>
        </div>
    )
}

export default AddLabCard