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
    anchors,
    getChildNodes,
    level,
    onToggle,
    onNodeSelect,
    onAnchorSelect,
    selectedNodeId,
    selectedAnchorId
  } = props;

  const isNodeSelected = node.id === selectedNodeId;
  const isAnchorSelected = node.id === selectedAnchorId;
  const itemClassNames = [
    css.treeNode,
    isNodeSelected && css.selectedNode
  ].join(" ");
  const iconClassNames = [css.icon, node.isOpened && css.iconOpened].join(" ");
  const titleClassNames = [
    css.menuItem,
    node.id === selectedNodeId && css.menuItemSelected
  ].join(" ");
  const anchorClassNames = [
    css.menuItem,
    node.id === isAnchorSelected && css.menuItemSelected
  ].join(" ");
  const childClassNames = [css.child, node.isOpened && css.childOpened].join(
    " "
  );

  return (
    <React.Fragment>
      <li
        className={itemClassNames}
        style={{ paddingLeft: getPaddingLeft(level, node.type) }}
      >
        <div className={iconClassNames} onClick={() => onToggle(node)}>
          {node.pages && <Arrow />}
        </div>

        <div>
          <span
            className={titleClassNames}
            role="link"
            onClick={() => onNodeSelect(node)}
            onKeyPress={() => onNodeSelect(node)}
            tabIndex={0}
          >
            {node.title}
          </span>
          {node.anchors && isNodeSelected && (
            <ul>
              {node.anchors.map(anchor => {
                return (
                  <li
                    key={anchor.id}
                    className={anchorClassNames}
                    style={{ paddingLeft: getPaddingLeft(level, node.type) }}
                    role="button"
                    tabIndex={0}
                    onClick={() => onAnchorSelect(node)}
                    onKeyPress={() => onAnchorSelect(node)}
                  >
                    {anchors[anchor].title}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </li>
      {node.pages && (
        <ul className={childClassNames}>
          {node.isOpened &&
            getChildNodes(node).map(childNode => (
              <TreeNode
                {...props}
                node={childNode}
                key={childNode.id}
                level={level + 1}
              />
            ))}
        </ul>
      )}
    </React.Fragment>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired,
  onAnchorSelect: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  anchors: PropTypes.object.isRequired
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
