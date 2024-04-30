import React, { useEffect, useState } from "react";
import { usersApi, apiUrls } from "./api/userApi";

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
            let token = localStorage.getItem('token');
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await usersApi.get(`${apiUrls.deleteNotification}${idNotifications}`);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }

    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        console.log(reqLabId)
        if (token) {
            usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        usersApi.get(apiUrls.getRequestLab + reqLabId)
            .then(response => {
                console.log(response.data); // Aquí puedes ver la respuesta del servidor
                setRequest(response.data); // Asumiendo que la respuesta del servidor contiene el nombre del docente

                usersApi.get(`${apiUrls.getLab}${response.data.laboratoriesIdLaboratories}`)
                    .then(responselab => {
                        console.log(responselab.data); // Aquí puedes ver la respuesta del servidor
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
            <form className="usrsCard">
                <button className="N-LabReqBt" onClick={deleteNotification}>X</button>
                <div style={{ width: '100%' }}>
                    <p>
                        {msg}
                    </p>
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

