/*   
    Themes for Harbour UI
*/

import { createMuiTheme } from '@material-ui/core/styles';

var themes = {
    std_light_theme: {
        palette: {
            primary: {
                // light: will be calculated from palette.primary.main,
                main: '#2294F3',
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                light: '#2294F3',
                main: '#FFFFFF',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#ffcc00',
            },
            background: {
                default: '#eeeeee'
            }
            // error: will use the default color
        },
    },
    std_dark_theme: {
        palette: {
            type: 'dark',
            primary: {
                // light: will be calculated from palette.primary.main,
                main: '#2294F3',
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                light: '#2294F3',
                main: '#FFFFFF',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#ffcc00',
            },
            // error: will use the default color
        },
    },
    monokai_light_theme: {
        palette: {
            primary: {
                // light: will be calculated from palette.primary.main,
                main: '#2294F3',
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                light: '#2294F3',
                main: '#FFFFFF',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#ffcc00',
            },
            background: {
                default: '#eeeeee'
            }
            // error: will use the default color
        },
    },
    monokai_dark_theme: {
        palette: {
            type: 'dark',
            primary: {
                // light: will be calculated from palette.primary.main,
                main: '#2294F3',
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                light: '#2294F3',
                main: '#FFFFFF',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#ffcc00',
            },
            // error: will use the default color
        },
    }
};


var preprocessedTheme = {};

for (var key in themes) {
    preprocessedTheme[key] = createMuiTheme(themes[key]);
}

export const themesJSON = themes;
export const theme = preprocessedTheme;