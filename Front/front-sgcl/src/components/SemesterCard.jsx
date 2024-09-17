import { usersApi, apiUrls, security } from "./api/userApi";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useState } from "react";

export function SemesterCard(props) {

    const { labName, idLaboratories, startDate, endDate, isActive } = props;

    const [startHorary, setStartHorary] = useState();
    const [endHorary, setEndHorary] = useState();

    const deleteSem = async () => {
        try {
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
            const response = await usersApi.get(`${apiUrls.deleteSemester}${idLaboratories}`);
            localStorage.setItem('toastMessageW', 'Semestre eliminado');
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el semestre:', error);
        }
    };


    const handleChangeStartDate = (event)=>{
        event.preventDefault();
        setStartHorary(event.target.value)
    }

    const handleChangeEndDate = (event)=>{
        event.preventDefault();
        setEndHorary(event.target.value)
    }


    const update = async (event) => {
        event.preventDefault();
        try {
            const semData = buildSemester()
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;
            const response = await usersApi.post(`${apiUrls.updateSemester}`, semData);
            localStorage.setItem('toastMessage', 'Actualizado correctamente');
            window.location.reload()
        } catch (error) {
            console.error('Error al actualizar el semestre:', error);
        }
    };

    const active = async (event) => {
        event.preventDefault();
        try {
            const semData = buildSemester()
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;
            const response = await usersApi.post(`${apiUrls.activeSemester}`, semData);
            localStorage.setItem('toastMessage', 'Semestre activado');
            window.location.reload()
        } catch (error) {
            console.error('Error al activar semestre:', error);
        }
    };

    const buildSemester=()=>{
        const semData = {
            idSemester: idLaboratories,
            name: document.getElementById("semName"+idLaboratories).value,
            startDate: startHorary ? startHorary : startDate.split('T')[0],
            endDate: endHorary ? endHorary : endDate.split('T')[0],
            isActive: 0
        };
        return semData;
    }

    const alert = (event)=>{
        event.preventDefault();
        Swal.fire({
            title: '¿Estás seguro que lo quieres eliminar?',
            html: '<span style="font-size: 20px;">Al eliminar el semestre se eliminarán sus horarios, solicitudes de laboratorios, estadísticas y todos sus datos relacionados.</span>',
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
                    deleteSem();
                }
        })
    }

    return (
        <div className="addLab" style={isActive == 1 ? {borderStyle: "solid", borderColor: "green"} : null}>
            <ToastContainer />
            <div className="addLab-Menu">
                Nombre del semestre
            </div>
            <div className="addLab-Input">
                <input type="text" defaultValue={labName} id={"semName" + idLaboratories} />
            </div>
            <div className="addLab-Menu" style={{marginTop: "3px"}}>
                Fecha de inicio
            </div>
            <div className="addLab-Input">
                <input defaultValue={startDate.split('T')[0]} type="date" id="startDate" required onChange={handleChangeStartDate}/>
            </div>
            <div className="addLab-Menu" style={{marginTop: "3px"}}>
                Fecha de cierre
            </div>
            <div className="addLab-Input">
                <input defaultValue={endDate.split('T')[0]} type="date" id="endDate" required onChange={handleChangeEndDate}/>
            </div>
            <div className="addLab-Buttons">
                <button className="bt" onClick={update}>Actualizar</button>
                <button className="bt" onClick={alert}>Eliminar</button>
            </div>
            <div style={{marginTop: "-15px", textAlign: "center"}}>
                <button className="bt" style={{width: "90%"}} onClick={active}>Activar</button>

            </div>
        </div>
    )
}

export default SemesterCard