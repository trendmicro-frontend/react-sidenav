import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-breadcrumbs/dist/react-breadcrumbs.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import { Button } from '@trendmicro/react-buttons';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import DefaultSideNav from './Default';
import StyledSideNav from './Styled';
import navbarStyles from './Navbar.styl';

class App extends React.Component {
    state = {
        theme: 'default'
    };

    render() {
        const name = 'React SideNav';
        const url = 'https://github.com/trendmicro-frontend/react-sidenav';

        return (
            <div>
                <Navbar name={name} url={url}>
                    <Button
                        btnStyle={this.state.theme === 'default' ? 'primary' : 'flat'}
                        className={navbarStyles.navbarBtn}
                        onClick={() => {
                            this.setState({ theme: 'default' });
                        }}
                    >
                        Default Theme
                    </Button>
                    <Button
                        btnStyle={this.state.theme === 'styled' ? 'primary' : 'flat'}
                        className={navbarStyles.navbarBtn}
                        onClick={() => {
                            this.setState({ theme: 'styled' });
                        }}
                    >
                        Styled Component
                    </Button>
                </Navbar>
                <div
                    style={{
                        position: 'relative',
                        height: 'calc(100vh - 50px)'
                    }}
                >
                    {this.state.theme === 'default' &&
                    <DefaultSideNav />
                    }
                    {this.state.theme === 'styled' &&
                    <StyledSideNav />
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
