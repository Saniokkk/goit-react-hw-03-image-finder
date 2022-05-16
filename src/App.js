import { SearchBar } from "./Components/Searchbar";
import { ImageGallery } from "Components/ImageGallery";
import style from "./App.module.css";
import { Component } from "react";

class App extends Component {
  state = {
    name: "",
    value: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className={style.App}>
        <SearchBar handleChange={this.handleChange} />
        <ImageGallery />
      </div>
    );
  }
}

export default App;
