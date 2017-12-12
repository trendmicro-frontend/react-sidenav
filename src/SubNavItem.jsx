import Anchor from '@trendmicro/react-anchor';
import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './index.styl';

class SubNavItem extends PureComponent {
    static propTypes = {
        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        // Highlight the nav item as active.
        active: PropTypes.bool,

        // Disable the nav item, making it unselectable.
        disabled: PropTypes.bool,

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
        header: false
    };

    c = {
        subnav: null
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
            eventKey, // eslint-disable-line
            header,
            onClick,
            onSelect, // eslint-disable-line
            className,
            style,
            children,
            ...props
        } = this.props;

        if (header) {
            return (
                <Component
                    role="heading"
                    className={cx(className, styles.sidenavSubnavitem, {
                        [styles.selected]: active,
                        [styles.disabled]: disabled
                    })}
                    style={style}
                >
                    {children}
                </Component>
            );
        }

        return (
            <Component
                role="presentation"
                className={cx(className, styles.sidenavSubnavitem, {
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
                >
                    {children}
                </Anchor>
            </Component>
        );
    }
}

export default SubNavItem;
