import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import { uncontrollable } from 'uncontrollable';
import warning from 'warning';
import Toggle from './Toggle';
import Nav from './Nav';
import NavItem from './NavItem';
import NavIcon from './NavIcon';
import NavText from './NavText';
import styles from './index.styl';
import match from './match-component';

class SideNav extends PureComponent {
    static propTypes = {
        componentType: PropTypes.any,

        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        // Whether the navigation toggle is disabled.
        disabled: PropTypes.bool,

        // Whether the side navigation is expanded or collapsed.
        expanded: PropTypes.bool,

        // Callback fired when toggling the side navigation between expanded and collapsed state.
        onToggle: PropTypes.func,

        // Callback fired when a navigation item is selected.
        onSelect: PropTypes.func
    };
    static defaultProps = {
        componentClass: 'nav'
    };

    isToggle = match(Toggle);
    isNav = match(Nav);

    child = {
        toggle: null,
        nav: null
    };

    handleClick = (event) => {
        if (this.props.disabled) {
            return;
        }

        this.toggleExpanded('click');
    };

    toggleExpanded(eventType) {
        const expanded = !this.props.expanded;

        if (this.props.onToggle) {
            this.props.onToggle(expanded);
        }
    }
    renderToggle(child, props) {
        let ref = c => {
            this.child.toggle = c;
        };

        if (typeof child.ref === 'string') {
            warning(
                false,
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
            this.child.nav = c;
        };

        if (typeof child.ref === 'string') {
            warning(
                false,
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
            componentType, // eslint-disable-line
            componentClass: Component,
            disabled,
            expanded,
            onToggle, // eslint-disable-line
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
                        [styles.expanded]: expanded,
                        [styles.collapsed]: !expanded
                    }
                )}
            >
                {React.Children.map(children, child => {
                    if (!React.isValidElement(child)) {
                        return child;
                    }

                    if (this.isToggle(child)) {
                        return this.renderToggle(child, {
                            disabled, expanded
                        });
                    }

                    if (this.isNav(child)) {
                        return this.renderNav(child, {
                            onSelect, expanded
                        });
                    }

                    return child;
                })}
            </Component>
        );
    }
}

// For component matching
SideNav.defaultProps.componentType = SideNav;

const UncontrollableSideNav = uncontrollable(SideNav, {
    // Define the pairs of prop/handlers you want to be uncontrollable
    expanded: 'onToggle'
});

UncontrollableSideNav.Toggle = Toggle;
UncontrollableSideNav.Nav = Nav;
UncontrollableSideNav.NavItem = NavItem;
UncontrollableSideNav.NavIcon = NavIcon;
UncontrollableSideNav.NavText = NavText;

export default UncontrollableSideNav;
