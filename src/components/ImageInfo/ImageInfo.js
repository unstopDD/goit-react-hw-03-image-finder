import React, { Component } from "react";

import ImageGallery from "../ImageGallery";
import Button from "../Button";
import Spinner from "../Loader";
import Modal from "../Modal";

import imageAPI from "../../utils/articlesApi";
import scroll from "../../utils/scroll";

export class ImageInfo extends Component {
  state = {
    articles: [],
    page: 1,
    error: null,
    showModal: false,
    largeImgUrl: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.serchQuery;
    const nextName = this.props.serchQuery;

    if (prevQuery !== nextName) {
      this.fetchArticles();
    }

    if (prevState.page !== this.state.page) {
      setTimeout(scroll, 300);
    }
  }

  fetchArticles = () => {
    const nextName = this.props.serchQuery;
    const { page } = this.state;
    this.setState({ status: "pending" });

    imageAPI
      .fetchArticlesWithQuery(nextName, page)
      .then((articles) =>
        this.setState((prevState) => ({
          articles: [...prevState.articles, ...articles],
          page: prevState.page + 1,
          status: "resolved",
        }))
      )
      .catch((error) => this.setState({ error, status: "rejected" }));
  };

  togleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleClickImg = (largeImgUrl) => {
    this.setState({ largeImgUrl: largeImgUrl });
    this.togleModal();
  };

  render() {
    const { articles, status, error, showModal, largeImgUrl } = this.state;

    if (status === "idle") {
      return <></>;
    }
    if (status === "pending") {
      return <Spinner />;
    }
    if (status === "rejected") {
      return <h1>{error.message}</h1>;
    }
    if (status === "resolved") {
      return (
        <>
          <ImageGallery images={articles} openModal={this.handleClickImg} />
          <Button nextImages={this.fetchArticles} />
          {showModal && (
            <Modal onClose={this.togleModal} imgUrl={largeImgUrl} />
          )}
        </>
      );
    }
  }
}

export default ImageInfo;
