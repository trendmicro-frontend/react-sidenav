import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { connect } from 'react-redux';

import NavItem from './NavItem';
import match from './match-component';
import styles from './index.styl';
import {
    changeActive, clearActive,
    addHighlighted, clearHighlighted,
    setSelected
} from './actions';

class Nav extends React.Component {
    isNavItem = match(NavItem);

    componentDidMount() {
        this.props.setSelected(this.props.selected);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.expanded && nextProps.expanded) {
            this.props.setSelected(undefined);
            this.props.changeActive({ eventKey: null, level: 1 });
        }
    }

    changeSelected = (selected) => {
        this.props.clearHighlighted();
        this.props.setSelected(selected);
    }

    changeActiveItems = (eventKey, level) => {
        const { activeItems, expanded, changeActive } = this.props;

        this.props.setSelected(undefined);

        if (activeItems[level] === eventKey && expanded) {
            changeActive({ eventKey: null, level });
        } else {
            changeActive({ eventKey, level });
        }
    }

    renderNavItem(child, { onSelect, ...props }) {
        return cloneElement(child, {
            ...props,
            onSelect: chainedFunction(
                child.props.onSelect,
                this.changeSelected,
                onSelect
            )
        });
    }

    render() {
        const {
            componentType, // eslint-disable-line
            componentClass: Component,
            onSelect,
            defaultSelected, // eslint-disable-line
            expanded,
            className,
            children,
            highlightedItems,
            localSelected,
            addHighlighted,
            activeItems,
            ...props
        } = this.props;

        return (
            <Component
                {...props}
                role="menu"
                className={cx(
                    className,
                    styles.sidenavNav,
                    { [styles.expanded]: expanded }
                )}
            >
                {React.Children.map(children, (child, i) => {
                    if (React.isValidElement(child) && this.isNavItem(child)) {
                        if (child.props.eventKey === localSelected && !highlightedItems.includes(child.props.eventKey)) {
                            addHighlighted(child.props.eventKey);
                        }

                        return this.renderNavItem(child, {
                            onSelect,
                            selected: localSelected,
                            expanded: expanded &&
                              (child.props.eventKey === localSelected || activeItems['0'] === child.props.eventKey),
                            subLevel: 0,
                            addActiveItem: this.changeActiveItems,
                            activeItems: activeItems,
                            highlightedItems: highlightedItems,
                            addHighlightedItem: this.props.addHighlighted
                        });
                    }
                    return child;
                })}
            </Component>
        );
    }
}

Nav.propTypes = {
    componentType: PropTypes.any,
    componentClass: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    onSelect: PropTypes.func,
    selected: PropTypes.any,
    defaultSelected: PropTypes.any,
    expanded: PropTypes.bool,
    addHighlighted: PropTypes.func,
    clearHighlighted: PropTypes.func,
    changeActive: PropTypes.func,
    clearActive: PropTypes.func,
    setSelected: PropTypes.func,
    highlightedItems: PropTypes.arrayOf(PropTypes.string),
    activeItems: PropTypes.shape({}),
    localSelected: PropTypes.string
};

Nav.defaultProps = {
    componentClass: 'div'
};

Nav.defaultProps.componentType = Nav;

const mapStateToProps = state => {
    return {
        activeItems: state.items.activeItems,
        highlightedItems: state.items.highlightedItems,
        localSelected: state.items.selected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeActive: item => {
            dispatch(changeActive(item));
        },
        clearActive: item => {
            dispatch(clearActive(item));
        },
        addHighlighted: item => {
            dispatch(addHighlighted(item));
        },
        clearHighlighted: item => {
            dispatch(clearHighlighted(item));
        },
        setSelected: selected => {
            dispatch(setSelected(selected));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
