import React, { useState, useEffect } from 'react';
import { RequestLabCard } from "./RequestLabCard"
import { usersApi, apiUrls } from "./api/userApi";


export function LabRequestAns() {

    const [labResp, setLabResp] = useState([]);
    const [labRespAnswered, setLabRespAnswered] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        usersApi.get(apiUrls.getRequestLabInProcess)
            .then(respLabResq => {
                setLabResp(respLabResq.data);
                console.log(labResp)
            })
            .catch(error => {
                console.error('Error fetching RequestLab:', error);
            });

        usersApi.get(apiUrls.getRequestLabAnswered)
            .then(respLabResq => {
                setLabRespAnswered(respLabResq.data);
                console.log(labResp)
            })
            .catch(error => {
                console.error('Error fetching RequestLab:', error);
            });
    }, []);

    return (
        <>
            <h1>Solicitudes pendientes</h1>
            <div>
                {labResp.map(request => (
                    <RequestLabCard key={request.idRequestLaboratory} startHorary={request.startHorary} endHorary={request.endHorary} day={request.day} idteacher={request.usersIdUsers} idLaboratory={request.laboratoriesIdLaboratories} requiredsoft={request.requiredSoftware} idRequestLab={request.idRequestLaboratory} status={request.status} />
                ))}
            </div>
            <div style={{ height: '10%' }}></div>

            <h1>Solicitudes resueltas</h1>
            <div>
                {labRespAnswered.map(request => (
                    <RequestLabCard key={request.idRequestLaboratory} startHorary={request.startHorary} endHorary={request.endHorary} day={request.day} idteacher={request.usersIdUsers} idLaboratory={request.laboratoriesIdLaboratories} requiredsoft={request.requiredSoftware} idRequestLab={request.idRequestLaboratory} status={request.status} />
                ))}
            </div>
            <div style={{ height: '10%' }}></div>
        </>
    )
}