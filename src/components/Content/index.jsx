import React, { PureComponent } from "react";
import css from "../../index.module.css";

export default class Content extends PureComponent {
  render() {
    return (
      <div className={css.content}>
        Morbi malesuada dui dui, ut lacinia elit malesuada id. Quisque eu leo
        faucibus, posuere dui sit amet, aliquet tortor. Suspendisse mauris
        lacus, rhoncus quis sollicitudin in, bibendum a quam. Donec cursus urna
        risus, sit amet faucibus lacus facilisis at. Phasellus mollis tempor
        velit ac finibus. Morbi volutpat porttitor dolor vitae finibus. Proin
        pellentesque dignissim metus, non rutrum arcu blandit vitae. Sed commodo
        mauris et dignissim euismod. In pulvinar sodales purus. Nulla mollis
        elit urna, lacinia tincidunt mi aliquam id. Sed vel ex facilisis,
        placerat orci id, pulvinar odio. Maecenas fermentum massa quis libero
        hendrerit commodo. Proin nisl sapien, aliquam at leo id, vulputate
        varius lectus. Vivamus at egestas urna.
      </div>
    );
  }
}
