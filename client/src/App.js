import React, {
    Component
} from 'react';
import BlockUi from 'react-block-ui';
import EventBus from 'eventing-bus';
import moment from 'moment';
import numeral from 'numeral';
import {
    EVENT_KEYS
} from './config';
import AlertDialog from './components/alert-dialog/AlertDialog';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './scenes/home/Home';
import Dashboard from './scenes/dashboard/Dashboard';
import NoMatch from './scenes/no-match/NoMatch';
import Session from './utils/Session';
//import 'react-block-ui/style.css';
import MainDash from './scenes/dashboard/MainDash';
import Perfil from './scenes/me/Perfil';



class App extends Component {

    constructor() {
        super();
        moment.locale('es');
        numeral.register('locale', 'es', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'mm',
                billion: 'b',
                trillion: 't'
            },
            ordinal: function (number) {
                var b = number % 10;
                return (b === 1 || b === 3) ? 'er' :
                    (b === 2) ? 'do' :
                    (b === 7 || b === 0) ? 'mo' :
                    (b === 8) ? 'vo' :
                    (b === 9) ? 'no' : 'to';
            },
            currency: {
                symbol: '$'
            }
        });
        numeral.locale('es');
        this.state = {
            blocking: false,
            dialogShowing: false,
            dialogTitle: '',
            dialogMessage: ''
        };
    }

    componentWillMount() {
        EventBus.on(EVENT_KEYS.BLOCK_UI, this.showProgress);
        EventBus.on(EVENT_KEYS.NAVIGATE_TO, this.onNavigateTo);
        EventBus.on(EVENT_KEYS.SHOW_ALERT, this.showAlert);
    }

    showProgress = (show) => {
        this.setState({
            blocking: show
        });
    }

    onNavigateTo = (url) => {
        this.router.history.push(url);
    }

    showAlert = (title, message) => {
        this.setState({
            dialogShowing: true,
            dialogTitle: title,
            dialogMessage: message
        });

    }
    onCloseDialog = () => {
        this.setState({
            dialogShowing: false
        });
	}
	
	render() {
		return (
			<Router ref={(router) => { this.router = router }}>
				<BlockUi tag="div" blocking={this.state.blocking}>
					<AlertDialog
						show={this.state.dialogShowing}
						onClose={this.onCloseDialog}
						title={this.state.dialogTitle}
						message={this.state.dialogMessage}
					/>

					<Switch>
						{ /* https://medium.com/@jenniferdobak/react-router-vs-switch-components-2af3a9fc72e */ }
						
						<Route exact path="/" render={props => {
							if (Session.isAuthenticated())
								return <Redirect to={{
									pathname: '/dashboard',
									state: { from: props.location }
								}} />
							else return <Home />;
						}} />
                        <Route exact path="/campaña" render={props => {
							if (Session.isAuthenticated())
								return <MainDash />
							else return <Home />;
						}} />
                        <Route exact path="/me" render={props => {
							if (Session.isAuthenticated())
								return <Perfil />
							else return <Home />;
						}} />
												
						<PrivateRoute path="/dashboard" component={Dashboard} />

						<Route component={NoMatch} />
					</Switch>
				</BlockUi>
			</Router>
		);
	}
}

export default App;
