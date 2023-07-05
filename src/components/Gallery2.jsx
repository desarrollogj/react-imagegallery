import { Image } from './Image';
import imageData from '../data/images.json'
import { useEffect, useState } from 'react';
import { Column } from './Column';

export const Gallery2 = () => {
  const [columns, setColumns] = useState([])
  const [imagesData, setImagesData] = useState(<></>)

  const loadImages = () => {
    let images = []
    let i = 0
    imageData.forEach(data => {
      images.push(<Image
        key={i}
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
        <Column images={columns.slice(imgCount * 2, columns.length - 1)}></Column>
      </>
    )
  }

  useEffect(() => {
    const images = loadImages()
    setColumns(images)
    //console.log(columnsData);
  }, [])

  useEffect(() => {
    generateImages()
    //console.log(columnsData);
  }, [columns])

  return (
    <div className="row galleryImage">
      {imagesData}
    </div >
  )
}