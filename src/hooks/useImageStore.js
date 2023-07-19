import { useDispatch, useSelector } from "react-redux"
import userAPI from "../api/userApi"
import { onLoadImages } from "../store/auth/authSlice"
import { getEnvVariables } from "../helpers/getEnvVariables"

export const useImageStore = () => {
    const { images } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { VITE_CLOUDINARY_URL } = getEnvVariables()
    //const cloudName = "doca5heca"

    const uploadFile = async (file) => {
        if (!file) throw new Error('No hay ningun archivo.')
        if (!file) return null

        //const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
        const cloudUrl = `${VITE_CLOUDINARY_URL}/upload`
        const formData = new FormData()
        formData.append('upload_preset', 'curso-react')
        formData.append('file', file)
        try {
            const resp = await fetch(cloudUrl, {
                method: 'POST',
                body: formData
            })

            if (!resp.ok) throw new Error('No se pudo subir la imagen')
            const cloudResp = await resp.json()

            return cloudResp.secure_url
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const getAllImages = async (email) => {
        try {
            const { data } = await userAPI.post('/images', { email: email })
            dispatch(onLoadImages(data.images))
            return data.images
        } catch (error) {
            console.log("Error al cargar las imagenes");
            return []
        }
    }
    
    const saveImages = async (email, title, path) => {
        try {
            const resp = await getAllImages(email)
            const newId = `${resp.length + 1}`;
            const images = [
                ...resp,
                {
                    id: newId,
                    src: path,
                    
                    alt: title,
                }
            ]
            const { data } = await userAPI.put('/images', { email: email, images: images })
            console.log(data);
            return data.images
        } catch (error) {
            console.log("Error al cargar las imagenes");
            return []
        }
    }

    return {
        images,
        uploadFile,
        saveImages,
        getAllImages
    }
}