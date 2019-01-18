import React, { Component } from "react";
import css from "./styles.module.css";

class Searching extends Component {
  state = {
    value: "",
    timeoutId: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("submit");
    this.props.startSearching();
  };

  handleChange = event => {
    this.setState(
      {
        value: event.target.value
      },
      () => {
        clearTimeout(this.state.timeoutId);
        this.setState({
          timeoutId: setTimeout(
            () => this.props.startSearching(this.state.value),
            1500
          )
        });
      }
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={"Searching"}
          className={css.searchInput}
        />
      </form>
    );
  }
}

export default Searching;
