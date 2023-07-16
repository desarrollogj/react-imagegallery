import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'

export const Image = ({ id=0, image = reactLogo, alt = "imagen" }) => {
  return (
    <Link to={`/image/${id}`}>
      <img
        src={image}
        className="w-100 shadow-1-strong rounded mb-4"
        alt={alt}
      />
    </Link>
  )
}
