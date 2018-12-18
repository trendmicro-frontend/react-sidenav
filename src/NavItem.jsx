/* eslint jsx-a11y/click-events-have-key-events: 0 */
import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import NavIcon from './NavIcon';
import NavText from './NavText';
import findComponent from './find-component';
import match from './match-component';
import styles from './index.styl';

class NavItem extends PureComponent {
    state = {
        subOpen: false
    }
    static propTypes = {
        componentType: PropTypes.any,

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
        subnav: PropTypes.bool,

        navitemClassName: PropTypes.string,
        navitemStyle: PropTypes.object,
        subnavClassName: PropTypes.string,
        subnavStyle: PropTypes.object
    };
    static defaultProps = {
        componentClass: 'div',
        active: false,
        disabled: false,
        expanded: false
    };

    findNavIcon = findComponent(NavIcon);
    findNavText = findComponent(NavText);
    isNavItem = match(NavItem);
    isNavIcon = match(NavIcon);
    isNavText = match(NavText);

    handleClickOnExpanded(eventKey, event, level) {
        console.log('triggers');
        this.setState(state => ({
            expandedNavItem: state.expandedItem[level] !== eventKey ? eventKey : ''
        }));

        this.setState(state => ({
            expandedNavItem: eventKey
        }));
    }

    handleSelect = (event) => {
        const {
            disabled, onSelect, eventKey
        } = this.props;

        if (disabled) {
            event.preventDefault();
            return;
        }

        if (onSelect) {
            onSelect(eventKey, event);
        }
    };

    onToggle = (eventKey) => {
        this.setState(state => ({
            subOpen: state.subOpen !== eventKey ? eventKey : undefined
        }));
    }

