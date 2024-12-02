import { usersApi, apiUrls, security } from "./api/userApi";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export function SemesterCardView(props) {
    const navigate = useNavigate();
    const { labName, idLaboratories, startDate, endDate, isActive } = props;
    const [startHorary, setStartHorary] = useState();
    const [endHorary, setEndHorary] = useState();

    const deleteSem = async () => {
        try {
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
            const response = await usersApi.get(`${apiUrls.deleteSemester}${idLaboratories}`);
            localStorage.setItem('toastMessageW', 'Semestre eliminado');
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el semestre:', error);
        }
    };


    const handleChangeStartDate = (event) => {
        event.preventDefault();
        setStartHorary(event.target.value)
    }

    const handleChangeEndDate = (event) => {
        event.preventDefault();
        setEndHorary(event.target.value)
    }


    const update = async (event) => {
        event.preventDefault();
        try {
            const semData = buildSemester()
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;
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
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;
            const response = await usersApi.post(`${apiUrls.activeSemester}`, semData);
            localStorage.setItem('toastMessage', 'Semestre activado');
            window.location.reload()
        } catch (error) {
            console.error('Error al activar semestre:', error);
        }
    };

    const buildSemester = () => {
        const semData = {
            idSemester: idLaboratories,
            name: document.getElementById("semName" + idLaboratories).value,
            startDate: startHorary ? startHorary : startDate.split('T')[0],
            endDate: endHorary ? endHorary : endDate.split('T')[0],
            isActive: 0
        };
        return semData;
    }

    const alert = (event) => {
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
        <button className="addLabView" onClick={() => navigate('Semester', { state: { labName, idLaboratories } })
          }>
            <ToastContainer />
            <div className="addLab-Input">
                <h3 >{labName}</h3>
            </div>
            <div className="addLab-Input">
                Inicio: 
                {" "+startDate.split('T')[0]}
            </div>
            <div className="addLab-Input" style={{marginBottom: "10px"}}>
                Fin: 
                {" "+endDate.split('T')[0]}
            </div>
        </button>
    )
}

export default SemesterCardView