import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { Menu } from "../components/Menu"

export const ImagePage = () => {
    const { user } = useContext(UserContext)

    /*useEffect(() => {
        console.log(user);
    }, [])*/

    return (
        <>
            <Menu></Menu>
            <h1>My image</h1>
        </>
    )
}
