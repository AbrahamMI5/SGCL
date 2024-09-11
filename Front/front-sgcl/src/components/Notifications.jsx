import React, { useState, useEffect } from 'react';
import { NotificationReqLab } from './NotificationReqLab';
import { jwtDecode } from 'jwt-decode';
import { usersApi, apiUrls, security } from './api/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Notifications() {
    const [userId, setUserId] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
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
                    setTimeout(() => {
                        const toastMessage = localStorage.getItem('toastMessage');
                        const toastMessageW = localStorage.getItem('toastMessageW');

                        console.log(toastMessage)

                        if (toastMessage) {
                            toast.success(toastMessage)
                            localStorage.removeItem('toastMessage');
                        }
                        if (toastMessageW) {
                            toast.warn(toastMessageW)
                            localStorage.removeItem('toastMessageW');
                        }
                    }, 1000);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <ToastContainer />
            <h1>Notificaciones</h1>
            <h2>Solicitudes de laboratorio</h2>
            {requests.map(request => (
                <NotificationReqLab key={request.requestLaboratoryIdRequestLaboratory} msg={request.notifyMenssage} reqLabId={request.requestLaboratoryIdRequestLaboratory} idNotifications={request.idNotifications} />
            ))}
            {requests.length == 0 &&(
                <h3 style={{textAlign: "center"}}>Sin notificaciones</h3>
            )}
            <div style={{ height: '10%' }}></div>
        </>
    );
}
