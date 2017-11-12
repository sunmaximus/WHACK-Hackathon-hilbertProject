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

    const pick = (event) => {
      let x = event.layerX;
      let y = event.layerY;
      let pixel = ctx.getImageData(x, y, 1, 1);
      let data = pixel.data;
      let rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${(data[3] / 255)})`

      // self.setState({ arrayOfPixels: [...self.state.arrayOfPixels, [ data[0], data[1], data[2], (data[3] / 255)] ] })
      console.log([ data[0], data[1], data[2], (data[3] / 255) ])
      return [data[0], data[1], data[2]]

      // console.log(rgba)
    }
    // this.refs.canvas.addEventListener('mousemove', (event) => pick(event));
      //global variable soundOn, context, o 
      var soundOn = false
      var contexts = []
      var oscillators = []
     // var gains = []
     /* var pianoGains = [1.0, 0.399064778, 0.229404484, 0.151836061,
                      0.196754229, 0.093742264, 0.060871957,
                      0.138605419, 0.010535002, 0.071021868,
                      0.029954614, 0.051299684, 0.055948288,
                      0.066208224, 0.010067391, 0.00753679,
                      0.008196947, 0.012955577, 0.007316738,
                      0.006216476, 0.005116215, 0.006243983,
                      0.002860679, 0.002558108, 0.0, 0.001650392]*/
      
      for (let i = 0; i < 3; i++){
          contexts[i] = new AudioContext()
      }
      for (let i = 0; i < 3; i++){
          oscillators[i] = contexts[i].createOscillator('sine')
          oscillators[i].connect(contexts[i].destination)
          oscillators[i].start()
          contexts[i].suspend()
          //gains[i] = contexts[i].createGain()
          //gains[i].connect(contexts[i].destination);
      }
      //o.type = "sine"
      
      //returns a frequency between 200 and 800 Hz, and takes an rgba tuple/list/array
        function scaleToFrequency(rgba){
          var multipliedTotal = rgba[0] * rgba[1] * rgba[2]
          return (multipliedTotal/(255*255*255))*600 + 200 
      }
      
      //takes a frequency and plays a sound, returns the AudioContext() object so that it can be stopped later
      function playSound(frequency){
          /*for (i = 0; i < 6; i++){
              oscillators[i].frequency.value = frequency*(i+1)
              gains[i].gain.value = pianoGains[i]
              oscillators[i].start()
          }*/
          oscillators[0].frequency.value = frequency
          oscillators[1].frequency.value = frequency*5/4
          oscillators[2].frequency.value = frequency*3/2

          contexts[0].resume()
          contexts[1].resume()
          contexts[2].resume()
      }
      
      function stopSound(){
        for (let i = 0; i < 3; i++){
            contexts[i].suspend()

//            oscillators[i] = contexts[i].createOscillator('sine')
//            oscillators[i].connect(contexts[i].destination)
            
        }
    }
      
      function mouseDown(evt){
          //toggle soundOn 
          soundOn = (soundOn) ? false : true;
          if (soundOn){
              mouseMove(evt)
          }
          else{
              stopSound()
          }
          console.log("In Mouse Down")
          
      }
      
      
      function mouseMove(evt){
          //pick(evt) returns an rgba tuple, scale changes it to a frequency, and play plays that frequency
          playSound(scaleToFrequency(pick(evt)))
          console.log("In Mouse Move")
          //compose(play(), scale(), pick(evt))
      }
      
      
      //event handlers
      this.refs.canvas.addEventListener('mousedown', (event) => mouseDown(event))
      this.refs.canvas.addEventListener('mousemove', (event) => mouseMove(event))
  }

  render() {
    // console.log(this.state.imageHeight, this.state.imageWidth)
    return (
      <div>
        <div style={{ display: 'place', justifyContent: 'center', alignItems: 'center'}}>
          <canvas ref="canvas" width={this.state.imageWidth} height={this.state.imageHeight} style={{ border: '2px solid blue' }}/>
        </div>
      </div>
    );
  }
}

export default App;
