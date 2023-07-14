import { useEffect } from 'react'
import { Gallery2 } from '../components/Gallery2'
import { Menu } from '../components/Menu'

export const GalleryPage = () => {
    useEffect(() => {
        document.title = "Proyecto Galería de imágenes"
    }, [])

    return (
        <>
            <Menu></Menu>
            <Gallery2></Gallery2>
        </>
    )
}