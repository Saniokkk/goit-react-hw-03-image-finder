import { ImageGalleryItem } from "./ImageGalleryItem";
import { Component } from "react";
import { searchQuery } from "API/searchQuery";
import { ButtonLoadMore } from "../Button";
import style from "./ImageGallery.module.css";

export class ImageGallery extends Component {
  state = {
    searchValue: "",
    responseBySearch: null,
    page: 1,
  };

  handleLoad = async () => {
    this.setState(
      (prevState) => {
        return { page: prevState.page + 1 };
      },
      () => console.log(this.state.page)
    );
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      const data = await searchQuery(this.props.searchValue, this.state.page);
      console.log(data);
      this.setState(
        {
          responseBySearch: [...data.hits],
          searchValue: this.props.searchValue,
        },
        () => {
          console.log(prevState);
        }
      );
    }

    if (
      prevProps.searchValue === this.props.searchValue &&
      prevState.page !== this.props.page
    ) {
      const data = await searchQuery(this.props.searchValue, this.state.page);
      console.log(data.hits);
      this.setState({
        responseBySearch: [...this.state.responseBySearch, ...data.hits],
      });
    }
  }

  componentWillUnmount() {
    this.setState({ page: 1 }, () => {
      console.log(this.state.page);
    });
  }

  render() {
    return (
      <>
        <ul className={style.imageGallery}>
          {this.state.responseBySearch &&
            this.state.responseBySearch.map((data) => {
              return (
                <ImageGalleryItem
                  key={data.id}
                  url={data.webformatURL}
                  largeImageURL={data.largeImageURL}
                  title={data.title}
                />
              );
            })}
        </ul>
        {this.state.responseBySearch && (
          <ButtonLoadMore text={"Load more"} onClick={this.handleLoad} />
        )}
      </>
    );
  }
}
