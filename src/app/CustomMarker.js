import React from 'react';

export default class CustomMarker extends React.Component {

  render() {
    const style = {
      border: 'solid 1px lightblue',
      backgroundColor: '#333333',
      borderRadius: '50%',
      marginTop: '-12px',
      marginLeft: '-12px',
      width: '24px',
      height: '24px',
      opacity: '50%'
    };

    return (
      <div style={Object.assign({}, this.props.style, style)}></div>
    );
  }

}

