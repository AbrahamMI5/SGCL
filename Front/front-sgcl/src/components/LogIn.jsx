import './App.css'
import userImg from './img/user.svg'
import { useNavigate } from 'react-router-dom';
import { usersApi, apiUrls } from "./api/userApi";

export function LogIn() {

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            let token = localStorage.getItem('token');
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const userData = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            };

            const response = await usersApi.post(`${apiUrls.login}`, userData);
            localStorage.setItem('token', response.data.token);
            window.location.reload()
            window.location.assign("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="LogIn">
                <img src={userImg} alt="Imagen Usuario" className='LI-Img' />
                <div className='LI-data'>
                    <p className='h4'>Iniciar Sesion</p>
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