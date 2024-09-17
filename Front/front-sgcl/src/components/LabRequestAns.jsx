import React, { useState, useEffect } from 'react';
import { RequestLabCard } from "./RequestLabCard"
import { usersApi, apiUrls, security } from "./api/userApi";


export function LabRequestAns() {

    const [labResp, setLabResp] = useState([]);
    const [labRespAnswered, setLabRespAnswered] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        usersApi.get(apiUrls.getRequestLabInProcess)
            .then(respLabResq => {
                setLabResp(respLabResq.data);
            })
            .catch(error => {
                console.error('Error fetching RequestLab:', error);
            });

        usersApi.get(apiUrls.getRequestLabAnswered)
            .then(respLabResq => {
                setLabRespAnswered(respLabResq.data);
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
                {labResp.length == 0 && (
                    <h3 style={{ textAlign: "center" }}>Sin solicitudes pendientes</h3>
                )}
            </div>
            <div style={{ height: '10%' }}></div>

            <h1>Solicitudes resueltas</h1>
            <div>
                {labRespAnswered.map(request => (
                    <RequestLabCard key={request.idRequestLaboratory} startHorary={request.startHorary} endHorary={request.endHorary} day={request.day} idteacher={request.usersIdUsers} idLaboratory={request.laboratoriesIdLaboratories} requiredsoft={request.requiredSoftware} idRequestLab={request.idRequestLaboratory} status={request.status} />
                ))}
                {labRespAnswered.length == 0 &&(
                    <h3 style={{textAlign: "center"}}>Sin solicitudes resueltas</h3>
                )}
            </div>
            <div style={{ height: '10%' }}></div>
        </>
    )
}