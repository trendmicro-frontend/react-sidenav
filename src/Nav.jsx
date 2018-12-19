import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import NavItem from './NavItem';
import match from './match-component';
import styles from './index.styl';

class Nav extends PureComponent {
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
        expandedNavItem: null,
        selected: this.props.defaultSelected,
        defaultSelected: this.props.defaultSelected,
        activeItems: []
    };

    isNavItem = match(NavItem);

    handleClickOnExpanded(eventKey, event) {
        if (this.props.expanded) {
            this.setState(state => ({
                expandedNavItem: state.expandedNavItem !== eventKey ? eventKey : ''
            }));
        } else {
            this.setState(state => ({
                expandedNavItem: eventKey
            }));
        }
    }

    addActiveItem = (item) => {
        this.setState(state => ({
            activeItems: [...state.activeItems, item]
        }));
    }

    renderNavItem(child, { onSelect, ...props }) {
        const { eventKey } = { ...child.props };

        return cloneElement(child, {
            ...props,
            onClick: chainedFunction(
                child.props.onClick,
                (event) => {
                    this.handleClickOnExpanded(eventKey, event);
                }
            ),
            onSelect: chainedFunction(
                (selected) => {
                    this.setState({
                        selected,
                        activeItems: []
                    });
                },
                child.props.onSelect,
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

            selected,

            className,
            children,
            ...props
        } = this.props;

        const currentSelected = this.state.defaultSelected
            ? this.state.selected
            : selected;

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
                {React.Children.map(children, child => {
                    if (React.isValidElement(child) && this.isNavItem(child)) {
                        return this.renderNavItem(child, {
                            onSelect,
                            selected: currentSelected,
                            expanded: (!!child.props.expanded) ||
                                (expanded && !!this.state.expandedNavItem && this.state.expandedNavItem === child.props.eventKey),
                            subLevel: 0,
                            isSideNavExpanded: expanded,
                            addActiveItem: this.addActiveItem,
                            activeItems: this.state.activeItems
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
