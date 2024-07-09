import { useEffect, useState } from "react";
import { usersApi, apiUrls, security } from "./api/userApi";

export function RequestLaboratoryCard(props) {
    const { labId, subject, day, startHorary, endHorary } = props;
    const [labName, setLabName] = useState('');

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

    useEffect(() => {
        let token = localStorage.getItem('token');
        usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`;
        console.log("lab id")
        console.log(labId)
        usersApi.get(apiUrls.getLab + labId)
            .then(response => {
                console.log(response.data); // Aquí puedes ver la respuesta del servidor
                setLabName(response.data.labName); // Asumiendo que la respuesta del servidor contiene el nombre del docente
            })
            .catch(error => {
                console.error('Error fetching laboratory name:', error);
            });
    }, [])

    return (
        <div className="AddRequest" style={{ marginBottom: '5%' }}>
            <div className="RequestLabInput" >
                <div className="RequestLabMid" style={{ marginBottom: '3%' }}>
                    <label htmlFor="laboratory">Laboratorio</label>
                    <input readOnly name="laboratory" id="startHorary" value={labName} className="RequestLabInput-S" />
                </div>
                <div className="RequestLabMid" style={{ marginBottom: '3%' }}>
                    <label htmlFor="laboratory">Fecha</label>
                    <input readOnly name="date" value={dia(day) + " " + startHorary + "-" + endHorary} id="startHorary" className="RequestLabInput-S" />
                </div>
                <div className="RequestLabMid" style={{ marginBottom: '3%' }}>
                    <label htmlFor="laboratory">Materia</label>
                    <input readOnly name="subject" value={subject} id="startHorary" className="RequestLabInput-S" />
                </div>
            </div>
        </div>
    )
}

export default RequestLaboratoryCard;