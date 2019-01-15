import React from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import css from "./styles.module.css";

const getPaddingLeft = level => level * 20 + 5;

const KEY_CODES = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37
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

  const nodeStyles = {
    className: [css.node, isNodeSelected ? css.nodeSelected : []].join(" "),
    style: { paddingLeft: getPaddingLeft(level, node.type) }
  };

  const iconClassNames = [css.icon, node.isOpened ? css.iconOpened : null].join(
    " "
  );
  const titleClassNames = [
    css.title,
    isNodeSelected ? css.titleSelected : null
  ].join(" ");

  const childClassNames = [
    css.child,
    node.isOpened ? css.childOpened : null
  ].join(" ");

  const keyBoardControl = ({ type, keyCode }) => {
    switch (type) {
      case "keydown": {
        if (
          keyCode === KEY_CODES.ARROW_RIGHT ||
          keyCode === KEY_CODES.ARROW_LEFT
        ) {
          onToggle(node);
        }
        break;
      }
      case "keypress": {
        onNodeSelect(node);
        break;
      }
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <li {...nodeStyles}>
        {node.pages && (
          <Icon className={iconClassNames} onClick={() => onToggle(node)} />
        )}
        <div className={css.text}>
          <span
            className={titleClassNames}
            role="link"
            onClick={() => onNodeSelect(node)}
            onKeyDown={keyBoardControl}
            onKeyPress={keyBoardControl}
            tabIndex={0}
          >
            {node.title}
          </span>
          {node.anchors && isNodeSelected && (
            <ul>
              {node.anchors.map(anchor => {
                const currentAnchor = anchors[anchor];
                return (
                  <li
                    key={currentAnchor.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onAnchorSelect(currentAnchor)}
                    onKeyPress={() => onAnchorSelect(currentAnchor)}
                    className={[
                      css.anchor,
                      currentAnchor.id === selectedAnchorId
                        ? css.anchorSelected
                        : null
                    ].join(" ")}
                    style={{ paddingLeft: "35px" }}
                  >
                    {currentAnchor.title}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </li>
      <div className={childClassNames}>
        {node.pages && node.isOpened && (
          <ul>
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
      </div>
    </React.Fragment>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  selectedNodeId: PropTypes.string.isRequired,
  selectedAnchorId: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired,
  onAnchorSelect: PropTypes.func.isRequired,
  anchors: PropTypes.object.isRequired
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
