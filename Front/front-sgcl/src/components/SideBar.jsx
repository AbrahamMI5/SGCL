import { useEffect, useState } from 'react';
import {usersApi, apiUrls} from './api/userApi'
import './App.css'
import Icon from './Icon';
import { jwtDecode } from 'jwt-decode';


export function Sidebar() {
    const [role, setRole] = useState();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            const tokenDecod = jwtDecode(token);
            const data = {
                email: tokenDecod.sub,
            };
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            usersApi.post(`${apiUrls.getRoleByEmail}`, data)
                .then(respRole => {
                    setRole(respRole.data);
                })
                .catch(error => {
                    console.error('Error fetching role:', error);
                });
        } else {
            console.log('Error sin token')
        }

    }, []);

    const adminMenu = ['Home', 'RequestLabResponse', 'Laboratories', 'Users', 'RequestService', 'LogOut'];
    const adminManagerial = ['Home','RequestComputer', 'LogOut', ];
    const adminTeacher = ['Home',  'RequestLab', 'Notification','RequestComputer', 'RequestTechnology', 'LogOut' ];
    const defaultIcon = ['LogInIcon'];

    const typeUser = (role) => {
        if (role == 'Admin') {
            return adminMenu;
        } if (role == 'Teacher') {
            return adminTeacher;
        } if (role == 'Managerial') {
            return adminManagerial
        } else return defaultIcon;
    }

    return (
        <>
            {typeUser(role).map(iconName => (
                <Icon key={iconName} name={iconName} />
            ))}
        </>


    )
}