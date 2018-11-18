import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import MonacoEditor from 'react-monaco-editor';

/*Own Components*/

const styles = {
    normalAlign: {
        textAlign: 'left',
    },
    codeArea: {
        width: '85%',
        float: 'right'
    }
};

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 2 }}>
            {props.children}
        </Typography>
    );
}


class WebIDE extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '// type your code...',
            value: 0,
        };
    }
    editorDidMount(editor, monaco) {
        editor.focus();
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        const classes = this.props.classes;
        const value = this.state.value;
        const that = this;


        function editorInstance(content) {
            return (
                <div>
                    <div>

                    </div>
                    <div className={classes.normalAlign}>
                        <MonacoEditor
                            width="100%"
                            height="85vh"
                            language="javascript"
                            theme="vs-light"
                            value={content}
                            options={options}
                            onChange={that.onChange}
                            editorDidMount={that.editorDidMount}
                        />
                    </div>
                </div>
            )
        };

        var instancesTabs = (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                        <Tab label="Item Four" />
                        <Tab label="Item Five" />
                        <Tab label="Item Six" />
                        <Tab label="Item Seven" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>{editorInstance("item One")}</TabContainer>}
                {value === 1 && <TabContainer>{editorInstance("item Two")}</TabContainer>}
                {value === 2 && <TabContainer>{editorInstance("item Three")}</TabContainer>}
                {value === 3 && <TabContainer>{editorInstance("item Four")}</TabContainer>}
                {value === 4 && <TabContainer>{editorInstance("item Five")}</TabContainer>}
                {value === 5 && <TabContainer>{editorInstance("item Six")}</TabContainer>}
                {value === 6 && <TabContainer>{editorInstance("item Seven")}</TabContainer>}
            </div>
        );

        return (
            <React.Fragment>
                <div className={classes.codeArea}>
                    {instancesTabs}
                </div>
            </React.Fragment>

        );
    }
}

export default withStyles(styles)(WebIDE);