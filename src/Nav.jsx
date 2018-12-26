import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import NavItem from './NavItem';
import match from './match-component';
import styles from './index.styl';

class Nav extends React.Component {
    static propTypes = {
        componentType: PropTypes.any,

        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        // Callback fired when a navigation item is selected.
        onSelect: PropTypes.func,

        // The selected navigation item.
        selected: PropTypes.any,

        // The initially selected navigation item.
        defaultSelected: PropTypes.any,

        //
        // SideNav props
        //

        // Whether the side navigation is expanded or collapsed.
        expanded: PropTypes.bool
    };
    static defaultProps = {
        componentClass: 'div'
    };

    state = {
        activeItems: {},
        highlightedItems: {},
        selected: this.props.selected ? this.props.selected : this.props.defaultSelected
    };

    componentDidMount() {
        console.log('here1');
        this.setState(state => {
            const newObj = state.activeItems;
            newObj.selected = state.selected;
            return {
                highlightedItems: newObj
            };
        });
    }

    isNavItem = match(NavItem);

    changeHighlightedItems = (selected, subLevel) => {
        this.setState(state => {
            console.log('here2');
            const newObj = state.activeItems;
            newObj[subLevel] = selected;
            return {
                selected,
                highlightedItems: newObj
            };
        });
    }

    clearState = (type, eventKey, level) => {
        if (type === 'subNav' && this.state.activeItems[level] === eventKey) {
            return this.setState({
                selected: undefined
            });
        }
        return this.setState({
            activeItems: {},
            selected: undefined
        });
    }

    addActiveItem = (item, level) => {
        this.setState(state => {
            const activeItems = state.activeItems;
            if (activeItems[level] === item && this.props.expanded) {
                activeItems[level] = null;
            } else {
                activeItems[level] = item;
            }
            return ({
                activeItems
            });
        });
    }

    renderNavItem(child, { onSelect, ...props }) {
        return cloneElement(child, {
            ...props,
            onClick: chainedFunction(
                this.addActiveItem
            ),
            onSelect: chainedFunction(
                child.props.onSelect,
                this.changeHighlightedItems,
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

            // Props passed from SideNav component
            expanded,

            className,
            children,
            ...props
        } = this.props;

        console.log(this.state.highlightedItems);

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
                        return this.renderNavItem(child, {
                            onSelect,
                            selected: this.state.selected,
                            expanded: this.props.expanded && (child.props.eventKey === this.state.selected
                              || this.state.activeItems['0'] === child.props.eventKey),
                            subLevel: 0,
                            addActiveItem: this.addActiveItem,
                            activeItems: this.state.activeItems,
                            clearState: this.clearState,
                            highlightedItems: this.state.highlightedItems
                        });
                    }

                    return child;
                })}
            </Component>
        );
    }
}

// For component matching
Nav.defaultProps.componentType = Nav;

export default Nav;
