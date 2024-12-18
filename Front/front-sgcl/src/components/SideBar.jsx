import { useEffect, useState } from 'react';
import {usersApi, apiUrls, security} from './api/userApi'
import './App.css'
import Icon from './Icon';
import { jwtDecode } from 'jwt-decode';


export function Sidebar() {
    const [role, setRole] = useState();
    const [name, setname] = useState();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            const tokenDecod = jwtDecode(token);
            const data = {
                email: tokenDecod.sub,
            };
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;
            usersApi.post(apiUrls.getUserByEmail, data)
                .then(respRole => {
                    setRole(respRole.data.role);
                    setname(respRole.data.userName)
                })
                .catch(error => {
                    console.error('Error fetching role:', error);
                });
        } else {
        }

    }, []);

    const adminMenu = [name,'Home', 'RequestLabResponse', 'Laboratories', 'Users', 'RequestService', 'Semester', 'Maintenance',`Stadistics`,'LogOut'];
    const adminManagerial = [name,'Home','RequestComputer', 'LogOut', ];
    const adminTeacher = [name,'Home',  'RequestLab', 'Notification','RequestComputer', 'RequestTechnology', 'LogOut' ];
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