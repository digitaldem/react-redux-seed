import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { __NAME__ } from '../../../constants';


// const onInterval = (props, dispatch) => (dispatch(null));

class Header extends React.Component {
  /*
  constructor() {
    super();
    this.startPolling = this.startPolling.bind(this);
    this.stopPolling = this.stopPolling.bind(this);
  }

  componentDidMount() {
    this.startPolling();
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling() {
    if (this.interval) {
      return;
    }
    this.keepPolling = true;
    this.asyncInterval(__POLLING_TIME__, onInterval);
  }

  stopPolling() {
    this.keepPolling = false;
    if (this.interval) {
      clearTimeout(this.interval);
    }
  }

  asyncInterval (intervalDuration, fn) {
    const promise = fn(this.props, this.props.dispatch);
    const asyncTimeout = () => setTimeout(() => {
      this.asyncInterval(intervalDuration, fn);
    }, intervalDuration);
    const assignNextInterval = () => {
      if (!this.keepPolling) {
        this.stopPolling();
        return;
      }
      this.interval = asyncTimeout();
    };

    Promise.resolve(promise).then(assignNextInterval).catch(assignNextInterval);
  }
  */

  render() {
    console.info('render Header');

    return (
      <div className="header">
        <div className="headerLeft">
          <h3>{ __NAME__ }</h3>
        </div>
        <div className="headerRight">
          {this.props.username}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  actions: React.PropTypes.object.isRequired,
  username: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    username: state.user.name
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ }, dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, dispatchProps, ownProps, stateProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(Header);
