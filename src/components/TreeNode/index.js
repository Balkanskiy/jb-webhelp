import React from "react";
import PropTypes from "prop-types";
import Arrow from "./arrow";
import css from "./styles.module.css";

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20 + 20;
  if (type === "file") paddingLeft += 20;
  return paddingLeft;
};

const TreeNode = props => {
  const {
    node,
    getChildNodes,
    level,
    onToggle,
    onNodeSelect,
    selectedNodeId
  } = props;

  const isNodeSelected = node.id === selectedNodeId && css.titleSelected;

  return (
    <React.Fragment>
      <div
        className={[css.treeNode, isNodeSelected && css.selectedNode].join(" ")}
        style={{ paddingLeft: getPaddingLeft(level, node.type) }}
      >
        <div
          className={[css.nodeIcon, node.isOpened && css.nodeIconOpened].join(
            " "
          )}
          onClick={() => onToggle(node)}
        >
          {node.pages && <Arrow />}
        </div>

        <span
          className={[
            css.title,
            node.id === selectedNodeId && css.titleSelected
          ].join(" ")}
          role="button"
          onClick={() => onNodeSelect(node)}
        >
          {node.title}
        </span>
      </div>

      {node.isOpened &&
        getChildNodes(node).map(childNode => (
          <TreeNode {...props} node={childNode} level={level + 1} />
        ))}
    </React.Fragment>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
