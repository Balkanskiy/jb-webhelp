import React from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import css from "./styles.module.css";

const getPaddingLeft = level => level * 20 + 5;

const KEY_CODES = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37
};

class TreeNode extends React.Component {
  keyBoardControl = event => {
    const { type, keyCode } = event;
    const { node, onToggle, onNodeSelect } = this.props;
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
        event.preventDefault();
        onNodeSelect(node);
        break;
      }
      default:
        break;
    }
  };

  renderAnchors = (nodeAnchors = []) => {
    const { anchors, onAnchorSelect, selectedAnchorId } = this.props;
    return (
      <ul>
        {nodeAnchors.map(anchor => {
          const currentAnchor = anchors[anchor];
          return (
            <li
              key={currentAnchor.id}
              role="button"
              tabIndex={0}
              onClick={() => onAnchorSelect(currentAnchor)}
              onKeyPress={() => onAnchorSelect(currentAnchor)}
              className={`${css.anchor} ${
                currentAnchor.id === selectedAnchorId ? css.anchorSelected : ""
              }`}
            >
              {currentAnchor.title}
            </li>
          );
        })}
      </ul>
    );
  };

  renderChildren = () => {
    const { node, getChildNodes, level } = this.props;
    const childrenStyles = {
      className: `${css.children} ${node.isOpened ? css.childrenOpened : ""}`
    };
    return (
      <ul {...childrenStyles} id={node.id}>
        {getChildNodes(node).map(childNode => (
          <TreeNode
            {...this.props}
            node={childNode}
            key={childNode.id}
            level={level + 1}
          />
        ))}
      </ul>
    );
  };

  render() {
    const {
      node,
      level,
      onToggle,
      onNodeSelect,
      selectedNodeId,
    } = this.props;

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
      children: {
        className: `${css.children} ${node.isOpened ? css.childrenOpened : ""}`
      }
    };

    return (
      <React.Fragment>
        <li {...styles.node}>
          {node.pages && (
            <Icon {...styles.icon} onClick={() => onToggle(node)} />
          )}
          <div className={css.text}>
            <span
              {...styles.title}
              role="link"
              onClick={() => {
                onNodeSelect(node);
                onToggle(node);
              }}
              onKeyDown={this.keyBoardControl}
              onKeyPress={this.keyBoardControl}
              tabIndex={0}
            >
              {node.title}
            </span>
            {isNodeSelected && this.renderAnchors(node.anchors)}
          </div>
        </li>
        {node.pages && node.isOpened && this.renderChildren()}
      </React.Fragment>
    );
  }
}

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
