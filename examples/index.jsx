import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import Navigation from './Navigation';

class App extends React.Component {
    state = {
        activeNavItem: 'home',
        activeSubNavItem: 'home:1'
    };

    render() {
        const name = 'React SideNav';
        const url = 'https://github.com/trendmicro-frontend/react-sidenav';

        return (
            <div>
                <Navbar name={name} url={url} />
                <div
                    style={{
                        position: 'relative',
                        height: 'calc(100vh - 50px)'
                    }}
                >
                    <Navigation />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
