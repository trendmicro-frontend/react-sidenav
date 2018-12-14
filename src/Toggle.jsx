import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './index.styl';
import CollapseIcon from '../docs/collapse-icon.svg';
import ExpandIcon from '../docs/expand-icon.svg';

class Toggle extends PureComponent {
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
        expanded: PropTypes.bool
    };
    static defaultProps = {
        componentClass: 'button',
        disabled: false,
        expanded: false
    };

    render() {
        const {
            componentType, // eslint-disable-line
            componentClass: Component,
            expanded,
            className,
            children,
            ...props
        } = this.props;

        return (
            <Component
                {...props}
                role="button"
                className={cx(
                    className,
                    styles.sidenavToggle
                )}
                aria-expanded={expanded}
            >
                <img src={expanded ? CollapseIcon : ExpandIcon} alt="error" />
                {children}
            </Component>
        );
    }
}

// For component matching
Toggle.defaultProps.componentType = Toggle;

export default Toggle;
