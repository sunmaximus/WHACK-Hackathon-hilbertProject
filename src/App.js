import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import cat from './cat.svg';
import mountain from './ll.jpg';

const img = new Image();

// These are solutions
// Problems:
//    1. Need Canvas to draw from an image
//    2. Call Refs from the virtual Dom manipulation
//    3. Forgot to add img.onload()
/********************************************************************************************************************************/
// 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas'
// 'https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753'
// 'https://www.google.com/search?q=canvas+wont+draw+jpg&oq=canvas+wont+draw+jpg&aqs=chrome..69i57.8304j0j7&sourceid=chrome&ie=UTF-8'
// 'https://stackoverflow.com/questions/25272889/html5-canvas-image-file-wont-display-on-canvas'
// https://reactjs.org/docs/refs-and-the-dom.html
/********************************************************************************************************************************/


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { arrayOfPixels: [], imageHeight: 0, imageWidth: 0 };
  }
  
  componentWillMount() {
    img.crossOrigin = 'anonymous';    
    img.src = mountain;

    this.setState({ imageHeight: img.height, imageWidth: img.width})
  }

  componentDidMount() {
    const ctx = this.refs.canvas.getContext('2d');
    // important need or else it won't work. 
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      img.style.display = 'none';
    }


    const self = this;

    const pick = (event) => {
      let x = event.layerX;
      let y = event.layerY;
      let pixel = ctx.getImageData(x, y, 1, 1);
      let data = pixel.data;
      let rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${(data[3] / 255)})`

      // self.setState({ arrayOfPixels: [...self.state.arrayOfPixels, [ data[0], data[1], data[2], (data[3] / 255)] ] })
      console.log(rgba)
    }
    this.refs.canvas.addEventListener('mousemove', (event) => pick(event));
  }

  render() {
    console.log(this.state.imageHeight, this.state.imageWidth)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{ display: 'place', justifyContent: 'center', alignItems: 'center'}}>
          <canvas ref="canvas" width={this.state.imageWidth} height={this.state.imageHeight} style={{ border: '2px solid blue' }}/>
        </div>
      </div>
    );
  }
}

export default App;
