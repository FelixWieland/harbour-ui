import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
/*React Router*/
import { Route, Switch } from 'react-router-dom';

/*Own Components*/
import Loadable from 'react-loadable';
import NotFound from './components/NotFound'

class ModuleLoadAnimation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<p>Currently Loading {this.props.modulename}</p>);
    }
}

const LoadableComponent = Loadable({
    loader: () => import('./components/modules/' + 'demoModule' + '/Root'),
    loading: ModuleLoadAnimation,
});

const styles = {

};

class ModuleLoader extends React.Component {

    modules = [{ name: "demoModule" }];

    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        //load the Modules if user have permissions
        /*

        
        require("./moduleAPI.json").modules.map((value) => {
            console.log(value);
            this.modules = this.modules.push(value);
            this.forceUpdate();
        });

        */
    };

    requestModule = (modulename) => {
        return Loadable({
            loader: () => import('./components/modules/' + modulename + '/Root'),
            loading: ModuleLoadAnimation,
        });
    }

    buildRouteFromLoadable = (CurrentModule, moduleRoute) => {
        return (<Route path={moduleRoute} component={() => (
            <CurrentModule
                //Following props are std.provided for the Modules
                jwt={"-"}
            //...
            />
        )} />)
    }

    createRoutesFromModuleName = () => {
        if (this.modules.length > 0) {
            var moduleOnLoad = [];
            for (var index in this.modules) {
                var elm = this.modules[index];
                moduleOnLoad.push(this.buildRouteFromLoadable(this.requestModule(elm.name), "/Module/" + elm.name));
            }
            return moduleOnLoad;
        } else {
            //empty
            return;
        }
    }

    render() {
        const modules = this.createRoutesFromModuleName();
        //console.log(modules);
        return (
            <React.Fragment>
                <Switch>
                    {modules}
                    <Route component={NotFound} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ModuleLoader);