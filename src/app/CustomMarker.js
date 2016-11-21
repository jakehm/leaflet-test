import React from 'react';

class ExampleMarkerComponent extends React.Component {

  render() {
    const style = {
      border: 'solid 1px lightblue',
      backgroundColor: '#333333',
      borderRadius: '50%',
      marginTop: '-12px',
      marginLeft: '-12px',
      width: '24px',
      height: '24px'
    };

    return (
      <div style={Object.assign({}, this.props.style, style)}></div>
    );
  }

}

