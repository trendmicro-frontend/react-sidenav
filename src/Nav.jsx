import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import NavItem from './NavItem';
import styles from './index.styl';

class Nav extends PureComponent {
    static propTypes = {
        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        // Passing props from parent
        onSelect: PropTypes.func
    };
    static defaultProps = {
        componentClass: 'ul'
    };

    renderNavItem(child, { onSelect, ...props }) {
        return cloneElement(child, {
            ...props,
            onSelect: chainedFunction(
                child.props.onSelect,
                onSelect
            )
        });
    }
    render() {
        const {
            componentClass: Component,
            onSelect,
            className,
            children,
            ...props
        } = this.props;

        return (
            <Component
                {...props}
                role="menu"
                className={cx(className, styles.sidenavNav)}
            >
                {React.Children.map(children, child => {
                    if (!React.isValidElement(child)) {
                        return child;
                    }

                    if (child.type === NavItem) {
                        return this.renderNavItem(child, {
                            onSelect
                        });
                    }

                    return child;
                })}
            </Component>
        );
    }
}

export default Nav;
