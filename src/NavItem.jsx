import Anchor from '@trendmicro/react-anchor';
import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import SubNavItem from './SubNavItem';
import styles from './index.styl';

class NavItem extends PureComponent {
    static propTypes = {
        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        title: PropTypes.any,

        icon: PropTypes.any,

        // Highlight the navigation item as active.
        active: PropTypes.bool,

        // Disable the navigation item, making it unselectable.
        disabled: PropTypes.bool,

        // Whether the navigation item is expanded or collapsed.
        expanded: PropTypes.bool,

        // Value passed to the `onSelect` handler, useful for identifying the selected navigation item.
        eventKey: PropTypes.any,

        // Style the navigation item as header label, useful for describing a group of navigation items.
        header: PropTypes.bool,

        // HTML `href` attribute corresponding to `a.href`.
        href: PropTypes.string,

        // Callback fired when the navigation item is clicked.
        onClick: PropTypes.func,

        // Callback fired when the navigation item is selected.
        onSelect: PropTypes.func
    };
    static defaultProps = {
        componentClass: 'li',
        active: false,
        disabled: false,
        expanded: false,
        header: false
    };

    handleClick = (event) => {
        const { href, disabled, onSelect, eventKey } = this.props;

        if (!href || disabled) {
            event.preventDefault();
        }

        if (disabled) {
            return;
        }

        if (onSelect) {
            onSelect(eventKey, event);
        }
    };

    render() {
        const {
            componentClass: Component,
            title,
            icon,
            active,
            disabled,
            expanded,
            eventKey, // eslint-disable-line
            header, // eslint-disable-line
            onClick,
            onSelect,
            className,
            style,
            children,
            ...props
        } = this.props;

        const activeNavItems = [];
        const navItems = React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return child;
            }

            if (child.props.active) {
                activeNavItems.push(child);
            }

            return cloneElement(child, {
                onSelect: chainedFunction(
                    child.props.onSelect,
                    onSelect
                )
            });
        });

        return (
            <Component
                role="presentation"
                className={cx(className, styles.sidenavNavitem, {
                    [styles.selected]: active || activeNavItems.length > 0,
                    [styles.expanded]: expanded || active,
                    [styles.disabled]: disabled
                })}
                style={style}
            >
                <Anchor
                    {...props}
                    disabled={disabled}
                    role="menuitem"
                    tabIndex="-1"
                    onClick={chainedFunction(
                        onClick,
                        this.handleClick
                    )}
                >
                    <span className={styles.sidenavNavitemIcon}>{icon}</span>
                    <span className={styles.sidenavNavitemTitle}>{title}</span>
                </Anchor>
                {navItems &&
                    <ul
                        {...props}
                        role="menu"
                        className={cx({
                            [styles.sidenavSubnav]: true,
                            [styles.sidenavSubnavSelected]: activeNavItems.length > 0
                        })}
                    >
                        <SubNavItem header>{title}</SubNavItem>
                        {navItems}
                    </ul>
                }
            </Component>
        );
    }
}

export default NavItem;
