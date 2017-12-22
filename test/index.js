import React from 'react';
import { mount } from 'enzyme';
import { test } from 'tap';
import '../setupTests';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '../src';

test('<SideNav />', (t) => {
    const wrapper = mount((
        <SideNav>
            <Toggle />
            <Nav>
                <NavItem>
                    <NavIcon />
                    <NavText />
                </NavItem>
                <NavItem>
                    <NavIcon />
                    <NavText />
                </NavItem>
            </Nav>
        </SideNav>
    ));
    t.equal(wrapper.find(SideNav).length, 1, 'should render <SideNav /> component');
    t.end();
});
