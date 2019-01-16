import React, { PureComponent } from "react";
import axios from "axios";
import css from "./styles.module.css";
import Tree from "../Tree/index.js";
import Placeholder from "./SvgLoadingPlaceholder";

const http = axios.create();

export default class SideMenu extends PureComponent {
  state = {
    nodes: {},
    anchors: {},
    selectedEntity: null,
    isLoading: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ isLoading: true }, async () => {
      try {
        const {
          data: {
            entities: { pages, anchors }
          }
        } = await http.get("/help/idea/2018.3/HelpTOC.json");
        this.setState({ nodes: pages, anchors });
      } catch (e) {
        console.error(e);
      } finally {
        this.setState({ isLoading: false });
      }
    });
  };

  selectEntity = entity => {
    this.setState({ selectedEntity: entity }, () =>
      console.log("selectedEntity", this.state.selectedEntity)
    );
  };

  render() {
    const { nodes, anchors, isLoading } = this.state;

    return (
      <div className={css.sideMenu}>
        <div className={css.menu}>
          {isLoading ? (
            <div className={css.placeholder}>
              <Placeholder />
            </div>
          ) : (
            <Tree
              nodes={nodes}
              anchors={anchors}
              onSelect={this.selectEntity}
              entityId={'Accessibility'}
            />
          )}
        </div>
      </div>
    );
  }
}
