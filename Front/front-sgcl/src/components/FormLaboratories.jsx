import { usersApi, apiUrls } from "./api/userApi";
import { useEffect, useState } from "react";

import { AddLabCard } from './AddLabCard'

export function FormLaboratory() {

    const [labs, setLabs] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const labData = {
                labName: document.getElementById("labName").value
            };
            if (labData.labName != null && labData.labName != '') {
                let token = localStorage.getItem('token');
                if (token) {
                    usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
                const response = await usersApi.post(`${apiUrls.createLab}`, labData);
            } else {
                throw new SyntaxError("dato incompleto");
            }
            window.location.reload();
        } catch (error) {
            console.error('Error al crear el laboratorio:', error);
        }


    };

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        usersApi.get(apiUrls.getAllLaboratories)
            .then(respLabs => {
                setLabs(respLabs.data);
            })
            .catch(error => {
                console.error('Error fetching laboratories:', error);
            });
    }, []);

    return (
        <>
            <div className='labHeader'>
                <h1>Laboratorios</h1>
                <div className="I-AddLab">
                    <div className="I-AddLab-Title">
                        Agregar laboratorios
                    </div>
                    <div>
                        <label>Nombre del laboratorio:</label><br></br>
                        <input type="text" placeholder='Nombre de laboratorio' className="LabName" id="labName" required />
                        <button className="bt-create" onClick={handleSubmit}>Crear laboratorio</button>
                    </div>
                </div>
            </div>
            <div className="labBody">
                {labs.map((lab) => {
                    return (
                        <AddLabCard key={lab.idLaboratories} labName={lab.labName} idLaboratories={lab.idLaboratories} />
                    );
                })}


            </div>
        </>
    )
}

export default FormLaboratory;