    render() {
        const {
            componentType, // eslint-disable-line
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
            // secondSubNav navigation items
            // Override className and style
            navitemClassName,
            navitemStyle,
            subnavClassName,
            subnavStyle,

            // Default props
            className,
            style,
            children,
            ...props
        } = this.props;

        const navIcon = this.findNavIcon(children);
        const navText = this.findNavText(children);
        const {
            componentType: navIconComponentType, // eslint-disable-line
            navIconClassName,
            ...navIconProps
        } = navIcon ? { ...navIcon.props } : {};
        const {
            componentType: navTextComponentType, // eslint-disable-line
            navTextClassName,
            ...navTextProps
        } = navText ? { ...navText.props } : {};

        if (subnav) {
            // const { subOpen } = this.state;

            const activeNavItems = [];

            const navItems = React.Children.toArray(children)
                .filter(child => {
                    return React.isValidElement(child) && this.isNavItem(child);
                }).map(child => {
                    const secondSubNavItems = React.Children.toArray(child.props.children).filter(secondChild => {
                        return React.isValidElement(secondChild) && this.isNavItem(secondChild);
                    });

                    if (child.props.active || (!!selected && selected === child.props.eventKey)) {
                        activeNavItems.push(child);
                    }

                    if (secondSubNavItems.length > 0) {
                        return cloneElement(child, {
                            subnav: true,
                            selected,
                            onSelect: chainedFunction(
                                child.props.onSelect,
                                onSelect
                            ),
                            onClick: (event) => {
                                this.onToggle(child.props.eventKey, event);
                            },
                            subOpen: this.state.subOpen,
                            subLevel: this.props.subLevel + 1
                        });
                    }
                    return cloneElement(child, {
                        subChild: true,
                        selected,
                        onSelect: chainedFunction(
                            child.props.onSelect,
                            onSelect
                        )
                    });
                });

            if (navItems.length > 0) {
                const isOpen = this.props.subOpen === this.props.eventKey;
                const isNavItemSelected = (!!selected && selected === this.props.eventKey) || (activeNavItems.length > 0);

                return (
                    <Component
                        role="presentation"
                        className={cx(className, styles.sidenavSubnavitem, {
                            [styles.selected]: isNavItemSelected,
                            [styles.disabled]: disabled
                        }, styles[`level-${this.props.subLevel}`])}
                        style={style}
                    >
                        <div
                            {...props}
                            className={cx(navitemClassName, styles.navitem, styles.borderBottom)}
                            disabled={disabled}
                            role="menuitem"
                            tabIndex="-1"
                            style={{
                                ...navitemStyle
                            }}
                            onClick={chainedFunction(
                                onClick
                            )}
                        >
                            <div style={{ display: 'flex' }}>
                                {navIcon ?
                                    <div {...navIconProps} className={cx(navIconClassName, styles.navicon)} />
                                    : <i className="fa fa-fw" style={{ fontSize: '16px' }} />
                                }
                                {navText &&
                                <div {...navTextProps} className={cx(navTextClassName, styles.navtext)} />
                                }
                            </div>
                            <div>
                                {(navItems.length > 0) &&
                                <i className={cx('fa-angle-right fw fa fa-caret-right', styles.expandedIcon, {
                                    [styles.expandedIconRotate]: isOpen
                                })}
                                />
                                }
                            </div>
                        </div>
                        <div style={{ background: '#F8F8F9' }}>
                            <div style={{ height: '1px', background: '#e5e5e4', marginRight: '20px', marginLeft: '40px' }} />
                        </div>
                        <div className={cx({ [styles.subMenuOpen]: isOpen, [styles.subMenuClose]: !isOpen })}>
                            {navItems}
                        </div>
                    </Component>
                );
            }

            const isNavItemSelected = !!selected && selected === this.props.eventKey;
            return (
                <Component
                    role="presentation"
                    className={cx(className, styles.sidenavSubnavitem, {
                        [styles.selected]: isNavItemSelected
                    })}
                    style={style}
                >
                    <div
                        {...props}
                        className={cx(navitemClassName, styles.navitem)}
                        style={navitemStyle}
                        disabled={disabled}
                        role="menuitem"
                        tabIndex="-1"
                        onClick={chainedFunction(
                            onClick,
                            this.handleSelect
                        )}
                    >
                        {navIcon ?
                            <div {...navIconProps} className={cx(navIconClassName, styles.navicon)} />
                            : <i className="fa fa-fw" style={{ fontSize: '16px' }} />
                        }
                        {navText &&
                        <div {...navTextProps} className={cx(navTextClassName, styles.navtext)} />
                        }
                    </div>
                    <div style={{ background: '#F8F8F9' }}>
                        <div style={{ height: '1px', background: '#e5e5e4', marginRight: '20px', marginLeft: '40px' }} />
                    </div>
                </Component>
            );
        }

        const activeNavItems = [];
        const navItems = React.Children.toArray(children)
            .filter(child => {
                return React.isValidElement(child) && this.isNavItem(child);
            })
            .map((child, i) => {
                if (child.props.active || (!!selected && selected === child.props.eventKey)) {
                    activeNavItems.push(child);
                }

                return cloneElement(child, {
                    subnav: true,
                    selected,
                    onSelect: chainedFunction(
                        child.props.onSelect,
                        onSelect
                    ),
                    onClick: (event) => {
                        this.onToggle(child.props.eventKey, event);
                    },
                    subOpen: this.state.subOpen,
                    subLevel: this.props.subLevel + 1
                });
            });
        const others = React.Children.toArray(children)
            .filter(child => {
                if (React.isValidElement(child) && (this.isNavIcon(child) || this.isNavText(child) || this.isNavItem(child))) {
                    return false;
                }
                return true;
            });

        const isNavItemSelected = active || (!!selected && selected === this.props.eventKey) || (activeNavItems.length > 0);
        const isNavItemExpandable = (navItems.length > 0);
        const isNavItemExpanded = isNavItemExpandable && expanded;
        const isNavItemHighlighted = isNavItemExpanded || isNavItemSelected;


        return (
            <Component
                role="presentation"
                className={cx(className, styles.sidenavNavitem, {
                    [styles.selected]: isNavItemSelected,
                    [styles.highlighted]: isNavItemHighlighted,
                    [styles.expandable]: isNavItemExpandable,
                    [styles.expanded]: isNavItemExpanded,
                    [styles.disabled]: disabled
                })}
                style={style}
            >
                <div
                    {...props}
                    className={cx(navitemClassName, styles.navitem)}
                    disabled={disabled}
                    role="menuitem"
                    tabIndex="-1"
                    onClick={chainedFunction(
                        navItems.length > 0 && this.props.toggleExpanded,
                        onClick,
                        navItems.length === 0 && this.handleSelect
                    )}
                    style={{
                        ...navitemStyle,
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingRight: '14px'
                    }}
                >
                    <div>
                        {navIcon ?
                            <div {...navIconProps} className={cx(navIconClassName, styles.navicon)} />
                            : <i className="fa fa-fw" style={{ fontSize: '16px' }} />
                        }
                        {navText &&
                            <div {...navTextProps} className={cx(navTextClassName, styles.navtext)} />
                        }
                    </div>
                    {(navItems.length > 0) &&
                        <div>
                            <i className={cx('fa-angle-right fw fa fa-caret-right', styles.expandedIcon, {
                                [styles.expandedIconRotate]: isNavItemExpanded
                            })}
                            />
                        </div>
                    }
                    {others}
                </div>
                {(navItems.length > 0) &&
                    <div
                        role="menu"
                        className={cx(subnavClassName, styles.sidenavSubnav)}
                        style={subnavStyle}
                    >
                        <Component
                            role="heading"
                            className={cx(styles.sidenavSubnavitem, {
                                [styles.highlighted]: active,
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

// For component matching
NavItem.defaultProps.componentType = NavItem;

export default NavItem;
