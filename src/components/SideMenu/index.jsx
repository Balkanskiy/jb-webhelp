import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import css from "./styles.module.css";
import Tree from "../Tree";
import Search from "../Search";
import Placeholder from "./SvgLoadingPlaceholder";

const http = axios.create();

export default class SideMenu extends PureComponent {
  state = {
    nodes: {},
    anchors: {},
    selectedEntity: null,
    isLoading: false,
    searchQuery: ""
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
        this.setState({
          nodes: pages,
          anchors
        });
      } catch (e) {
        console.error(e);
      } finally {
        this.setState({ isLoading: false });
      }
    });
  };

  searching = string => this.setState({ searchQuery: string });

  selectEntity = entity => this.setState({ selectedEntity: entity });

  render() {
    const { nodes, anchors, isLoading, searchQuery } = this.state;

    return (
      <div
        className={`${css.sideMenu} ${
          this.props.isOpen ? css.sideMenuOpened : ""
        }`}
      >
        <Search startSearching={this.searching} />
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
              entityId={""} //ex. "topicId287958#main-concepts-tool-window"
              entityTitle={""} //ex. "Folder categories"
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
    );
  }
}

SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired
};
