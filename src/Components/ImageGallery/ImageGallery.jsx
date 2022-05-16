import { ImageGalleryItem } from "./ImageGalleryItem";
import style from "./ImageGallery.module.css";

export const ImageGallery = (imageList) => {
  return (
    <ul className={style.ImageGallery}>
      {imageList.map((data) => {
        return (
          <ImageGalleryItem key={data.id} url={data.url} title={data.title} />
        );
      })}
    </ul>
  );
};
