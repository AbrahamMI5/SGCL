import Home from './img/home.svg'
import LogInIcon from './img/login.svg'
import laboratory from './img/laboratory.svg'
import requestLab from './img/requestLab.svg'
import userw from './img/userw.svg'
import requestLabResponse from './img/requestLabResponse.svg'
import logOut from './img/logOut.svg'
import notification from './img/notification.svg'
import rcomputer from './img/rcomputer.svg'
import rtechnology from './img/rtechnology.svg'
import rservice from './img/rservice.svg'
import semester from './img/semester.svg'
import Maintenance from './img/Maintenance.svg'
import stadistics from './img/stadistics.svg'

import { Link, Navigate, useNavigate } from 'react-router-dom';

export function Icon(prop) {

    const navigate = useNavigate();
    const name = prop

    const IconName = (name) => {
        if (name == 'Home') {
            return 'inicio'
        } if (name == 'LogInIcon') {
            return 'Iniciar Sesión'
        } if (name == 'Laboratories') {
            return 'Laboratorios'
        } if (name == 'RequestLab') {
            return 'Solicitudes laboratorios'
        } if (name == 'Users') {
            return 'Usuarios'
        } if (name == 'RequestLabResponse') {
            return 'Solicitudes laboratorios'
        } if (name == 'LogOut') {
            return 'Cerrar Sesión'
        } if (name == 'Notification') {
            return 'Notificaciones'
        } if (name == 'RequestService') {
            return 'Solicitudes de servicio'
        } if (name == 'RequestComputer') {
            return 'Solicitudes de cómputo'
        } if (name == 'RequestTechnology') {
            return 'Solicitudes de tecnología'
        } if ( name == 'Semester'){
            return 'Semestre'
        }if ( name == 'Maintenance'){
            return 'Mantenimiento'
        }if (name == `Stadistics`){
            return `Estadísticas`
        }
         else {
            return null
        }
    }

    const Icons = (name) => {
        if (name == 'Home') {
            return Home
        } if (name == 'LogInIcon') {
            return LogInIcon
        } if (name == 'Laboratories') {
            return laboratory
        } if (name == 'RequestLab') {
            return requestLab
        } if (name == 'Users') {
            return userw
        } if (name == 'RequestLabResponse') {
            return requestLabResponse
        } if (name == 'LogOut') {
            return logOut
        } if (name == 'Notification') {
            return notification
        } if (name == 'RequestService') {
            return rservice
        } if (name == 'RequestComputer') {
            return rcomputer
        } if (name == 'RequestTechnology') {
            return rtechnology
        } if ( name == 'Semester'){
            return semester
        }if ( name == 'Maintenance'){
            return Maintenance
        }if (name == `Stadistics`){
            return stadistics
        }
    }

    const IconRef = (name) => {
        if (name == 'Home') {
            return '/'
        } if (name == 'LogInIcon') {
            return '/LogIn'
        } if (name == 'Laboratories') {
            return '/Laboratories'
        } if (name == 'RequestLab') {
            return '/RequestLaboratory'
        } if (name == 'Users') {
            return '/Users'
        } if (name == 'RequestLabResponse') {
            return '/AnswereRequestLab'
        } if (name == 'Notification') {
            return '/Notifications'
        } if (name == 'RequestService') {
            return '/RequestService'
        } if (name == 'RequestComputer') {
            return '/ComputerService'
        } if (name == 'RequestTechnology') {
            return '/TechnologyService'
        } if ( name == 'Semester'){
            return '/Semester'
        }if ( name == 'Maintenance'){
            return '/Maintenance'
        }if (name == `Stadistics`){
            return '/Stadistics'
        }
    }

    function handleLogoutClick() {
        if (name.name === 'LogOut') {
            localStorage.clear();
            window.location.reload();
            navigate('/')

        }
    }

    return (
        <>
            {IconName(name.name) ?
                <Link to={IconRef(name.name)} onClick={handleLogoutClick}>
                    <div className='M-Button'>
                        <div className="M-Icon">
                            <img src={Icons(name.name)} alt="icon" className='M-Img' />
                        </div>
                        <div className='M-Option'>
                            {IconName(name.name)}
                        </div>
                    </div>
                </Link>
                : <div className='M-Option' style={{ marginBottom: "20px" }}><b>¡Bienvenido!</b> <br />{name.name}</div>}


        </>
    )
}

export default Icon;