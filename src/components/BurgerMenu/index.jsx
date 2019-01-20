import React from "react";
import css from "./styles.module.css";

export default ({ open, ...props }) => (
  <div {...props} className={`${css.burgerMenu} ${open ? css.open : ""}`}>
    <div className={css.bar1} key="b1" />
    <div className={css.bar2} key="b2" />
    <div className={css.bar3} key="b3" />
  </div>
);
