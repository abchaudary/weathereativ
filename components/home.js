import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import WeatherSvg from './partials/weatherSvg';
import TempHighest from '../assets/weather/static/thermometer-warmer.svg';
import TempLowest from '../assets/weather/static/thermometer-colder.svg';
import Barometer from '../assets/weather/static/barometer.svg';
import Humidity from '../assets/weather/static/humidity.svg';

// const bgImage = { uri: "https://source.unsplash.com/1080x1920/?nature" };

export class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            bgImg : { uri: "https://source.unsplash.com/1080x1920/?nature" },
            currentTemp: '0',
            description: '...',
            feelsTemp: '0',
            highestTemp: '0',
            lowestTemp: '0',
            pressure: '0',
            humidity: '0',
            windSpeed: '0',
            windDirection: '0'
        }
    }
    componentDidMount () {
        this.getWeatherData();
    }
    getWeatherData = () => {
        // fetch('https://api.openweathermap.org/data/2.5/weather?q=lahore,PK&units=metric&appid=37255134cb9bb02e3de9aa668e7ca801')
        fetch('https://api.openweathermap.org/data/2.5/weather?q=lahore,PK&units=metric&appid=37255134cb9bb02e3de9aa668e7ca801')
        .then((response) => response.json())
        .then((json) => {
            this.setState({bgImg: {uri: 'https://source.unsplash.com/1080x1920/?abstract,' + json.weather[0].main}});
            this.setState({currentTemp: Math.floor(json.main.temp) + '°C'});
            this.setState({description: json.weather[0].description});
            this.setState({feelsTemp: Math.floor(json.main.feels_like) + '°C'});
            this.setState({highestTemp: Math.floor(json.main.temp_max) + '°C'});
            this.setState({lowestTemp: Math.floor(json.main.temp_min) + '°C'});
            this.setState({humidity: Math.floor(json.main.humidity) + '%'});
            this.setState({pressure: Math.floor(json.main.pressure) + 'Hg'});
            this.setState({windSpeed: json.wind.speed + ' km/h'});
            this.setState({windDirection: Math.floor(json.wind.deg) + '°'});
            // console.log(json);
        })
        .catch((error) => console.error(error))
        // .finally(() => setLoading(false));
    }
    render() {
        return (
            <ImageBackground source={this.state.bgImg} resizeMode="cover" blurRadius={3} style={styles.image}>
                <SafeAreaView style={styles.mainContainer}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.weatherInfoBasic}>
                            <WeatherSvg />
                            <Text style={styles.textTempDesc}>{this.state.description}</Text>
                            <Text style={styles.textTempMain}>{this.state.currentTemp}</Text>
                            <Text style={styles.textTempFeels}>Feels Like {this.state.feelsTemp}</Text>
                            <View style={styles.tempHighLow}>
                                <View style={styles.tempHighLowCol}>
                                    <TempHighest style={{height:40,width:40}} />
                                    <Text style={styles.textHighLow}>{this.state.highestTemp}</Text>
                                </View>
                                <View style={styles.tempHighLowCol}>
                                    <TempLowest style={{height:40,width:40}} />
                                    <Text style={styles.textHighLow}>{this.state.lowestTemp}</Text>
                                </View>
                            </View>
                            <View style={styles.tempHighLow}>
                                <View style={styles.tempHighLowCol}>
                                    <Barometer style={{height:40,width:40}} />
                                    <Text style={styles.textHighLow}>{this.state.pressure}</Text>
                                </View>
                                <View style={styles.tempHighLowCol}>
                                    <Humidity style={{height:40,width:40}} />
                                    <Text style={styles.textHighLow}>{this.state.humidity}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.windInfo}>
                            <Text style={styles.windInfoHeading}>Wind</Text>
                            <Text style={styles.windInfoText}>Speed: {this.state.windSpeed}</Text>
                            <Text style={styles.windInfoText}>Direction: {this.state.windDirection}</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    scrollView : {
        // marginHorizontal: 20,
        marginTop: 20,
        width: '100%',
        height: '100%',
    },
    weatherInfoBasic: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    weatherImg: {
        width: 20,
        height: 20,
        backgroundColor: '#fff'
    },
    textTempMain: {
        marginTop: 30,
        color: '#fafafa',
        textAlign: 'center',
        width: '100%',
        fontSize: 70,
        fontFamily:'Press Start 2P',
    },
    textTempDesc: {
        color: '#fafafa',
        textAlign: 'center',
        width: '100%',
        fontSize: 20,
        fontFamily:'Press Start 2P',
    },
    textTempFeels: {
        marginTop: 17,
        color: '#fafafa',
        textAlign: 'center',
        width: '100%',
        fontSize: 20,
        fontFamily:'Press Start 2P',
    },
    tempHighLow: {
        marginTop:12,
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tempHighLowCol: {  
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
    },
    textHighLow: {
        marginTop: 14,
        color: '#fafafa',
        textAlign: 'left',
        fontSize: 18,
        fontFamily:'Press Start 2P',
    },
    windInfoHeading: {
        marginTop: 38,
        color: '#fafafa',
        textAlign: 'center',
        fontSize: 18,
        fontFamily:'Press Start 2P',
    },
    windInfoText: {
        marginTop: 14,
        color: '#fafafa',
        textAlign: 'center',
        fontSize: 14,
        fontFamily:'Press Start 2P',
    },
});

export default Home