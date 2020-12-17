import React, { Component } from "react";

import ImageInfo from "./ImageInfo";
import Searchbar from "./Searchbar";

import { ToastContainer } from "react-toastify";

import s from "./App.module.css";

export default class App extends Component {
  state = {
    serchQuery: "",
  };

  handleSearchbarSubmit = (query) => {
    this.setState({ serchQuery: query });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />;
        <ImageInfo serchQuery={this.state.serchQuery} />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }
}
