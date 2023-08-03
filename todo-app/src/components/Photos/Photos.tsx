import axios from "axios";
import { useEffect, useState } from "react";
import { PhotoProps } from "../../types/types";
import PhotoItem from "./PhotoItem";

const Photos = () => {
  const [photos, setPhotos] = useState<PhotoProps[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = 'https://jsonplaceholder.typicode.com/photos/'
  useEffect(() => {
    axios.get(url).then((response) => {
      setPhotos(response.data);
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    })
  }, [])

   return (
     <div className="photos-tab">
       {loading ? (
         <div className="spinner-container">
           <div className="spinner-border" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
         </div>
       ) : (
         <>
           <div className="grid-container">
             {photos.map((photo) => (
               <PhotoItem key={photo.id} photo={photo} />
             ))}
           </div>
         </>
       )}
    </div>
  );
}

export default Photos
