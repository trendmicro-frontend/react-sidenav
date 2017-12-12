import React, { PureComponent } from 'react';
import SideNav, { Toggle, Nav, NavItem, SubNavItem } from '../src';

class Navigation extends PureComponent {
    state = {
        expanded: false,
        activeNavItem: 'home',
        activeSubNavItem: 'home'
    };

    onSelect = (key) => {
        if (!key) {
            return;
        }

        const keys = key.split('/');

        if (keys.length === 1) {
            this.setState(state => ({
                activeNavItem: key,
                activeSubNavItem: key
            }));
            return;
        }

        if (!keys[1]) {
            if (this.state.expanded) {
                this.setState(state => ({
                    activeNavItem: key
                }));
            }
            return;
        }

        this.setState(state => ({
            activeNavItem: keys[0] + '/',
            activeSubNavItem: key
        }));
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    render() {
        const {
            expanded,
            activeNavItem,
            activeSubNavItem
        } = this.state;

        return (
            <SideNav
                onSelect={this.onSelect}
                onToggle={this.onToggle}
            >
                <Toggle />
                <Nav>
                    <NavItem
                        active={expanded && activeNavItem === 'home' || activeSubNavItem === 'home'}
                        eventKey={'home'}
                        icon={(
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        )}
                        title={'Home'}
                    />
                    <NavItem
                        active={expanded && activeNavItem === 'charts/' || activeSubNavItem.startsWith('charts/')}
                        eventKey={'charts/'}
                        icon={(
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.5em' }} />
                        )}
                        title={'Charts'}
                    >
                        <SubNavItem
                            eventKey={'charts/1'}
                            active={activeSubNavItem === 'charts/1'}
                        >
                            Charts/1
                        </SubNavItem>
                        <SubNavItem
                            eventKey={'charts/2'}
                            active={activeSubNavItem === 'charts/2'}
                        >
                            Charts/2
                        </SubNavItem>
                    </NavItem>
                    <NavItem
                        active={expanded && activeNavItem === 'forms/' || activeSubNavItem.startsWith('forms/')}
                        eventKey={'forms/'}
                        icon={(
                            <i className="fa fa-fw fa-list-alt" style={{ fontSize: '1.5em' }} />
                        )}
                        title={'Forms'}
                    >
                        <SubNavItem
                            eventKey={'forms/1'}
                            active={activeSubNavItem === 'forms/1'}
                        >
                            Forms/1
                        </SubNavItem>
                        <SubNavItem
                            eventKey={'forms/2'}
                            active={activeSubNavItem === 'forms/2'}
                        >
                            Froms/2
                        </SubNavItem>
                    </NavItem>
                    <NavItem
                        active={expanded && activeNavItem === 'settings/' || activeSubNavItem.startsWith('settings/')}
                        eventKey={'settings/'}
                        icon={(
                            <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em' }} />
                        )}
                        title={'Settings'}
                    >
                        <SubNavItem
                            eventKey={'settings/1'}
                            active={activeSubNavItem === 'settings/1'}
                        >
                            Settings/1
                        </SubNavItem>
                        <SubNavItem
                            eventKey={'settings/2'}
                            active={activeSubNavItem === 'settings/2'}
                        >
                            Settings/2
                        </SubNavItem>
                    </NavItem>
                </Nav>
            </SideNav>
        );
    }
}

export default Navigation;
