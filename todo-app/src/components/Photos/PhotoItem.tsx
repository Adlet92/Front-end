import { PhotoProps } from "../../types/types";

interface PhotoItemProps {
  photo: PhotoProps;
}

const PhotoItem = ({ photo }: PhotoItemProps) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={photo.url} alt={photo.title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{photo.title}</h5>
        <p className="card-text">{photo.id}</p>
        <button className="btn btn-primary">Go somewhere</button>
      </div>
    </div>
  );
}

export default PhotoItem;
