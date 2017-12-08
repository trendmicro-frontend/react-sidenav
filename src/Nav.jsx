import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import styles from './index.styl';

class Nav extends PureComponent {
    static propTypes = {
        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        // Sidenav
        expanded: PropTypes.bool,
        onSelect: PropTypes.func
    };
    static defaultProps = {
        componentClass: 'ul',

        // Sidenav
        expanded: false
    };

    render() {
        const {
            componentClass: Component,
            expanded,
            onSelect,
            className,
            children,
            ...props
        } = this.props;

        const activeNavItems = [];
        const navItems = React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return child;
            }

            // TODO: NavItem

            if (child.props.active) {
                activeNavItems.push(child);
            }

            return cloneElement(child, {
                expanded,
                onSelect: chainedFunction(
                    child.props.onSelect,
                    onSelect
                )
            });
        });

        return (
            <Component
                {...props}
                role="menu"
                className={cx(className, {
                    [styles.sidenavNav]: true,
                    [styles.sidenavNavSelected]: activeNavItems.length > 0
                })}
            >
                {navItems}
            </Component>
        );
    }
}

export default Nav;
