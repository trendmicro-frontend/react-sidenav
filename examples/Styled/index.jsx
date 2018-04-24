import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import ensureArray from 'ensure-array';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from './StyledSideNav';

const navWidthCollapsed = 64;
const navWidthExpanded = 280;

const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'block' : 'none')};
    white-space: nowrap;
    background-color: #db3d44;
    color: #fff;

    > * {
        color: inherit;
        background-color: inherit;
    }
`;

// height: 20px + 10px + 10px = 40px
const NavTitle = styled.div`
    font-size: 2em;
    line-height: 20px;
    padding: 10px 0;
`;

// height: 20px + 4px = 24px;
const NavSubTitle = styled.div`
    font-size: 1em;
    line-height: 20px;
    padding-bottom: 4px;
`;

const NavInfoPane = styled.div`
    float: left;
    width: 100%;
    padding: 10px 20px;
    background-color: #eee;
`;

const Separator = styled.div`
    clear: both;
    position: relative;
    margin: .8rem 0;
    background-color: #ddd;
    height: 1px;
`;

const Main = styled.main`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: ${navWidthCollapsed}px;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    background: ${props => (props.expanded ? 'rgba(0, 0, 0, .6)' : 'inherit')};
    transition: background-color .35s cubic-bezier(.4, 0, .2, 1);
`;

export default class extends PureComponent {
    state = {
        selected: 'home',
        expanded: false
    };

    lastUpdateTime = new Date().toISOString();

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
        'settings/policy': ['Settings', 'Policy'],
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
    render() {
        const { expanded, selected } = this.state;

        return (
            <div>
                <SideNav
                    style={{ minWidth: expanded ? navWidthExpanded : navWidthCollapsed }}
                    onSelect={this.onSelect}
                    onToggle={this.onToggle}
                >
                    <Toggle />
                    <NavHeader expanded={expanded}>
                        <NavTitle>Side Navigation</NavTitle>
                        <NavSubTitle>Styled Side Navigation</NavSubTitle>
                    </NavHeader>
                    {expanded &&
                    <NavInfoPane>
                        <div>Time: {this.lastUpdateTime}</div>
                        <div>User: admin</div>
                    </NavInfoPane>
                    }
                    <Nav
                        defaultSelected={selected}
                    >
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="HOME">
                                HOME
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="devices">
                            <NavIcon>
                                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="DEVICES">
                                DEVICES
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="reports">
                            <NavIcon>
                                <i className="fa fa-fw fa-list-alt" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="REPORTS">
                                REPORTS
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="settings">
                            <NavIcon>
                                <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="SETTINGS">
                                SETTINGS
                            </NavText>
                            <NavItem eventKey="settings/policy">
                                <NavText title="POLICIES">
                                    POLICIES
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="settings/network">
                                <NavText title="NETWORK">
                                    NETWORK
                                </NavText>
                            </NavItem>
                        </NavItem>
                        <Separator />
                        <NavItem eventKey="logout">
                            <NavIcon>
                                <i className="fa fa-fw fa-power-off" style={{ fontSize: '1.5em' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="SIGN OUT">
                                SIGN OUT
                            </NavText>
                        </NavItem>
                    </Nav>
                </SideNav>
                <Main expanded={expanded}>
                    {this.renderBreadcrumbs()}
                </Main>
            </div>
        );
    }
}
