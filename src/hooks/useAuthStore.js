import { useDispatch, useSelector } from "react-redux";
import { createErrorMessage, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        try {
            const data = { email, password }
            dispatch(onLogin(data))
            const jsonData = await JSON.stringify(data)
            localStorage.setItem('user', jsonData)
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(createErrorMessage())
            }, 10);
        }
    }

    const startRegister = async ({ name, surname, email, password }) => {
        try {
            const data = { name, surname, email, password }
            dispatch(onLogin(data))
            const jsonData = await JSON.stringify(data)
            localStorage.setItem('user', jsonData)
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(crearErrorMessage())
            }, 10);
        }
    }

    const checkData = async () => {
        try {
            const data = localStorage.getItem('user')
            const jsonData = await JSON.parse(data)
            //console.log(jsonData);
            if (jsonData !== null) {
                dispatch(onLogin(jsonData))
            }
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(crearErrorMessage())
            }, 10);
        }
    }

    const startLogout = async () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        errorMessage,
        status,
        user,

        startLogin,
        startLogout,
        startRegister,
        checkData
    }
}