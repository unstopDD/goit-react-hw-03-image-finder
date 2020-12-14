import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./Modal.module.css";

export default class Modal extends Component {
  static propType = {
    onCloseModal: PropTypes.func.isRequired,
    imgUrl: this.propType,
  };
  componentDidMount = () => {
    window.addEventListener("keydown", this.onCloseModal);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.onCloseModal);
  };

  onCloseModal = (e) => {
    if (e.code === "Escape" || e.target.nodeName === "DIV") {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={s.Overlay} onClick={this.onCloseModal}>
        <div className={s.Modal}>
          <img src={this.props.imgUrl} alt="" />
        </div>
      </div>
    );
  }
}
