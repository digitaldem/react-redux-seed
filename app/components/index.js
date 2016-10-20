import React from 'react';
import Header from './common/header';
import Footer from './common/footer';


class Components extends React.Component {
  render() {
    console.info('render Components');

    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

Components.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Components;
