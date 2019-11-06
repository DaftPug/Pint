import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Marker } from 'react-native-maps';

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    region: null, 
    marker : null
  };
  

  async componentDidMount()   
  {
    await this.AskPermission(); // Check that we have permission to access location data - ask if we don't 
    this.watchId = Location.watchPositionAsync(
      {accuray:Location.Accuracy.BestForNavigation , timeInterval:1000, distanceInterval:1,  mayShowUserSettingsDialog:true},
      // This is the callback function specifying  all the stuff that we want to happen whenver we have a new location
      (currentPosition) => {
        // orderDistanceArray({latitude: currentPosition.coords.latitude, longitude:currentPosition.coords.longitude});
        
        this.setState({
          location:currentPosition,
          region: {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.075, // About 11 km
            longitudeDelta: 0.075, // About 6 km
          },
          marker: {
                  latlng :currentPosition.coords
          },

          error: null,
        });
         // Just in case we want to log while debugging
        //console.group(pointsOfInterest);
      }
    );
  }

  componentWillUnmount() 
  {
    this.watchId.remove(); // stop watching for location changes
  }

  AskPermission  = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('Asking for geo permission: ' + status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  };

  render() {
    const {location} = this.state; // Taking location from overall state object
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      // text = JSON.stringify(this.state.location);
      text = "timestamp:"+location.timestamp + "\n"+ " Længdegrad: " + location.coords.longitude + "\n" +" Breddegrad: " + location.coords.latitude;
    }

    return (
      <View style={styles.container}>
        {this.state.region ?
        ( <MapView style={styles.mapStyle}   region={this.state.region} >
            <Marker  coordinate={this.state.marker.latlng} title ='Tomasok' description = 'På vej igen ..'/>
          
            </MapView> 
        )
        : null}
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*3/4,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});