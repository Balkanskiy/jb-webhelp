import React, { PureComponent } from "react";
import css from "./styles.module.css";

export default class Content extends PureComponent {
  render() {
    return (
      <article className={css.content}>
        <h1>Web-Help Visual Guidelines</h1>
        <p>
          It is always better to have some synopsis, written on top of the page,
          in slightly bigger font, so it is clear, what this article is about,
          and also it allows to separate 2nd level header from the 1st level.
        </p>
        <h2>Second Level Header</h2>
        <p>
          Lorem ipsum dolor sit amet, Link Goes Here, duis voluptate velit esse
          cillum dolore empor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </p>
      </article>
    );
  }
}
