import Anchor from '@trendmicro/react-anchor';
import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import NavIcon from './NavIcon';
import NavText from './NavText';
import findComponent from './find-component';
import styles from './index.styl';

const noop = () => {};
const findNavIcon = findComponent(NavIcon);
const findNavText = findComponent(NavText);

class NavItem extends PureComponent {
    static propTypes = {
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

        // HTML `href` attribute corresponding to `a.href`.
        href: PropTypes.string,

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

    handleSelect = (event) => {
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

        const navIcon = findNavIcon(children);
        const navText = findNavText(children);

        if (subnav) {
            const highlighted = active ||
                (!!selected && selected === this.props.eventKey);

            return (
                <Component
                    role="presentation"
                    className={cx(className, styles.sidenavSubnavitem, {
                        [styles.selected]: highlighted,
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
                            this.handleSelect
                        )}
                    >
                        <div className={styles.sidenavNavIcon}>
                            {navIcon && navIcon.props ? navIcon.props.children : null}
                        </div>
                        <div className={styles.sidenavNavText}>
                            {navText && navText.props ? navText.props.children : null}
                        </div>
                    </Anchor>
                </Component>
            );
        }

        const activeNavItems = [];
        const navItems = React.Children.toArray(children)
            .filter(child => {
                return React.isValidElement(child) && (child.type === NavItem);
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
                if (React.isValidElement(child) && (child.type === NavIcon || child.type === NavText || child.type === NavItem)) {
                    return false;
                }
                return true;
            });

        const highlighted = active || expanded ||
            (activeNavItems.length > 0) ||
            (!!selected && selected === this.props.eventKey);

        return (
            <Component
                role="presentation"
                className={cx(className, styles.sidenavNavitem, {
                    [styles.selected]: highlighted,
                    [styles.expanded]: expanded,
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
                        (navItems.length === 0) ? this.handleSelect : noop
                    )}
                >
                    <div className={styles.sidenavNavIcon}>
                        {navIcon && navIcon.props ? navIcon.props.children : null}
                    </div>
                    <div className={styles.sidenavNavText}>
                        {navText && navText.props ? navText.props.children : null}
                    </div>
                </Anchor>
                {others}
                {(navItems.length > 0) &&
                    <div
                        {...props}
                        role="menu"
                        className={cx({
                            [styles.sidenavSubnav]: true,
                            [styles.sidenavSubnavSelected]: activeNavItems.length > 0
                        })}
                    >
                        <Component
                            role="heading"
                            className={cx(className, styles.sidenavSubnavitem, {
                                [styles.selected]: active,
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

export default NavItem;
