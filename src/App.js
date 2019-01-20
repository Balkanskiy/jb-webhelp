import React, { PureComponent } from "react";
import SideMenu from "./components/SideMenu/";
import Content from "./components/Content/";
import BurgerMenu from "./components/BurgerMenu";
import css from "./index.module.css";

class App extends PureComponent {
  state = {
    menuIsOpen: false
  };
  render() {
    return (
      <div className={css.layout}>
        <header className={css.header}>
          <BurgerMenu
            open={this.state.menuIsOpen}
            onClick={() =>
              this.setState(
                prevState =>
                  console.log(prevState) || {
                    menuIsOpen: !prevState.menuIsOpen
                  }
              )
            }
          />
          <b className={css.title}>IntelliJ IDEA 2017.3! Help</b>
        </header>
        <div className={css.app}>
          <SideMenu open={this.state.menuIsOpen} />
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
