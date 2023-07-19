import { useEffect } from "react"
import { Navigate, Routes, Route } from "react-router-dom"
import { useAuthStore } from "../hooks/useAuthStore"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { GalleryPage } from "../pages/GalleryPage"
import { ImagePage } from "../pages/ImagePage"

export const RouterApp = () => {
    const { status, checkData } = useAuthStore()

    const renderPage = () => {
        // Conditional rendering. Check if user is logged
        if (status === 'not-authenticated') {
            return (
                <>
                    <Route path='/auth/login' element={<LoginPage />}></Route>
                    <Route path='/auth/register' element={<RegisterPage />}></Route>
                    <Route path='/*' element={<Navigate to="/auth/login" />}></Route>
                </>
            )
        }
        else if (status === 'authenticated') {
            return (
                <>
                    <Route path='/' element={<GalleryPage />}></Route>
                    <Route path='/image' element={<ImagePage />} />
                    <Route path='/*' element={<Navigate to="/" />}></Route>
                </>
            )
        }
        else {
            return <>
                <Route path='/' element={<p>Cargando...</p>} />
            </>
        }
    }

    useEffect(() => {
        // Check if user is logged
        checkData()
    }, [])

    return (
        <Routes>
            {
                renderPage()
            }
        </Routes>
    )
}