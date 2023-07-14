import { useEffect } from 'react'
import { Menu } from "../components/Menu"

export const ImagePage = () => {
    /*useEffect(() => {
        console.log(user);
    }, [])*/
    useEffect(() => {
        document.title = "Imagen"
      }, [])

    return (
        <>
            <Menu></Menu>
            <h1>My image</h1>
        </>
    )
}
