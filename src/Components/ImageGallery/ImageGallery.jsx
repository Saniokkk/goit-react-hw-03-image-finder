import { toast } from "react-toastify";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { Component } from "react";
import { searchQuery } from "API/searchQuery";
import { ButtonLoadMore } from "../Button";
import style from "./ImageGallery.module.css";
const PER_PAGE = 12;

export class ImageGallery extends Component {
  state = {
    searchValue: "",
    responseBySearch: null,
    page: 1,
    button: false,
  };

  handleLoad = async () => {
    this.setState(
      (prevState) => {
        return { page: prevState.page + 1 };
      },
      () => console.log(this.state.page)
    );
  };

  async componentDidMount() {
    console.log(this.state);
    console.log(PER_PAGE);
  }

  async componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, "prevProps")
    // console.log(this.props, "THIS PROPS")
    // console.log(prevState, "prevState")
    // console.log(this.state, "THIS STATE")

    if (prevProps.searchValue !== this.props.searchValue) {
      const data = await searchQuery(
        this.props.searchValue,
        this.state.page,
        PER_PAGE
      );
      if (data.total === 0) {
        alert("По вашему запросу ничего не найдено");
      } else {
        this.setState(
          {
            responseBySearch: [...data.hits],
            searchValue: this.props.searchValue,
            button: true,
            page: 1,
          },
          () => {
            console.log(this.state);
          }
        );
        window.scrollTo(0, 0);
      }
    }

    if (
      prevProps.searchValue === this.state.searchValue &&
      prevState.page !== this.state.page
    ) {
      const data = await searchQuery(
        this.props.searchValue,
        this.state.page,
        PER_PAGE
      );

      if (Math.ceil(data.totalHits / PER_PAGE) <= this.state.page) {
        this.setState(
          {
            button: false,
            responseBySearch: [...this.state.responseBySearch, ...data.hits],
          },
          () => alert("По вашему запросу картинок больше нет!!!")
        );
        return;
      }
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
        {this.state.button && (
          <ButtonLoadMore text={"Load more"} onClick={this.handleLoad} />
        )}
      </>
    );
  }
}
