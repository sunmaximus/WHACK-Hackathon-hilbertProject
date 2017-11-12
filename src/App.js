import React, { Component } from 'react';
import cat from './cat.jpg';
import mountain from './ll.jpg';
import red from './red.jpg';
import ocean from './ocean.png';
import pink from './pink.png';


import { Checkbox, Container } from 'semantic-ui-react'
import { Line } from 'react-chartjs-2';

// import Chart from 'chart.js';

import './styles/app.css'

const img = new Image();
// img.crossOrigin = 'anonymous';    
// img.src = mountain;

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

    this.state = { 
      arrayOfPixels: [], 
      imageHeight: 0, 
      imageWidth: 0, 
      rgba: 'rgb(73, 104, 172)',
      pixelCounter: 0,
      xAxis: Array.apply(null, Array(180)).map(function (_, i) {return i*3.14/180;}),
      yAxis: []
    };
  }
  
  componentWillMount() {
    img.crossOrigin = 'anonymous';    
     //img.src = mountain;
    // img.src = red;
    // img.src = ocean;
    img.src = pink;
    // img.src = cat;
  }

  componentDidMount() {    
    const self = this;    
    const ctx = this.refs.canvas.getContext('2d');
    // important need or else it won't work. 
    img.onload = () => {
      
      this.setState({ imageHeight: img.height, imageWidth: img.width, isMajor: true, isMinnor: false })
      ctx.drawImage(img, 0, 0);
      img.style.display = 'none';
    }

    const pick = (event) => {
      let x = event.layerX;
      let y = event.layerY;
      let pixel = ctx.getImageData(x, y, 10, 10);
      let data = pixel.data;
      let rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${(data[3] / 255)})`
      // console.log(rgba)

      // self.setState({ arrayOfPixels: [...self.state.arrayOfPixels, [ data[0], data[1], data[2], (data[3] / 255)] ] })
      // console.log([ data[0], data[1], data[2], (data[3] / 255) ])

      self.setState({ rgba })
      return [data[0], data[1], data[2]]

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
    const scaleToFrequency = (rgba) => {
        var multipliedTotal = rgba[0] * rgba[1] * rgba[2]
        return (multipliedTotal/(255*255*255))*600 + 200 
    }
    
    //takes a frequency and plays a sound, returns the AudioContext() object so that it can be stopped later
    const playSound = (frequency) => {
        /*for (i = 0; i < 6; i++){
            oscillators[i].frequency.value = frequency*(i+1)
            gains[i].gain.value = pianoGains[i]
            oscillators[i].start()
        }*/
        oscillators[0].frequency.value = frequency
        oscillators[1].frequency.value = frequency*5/4
        oscillators[2].frequency.value = frequency*3/2

        // console.log('frequency', frequency)

        if (self.state.yAxis.length === self.state.xAxis.length) {
          self.setState({ yAxis: [...self.state.yAxis.splice(1), Math.sin(2 * Math.PI * frequency)]})
        } else {
          self.setState({ yAxis: [...self.state.yAxis, Math.sin(2 * Math.PI * frequency)]})          
        }

        contexts[0].resume()
        contexts[1].resume()
        contexts[2].resume()

        self.setState({ pixelCounter: self.state.pixelCounter + 1 })
      }
      
      const stopSound = () => {
        for (let i = 0; i < 3; i++){
            contexts[i].suspend()

    //            oscillators[i] = contexts[i].createOscillator('sine')
    //            oscillators[i].connect(contexts[i].destination)
        }
    }
    
    const mouseDown = (evt) => {
      //toggle soundOn 
      soundOn = (soundOn) ? false : true;
      if (soundOn){
          mouseMove(evt)
      }
      else{
          stopSound()
      }
      // console.log("In Mouse Down")
      
        // if (evt.type === 'mouseout') return stopSound();
        // return mouseMove(evt)
        // console.log("In Mouse Down")
    }
    
    const mouseMove = (evt) => {
        //pick(evt) returns an rgba tuple, scale changes it to a frequency, and play plays that frequency
        playSound(scaleToFrequency(pick(evt)))
        // console.log("In Mouse Move")
        //compose(play(), scale(), pick(evt))
        if (self.state.isMajor){
          playSound(scaleToFrequency(pick(evt)), 5/4)
          // console.log('isMajor')
        }
        else{
          // console.log('isMinnor')
          playSound(scaleToFrequency(pick(evt)), 6/5)
        }
    }
    
    const mouseOut = (event) => {
      if (event.type === 'mouseout') return stopSound();
      return mouseMove(event)
      // console.log("In Mouse Down")
    }

    //event handlers
    this.refs.canvas.addEventListener('mousedown', (event) => mouseDown(event)) // Click on picture
    this.refs.canvas.addEventListener('mouseout', (event) => mouseOut(event)) // Not in picutre
    this.refs.canvas.addEventListener('mousemove', (event) => mouseMove(event)) // Moving in picture

    //----------------------------------------------------------------------------------------------//
    //                                           Chart                                              //
    //----------------------------------------------------------------------------------------------//


  }

  render() {
    // console.log(this.state.imageHeight, this.state.imageWidth)
    const { imageWidth, imageHeight, rgba, isMajor, isMinnor, pixelCounter } = this.state;

    console.log(this.state.xAxis)
    // console.log(imageWidth, imageHeight)
    return (
      <div>
          <div className='custom-title-container'>Hilbert Project</div>
          
          <div className='custom-picture-container'>
            <div className='left'>
              <canvas ref="canvas" width={imageWidth === 0 ? 0 : imageWidth} height={imageHeight === 0 ? 0 : imageHeight}/>
            </div>
            <div className='right' >
              <div className='right-top-item' style={{ width: imageWidth === 0 ? `${0}px` : imageWidth, height: imageHeight === 0 ? `${0/2}px` : imageHeight/2, backgroundColor: rgba }}>
                {this.state.rgba}
              </div>
              <div className='right-bottom-item' style={{ border: `1px solid ${rgba}`}}>
               
                {/* <div className='item-left'>
                  <Checkbox checked={isMajor} onClick={() => this.setState({ isMajor: (isMajor ? false : true)})} label='Major' type='radio' />
                </div>

                <div className='item-right'>
                  <Checkbox checked={!isMajor} onClick={() => this.setState({ isMajor: !isMajor ? true : false })} label='Minnor' type='radio' />
                </div> */}

                <Line data={{
                      labels: this.state.xAxis,
                      datasets: [
                        {
                          label: '', //'Frequency Waveforms',
                          fill: false,
                          lineTension: 0.1,
                          backgroundColor: 'rgba(75,192,192,0.4)',
                          borderColor: rgba, //'rgba(75,192,192,1)',
                          borderCapStyle: 'butt',
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: 'miter',
                          pointBorderColor:  rgba, //'rgba(75,192,192,1)',
                          pointBackgroundColor: '#fff',
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                          pointHoverBorderColor: 'rgba(220,220,220,1)',
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                          data: this.state.yAxis
                        },
                      ]
                    }} 
                    
                    height={125}
                    />

              </div>
            </div>
          </div>

          {/* <Line data={{
                labels: this.state.xAxis,
                datasets: [
                  {
                    label: 'Frequency Waveforms',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: rgba, //'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor:  rgba, //'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.yAxis
                  }
                ]
              }} /> */}

      </div>
    );
  }
}

export default App;
