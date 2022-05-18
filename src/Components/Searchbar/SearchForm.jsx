// import { render } from "@testing-library/react";
import { Component } from "react";
import style from "./SearchForm.module.css";

export class SearchForm extends Component {
  state = {
    searchValue: "",
  };

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: "" });
  };

  render() {
    return (
      <form className={style.searchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={style.searchFormButton}>
          <span className={style.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.searchFormInput}
          value={this.state.searchValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
