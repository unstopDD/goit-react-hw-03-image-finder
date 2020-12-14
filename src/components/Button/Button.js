import React from "react";
import PropTypes from "prop-types";
import s from "./Button.module.css";

function Button({ nextImages }) {
  return (
    <button type="articles" className={s.Button} onClick={nextImages}>
      Load More
    </button>
  );
}

Button.propTypes = {
  nextImages: PropTypes.func.isRequired,
};

export default Button;
