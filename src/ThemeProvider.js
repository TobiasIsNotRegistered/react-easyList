import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import App from './App';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { red } from '@material-ui/core/colors';

class ThemeProvider extends React.Component {
    constructor(props) {
        super(props);

        this.theme = createMuiTheme({
            overrides: {
                MuiMenuItem: {
                    "selected": {
                        "backgroundColor": "orange",
                        "root": {
                            '&$selected': {
                                "backgroundColor": "orange",
                            },
                        },
                    },
                },
            },
            typography: {
                useNextVariants: true,
            },
            palette: {
                primary: { 500: '#f44336' },
                secondary: { A400: '#9c27b0' },
                third: { 500: '#ffd54f' },
                error: red
            }
        });
    };

    render() {
        return (
            <MuiThemeProvider theme={this.theme} >
                <App />
            </MuiThemeProvider>
        )
    }
}


export default ThemeProvider;