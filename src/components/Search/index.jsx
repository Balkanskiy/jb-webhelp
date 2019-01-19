import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./styles.module.css";

export default class Search extends Component {
  state = {
    value: "",
    timeoutId: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    clearTimeout(this.state.timeoutId);
    this.props.startSearching(this.state.value);
  };

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      clearTimeout(this.state.timeoutId);
      this.setState({
        timeoutId: setTimeout(
          () => this.props.startSearching(this.state.value),
          1500
        )
      });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={"Search"}
          className={css.searchInput}
        />
      </form>
    );
  }
}

Search.propTypes = {
  startSearching: PropTypes.func.isRequired
};
