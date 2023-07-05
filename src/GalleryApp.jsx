
import './GalleryApp.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GalleryPage } from './pages/GalleryPage';
import { ImagePage } from './pages/ImagePage';

function GalleryApp() {
   const { user } = useContext(UserContext)
   return (
      <Routes>
         {
            // Conditional rendering. Check if user is logged
            (user != undefined) ? (
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
