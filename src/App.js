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
    const { menuIsOpen } = this.state;
    return (
      <div className={css.layout}>
        <header className={css.header}>
          <BurgerMenu
            open={menuIsOpen}
            onClick={() =>
              this.setState(prevState => ({
                menuIsOpen: !prevState.menuIsOpen
              }))
            }
          />
          <b className={css.title}>IntelliJ IDEA 2017.3! Help</b>
        </header>
        <div className={css.app}>
          <SideMenu isOpen={menuIsOpen} />
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
