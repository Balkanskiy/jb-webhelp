import React, { PureComponent } from "react";
import values from "lodash/values";
import TreeNode from "../TreeNode/index.js";
import PropTypes from "prop-types";
import axios from "axios";
import SearchInput, { createFilter } from "react-search-input";
import Placeholder from "./SvgLoadingPlaceholder";
import css from "./styles.module.css";

const http = axios.create();
const KEYS_TO_FILTERS = ["title", "id"];

export default class Tree extends PureComponent {
  state = {
    nodes: {},
    selectedNodeId: "",
    selectedAnchorId: "",
    isLoading: false,
    searchTerm: ""
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

  getRootNodes = () => {
    const { nodes } = this.state;
    return values(nodes).filter(node => node.level === 0);
  };

  getChildNodes = node => {
    const { nodes } = this.state;
    if (!node.pages) return [];
    return node.pages.map(title => nodes[title]);
  };

  toggleNodeOpening = node => {
    const { nodes } = this.state;
    const updatedNode = { ...nodes[node.id], isOpened: !node.isOpened };
    this.setState({ nodes: { ...nodes, [node.id]: updatedNode } });
  };

  selectNode = node => {
    this.setState({ selectedNodeId: node.id, selectedAnchorId: "" }, () =>
      this.props.onSelect(node)
    );
  };

  selectAnchor = anchor => {
    this.setState({ selectedAnchorId: anchor.id }, () =>
      this.props.onSelect(anchor)
    );
  };

  searchUpdated = term => {
    debugger;
    this.setState({ searchTerm: term });
  };

  render() {
    const {
      anchors,
      isLoading,
      selectedNodeId,
      selectedAnchorId,
      searchTerm
    } = this.state;
    const rootNodes = this.getRootNodes();

    const filteredNodes = rootNodes.filter(createFilter(searchTerm, "id"));

    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <ul>
          {isLoading ? (
            <div className={css.placeholder}>
              <Placeholder />
            </div>
          ) : (
            filteredNodes.map(node => (
              <TreeNode
                key={node.id}
                node={node}
                anchors={anchors}
                getChildNodes={this.getChildNodes}
                onToggle={this.toggleNodeOpening}
                onNodeOpening={this.toggleNodeOpening}
                onNodeSelect={this.selectNode}
                onAnchorSelect={this.selectAnchor}
                selectedNodeId={selectedNodeId}
                selectedAnchorId={selectedAnchorId}
              />
            ))
          )}
        </ul>
      </div>
    );
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};
