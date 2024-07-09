import React, { useState, useEffect } from 'react';
import { UsersCard } from './UsersCard';
import { AddUserCard } from './AddUserCard'
import { usersApi, apiUrls, security } from "./api/userApi";

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
        usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`;
        usersApi.get(apiUrls.getAllUser)
            .then(respUsers => {
                setUsers(respUsers.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div>
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
