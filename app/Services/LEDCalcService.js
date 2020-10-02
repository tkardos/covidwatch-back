"use strict";

/**
 * @return {string}
 */
async function LEDCalcService(recovered, confirmed, deaths) {

  try {
    let green= -1;
    let yellow= -1;
    let red= -1;
    let numberOfLEDs= 120;
    const millisecondsPerLED = 20;
    const total=recovered+confirmed+deaths;

    if(total===0){
      return '{ "controller": { "controllerType": "Timer",' +
          ' "controllerDescriptor":{ "initialActions": [],' +
          ' "timerActions":[ { "initialDelay": 0, "repetitionDelay": 0,' +
          ' "actions": [ { "actionType": "CreateSegment",' +
          ' "actionDescriptor":{ "headPosition": 119, "length": 120,' +
          ' "headColor": { "r": 255, "g": 255, "b": 255 },' +
          ' "headIntensity": 1.0, "priority": 0, "transforms": [] } } ] } ] } } }'
    }

    if(Math.round(recovered/total*120) === 0){
      if(recovered===0){
        green=0;
      }else{
        green=1;
        numberOfLEDs--;
      }
    }
    if(Math.round(confirmed/total*120) === 0){
      if(confirmed===0){
        yellow=0;
      }else{
        yellow=1;
        numberOfLEDs--;
      }
    }
    if(Math.round(deaths/total*120) === 0){
      if(deaths===0){
        red=0;
      }else{
        red=1;
        numberOfLEDs--;
      }
    }
    if(green<0){
      green=Math.round(recovered/total*120);
      green= green<numberOfLEDs ? green : numberOfLEDs;
      numberOfLEDs-=green;
    }
    if(yellow<0){
      yellow=Math.round(confirmed/total*120);
      yellow= yellow<numberOfLEDs ? yellow : numberOfLEDs;
      numberOfLEDs-=yellow;
    }
    if(red<0){
      red=Math.round(deaths/total*120);
      red= red<numberOfLEDs ? red : numberOfLEDs;
    }

    return '{ "controller": { "controllerType": "Timer",' +
        ' "controllerDescriptor":{ "initialActions": [],' +
        ' "timerActions":[ { "initialDelay": 0, "repetitionDelay": 0,' +
        ' "actions": [ { "actionType": "CreateSegment",' +
        ' "actionDescriptor":{ "headPosition": 0, "length": 120,' +
        ' "headColor": { "r": 0, "g": 255, "b": 0 }, "headIntensity": 1.0,' +
        ' "priority": 3, "transforms": [ { "transform": { "transformType": "Move",' +
        ' "transformDescriptor": { "LEDsPerSecond": '+1000/millisecondsPerLED +
        ' } } } ] } } ] }, { "initialDelay": '+green*millisecondsPerLED+',' +
        ' "repetitionDelay": 0, "actions": [ { "actionType": "CreateSegment",' +
        ' "actionDescriptor":{ "headPosition": '+(green+(green===0)-1)+', "length": '+
        green+', "headColor": { "r": 0, "g": 255, "b": 0 },' +
        ' "headIntensity": 1.0, "priority": 0, "transforms": [] } } ] },' +
        ' { "initialDelay": '+green*millisecondsPerLED+',' +
        ' "repetitionDelay": 0, "actions": [ { "actionType": "CreateSegment",' +
        ' "actionDescriptor":{ "headPosition": '+green+', "length": 120,' +
        ' "headColor": { "r": 255, "g": 255, "b": 0 }, "headIntensity": 1.0,' +
        ' "priority": 2, "transforms": [ { "transform": { "transformType": "Move",' +
        ' "transformDescriptor": { "LEDsPerSecond": '+1000/millisecondsPerLED+
        ' } } } ] } } ] }, { "initialDelay": '+
        (green+yellow)*millisecondsPerLED+', "repetitionDelay": 0,' +
        ' "actions": [ { "actionType": "CreateSegment",' +
        ' "actionDescriptor":{ "headPosition": '+(green+yellow+(yellow===0)-1)+',' +
        ' "length": '+yellow+', "headColor": { "r": 255, "g": 255, "b": 0 },' +
        ' "headIntensity": 1.0, "priority": 0, "transforms": [] } } ] },' +
        ' { "initialDelay": '+(green+yellow)*millisecondsPerLED+',' +
        ' "repetitionDelay": 0, "actions": [ { "actionType": "CreateSegment",' +
        ' "actionDescriptor":{ "headPosition": '+(green+yellow)+',' +
        ' "length": 120, "headColor": { "r": 255, "g": 0, "b": 0 },' +
        ' "headIntensity": 1.0, "priority": 1,' +
        ' "transforms": [ { "transform": { "transformType": "Move",' +
        ' "transformDescriptor": { "LEDsPerSecond": '+1000/millisecondsPerLED+
        ' } } } ] } } ] }, { "initialDelay": '+
        (green+yellow+red)*millisecondsPerLED+', "repetitionDelay": 0,' +
        ' "actions": [ { "actionType": "CreateSegment",' +
        ' "actionDescriptor":{ "headPosition": 119, "length": '+red+',' +
        ' "headColor": { "r": 255, "g": 0, "b": 0 }, "headIntensity": 1.0,' +
        ' "priority": 0, "transforms": [] } } ] } ] } } }';

  } catch (error) {
    console.log(`Service error: ${error}`);
  }
}

module.exports = {
  LEDCalcService: LEDCalcService,
};