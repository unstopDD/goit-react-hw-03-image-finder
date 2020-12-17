import React, { Component } from "react";
import PropTypes from "prop-types";

import ImageGallery from "../ImageGallery";
import Button from "../Button";
import Spinner from "../Loader";
import Modal from "../Modal";

import imageAPI from "../../utils/articlesApi";
import scroll from "../../utils/scroll";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export class ImageInfo extends Component {
  static propTypes = {
    serchQuery: PropTypes.string.isRequired,
  };

  state = {
    articles: [],
    page: 1,
    error: null,
    showModal: false,
    largeImgUrl: null,
    arePicturesOver: false,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.serchQuery;
    const nextName = this.props.serchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextName) {
      this.setState({ articles: [], page: 1, error: null });
    }

    if (prevQuery !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      imageAPI
        .fetchArticlesWithQuery(nextName, nextPage)
        .then(({ hits, totalHits }) => {
          if (totalHits - nextPage * 12 <= 0) {
            return this.setState(() => ({
              arePicturesOver: true,
              status: Status.RESOLVED,
            }));
          }
          this.setState((prevState) => ({
            articles: [...prevState.articles, ...hits],
            status: Status.RESOLVED,
          }));
        })
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }
  }

  onClickLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
    setTimeout(scroll, 400);
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImgUrl: null });
  };

  handleClickImg = (largeImgUrl) => {
    this.setState({
      largeImgUrl: largeImgUrl,
      showModal: true,
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
      return <></>;
    }

    if (status === Status.REJECTED) {
      return <h1>{error.message}</h1>;
    }

    if (status === Status.RESOLVED || status === Status.PENDING) {
      return (
        <>
          <ImageGallery images={articles} openModal={this.handleClickImg} />
          {status === Status.RESOLVED && !arePicturesOver && (
            <Button nextImages={this.onClickLoadMore} />
          )}
          {status === Status.PENDING && <Spinner />}
          {showModal && (
            <Modal onClose={this.closeModal} imgUrl={largeImgUrl} />
          )}
        </>
      );
    }
  }
}

export default ImageInfo;
