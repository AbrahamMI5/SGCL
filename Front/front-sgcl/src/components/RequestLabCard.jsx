import { useState, useEffect } from "react";
import { usersApi, apiUrls, security } from "./api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export function RequestLabCard(props) {
    const { startHorary, endHorary, day, idteacher, idLaboratory, requiredsoft, idRequestLab, status, deleted } = props;

    const [teachername, setTeacherName] = useState('');
    const [labname, setLabName] = useState('');
    const [statusText, setStatusText] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        if (status === true) {
            setStatusText('Solicitud aprobada');
            setColor('green');
        } else if (status === false) {
            setStatusText('Solicitud rechazada');
            setColor('red');
        }
    }, [status]);

    const dia = (day) => {
        switch (day) {
            case "Lu": return "Lunes";
            case "Ma": return "Martes";
            case "Mi": return "Miércoles";
            case "Ju": return "Jueves";
            case "Vi": return "Viernes";
            default: return day;
        }
    };

    useEffect(() => {
        if (security()) {
            usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`;
        }
        usersApi.get(`${apiUrls.getUserById}${idteacher}`)
            .then(response => {
                setTeacherName(response.data.userName);
            })
            .catch(error => {
                console.error('Error fetching teacher name:', error);
            });
        usersApi.get(`${apiUrls.getLab}${idLaboratory}`)
            .then(responselab => {
                setLabName(responselab.data.labName);
            })
            .catch(error => {
                console.error('Error fetching lab name:', error);
            });
    }, [idteacher, idLaboratory]);

    const freeLab = async () => {
        const laboratoryId = idLaboratory;

        try {
            const horaryResp = await usersApi.get(apiUrls.getLabHorarybyLab + laboratoryId);
            const data = horaryResp.data;
            const dayIndices = {
                "Lu": 0,
                "Ma": 4,
                "Mi": 8,
                "Ju": 12,
                "Vi": 16
            };

            const hourIndices = {
                "12:00:00": 0,
                "14:00:00": 1,
                "16:00:00": 2,
                "18:00:00": 3
            };

            const dayIndex = dayIndices[day];
            const hourIndex = hourIndices[startHorary];

            if (dayIndex !== undefined && hourIndex !== undefined) {
                const dataIndex = dayIndex + hourIndex;

                if (dataIndex < data.length) {
                    return !data[dataIndex].startdate;
                } else {
                    console.error('Índice fuera de rango:', dataIndex);
                    return false;
                }
            } else {
                console.error('Día u hora no válidos:', day, startHorary);
                return false;
            }
        } catch (error) {
            console.error('Error fetching horariesByLab:', error);
            return false;
        }
    };

    const accept = async (event) => {
        event.preventDefault();
        const result = await freeLab();
        if (result) {
            try {
                const updateData = {
                    rRejection: document.getElementById("reyection" + idRequestLab).value,
                    status: 1
                };

                if (security()) {
                    usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`;
                }

                const response = await usersApi.put(`${apiUrls.updateRequestLab}${idRequestLab}`, updateData);
                localStorage.setItem('toastMessage', 'Solicitud aceptada');
                window.location.reload();
            } catch (error) {
                console.error('Error al actualizar la solicitud:', error);
            }
        } else {
            toast.error("Horario no disponible")
        }
    };

    const reject = async (event) => {
        event.preventDefault();
        try {
            const updateData = {
                rRejection: document.getElementById("reyection" + idRequestLab).value,
                status: 0
            };

            let token = localStorage.getItem('token');
            if (security()) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`;
            }

            const response = await usersApi.put(`${apiUrls.updateRequestLab}${idRequestLab}`, updateData);
            localStorage.setItem('toastMessageW', 'Solicitud rechazada');
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar la solicitud:', error);
            toast.error('Error al rechazar la solicitud');
        }
    };

    useEffect(() => {
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
    });

    const alert = (event)=>{
        event.preventDefault();
        Swal.fire({
            title: '¿Estás seguro que lo quieres eliminar?',
            html: '<span style="font-size: 20px;">Al eliminar la solicitud aprobada dejara de aparecer en los horarios y no se podrá reactivar.</span>',
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
                    deleteRequest()
                }
        })
    }

    const deleteRequest=()=>{
        usersApi.post(apiUrls.deleteRequestLabHorary+idRequestLab)
        .then((response)=>{
            if(response){
            localStorage.setItem('toastMessage', 'Eliminado correctamente');
            window.location.reload()
            }else{
            localStorage.setItem('toastMessageW', 'Error al eliminar');
            }
        })
        .catch(error => {
            console.error('Error to delete requestlabhorary:', error);
        });
    }

    return (
        <>
            <ToastContainer />
            <form className="usrsCard">
                <div>
                    <label htmlFor="Name">Nombre del docente</label>
                    <input readOnly type="text" id="Name" name="name" value={teachername} placeholder="Nombre completo" />
                </div>
                <div>
                    <label htmlFor="Email">Laboratorio</label>
                    <input readOnly type="text" id="Email" name="email" value={labname} placeholder="Correo" />
                </div>
                <div>
                    <label htmlFor="NoEmployee">Horario</label>
                    <input readOnly type="text" id="NoEmployee" value={`${dia(day)} ${startHorary} - ${endHorary}`} name="employeeNumber" placeholder="Numero de empleado" />
                </div>
                <div style={{ width: '95%' }}>
                    <label htmlFor="software">Software solicitado</label>
                    <textarea readOnly name="software" id="software" cols="15" rows="2" className="RequestLabTextArea" value={requiredsoft}></textarea>
                </div>
                {status === null && (
                    <>
                        <div style={{ width: '63%' }}>
                            <label htmlFor="reyection">Motivo de rechazo (opcional)</label>
                            <textarea name="reyection" id={`reyection${idRequestLab}`} cols="15" rows="2" className="RequestLabTextArea"></textarea>
                        </div>
                        <div className="usrs-button">
                            <button type="submit" onClick={accept}>Aceptar</button>
                            <button type="button" onClick={reject}>Rechazar</button>
                        </div>
                    </>
                )}

                {deleted ? (
                    <h4 style={{ color: "red" }}>Eliminado</h4>
                ) : status === true ? (
                    <>
                        <div style={{ width: '63%' }}>
                            <label style={{ color }}>{statusText}</label>
                        </div>
                        <div className="usrs-button">
                            <button onClick={alert}>
                                Eliminar
                            </button>
                        </div>
                    </>
                ) : status === false ? (
                    <div style={{ width: '63%' }}>
                        <label style={{ color }}>{statusText}</label>
                    </div>
                ) : null}

            </form>
        </>
    );
}