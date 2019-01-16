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

  const styles = {
    node: {
      className: `${css.node} ${isNodeSelected ? css.nodeSelected : ""}`,
      style: { paddingLeft: getPaddingLeft(level, node.type) }
    },
    icon: {
      className: `${css.icon} ${node.isOpened ? css.iconOpened : ""}`
    },
    title: {
      className: `${css.title} ${isNodeSelected ? css.titleSelected : ""}`
    },
    child: {
      className: `${css.child} ${node.isOpened ? css.childOpened : ""}`
    }
  };

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
      <li {...styles.node}>
        {node.pages && <Icon {...styles.icon} onClick={() => onToggle(node)} />}
        <div className={css.text}>
          <span
            {...styles.title}
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
                    className={`${css.anchor} ${
                      currentAnchor.id === selectedAnchorId
                        ? css.anchorSelected
                        : ""
                    }`}
                  >
                    {currentAnchor.title}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </li>
      <div {...styles.child}>
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
  anchors: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired,
  onAnchorSelect: PropTypes.func.isRequired,
  selectedNodeId: PropTypes.string.isRequired,
  selectedAnchorId: PropTypes.string.isRequired
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
