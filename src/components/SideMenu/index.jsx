import React, { PureComponent } from "react";
import css from "./styles.module.css";
import Tree from "../Tree/index.js";

export default class SideMenu extends PureComponent {
  state = {
    selectedEntity: null
  };

  selectEntity = entity => {
    this.setState({ selectedEntity: entity }, () =>
      console.log(this.state.selectedEntity)
    );
  };

  render() {
    return (
      <div className={css.sideMenu}>
        <div className={css.menu}>
          <Tree onSelect={this.selectEntity} />
        </div>
      </div>
    );
  }
}
