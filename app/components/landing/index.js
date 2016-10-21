import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEqual } from '../../utilities';
import { loadExamples } from '../../actions/examples';


class Landing extends React.Component {
  componentWillMount() {
    this.props.actions.loadExamples();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  render() {
    console.info('render Landing');

    return (
      <div className="main">
        Landing Page

        <ul>
          { this.props.examples.map((obj, i) => <li key={i}>{obj.name}</li>) }
        </ul>
      </div>
    );
  }
}

Landing.propTypes = {
  actions: React.PropTypes.object.isRequired,
  examples: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    examples: state.examples.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loadExamples
    }, dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, dispatchProps, ownProps, stateProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(Landing);
