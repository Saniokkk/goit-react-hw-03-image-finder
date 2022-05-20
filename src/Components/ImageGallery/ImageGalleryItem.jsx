import style from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = (props) => {
  const { url, name, largeImageURL, openModal } = props;
  return (
    <li className={style.ImageGalleryItem}>
      <img
        className={style.ImageGalleryItemImage}
        src={url}
        alt={name}
        onClick={openModal}
        data-url={largeImageURL}
      />
    </li>
  );
};
