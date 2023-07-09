export const ErrorLabel = ({ text, state }) => {
    return (
        <>
            <p className={`login__inputTitle red ${(!state) ? "hide" : ""}`} ><span>*</span>{text}</p>
        </>
    )
}