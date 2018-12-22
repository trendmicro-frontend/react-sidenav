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
        highlitedItems: {},
        selected: this.props.selected ? this.props.selected : this.props.defaultSelected
    };

    componentDidMount() {
        this.setState(state => {
            const newObj = state.activeItems;
            newObj.selected = this.state.selected;
            return {
                highlitedItems: newObj
            };
        });
    }

    isNavItem = match(NavItem);

    clearState = (type, eventKey) => { //eslint-disable-line
        // if (type === 'subNav') {
        //     const newObj = this.state.activeItems;
        //     for (const key in newObj) {
        //         if (newObj.hasOwnProperty(key)) { // eslint-disable-line
        //             const element = newObj[key];
        //             if (eventKey === element) {
        //                 const newActiveItems = this.state.activeItems;
        //                 delete newActiveItems[key];
        //                 return this.setState({
        //                     activeItems: {},
        //                     selected: undefined
        //                 });
        //             }
        //             console.log('this.state');
        //         }
        //     }
        // }
        // console.log('triggers');
        return this.setState({
            selected: undefined,
            activeItems: {}
        });
    }

    addActiveItem = (item, level) => {
        this.setState(state => {
            const activeItems = state.activeItems;
            activeItems[level] = item;
            return ({
                activeItems
            });
        });
    }

    renderNavItem(child, { onSelect, ...props }) {
        return cloneElement(child, {
            ...props,
            onClick: chainedFunction(
                child.props.onClick,
                this.clearState,
                this.addActiveItem
            ),
            onSelect: chainedFunction(
                child.props.onSelect,
                (selected, subLevel) => this.setState(state => {
                    const newObj = state.activeItems;
                    newObj[subLevel] = selected;
                    return {
                        selected,
                        highlitedItems: newObj
                    };
                }),
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
                            expanded: child.props.eventKey === this.state.selected
                              || this.state.activeItems['0'] === child.props.eventKey,
                            subLevel: 0,
                            addActiveItem: this.addActiveItem,
                            activeItems: this.state.activeItems,
                            clearState: this.clearState,
                            highlitedItems: this.state.highlitedItems
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
