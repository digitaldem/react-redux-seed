import React from 'react';
import { connect } from 'react-redux';
import { isEqual } from '../../utilities';
import { loadExamples } from '../../actions/examples';


class Landing extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  componentWillMount() {
    this.props.dispatch(loadExamples());
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
  dispatch: React.PropTypes.func.isRequired,
  examples: React.PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    examples: state.examples.results
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(Landing);
