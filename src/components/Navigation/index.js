import React, { Component } from "react";
import Tree from "../Tree/index.js";
import css from "./styles.module.css";

export default class Navigation extends Component {
  state = {
    selectedEntity: null
  };

  selectEntity = entity => this.setState({ selectedEntity: entity });

  render() {
    const { selectedFile } = this.state;

    return (
      <div className={css.fileExplorer}>
        <Tree onSelect={this.selectEntity} />
        <div>
          {selectedFile && selectedFile.type === "file" && selectedFile.content}
        </div>
      </div>
    );
  }
}
