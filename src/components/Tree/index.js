import React, { PureComponent } from "react";
import values from "lodash/values";
import TreeNode from "../TreeNode/index.js";
import PropTypes from "prop-types";
import axios from "axios";
import Placeholder from "./SvgLoadingPlaceholder";
import css from "./styles.module.css";

const http = axios.create();

export default class Tree extends PureComponent {
  state = {
    nodes: {},
    selectedNodeId: null,
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
            entities: { pages }
          }
        } = await http.get("/help/idea");
        this.setState({ nodes: pages });
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
    this.setState({ selectedNodeId: node.id }, () => this.props.onSelect(node));
  };

  render() {
    const { isLoading, selectedNodeId } = this.state;
    const rootNodes = this.getRootNodes();

    return (
      <ul>
        {isLoading ? (
          <div className={css.placeholder}>
            <Placeholder />
          </div>
        ) : (
          rootNodes.map((node, index) => (
            <TreeNode
              key={node.id}
              node={node}
              tabIndex={index}
              getChildNodes={this.getChildNodes}
              onToggle={this.toggleNodeOpening}
              onNodeOpening={this.toggleNodeOpening}
              onNodeSelect={this.selectNode}
              selectedNodeId={selectedNodeId}
            />
          ))
        )}
      </ul>
    );
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};
