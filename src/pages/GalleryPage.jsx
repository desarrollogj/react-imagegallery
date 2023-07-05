import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { Gallery2 } from '../components/Gallery2'
import { Menu } from '../components/Menu'

export const GalleryPage = () => {
    const { user } = useContext(UserContext)

    /*useEffect(() => {
        console.log(user);
    }, [])*/

    return (
        <>
            <Menu></Menu>
            <Gallery2></Gallery2>
        </>
    )
}