import React, { PureComponent } from "react";
import TreeNode from "../TreeNode/index.js";
import PropTypes from "prop-types";

const openParentsNodes = (node, level, nodes) => {
  if (level === 0) {
    return nodes;
  } else {
    const parentNode = {
      ...nodes[node.parentId],
      isOpened: true
    };
    const updatedNodes = {
      ...nodes,
      [parentNode.id]: parentNode
    };
    return openParentsNodes(parentNode, parentNode.level, updatedNodes);
  }
};

export default class Tree extends PureComponent {
  state = {
    nodes: this.props.nodes,
    selectedNodeId: "",
    selectedAnchorId: "",
    entityId: "",
    entityTitle: ""
  };

  static getDerivedStateFromProps(
    { nodes, anchors, entityId, entityTitle },
    state
  ) {
    if (entityId && entityId !== state.entityId) {
      const selectedNode = nodes[entityId];
      if (selectedNode) {
        return {
          nodes: openParentsNodes(selectedNode, selectedNode.level, nodes),
          selectedNodeId: entityId,
          entityId: entityId
        };
      }
      const selectedAnchor = anchors[entityId];
      if (selectedAnchor) {
        const anchorParentId = selectedAnchor.parentId;
        return {
          nodes: openParentsNodes(
            nodes[anchorParentId],
            nodes[anchorParentId].level,
            nodes
          ),
          selectedNodeId: anchorParentId,
          selectedAnchorId: entityId,
          entityId: entityId
        };
      }
    }
    if (entityTitle && entityTitle !== state.entityTitle) {
      const nodesArray = Object.entries(nodes);
      const anchorsArray = Object.entries(anchors);

      if (nodesArray.length > 0) {
        const selectedItem = nodesArray.find(
          node => node[1].title === entityTitle
        );

        if (selectedItem) {
          const [id, selectedNode] = selectedItem;

          return {
            nodes: openParentsNodes(selectedNode, selectedNode.level, nodes),
            selectedNodeId: id,
            entityTitle: entityTitle
          };
        }
      }
      if (anchorsArray.length > 0) {
        const selectedItem = anchorsArray.find(
          anchor => anchor[1].title === entityTitle
        );

        if (selectedItem) {
          const [id, selectedAnchor] = selectedItem;
          const anchorParentId = selectedAnchor.parentId;
          return {
            nodes: openParentsNodes(
              nodes[anchorParentId],
              nodes[anchorParentId].level,
              nodes
            ),
            selectedNodeId: anchorParentId,
            selectedAnchorId: id,
            entityTitle: entityTitle
          };
        }
      }
    }
    return null;
  }

  getFilteredNodes = () => {
    if (this.props.searchQuery !== "") {
      const regex = new RegExp(this.props.searchQuery, "i");
      return Object.values(this.state.nodes).filter(node =>
        regex.test(node.title)
      );
    }
    return Object.values(this.state.nodes);

    // let result = filteredNodes.map(node => {
    //   if (node.level !== 0) {
    //     if (!filteredNodes.find(item => node.parentId === item.id)) {
    //       return { ...this.state.nodes[node.parentId], isOpened: true };
    //     }
    //   }
    //   return node;
    // });
  };

  getRootNodes = arr => arr.filter(node => node.level === 0);

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
    const filteredNodes = this.getFilteredNodes();
    const rootNodes = this.getRootNodes(filteredNodes);

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
  nodes: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  entityId: PropTypes.string,
  entityTitle: PropTypes.string
};

Tree.defaultProps = {
  entityId: "",
  entityTitle: ""
};
