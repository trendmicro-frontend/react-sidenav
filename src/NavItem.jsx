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
            componentClass: Component, active,
            disabled, expanded, eventKey, // eslint-disable-line
            onSelect, selected,
            subNav, subChild, navitemClassName,
            navitemStyle, subnavClassName, subnavStyle,
            className, style, children,
            activeItems, highlightedItems, subLevel,
            addActiveItem, addHighlightedItem, toggleExpanded,
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

                    const isActive = (child.props.eventKey === selected || child.props.eventKey === activeItems[subLevel + 1])
                      && activeItems[subLevel] !== eventKey;
                    const isChildHighlighted = child.props.eventKey === selected
                      || highlightedItems.includes(child.props.eventKey);
                    const isHighlighted = isChildHighlighted || selected === eventKey;

                    if (isActive && activeItems[subLevel] !== null) {
                        addActiveItem(eventKey, subLevel);
                    }

                    if (isHighlighted && !highlightedItems.includes(eventKey)) {
                        addHighlightedItem(eventKey);
                    }

                    if (isChildHighlighted && !highlightedItems.includes(child.props.eventKey)) {
                        addHighlightedItem(child.props.eventKey);
                    }

                    if (subNavItems.length > 0) {
                        return cloneElement(child, {
                            subNav: true,
                            selected,
                            subLevel: subLevel + 1,
                            activeItems: activeItems,
                            highlightedItems: highlightedItems,
                            onClick: this.props.addActiveItem,
                            addActiveItem: this.props.addActiveItem,
                            addHighlightedItem: this.props.addHighlightedItem,
                            onSelect: chainedFunction(
                                child.props.onSelect,
                                onSelect
                            )
                        });
                    }
                    return cloneElement(child, {
                        subChild: true,
                        selected,
                        subLevel: subLevel + 1,
                        activeItems: activeItems,
                        highlightedItems: highlightedItems,
                        addActiveItem: this.props.addActiveItem,
                        addHighlightedItem: this.props.addHighlightedItem,
                        onSelect: chainedFunction(
                            child.props.onSelect,
                            onSelect
                        )
                    });
                });


            const isNavItemSelected = highlightedItems.includes(eventKey)
              || eventKey === selected;

            if (navItems.length > 0) {
                const isOpen = activeItems[subLevel] === eventKey;

                return (
                    <Component
                        role="presentation"
                        className={cx(className, styles.sidenavSubnavitem, {
                            [styles.selected]: isNavItemSelected,
                            [styles.disabled]: disabled
                        }, styles[`subnav-${subLevel}`])}
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
                            onClick={() => addActiveItem(eventKey, subLevel)}
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
                    }, styles[`subchild-${subLevel}`], { [styles.selectedSubWrapper]: isNavItemSelected })}
                    style={style}
                >
                    <div
                        {...props}
                        className={cx(navitemClassName, styles.navitem)}
                        disabled={disabled}
                        role="menuitem"
                        tabIndex="-1"
                        onClick={chainedFunction(
                            () => addActiveItem(eventKey, subLevel),
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
                const isActive = (child.props.eventKey === selected || child.props.eventKey === activeItems[subLevel + 1])
                      && activeItems[subLevel] !== eventKey;
                const isChildHighlighted = child.props.eventKey === selected
                        || highlightedItems.includes(child.props.eventKey);
                const isHighlighted = isChildHighlighted || selected === eventKey;


                if (isActive && activeItems[subLevel] !== null) {
                    addActiveItem(eventKey, subLevel);
                }

                if (isHighlighted && !highlightedItems.includes(eventKey)) {
                    addHighlightedItem(eventKey);
                }

                if (isChildHighlighted && !highlightedItems.includes(child.props.eventKey)) {
                    addHighlightedItem(child.props.eventKey);
                }

                return cloneElement(child, {
                    subNav: true,
                    selected,
                    subLevel: subLevel + 1,
                    activeItems: activeItems,
                    highlightedItems: highlightedItems,
                    addActiveItem: this.props.addActiveItem,
                    addHighlightedItem: this.props.addHighlightedItem,
                    onSelect: chainedFunction(
                        child.props.onSelect,
                        onSelect
                    )
                });
            });
        const others = React.Children.toArray(children)
            .filter(child => {
                if (React.isValidElement(child) && (this.isNavIcon(child) || this.isNavText(child) || this.isNavItem(child))) {
                    return false;
                }
                return true;
            });

        const isNavItemSelected = highlightedItems.includes(eventKey);
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
                        navItems.length > 0 ? () => toggleExpanded(true) : () => {},
                        () => addActiveItem(eventKey, subLevel),
                        navItems.length === 0 && this.handleSelect
                    )}
                    style={{
                        ...navitemStyle,
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingRight: '14px',
                        cursor: 'pointer'
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

NavItem.propTypes = {
    componentType: PropTypes.any,
    componentClass: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    expanded: PropTypes.bool,
    eventKey: PropTypes.any,
    addActiveItem: PropTypes.func,
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
    selected: PropTypes.any,
    subNav: PropTypes.bool,
    subLevel: PropTypes.number,
    subChild: PropTypes.bool,
    navitemClassName: PropTypes.string,
    navitemStyle: PropTypes.object,
    subnavClassName: PropTypes.string,
    subnavStyle: PropTypes.object,
    activeItems: PropTypes.shape({}),
    highlightedItems: PropTypes.arrayOf(PropTypes.string),
    addHighlightedItem: PropTypes.func,
    toggleExpanded: PropTypes.func
};

NavItem.defaultProps = {
    componentClass: 'div',
    active: false,
    disabled: false,
    expanded: false
};

NavItem.defaultProps.componentType = NavItem;

export default NavItem;
