import Home from './img/home.svg'
import LogInIcon from './img/login.svg'
import laboratory from './img/laboratory.svg'
import requestLab from './img/requestLab.svg'
import userw from './img/userw.svg'
import requestLabResponse from './img/requestLabResponse.svg'
import logOut from './img/logOut.svg'
import notification from './img/notification.svg'

import { Link, Navigate, useNavigate } from 'react-router-dom';

export function Icon(prop) {

    const navigate = useNavigate();
    const name = prop

    const IconName = (name) => {
        if (name == 'Home') {
            return 'inicio'
        }if (name == 'LogInIcon') {
            return 'Iniciar Sesión'
        }if(name == 'Laboratories'){
            return 'Laboratorios'
        }if (name == 'RequestLab'){
            return 'Solicitudes laboratorios'
        }if (name == 'Users'){
            return 'Usuarios'
        }if(name == 'RequestLabResponse'){
            return 'Solicitudes laboratorios'
        }if (name == 'LogOut'){
            return 'Cerrar Sesión'
        }if (name == 'Notification'){
            return 'Notificaciones'
        }
    }

    const Icons = (name) => {
        if (name == 'Home') {
            return Home
        }if (name == 'LogInIcon') {
            return LogInIcon
        }if(name == 'Laboratories'){
            return laboratory
        }if (name == 'RequestLab'){
            return requestLab
        }if (name == 'Users'){
            return userw
        }if(name == 'RequestLabResponse'){
            return requestLabResponse
        }if (name == 'LogOut'){
            return logOut
        }if (name == 'Notification'){
            return notification
        }
    }

    const IconRef = (name) =>{
        if (name == 'Home') {
            return '/'
        }if (name == 'LogInIcon') {
            return '/LogIn'
        }if (name == 'Laboratories') {
            return '/Laboratories'
        }if (name == 'RequestLab'){
            return '/RequestLaboratory'
        }if (name == 'Users'){
            return '/Users'
        }if(name == 'RequestLabResponse'){
            return '/AnswereRequestLab'
        }if (name == 'Notification'){
            return '/Notifications'
        }
    }

    function handleLogoutClick() {
        console.log("Log Out")
        if (name.name === 'LogOut') {
            console.log(name)

          localStorage.clear();
          window.location.reload();
          navigate('/')
          
        }
      }

    return (
        <>
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

        </>
    )
}

export default Icon;