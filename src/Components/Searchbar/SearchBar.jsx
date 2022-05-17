import style from "./SearchBar.module.css";
import { SearchForm } from "./SearchForm";

export const SearchBar = ({ onSubmit }) => {
  return (
    <header className={style.SearchBar}>
      <SearchForm onSubmit={onSubmit} />
    </header>
  );
};
