/* eslint jsx-a11y/click-events-have-key-events: 0 */
import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import NavIcon from './NavIcon';
import NavText from './NavText';
import findComponent from './find-component';
import match from './match-component';
import styles from './index.styl';

class NavItem extends React.Component {
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
            disabled, onSelect, eventKey, subLevel
        } = this.props;

        if (disabled) {
            event.preventDefault();
            return;
        }

        if (onSelect) {
            onSelect(eventKey, subLevel);
        }
    };

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
            subNav,
            subChild,
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

        if (subNav || subChild) {
            const navItems = React.Children.toArray(children)
                .filter(child => {
                    return React.isValidElement(child) && this.isNavItem(child);
                }).map(child => {
                    const subNavItems = React.Children.toArray(child.props.children).filter(subChild => {
                        return React.isValidElement(subChild) && this.isNavItem(subChild);
                    });

                    // TODO:refactor
                    if (this.props.activeItems[this.props.subLevel] !== null) {
                        if ((child.props.eventKey === this.props.selected
                        || child.props.eventKey === this.props.activeItems[this.props.subLevel + 1])
                          && this.props.activeItems[this.props.subLevel] !== this.props.eventKey) {
                            this.props.addActiveItem(this.props.eventKey, this.props.subLevel);
                        }
                    }

                    if (subNavItems.length > 0) {
                        // TODO:refactor
                        return cloneElement(child, {
                            subNav: true,
                            selected,
                            activeItems: this.props.activeItems,
                            addActiveItem: this.props.addActiveItem,
                            onSelect: chainedFunction(
                                child.props.onSelect,
                                onSelect
                            ),
                            onClick: this.props.addActiveItem,
                            subLevel: this.props.subLevel + 1,
                            clearState: this.props.clearState,
                            highlightedItems: this.props.highlightedItems
                        });
                    }
                    return cloneElement(child, {
                        // TODO:refactor
                        subChild: true,
                        selected,
                        onSelect: chainedFunction(
                            child.props.onSelect,
                            onSelect
                        ),
                        onClick: this.props.addActiveItem,
                        subLevel: this.props.subLevel + 1,
                        activeItems: this.props.activeItems,
                        addActiveItem: this.props.addActiveItem,
                        clearState: this.props.clearState,
                        highlightedItems: this.props.highlightedItems
                    });
                });


            const isNavItemSelected = this.props.highlightedItems[this.props.subLevel] === eventKey
              || this.props.highlightedItems.selected === eventKey;

            if (navItems.length > 0) {
                const isOpen = this.props.activeItems[this.props.subLevel] === this.props.eventKey;

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
                                () => this.props.clearState('subNav', this.props.eventKey, this.props.subLevel),
                                () => onClick(this.props.eventKey, this.props.subLevel),
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
                            () => this.props.clearState('subChild'),
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
                // TODO:refactor
                if (this.props.activeItems[this.props.subLevel] !== null &&
                    (child.props.eventKey === this.props.selected
                    || child.props.eventKey === this.props.activeItems[this.props.subLevel + 1])
                      && this.props.activeItems[this.props.subLevel] !== this.props.eventKey) {
                    this.props.addActiveItem(this.props.eventKey, this.props.subLevel);
                }

                return cloneElement(child, {
                    // TODO:refactor
                    subNav: true,
                    subLevel: this.props.subLevel + 1,
                    selected,
                    activeItems: this.props.activeItems,
                    onSelect: chainedFunction(
                        child.props.onSelect,
                        onSelect
                    ),
                    onClick: this.props.addActiveItem,
                    addActiveItem: this.props.addActiveItem,
                    clearState: this.props.clearState,
                    highlightedItems: this.props.highlightedItems
                });
            });
        const others = React.Children.toArray(children)
            .filter(child => {
                if (React.isValidElement(child) && (this.isNavIcon(child) || this.isNavText(child) || this.isNavItem(child))) {
                    return false;
                }
                return true;
            });

        const isNavItemSelected = this.props.highlightedItems[this.props.subLevel] === eventKey
         || this.props.eventKey === this.props.selected;
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
                    // TODO:refactor
                    onClick={chainedFunction(
                        navItems.length > 0 ? () => this.props.toggleExpanded(true) : () => {},
                        navItems.length > 0 ? () => this.props.clearState('subNav', this.props.eventKey, this.props.subLevel)
                            : () => this.props.clearState('subChild'),
                        () => onClick(this.props.eventKey, this.props.subLevel),
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
