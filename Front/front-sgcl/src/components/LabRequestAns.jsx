import React, { useState, useEffect } from 'react';
import { RequestLabCard } from "./RequestLabCard"
import { usersApi, apiUrls } from "./api/userApi";


export function LabRequestAns() {

    const [labResp, setLabResp] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        usersApi.get(apiUrls.getAllRequestLab)
            .then(respLabResq => {
                setLabResp(respLabResq.data);
                console.log(labResp)
            })
            .catch(error => {
                console.error('Error fetching RequestLab:', error);
            });
    }, []);

    return (
        <>
            <h1>Solicitudes de laboratorio </h1>
            <div>
            {labResp.map(request => (
                    <RequestLabCard key={request.idRequestLaboratory} startHorary={request.startHorary} endHorary={request.endHorary} day={request.day} idteacher={request.usersIdUsers} idLaboratory={request.laboratoriesIdLaboratories} requiredsoft={request.requiredSoftware} idRequestLab={request.idRequestLaboratory} status={request.status}/>
                ))}
            </div>
            <div style={{ height: '10%' }}></div>

        </>
    )
}