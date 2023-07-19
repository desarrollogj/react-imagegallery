import { useRef, useState } from "react";
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import '../styles/addimage.css'
import { InputLabel } from './InputLabel';
import { useForm } from '../hooks/useForm';
import { useImageStore } from '../hooks/useImageStore';
import { useAuthStore } from '../hooks/useAuthStore';

const imgDataFormFields = {
    imgDataTitle: ''
}

const formValidations = {
    imgDataTitle: [(value) => value.length >= 1, 'El titulo es obligatorio'],
}


export const AddImageForm = ({ status, setStatus }) => {
    const { user } = useAuthStore()
    const { getAllImages, saveImages, uploadFile } = useImageStore();
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [path, setPath] = useState("")
    const fileInputRef = useRef();

    const { imgDataTitle, imgDataTitleValid, onInputChange: onImgInputChange, onResetForm } = useForm(imgDataFormFields, formValidations)

    const onFileInputChange = async ({ target }) => {
        if (target.files === 0) return;
        setPath(target.files)
    }

    const onSubmitData = async (event) => {
        event.preventDefault()
        setFormSubmitted(true)

        const url = await uploadFile(path[0])
        const images = await getAllImages(user.email)
        setPath()

        setFormSubmitted(false)
        onResetForm()

        await saveImages(user.email, imgDataTitle, url)
        setStatus(false)
    }

    const onCancel = () => {
        setStatus(false)
    }

    return (
        (status) ? (
            <section className='formAlert'>
                <form className='loginForm' onSubmit={onSubmitData}>
                    <InputLabel text="Ingrese el título de la imagen" state={!!imgDataTitleValid && formSubmitted} />
                    <MDBInput
                        className='mb-4 fondoBlanco'
                        type='text'
                        label='Ingrese el titulo de la imagen'
                        name='imgDataTitle'
                        value={imgDataTitle}
                        onChange={onImgInputChange}
                    />
                    <p>{(path !== "") ? `Ya subió esta imagen.` : ""}</p>
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onFileInputChange}
                            style={{ display: "none" }}
                        />
                        <MDBBtn type='button'
                            className='mb-4'
                            onClick={() => {
                                fileInputRef.current.click();
                            }}
                            block>
                            Haga clic aquí para subir una imagen
                        </MDBBtn>
                    </div>
                    <MDBBtn type='submit' color='success' className='mb-4' block>Guardar Imagen</MDBBtn>
                    <MDBBtn type='button' color='danger' className='mb-4' block onClick={onCancel}>Cancelar</MDBBtn>
                </form>
            </section>
        ) :
            <></>
    )
}

