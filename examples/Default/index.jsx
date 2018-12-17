/* eslint no-template-curly-in-string: 0 */
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import ensureArray from 'ensure-array';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SideNav from '../SideNav';
import contentGenerator from './contentGenerator';

// fake array for contentGenerator
const generateContent = [
];

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 260 : 64)}px;
`;

const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'flex' : 'none')};
    white-space: nowrap;
    background: #FFFFFF;
    color: #fff;
    align-items: center;

    > * {
        color: inherit;
        background-color: inherit;
    }
`;

// height: 20px + 10px + 10px = 40px
const NavTitle = styled.div`
    line-height: 44px;
    padding: 10px 0;
    color: #09091A;
    font-size: 16px;
    height: 50px;
    display: flex;
    align-items: center;
`;

export default class extends PureComponent {
    state = {
        selected: 'home',
        expanded: false
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };

    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    pageTitle = {
        'home': 'Home',
        'devices': ['Devices'],
        'reports': ['Reports'],
        'settings/policies': ['Settings', 'Policies'],
        'settings/network': ['Settings', 'Network']
    };

    renderBreadcrumbs() {
        const { selected } = this.state;
        const list = ensureArray(this.pageTitle[selected]);

        return (
            <Breadcrumbs>
                {list.map((item, index) => (
                    <Breadcrumbs.Item
                        active={index === list.length - 1}
                        key={`${selected}_${index}`}
                    >
                        {item}
                    </Breadcrumbs.Item>
                ))}
            </Breadcrumbs>
        );
    }

    navigate = (pathname) => () => {
        this.setState({ selected: pathname });
    };

    render() {
        const { expanded, selected } = this.state;

        return (
            <div>
                <SideNav
                    onSelect={this.onSelect}
                    onToggle={this.onToggle}
                    expanded={this.state.expanded}
                >
                    <SideNav.Toggle />
                    <NavHeader style={{ height: '50px' }} expanded={expanded}>
                        <NavTitle>Side Navigation</NavTitle>
                    </NavHeader>
                    <SideNav.Nav selected={selected}>
                        {contentGenerator(generateContent, { expanded, onToggle: this.onToggle })}
                    </SideNav.Nav>
                </SideNav>
                <Main expanded={expanded}>
                    {this.renderBreadcrumbs()}
                </Main>
            </div>
        );
    }
}
