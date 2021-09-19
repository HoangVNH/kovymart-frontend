import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getImageOfCategory } from "utils";
import "./styles.scss";

const CircleCategory = ({ id, name }) => {
  return (
    <Link
      to={`/category/${id}`}
      className="link--normalize category-item__wrapper"
    >
      <div className="category-item__icon">
        <img src={getImageOfCategory(id)} alt="" />
      </div>
      <div className="category-item__label">{name}</div>
    </Link>
  );
};

CircleCategory.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
};

CircleCategory.defaultProps = {
  id: "",
  name: "",
};

export default CircleCategory;
