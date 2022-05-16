import style from "./SearchBar.module.css";
import { SearchForm } from "./SearchForm";

export const SearchBar = () => {
  return (
    <header className={style.SearchBar}>
      <SearchForm />
    </header>
  );
};
