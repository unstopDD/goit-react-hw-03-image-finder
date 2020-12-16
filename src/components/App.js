import React, { Component } from "react";

import ImageInfo from "./ImageInfo";

import { ToastContainer } from "react-toastify";

import s from "./App.module.css";

export default class App extends Component {
  state = {
    serchQuery: "",
  };

  render() {
    return (
      <div className={s.App}>
        <ImageInfo serchQuery={this.state.serchQuery} />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }
}
