import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let img = new Image();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0, y: 0 };
  }

  componentWillMount() {
    img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg'
  }

  componentDidMount() {
    this.updateCanvas();
  }

  'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas'
  'https://blog.lavrton.com/using-react-with-html5-canvas-871d07d8d753'
  updateCanvas() {

    console.log(this.myCanvas.getContext('2d'))
    const ctx = this.myCanvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
  }  

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
        
        <canvas ref={(canvas) => { this.myCanvas = canvas; }} width={300} height={300}/>

        {/* <canvas id="myCanvas" width="200" height="100"
          style={{border: '1px solid #000000'}}>
        </canvas> */}


      </div>
    );
  }
}

export default App;
