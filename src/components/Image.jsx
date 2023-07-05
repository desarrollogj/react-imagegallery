import reactLogo from '../assets/react.svg'

export const Image = ({ image = reactLogo, alt = "imagen" }) => {
  return (
    <img
      src={image}
      className="w-100 shadow-1-strong rounded mb-4"
      alt={alt}
    />
  )
}
