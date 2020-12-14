import React from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ smallImg, openModal }) {
  return (
    <li className={s.ImageGalleryItem} onClick={openModal}>
      <img src={smallImg} alt="" className={s.ImageGalleryItemImage} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
