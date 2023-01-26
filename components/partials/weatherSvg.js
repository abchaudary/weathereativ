// import React from 'react'
// import ClearDayAnim from '../../assets/weather/clear-day.svg';
import LottieView from 'lottie-react-native';

export default function WeatherSvg() {

    const OverCast = require('../../assets/weather/overcast-rain.json');

    return (
        <LottieView
            autoPlay
            style={{
                width: 200,
                height: 200,
            }}
          source={OverCast}
        />
    )
}
