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

        // Func to add items to activeItemsArray.
        addActiveItem: PropTypes.func,

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
        subNav: PropTypes.bool,

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

    handleSelect = (event) => {
        const {
            disabled, onSelect, eventKey
        } = this.props;

        if (disabled) {
            event.preventDefault();
            return;
        }

        if (onSelect) {
            onSelect(eventKey);
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

            activeItems,

            // Sub navigation item
            subNav,
            subChild,
            // secondSubNav navigation items
            // Override className and style
            navitemClassName,
            navitemStyle,
            subnavClassName,
            subnavStyle,

            isSideNavExpanded,

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

        if (subNav || subChild) {
            const navItems = React.Children.toArray(children)
                .filter(child => {
                    return React.isValidElement(child) && this.isNavItem(child);
                }).map(child => {
                    const subNavItems = React.Children.toArray(child.props.children).filter(subChild => {
                        return React.isValidElement(subChild) && this.isNavItem(subChild);
                    });

                    if (!this.props.activeItems.includes(this.props.eventKey)) {
                        if (this.props.selected === child.props.eventKey || this.props.activeItems.includes(child.props.eventKey)) {
                            this.props.addActiveItem(this.props.eventKey);
                        }
                    }

                    if (this.state.subOpen && !isSideNavExpanded) {
                        this.setState({
                            subOpen: undefined
                        });
                    }

                    if (subNavItems.length > 0) {
                        return cloneElement(child, {
                            subNav: true,
                            selected,
                            onSelect: chainedFunction(
                                child.props.onSelect,
                                onSelect
                            ),
                            onClick: () => {
                                this.onToggle(child.props.eventKey);
                            },
                            subOpen: this.state.subOpen,
                            subLevel: this.props.subLevel + 1,
                            activeItems: this.props.activeItems,
                            addActiveItem: this.props.addActiveItem,
                            isSideNavExpanded
                        });
                    }
                    return cloneElement(child, {
                        subChild: true,
                        selected,
                        onSelect: chainedFunction(
                            child.props.onSelect,
                            onSelect
                        ),
                        onClick: () => {
                            this.onToggle(child.props.eventKey);
                        },
                        subLevel: this.props.subLevel + 1,
                        activeItems: this.props.activeItems,
                        addActiveItem: this.props.addActiveItem,
                        isSideNavExpanded
                    });
                });

            const isNavItemSelected = selected === eventKey || activeItems.includes(eventKey);

            if (navItems.length > 0) {
                const isOpen = this.props.subOpen === this.props.eventKey;

                return (
                    <Component
                        role="presentation"
                        className={cx(className, styles.sidenavSubnavitem, {
                            [styles.selected]: isNavItemSelected,
                            [styles.disabled]: disabled
                        }, styles[`subnav-${this.props.subLevel}`])}
                    >
                        <div
                            {...props}
                            className={cx(navitemClassName, styles.navitem, styles.borderBottom,
                                { [styles.selectedSubWrapper]: isNavItemSelected })}
                            disabled={disabled}
                            role="menuitem"
                            tabIndex="-1"
                            style={{
                                ...navitemStyle,
                                display: 'flex',
                                justifyContent: 'space-between',
                                background: '#f8f8f9'
                            }}
                            onClick={chainedFunction(
                                onClick
                            )}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
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

            return (
                <Component
                    role="presentation"
                    className={cx(className, styles.sidenavSubnavitem, {
                        [styles.selected]: isNavItemSelected
                    }, styles[`subchild-${this.props.subLevel}`], { [styles.selectedSubWrapper]: isNavItemSelected })}
                    style={style}
                >
                    <div
                        {...props}
                        className={cx(navitemClassName, styles.navitem)}
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

        const navItems = React.Children.toArray(children)
            .filter(child => {
                return React.isValidElement(child) && this.isNavItem(child);
            })
            .map((child) => {
                if ((this.props.selected === child.props.eventKey || this.props.activeItems.includes(child.props.eventKey))
                  && !this.props.activeItems.includes(this.props.eventKey)) {
                    this.props.addActiveItem(this.props.eventKey);
                }

                if (this.state.subOpen && !isSideNavExpanded) {
                    this.setState({
                        subOpen: undefined
                    });
                }

                return cloneElement(child, {
                    subNav: true,
                    selected,
                    onSelect: chainedFunction(
                        child.props.onSelect,
                        onSelect
                    ),
                    onClick: () => {
                        this.onToggle(child.props.eventKey);
                    },
                    subOpen: this.state.subOpen,
                    subLevel: this.props.subLevel + 1,
                    activeItems: this.props.activeItems,
                    addActiveItem: this.props.addActiveItem,
                    isSideNavExpanded
                });
            });
        const others = React.Children.toArray(children)
            .filter(child => {
                if (React.isValidElement(child) && (this.isNavIcon(child) || this.isNavText(child) || this.isNavItem(child))) {
                    return false;
                }
                return true;
            });

        const isNavItemSelected = selected === eventKey || activeItems.includes(eventKey);
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
