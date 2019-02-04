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
  state = {
    isNodeSelected: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.selectedNodeId !== state.selectedNodeId) {
      return {
        isNodeSelected: props.node.id === props.selectedNodeId
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.node.id === nextProps.selectedNodeId ||
      this.state.isNodeSelected !== nextState.isNodeSelected ||
      this.props.node.isOpened !== nextProps.node.isOpened ||
      !!this.props.node.isOpened
    );
  }

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

  handleTitleClick = event => {
    event.preventDefault();
    const { node, onNodeSelect, onToggle } = this.props;
    onNodeSelect(node);
    onToggle(node);
  };

  handleIconClick = event => {
    event.preventDefault();
    const { node, onToggle } = this.props;
    onToggle(node);
  };

  handleAnchorClick = (currentAnchor, event) => {
    event.preventDefault();
    this.props.onAnchorSelect(currentAnchor);
  };

  renderAnchors = (nodeAnchors = []) => {
    const { anchors, selectedAnchorId } = this.props;
    return (
      nodeAnchors.length > 0 && (
        <ul>
          {nodeAnchors.map(anchor => {
            const currentAnchor = anchors[anchor];
            return (
              <li
                key={currentAnchor.id}
                role="button"
                tabIndex={0}
                onClick={this.handleAnchorClick.bind(this, currentAnchor)}
                onKeyPress={this.handleAnchorClick.bind(this, currentAnchor)}
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
      )
    );
  };

  renderChildren = () => {
    const { node, getChildNodes, level } = this.props;
    const childrenStyles = {
      className: `${css.children} ${node.isOpened ? css.childrenOpened : ""}`
    };
    return (
      getChildNodes.length > 0 && (
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
      )
    );
  };

  render() {
    const { node, level } = this.props;
    const { isNodeSelected } = this.state;

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
            <Icon {...styles.icon} onClick={this.handleIconClick} />
          )}
          <div className={css.text}>
            <span
              {...styles.title}
              role="link"
              onClick={this.handleTitleClick}
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
