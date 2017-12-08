import Anchor from '@trendmicro/react-anchor';
import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './index.styl';

class NavItem extends PureComponent {
    static propTypes = {
        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        // Sidenav
        // Highlight the nav item as active.
        active: PropTypes.bool,

        // Disable the nav item, making it unselectable.
        disabled: PropTypes.bool,

        // Style the nav item as a horizontal rule, providing visual separation between groups of menu items.
        divider: PropTypes.bool,

        // Value passed to the `onSelect` handler, useful for identifying the selected nav item.
        eventKey: PropTypes.any,

        // Style the nav item as header label, useful for describing a group of nav items.
        header: PropTypes.bool,

        // HTML `href` attribute corresponding to `a.href`.
        href: PropTypes.string,

        // Callback fired when the nav item is clicked.
        onClick: PropTypes.func,

        // Callback fired when the nav item is selected.
        onSelect: PropTypes.func
    };
    static defaultProps = {
        componentClass: 'li',
        active: false,
        disabled: false,
        divider: false,
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
            active,
            disabled,
            divider,
            header,
            onClick,
            className,
            style,
            ...props
        } = this.props;

        delete props.eventKey;
        delete props.onSelect;

        if (divider) {
            // Forcibly blank out the children; separators shouldn't render any.
            props.children = undefined;

            return (
                <Component
                    {...props}
                    role="separator"
                    className={cx(className, styles.sidenavNavitem, styles.divider)}
                    style={style}
                />
            );
        }

        if (header) {
            return (
                <Component
                    {...props}
                    role="heading"
                    className={cx(className, styles.sidenavNavitem, styles.header)}
                    style={style}
                />
            );
        }

        return (
            <Component
                role="presentation"
                className={cx(className, styles.sidenavNavitem, {
                    [styles.selected]: active,
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
                />
            </Component>
        );
    }
}

export default NavItem;
