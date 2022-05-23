import { SearchBar } from "./Components/Searchbar";
import { ImageGallery } from "Components/ImageGallery";
import { Component } from "react";
import style from "./App.module.css";

class App extends Component {
  state = {
    searchValue: "",
  };

  changeSearchSubmit = (searchValue) => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <div className={style.App}>
        <SearchBar onSubmit={this.changeSearchSubmit} />
        <ImageGallery searchValue={this.state.searchValue} />
      </div>
    );
  }
}

export default App;
