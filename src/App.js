import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import cat from './cat.jpg'

const img = new Image();
img.crossOrigin = 'anonymous';
// img.src = cat

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { img: null, arrayOfPixels: [] };
  }

  componentWillMount() {
    img.src = cat
  }

  componentDidMount() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';

    const self = this;

    function pick(event) {
      var x = event.layerX;
      var y = event.layerY;
      var pixel = ctx.getImageData(x, y, 5, 5);
      var data = pixel.data;
      var rgba = 'rgba(' + data[0] + ', ' + data[1] +
                 ', ' + data[2] + ', ' + (data[3] / 255) + ')';

      // self.setState({ arrayOfPixels: [...self.state.arrayOfPixels, [ data[0], data[1], data[2], (data[3] / 255)] ] })

      console.log(rgba)
    }
    this.refs.canvas.addEventListener('mousemove', e => pick(e));
  }

  'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas'
  'https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753'
 

  render() {
    const { x, y } = this.state; 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        
        <canvas ref="canvas" width={300} height={300}/>

        {/* <canvas id="myCanvas" width="200" height="100"
          style={{border: '1px solid #000000'}}>
        </canvas> */}


      </div>
    );
  }
}

export default App;
