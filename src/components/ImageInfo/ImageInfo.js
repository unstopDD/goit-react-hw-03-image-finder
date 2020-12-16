import React, { Component } from "react";

import ImageGallery from "../ImageGallery";
import Button from "../Button";
import Spinner from "../Loader";
import Modal from "../Modal";
import Searchbar from "../Searchbar";

import imageAPI from "../../utils/articlesApi";
import scroll from "../../utils/scroll";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export class ImageInfo extends Component {
  state = {
    articles: [],
    page: 1,
    error: null,
    showModal: false,
    largeImgUrl: null,
    arePicturesOver: true,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.serchQuery;
    const nextName = this.state.serchQuery;

    if (prevQuery !== nextName) {
      this.fetchArticles();
    }

    if (prevState.page !== this.state.page) {
      setTimeout(scroll, 400);
    }
  }

  fetchArticles = () => {
    const nextName = this.state.serchQuery;
    const { page } = this.state;
    this.setState({ status: Status.PENDING });

    imageAPI
      .fetchArticlesWithQuery(nextName, page)
      .then(({ hits, totalHits }) =>
        this.setState((prevState) => ({
          articles: [...prevState.articles, ...hits],
          page: prevState.page + 1,
          status: Status.RESOLVED,
          arePicturesOver: totalHits / page < hits.length,
        }))
      )
      .catch((error) => this.setState({ error, status: Status.REJECTED }));
  };

  handleSearchbarSubmit = (query) => {
    this.setState({ serchQuery: query, page: 1, articles: [] });
  };

  closeModal = () => {
    this.setState({ showModal: !this.state.showModal, largeImgUrl: null });
  };

  handleClickImg = (largeImgUrl) => {
    this.setState({
      largeImgUrl: largeImgUrl,
      showModal: !this.state.showModal,
    });
  };

  render() {
    const {
      articles,
      status,
      error,
      showModal,
      largeImgUrl,
      arePicturesOver,
    } = this.state;

    if (status === Status.IDLE) {
      return <Searchbar onSubmit={this.handleSearchbarSubmit} />;
    }
    if (status === Status.PENDING) {
      return (
        <>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />;
          <ImageGallery images={articles} openModal={this.handleClickImg} />;
          <Spinner />;
        </>
      );
    }
    if (status === Status.REJECTED) {
      return <h1>{error.message}</h1>;
    }
    if (status === Status.RESOLVED) {
      return (
        <>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          <ImageGallery images={articles} openModal={this.handleClickImg} />
          {!arePicturesOver && <Button nextImages={this.fetchArticles} />}
          {showModal && (
            <Modal onClose={this.closeModal} imgUrl={largeImgUrl} />
          )}
        </>
      );
    }
  }
}

export default ImageInfo;
