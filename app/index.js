import Bugsnag from 'bugsnag-js';
import React from 'react';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import Components from './components';
import Landing from './components/landing';
import Error from './components/error';
import { __ENVIRONMENT__, __VERSION__, __DEBUG__, __BUGSNAG_KEY__, __GA_ACCOUNT_ID__ } from './constants';
import configureStore from './middlewares';


class App extends React.Component {
  componentWillMount() {
    const { username } = this.props;

    // Configure Bugsnag logging
    if (__BUGSNAG_KEY__) {
      Bugsnag.apiKey = __BUGSNAG_KEY__;
      Bugsnag.appVersion = __VERSION__;
      Bugsnag.releaseStage = __ENVIRONMENT__;
      Bugsnag.user = { id: username };
    } else {
      console.warn('[bugsnag] apiKey is required in configuration');
    }

    // Initialize Google Analytics
    ReactGA.initialize(__GA_ACCOUNT_ID__, {
      debug: __DEBUG__,
      gaOptions: {
        userId: username
      }
    });
  }

  logPageView() {
    // Send page view to Google Analytics
    ReactGA.set({
      dataSource: __ENVIRONMENT__,
      hostname: window.location.hostname
    });
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    console.info('render App');

    return (
      <Provider store={configureStore({ user: { name: this.props.username, email: this.props.useremail } })}>
        <Router history={browserHistory} onUpdate={this.logPageView}>
          <Route name="components" path="/" component={Components}>
            <IndexRoute name="landing" component={Landing} />
            <Route name="notfound" path="*" component={Error} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  username: React.PropTypes.string.isRequired,
  useremail: React.PropTypes.string.isRequired
};

export default App;
