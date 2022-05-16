import style from "./SearchForm.module.css";

export const SearchForm = (props) => {
  const { name, value, handleChange } = props;
  return (
    <form className={style.SearchForm}>
      <button type="submit" className={style.SearchFormButton}>
        <span className={style.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        className={style.SearchFormInput}
        name={name}
        value={value}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleChange}
      />
    </form>
  );
};
