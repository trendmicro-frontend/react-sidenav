import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import uncontrollable from 'uncontrollable';
import warning from 'warning';
import Toggle from './Toggle';
import Nav from './Nav';
import NavItem from './NavItem';
import styles from './index.styl';

class SideNav extends PureComponent {
    static propTypes = {
        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        // Whether or not the sidenav is disabled.
        disabled: PropTypes.bool,

        // Whether or not the sidenav is expanded or collapsed.
        expanded: PropTypes.bool,

        // A callback fired when the sidenav wishes to toggle between expanded and collapsed state.
        onToggle: PropTypes.func,

        // A callback fired when a navitem is selected.
        onSelect: PropTypes.func
    };
    static defaultProps = {
        componentClass: 'nav'
    };

    c = {
        toggle: null,
        nav: null
    };
    lastToggleEventType = null;

    handleClick = (event) => {
        if (this.props.disabled) {
            return;
        }

        this.toggleExpanded('click');
    };

    toggleExpanded(eventType) {
        const expanded = !this.props.expanded;

        if (expanded) {
            this.lastToggleEventType = eventType;
        }

        if (this.props.onToggle) {
            this.props.onToggle(expanded);
        }
    }
    renderToggle(child, props) {
        let ref = c => {
            this.c.toggle = c;
        };

        if (typeof child.ref === 'string') {
            warning(false,
                'String refs are not supported on `<SideNav.Toggle>` component. ' +
                'To apply a ref to the component use the callback signature:\n\n ' +
                'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute'
            );
        } else {
            ref = chainedFunction(child.ref, ref);
        }

        return cloneElement(child, {
            ...props,
            ref,
            onClick: chainedFunction(
                child.props.onClick,
                this.handleClick
            )
        });
    }
    renderNav(child, { onSelect, ...props }) {
        let ref = c => {
            this.c.nav = c;
        };

        if (typeof child.ref === 'string') {
            warning(false,
                'String refs are not supported on `<SideNav.Nav>` component. ' +
                'To apply a ref to the component use the callback signature:\n\n ' +
                'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute'
            );
        } else {
            ref = chainedFunction(child.ref, ref);
        }

        return cloneElement(child, {
            ...props,
            ref,
            onSelect: chainedFunction(
                child.props.onSelect,
                onSelect
            )
        });
    }
    render() {
        const {
            componentClass: Component,
            disabled,
            expanded,
            onSelect,
            className,
            children,
            ...props
        } = this.props;

        return (
            <Component
                {...props}
                className={cx(
                    className,
                    styles.sidenav,
                    {
                        [styles.disabled]: disabled,
                        [styles.expanded]: expanded
                    }
                )}
            >
                {React.Children.map(children, child => {
                    if (!React.isValidElement(child)) {
                        return child;
                    }

                    if (child.type === Toggle) {
                        return this.renderToggle(child, {
                            disabled, expanded
                        });
                    }

                    if (child.type === Nav) {
                        return this.renderNav(child, {
                            expanded, onSelect
                        });
                    }

                    return child;
                })}
            </Component>
        );
    }
}

const UncontrollableSideNav = uncontrollable(SideNav, {
    // Define the pairs of prop/handlers you want to be uncontrollable
    expanded: 'onToggle'
});

UncontrollableSideNav.Toggle = Toggle;
UncontrollableSideNav.Nav = Nav;
UncontrollableSideNav.NavItem = NavItem;

export default UncontrollableSideNav;
