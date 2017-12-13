import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './index.styl';

class Toggle extends PureComponent {
    static propTypes = {
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
            componentClass: Component,
            expanded,
            className,
            ...props
        } = this.props;

        delete props.children;

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
                <span className={styles.iconBar} />
                <span className={styles.iconBar} />
                <span className={styles.iconBar} />
            </Component>
        );
    }
}

export default Toggle;
