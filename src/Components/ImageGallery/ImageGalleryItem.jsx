import style from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = (props) => {
  const { url, title } = props;
  return (
    <li className={style.ImageGalleryItem}>
      <img className={style.ImageGalleryItemImage} src={url} alt={title} />
    </li>
  );
};
