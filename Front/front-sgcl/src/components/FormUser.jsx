import React, { useState, useEffect } from 'react';
import { UsersCard } from './UsersCard';
import { AddUserCard } from './AddUserCard'
import { usersApi, apiUrls, security } from "./api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function GridUser() {
    const [users, setUsers] = useState([]);
    const [mostrarComponente, setMostrarComponente] = useState(false);
    const [transicion, setTransicion] = useState(false);

    const handleMostrarComponente = () => {
        setMostrarComponente(true);
        setTimeout(() => {
            setTransicion(true);
        }, 200);
    };

    useEffect(() => {
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        usersApi.get(apiUrls.getAllUser)
            .then(respUsers => {
                setUsers(respUsers.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });

        setTimeout(() => {
            const toastMessage = localStorage.getItem('toastMessage');
            const toastMessageW = localStorage.getItem('toastMessageW');

            console.log(toastMessage)
            if (toastMessage) {
                toast.success(toastMessage)
                localStorage.removeItem('toastMessage');
                console.log('Toast notification displayed');
            }
            if (toastMessageW) {
                toast.warn(toastMessageW)
                localStorage.removeItem('toastMessageW');
                console.log('Toast notification displayed');
            }
        }, 1000);

    }, []);

    return (
        <div>
            <ToastContainer/>
            <div className='ursHeader'>
                <h1>Usuarios</h1>
                <button className='bt adUsr' onClick={handleMostrarComponente}>
                    Agregar usuario
                </button>
            </div>
            {mostrarComponente && (
                <div style={{ transition: 'opacity 0.5s, height 0.5s', opacity: transicion ? 1 : 0, height: transicion ? 'auto' : 0 }}>
                    <AddUserCard />
                </div>
            )}
            {users.map(user => (
                <UsersCard key={user.id} userId={user.id} userName={user.userName} role={user.role} password={user.password} email={user.email} numberEmployee={user.numberEmployee} />
            ))}
            <div style={{ height: '50px' }}></div>
        </div>
    );
}

export default GridUser;
