import React, { Component } from "react";
import SideMenu from "./components/SideMenu/";
import Content from "./components/Content/";
import css from "./index.module.css";

class App extends Component {
  render() {
    return (
      <div className={css.layout}>
        <header className={css.header}>
          <b className={css.title}>IntelliJ IDEA 2017.3! Help</b>
        </header>
        <div className={css.app}>
          <SideMenu />
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
