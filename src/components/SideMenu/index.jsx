import React, { PureComponent } from "react";
import axios from "axios";
import css from "./styles.module.css";
import Placeholder from "./SvgLoadingPlaceholder";

const http = axios.create();

export default class Index extends PureComponent {
  state = {
    entities: {},
    isLoading: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ isLoading: true }, async () => {
      try {
        const { data } = await http.get("/help/idea/2018.3/HelpTOC.json");
        this.setState({ entities: data.entities });
      } catch (e) {
        console.error(e);
      } finally {
        this.setState({ isLoading: false });
      }
    });
  };

  render() {
    const { pages = [], isLoading } = this.state.entities;

    return (
      <div className={css.sideMenu}>
        <div className={css.menu}>
          {!isLoading ? (
            <React.Fragment>
              <Placeholder />
            </React.Fragment>
          ) : (
            <ul>
              <li>page</li>
              <li>page 2</li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}
