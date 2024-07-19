import './App.css'
import userImg from './img/user.svg'
import { useNavigate } from 'react-router-dom';
import { usersApi, apiUrls, security } from "./api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function LogIn() {

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            let token = localStorage.getItem('token');
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
            const userData = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            };

            const response = await usersApi.post(`${apiUrls.login}`, userData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('toastMessage', 'Inicio de sesión exitoso');
            window.location.assign("/")
            
        } catch (error) {
            console.log(error)
            toast.error('Error al iniciar sesión');

        }
    }

    return (
        <>
            <div className="LogIn">
                <img src={userImg} alt="Imagen Usuario" className='LI-Img' />
                <div className='LI-data'>
                    <p className='h4'>Iniciar Sesión</p>
                    <ToastContainer />
                    <form>
                        <div>
                            <label className='LI-Input' htmlFor="Email">Usuario</label>
                            <input type="email" id="email" aria-describedby="emailHelp" placeholder="Correo" />
                        </div>
                        <div>
                            <label className='LI-Input' htmlFor="Password">Contraseña</label>
                            <input type="password" id="password" placeholder="Contraseña" />
                        </div>
                        <div className='LI-Buttons'>
                            <button type="button" className='bt' onClick={logIn}>
                                Enviar
                            </button>
                            <button type="button" className='bt btn-cancel' onClick={() => navigate('/')}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}