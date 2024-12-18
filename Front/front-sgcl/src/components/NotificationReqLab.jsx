import React, { useEffect, useState } from "react";
import { usersApi, apiUrls, security } from "./api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NotificationReqLab(props) {
    const { msg, reqLabId, idNotifications } = props;
    const [request, setRequest] = useState('');
    const [labName, setLabName] = useState('')

    const dia = (day) => {
        if (day == "Lu") {
            return "Lunes"
        } if (day == "Ma") {
            return "Martes"
        } if (day == "Mi") {
            return "Miercoles"
        } if (day == "Ju") {
            return "Juves"
        } if (day == "Vi") {
            return "Viernes"
        }
    }

    const deleteNotification = async (event) => {

        event.preventDefault();
        try {
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
            const response = await usersApi.get(`${apiUrls.deleteNotification}${idNotifications}`);
            window.location.reload();
            localStorage.setItem('toastMessageW', 'Notificacion eliminada');
        } catch (error) {
            toast.error("Error al eliminar la notificacion")
            console.error('Error al eliminar la notificacion:', error);
        }

    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
        usersApi.get(apiUrls.getRequestLab + reqLabId)
            .then(response => {
                setRequest(response.data); 
                usersApi.get(`${apiUrls.getLab}${response.data.laboratoriesIdLaboratories}`)
                    .then(responselab => {
                        setLabName(responselab.data.labName);
                    })
                    .catch(error => {
                        console.error('Error fetching lab name:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching laboratory name:', error);
            });


    }, [reqLabId])

    return (
        <>
            <ToastContainer/>
            <form className="usrsCard">
                <button className="N-LabReqBt" onClick={deleteNotification}>X</button>
                <div style={{ width: '100%' }}>
                    {msg.includes("rechazada") ? <p style={{color: "red"}}>{msg}</p> : <p style={{color: "green"}}>{msg}</p>}
                    
                </div>

                <div>
                    <label htmlFor="Name">Laboratorio</label>
                    <input readOnly type="text" id='Name' value={labName} placeholder="Laboratorio" />
                </div>
                <div>
                    <label htmlFor="Email">Horario</label>
                    <input readOnly type="text" id={"Email"} value={dia(request.day) + " " + request.startHorary + "-" + request.endHorary} placeholder="Fecha" />
                </div>
                <div>
                    <label htmlFor="NoEmployee">Materia</label>
                    <input readOnly type="text" id="NoEmployee" placeholder="Materia" value={request.subject || ''} />
                </div>
            </form>
        </>
    )
}

