import React from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
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

  const nodeStyles = {
    className: [css.node, isNodeSelected ? css.nodeSelected : []].join(" "),
    style: { paddingLeft: getPaddingLeft(level, node.type) }
  };

  const iconClassNames = [css.icon, node.isOpened ? css.iconOpened : null].join(
    " "
  );
  const titleClassNames = [
    css.title,
    node.id === selectedNodeId ? css.titleSelected : null
  ].join(" ");

  const anchorStyles = {
    className: [
      css.title,
      node.id === selectedNodeId ? css.titleSelected : null
    ].join(" "),
    style: { paddingLeft: getPaddingLeft(level, node.type) }
  };

  const childClassNames = [
    css.child,
    node.isOpened ? css.childOpened : null
  ].join(" ");

  return (
    <React.Fragment>
      <li {...nodeStyles}>
        {node.pages && (
          <Icon className={iconClassNames} onClick={() => onToggle(node)} />
        )}
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
                    role="button"
                    tabIndex={0}
                    onClick={() => onAnchorSelect(node)}
                    onKeyPress={() => onAnchorSelect(node)}
                    {...anchorStyles}
                  >
                    {anchors[anchor].title}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </li>
      {node.pages && node.isOpened && (
        <ul className={childClassNames}>
          {getChildNodes(node).map(childNode => (
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
  anchors: PropTypes.object.isRequired
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
