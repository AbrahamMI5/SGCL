import React, { useState, useEffect } from 'react';
import { NotificationReqLab } from './NotificationReqLab';
import { jwtDecode } from 'jwt-decode';
import { usersApi, apiUrls } from './api/userApi';

export function Notifications() {
    const [userId, setUserId] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    // Obtener ID de usuario
                    const tokenDecod = jwtDecode(token);
                    const data = {
                        email: tokenDecod.sub,
                    };
                    const responseUser = await usersApi.post(apiUrls.getUserByEmail, data);
                    setUserId(responseUser.data.id);

                    // Obtener solicitudes
                    const respReqLab = await usersApi.get(apiUrls.getNotificationByUsrId + responseUser.data.id);
                    setRequests(respReqLab.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>Notificaciones</h1>
            <h2>Solicitudes de laboratorio</h2>
            {requests.map(request => (
                <NotificationReqLab key={request.requestLaboratoryIdRequestLaboratory} msg={request.notifyMenssage} reqLabId={request.requestLaboratoryIdRequestLaboratory} idNotifications={request.idNotifications}/>
            ))}
            <div style={{ height: '10%' }}></div>
        </>
    );
}
