import React from 'react';
import SideNav from '../src';

export default ({ activeKey, onSelect }) => (
    <SideNav
        onSelect={onSelect}
        onToggle={(expanded) => {
            console.log('expanded:', expanded);
        }}
    >
        <SideNav.Toggle />
        <SideNav.Nav>
            <SideNav.NavItem
                active={activeKey === 'home'}
                eventKey={'home'}
            >
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                <span>Home</span>
            </SideNav.NavItem>
            <SideNav.NavItem
                active={activeKey === 'charts'}
                eventKey={'charts'}
            >
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.5em' }} />
                <span>Charts</span>
            </SideNav.NavItem>
            <SideNav.NavItem
                active={activeKey === 'forms'}
                eventKey={'forms'}
            >
                <i className="fa fa-fw fa-list-alt" style={{ fontSize: '1.5em' }} />
                <span>Forms</span>
            </SideNav.NavItem>
            <SideNav.NavItem
                active={activeKey === 'settings'}
                eventKey={'settings'}
            >
                <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em' }} />
                <span>Settings</span>
            </SideNav.NavItem>
        </SideNav.Nav>
    </SideNav>
);
