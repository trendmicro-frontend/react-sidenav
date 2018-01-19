/* eslint jsx-a11y/click-events-have-key-events: 0 */
import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import NavIcon from './NavIcon';
import NavText from './NavText';
import findComponent from './find-component';
import match from './match-component';
import styles from './index.styl';

const noop = () => {};

class NavItem extends PureComponent {
    static propTypes = {
        componentType: PropTypes.any,

        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        // Highlight the navigation item as active.
        active: PropTypes.bool,

        // Disable the navigation item, making it unselectable.
        disabled: PropTypes.bool,

        // Whether the navigation item is expanded or collapsed.
        expanded: PropTypes.bool,

        // Value passed to the `onSelect` handler, useful for identifying the selected navigation item.
        eventKey: PropTypes.any,

        // Callback fired when the navigation item is clicked.
        onClick: PropTypes.func,

        // Callback fired when a navigation item is selected.
        onSelect: PropTypes.func,

        //
        // Nav props
        //

        // The selected navigation item.
        selected: PropTypes.any,

        //
        // Sub navigation item (internal use only)
        //

        // Whether it is a sub navigation item.
        subnav: PropTypes.bool
    };
    static defaultProps = {
        componentClass: 'div',
        active: false,
        disabled: false,
        expanded: false
    };

    findNavIcon = findComponent(NavIcon);
    findNavText = findComponent(NavText);
    isNavItem = match(NavItem);
    isNavIcon = match(NavIcon);
    isNavText = match(NavText);

    handleSelect = (event) => {
        const {
            disabled, onSelect, eventKey
        } = this.props;

        if (disabled) {
            event.preventDefault();
            return;
        }

        if (onSelect) {
            onSelect(eventKey, event);
        }
    };

    render() {
        const {
            componentType, // eslint-disable-line
            componentClass: Component,
            active,
            disabled,
            expanded,
            eventKey, // eslint-disable-line
            onClick,
            onSelect,

            // Nav props
            selected,

            // Sub navigation item
            subnav,

            // Default props
            className,
            style,
            children,
            ...props
        } = this.props;

        const navIcon = this.findNavIcon(children);
        const navText = this.findNavText(children);

        if (subnav) {
            const isNavItemSelected = active || (!!selected && selected === this.props.eventKey);

            return (
                <Component
                    role="presentation"
                    className={cx(className, styles.sidenavSubnavitem, {
                        [styles.selected]: isNavItemSelected,
                        [styles.disabled]: disabled
                    })}
                    style={style}
                >
                    <div
                        {...props}
                        className={styles.navitem}
                        disabled={disabled}
                        role="menuitem"
                        tabIndex="-1"
                        onClick={chainedFunction(
                            onClick,
                            this.handleSelect
                        )}
                    >
                        <div className={styles.navicon}>
                            {navIcon && navIcon.props ? navIcon.props.children : null}
                        </div>
                        <div className={styles.navtext}>
                            {navText && navText.props ? navText.props.children : null}
                        </div>
                    </div>
                </Component>
            );
        }

        const activeNavItems = [];
        const navItems = React.Children.toArray(children)
            .filter(child => {
                return React.isValidElement(child) && this.isNavItem(child);
            })
            .map(child => {
                if (child.props.active || (!!selected && selected === child.props.eventKey)) {
                    activeNavItems.push(child);
                }

                return cloneElement(child, {
                    subnav: true,
                    selected,
                    onSelect: chainedFunction(
                        child.props.onSelect,
                        onSelect
                    )
                });
            });
        const others = React.Children.toArray(children)
            .filter(child => {
                if (React.isValidElement(child) && (this.isNavIcon(child) || this.isNavText(child) || this.isNavItem(child))) {
                    return false;
                }
                return true;
            });

        const isNavItemSelected = active || (!!selected && selected === this.props.eventKey) || (activeNavItems.length > 0);
        const isNavItemHighlighted = expanded || isNavItemSelected;
        const isNavItemExpandable = (navItems.length > 0);
        const isNavItemExpanded = isNavItemExpandable && expanded;

        return (
            <Component
                role="presentation"
                className={cx(className, styles.sidenavNavitem, {
                    [styles.selected]: isNavItemSelected,
                    [styles.highlighted]: isNavItemHighlighted,
                    [styles.expandable]: isNavItemExpandable,
                    [styles.expanded]: isNavItemExpanded,
                    [styles.disabled]: disabled
                })}
                style={style}
            >
                <div
                    {...props}
                    className={styles.navitem}
                    disabled={disabled}
                    role="menuitem"
                    tabIndex="-1"
                    onClick={chainedFunction(
                        onClick,
                        (navItems.length === 0) ? this.handleSelect : noop
                    )}
                >
                    <div className={styles.navicon}>
                        {navIcon && navIcon.props ? navIcon.props.children : null}
                    </div>
                    <div className={styles.navtext}>
                        {navText && navText.props ? navText.props.children : null}
                    </div>
                    {others}
                </div>
                {(navItems.length > 0) &&
                    <div
                        {...props}
                        role="menu"
                        className={cx({
                            [styles.sidenavSubnav]: true
                        })}
                    >
                        <Component
                            role="heading"
                            className={cx(className, styles.sidenavSubnavitem, {
                                [styles.highlighted]: active,
                                [styles.disabled]: disabled
                            })}
                            style={style}
                        >
                            {navText && navText.props ? navText.props.children : null}
                        </Component>
                        {navItems}
                    </div>
                }
            </Component>
        );
    }
}

// For component matching
NavItem.defaultProps.componentType = NavItem;

export default NavItem;
