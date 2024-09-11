import { usersApi, apiUrls, security } from "./api/userApi";
import { useEffect, useState } from "react";
import { AddLabCard } from './AddLabCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
                const response = await usersApi.post(`${apiUrls.createLab}`, labData);
                localStorage.setItem('toastMessage', 'Laboratorio creado');
            } else {
                toast.error("Faltan datos")
                throw new SyntaxError("dato incompleto");
            }
            window.location.reload();
        } catch (error) {
            console.error('Error al crear el laboratorio:', error);
            toast.error("Error al crear el laboratorio")
        }


    };

    useEffect(() => {
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
        usersApi.get(apiUrls.getAllLaboratories)
            .then(respLabs => {
                setLabs(respLabs.data);
            })
            .catch(error => {
                console.error('Error fetching laboratories:', error);
            });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const toastMessage = localStorage.getItem('toastMessage');
            const toastMessageW = localStorage.getItem('toastMessageW');

            console.log(toastMessage)
            
            if (toastMessage) {
                toast.success(toastMessage)
                localStorage.removeItem('toastMessage');
                console.log('Toast notification displayed');
            }
            if(toastMessageW){
                toast.warn(toastMessageW)
                localStorage.removeItem('toastMessageW');
                console.log('Toast notification displayed');
            }
        }, 1000);
    },[]);

    

    return (
        <>  
            <ToastContainer />
            <div className='labHeader'>
                <h1>Laboratorios</h1>
                <form className="I-AddLab" onSubmit={handleSubmit}>
                    <div className="I-AddLab-Title">
                        Agregar laboratorios
                    </div>
                    <div>
                        <label>Nombre del laboratorio:</label><br></br>
                        <input type="text" placeholder='Nombre de laboratorio' className="LabName" id="labName" required />
                        <button className="bt-create" type="submit">Crear laboratorio</button>
                    </div>
                </form>
            </div>
            <div className="labBody">
                {labs.map((lab) => {
                    return (
                        <AddLabCard key={lab.idLaboratories} labName={lab.labName} idLaboratories={lab.idLaboratories} />
                    );
                })}

            </div>
            <div style={{height: "50px"}}></div>
        </>
    )
}

export default FormLaboratory;