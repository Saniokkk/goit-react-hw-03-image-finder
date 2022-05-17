// import { render } from "@testing-library/react";
import { Component } from "react";
import style from "./SearchForm.module.css";

export class SearchForm extends Component {
  state = {
    search: "",
  };

  handleChange = (event) => {
    console.log(this.props.onSubmit());
    this.setState({ search: event.target.value });
  };

  render() {
    return (
      <form className={style.searchForm} onSubmit={this.props.onSubmit}>
        <button type="submit" className={style.searchFormButton}>
          <span className={style.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.searchFormInput}
          value={this.state.search}
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
