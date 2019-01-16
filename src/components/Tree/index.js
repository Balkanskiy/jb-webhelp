import React, { PureComponent } from "react";
import TreeNode from "../TreeNode/index.js";
import PropTypes from "prop-types";

export default class Tree extends PureComponent {
  static getDerivedStateFromProps(props, state) {
    if (props.request !== state.request) {
      return { nodes: props.nodes };
    }
    return null;
  }

  state = {
    nodes: this.props.nodes,
    selectedNodeId: "",
    selectedAnchorId: ""
  };

  getRootNodes = () =>
    Object.values(this.state.nodes).filter(node => node.level === 0);

  getChildNodes = node => node.pages.map(title => this.state.nodes[title]);

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

  render() {
    const { selectedNodeId, selectedAnchorId } = this.state;
    const { anchors } = this.props;
    const rootNodes = this.getRootNodes();

    return (
      <ul>
        {rootNodes.map(node => (
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
        ))}
      </ul>
    );
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};
