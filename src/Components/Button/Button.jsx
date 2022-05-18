import style from "./Button.module.css";

export const ButtonLoadMore = ({ text, onClick }) => {
  return (
    <button className={style.buttonLoadMore} onClick={onClick}>
      {text}
    </button>
  );
};
