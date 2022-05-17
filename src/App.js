import { SearchBar } from "./Components/Searchbar";
import { ImageGallery } from "Components/ImageGallery";
import { Component } from "react";
import { searchQuery } from "API/searchQuery";
import style from "./App.module.css";

class App extends Component {
  state = {
    response: [],
    search: "",
    page: 1,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    // this.setState(() => {
    //   return { search: event }
    // });
    this.setState(() => {
      return { response: searchQuery(this.state.search, this.state.page) };
    });
  };

  render() {
    return (
      <div className={style.App}>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery imageList={this.state.response} />
      </div>
    );
  }
}

export default App;
