import React, { Component } from "react";
import css from "./styles/app.module.css";

class App extends Component {
  render() {
    return (
      <div className={css.layout}>
        <header className={css.header}>
          <b className={css.title}>IntelliJ IDEA 2017.3! Help</b>
        </header>
        <div className={css.app}>
          <div className={css.nav}>nav</div>
          <div className={css.content}>
            Morbi malesuada dui dui, ut lacinia elit malesuada id. Quisque eu
            leo faucibus, posuere dui sit amet, aliquet tortor. Suspendisse
            mauris lacus, rhoncus quis sollicitudin in, bibendum a quam. Donec
            cursus urna risus, sit amet faucibus lacus facilisis at. Phasellus
            mollis tempor velit ac finibus. Morbi volutpat porttitor dolor vitae
            finibus. Proin pellentesque dignissim metus, non rutrum arcu blandit
            vitae. Sed commodo mauris et dignissim euismod. In pulvinar sodales
            purus. Nulla mollis elit urna, lacinia tincidunt mi aliquam id. Sed
            vel ex facilisis, placerat orci id, pulvinar odio. Maecenas
            fermentum massa quis libero hendrerit commodo. Proin nisl sapien,
            aliquam at leo id, vulputate varius lectus. Vivamus at egestas urna.
          </div>
        </div>
      </div>
    );
  }
}

export default App;
