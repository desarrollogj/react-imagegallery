import { useEffect, useState } from 'react';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useAuthStore } from "../hooks/useAuthStore";
import { useImageStore } from "../hooks/useImageStore";
import { Image } from './Image';
import { Column } from './Column';

export const Gallery2 = () => {
  const { user } = useAuthStore()
  const [columns, setColumns] = useState([])
  const [statusForm, setStatusForm] = useState(false);
  const [imagesData, setImagesData] = useState(<></>)
  const { images: imageList, getAllImages } = useImageStore()

  const loadImages = (imageData) => {
    let images = []
    let i = 0
    imageData.forEach(data => {
      images.push(<Image
        key={i} 
        id={data.id} 
        image={data.src}
        alt={data.alt} />)
      i++
    });
    return images
  }

  const generateImages = () => {
    let imgCount = columns.length / 3
    setImagesData(() =>
      <>
        <Column images={columns.slice(0, imgCount)}></Column>
        <Column images={columns.slice(imgCount, imgCount * 2)}></Column>
        <Column images={columns.slice(imgCount * 2, columns.length)}></Column>
      </>
    )
  }

  useEffect(() => {
    generateImages()
    //console.log(columnsData);
  }, [columns])

  useEffect(() => {
    getAllImages(user.email).then((imageList) => {
      const images = loadImages(imageList)
      setColumns(images)
    })
  }, [statusForm])

  return (
    <section className="galleryComponent">
      <div className="row galleryImage">
        {imagesData}
      </div >
      <MDBBtn type='button'
        className='btnAddImage'
        onClick={() => {
          setStatusForm(true)
        }}
        block>
        <MDBIcon fas icon="upload" />
      </MDBBtn>
    </section>
  )
}