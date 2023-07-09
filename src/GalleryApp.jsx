
import './GalleryApp.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GalleryPage } from './pages/GalleryPage';
import { ImagePage } from './pages/ImagePage';
import { useAuthStore } from './hooks/useAuthStore';

function GalleryApp() {
   const { status, checkData } = useAuthStore()

   useEffect(() => {
      // Check if user is logged
      checkData()
   }, [])

   return (
      <Routes>
         {
            // Conditional rendering. Check if user is logged
            (status === 'authenticated') ? (
               <>
                  <Route path='/' element={<GalleryPage />}></Route>
                  <Route path='/image' element={<ImagePage />} />
                  <Route path='/*' element={<Navigate to="/" />}></Route>
               </>

            ) : (
               <>
                  <Route path='/auth/login' element={<LoginPage />}></Route>
                  <Route path='/auth/register' element={<RegisterPage />}></Route>
                  <Route path='/*' element={<Navigate to="/auth/login" />}></Route>
               </>
            )
         }
      </Routes>
   )
}

export default GalleryApp
