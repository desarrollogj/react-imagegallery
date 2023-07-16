import { useDispatch, useSelector } from "react-redux";
import { createErrorMessage, onLogin, onLogout, onChecking } from "../store/auth/authSlice";
import userAPI from "../api/userApi"

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        try {
            dispatch(onChecking())

            const user = {
                email,
                password
            }
            const { data } = await userAPI.post('/login', user)
            data.images=[]

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
            dispatch(onChecking())

            const user = { name, surname, email, password }
            const { data } = await userAPI.post('/register', user)
            data.images=[]

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
                dispatch(createErrorMessage())
            }, 10);
        }
    }

    const startLogout = async () => {
        dispatch(onChecking())
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