import React, { PureComponent } from "react";
import css from "./styles.module.css";
import Navigation from "../Navigation";

export default class SideMenu extends PureComponent {
  render() {
    return (
      <div className={css.sideMenu}>
        <div className={css.menu}>
          <Navigation />
        </div>
      </div>
    );
  }
}
