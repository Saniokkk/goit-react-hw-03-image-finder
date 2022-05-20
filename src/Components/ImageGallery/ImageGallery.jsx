import { ImageGalleryItem } from "./ImageGalleryItem";
import { Component } from "react";
import { searchQuery } from "API/searchQuery";
import { ButtonLoadMore } from "../Button";
import { Modal } from "../Modal";
// import { NotFound } from "../Loader";
import style from "./ImageGallery.module.css";
const PER_PAGE = 12;

export class ImageGallery extends Component {
  state = {
    searchValue: "",
    responseBySearch: null,
    page: 1,
    button: false,
    showModal: false,
    largeImageURL: null,
    tags: null,
    // status:
  };

  async componentDidMount() {
    console.log(this.state);

    console.log(this.state.showModal);
  }

  componentWillUnmount() {
    this.setState({ page: 1 }, () => {
      console.log(this.state.page);
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      const data = await searchQuery(
        this.props.searchValue,
        this.state.page,
        PER_PAGE
      );
      if (data.total === 0) {
        alert("По вашему запросу ничего не найдено");
      } else {
        this.setState({
          responseBySearch: [...data.hits],
          searchValue: this.props.searchValue,
          button: true,
          page: 1,
        });
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
          () => console.log("По вашему запросу картинок больше нет!!!")
        );
        return;
      }
      this.setState({
        responseBySearch: [...this.state.responseBySearch, ...data.hits],
      });
    }
  }

  handleLoadMore = async () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModal = (url, tags) => {
    this.setState({ showModal: !this.state.showModal, largeImageURL: url });
  };

  render() {
    const { showModal, largeImageURL, tags, responseBySearch, button } =
      this.state;
    return (
      <>
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            {<img src={largeImageURL} alt={tags}></img>}
          </Modal>
        )}
        <ul className={style.imageGallery}>
          {responseBySearch &&
            responseBySearch.map((data) => {
              return (
                <ImageGalleryItem
                  key={data.id}
                  data={{ ...data }}
                  openModal={this.toggleModal}
                />
              );
            })}
        </ul>
        {button && (
          <ButtonLoadMore text={"Load more"} onClick={this.handleLoadMore} />
        )}
      </>
    );
  }
}
