import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux'
import { Marker } from 'react-native-maps';
// import { Header, Rating, AirbnbRating, ListItem, Button, Icon } from 'react-native-elements'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Constants, Location, Permissions, TaskManager, Expo, } from 'expo';


// import console = require('console');
// import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapDirection extends React.Component {
    constructor() {
        super()
        this.state = {
            location: null,
            errorMessage: null,
        }
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            if (this.props.sendLocation) {
                console.log(this.props.sendLocation, "sendLocation")
                this.setState({ location: this.props.sendLocation });
            }
            else if (this.props.coordsForEdit) {
                console.log(this.props.coordsForEdit, "cordinates")
                this.setState({ location: this.props.coordsForEdit });
                this.props.mapLocation(this.props.coordsForEdit)

            }
            else {
                this._getLocationAsync().then((res) => {
                })
            }
        }
    }
    _getLocationAsync = async () => {
        try {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
            }

            let location = await Location.getCurrentPositionAsync({});
            // console.log(location, "getlocation")
            this.setState({ location });


            this.props.mapLocation(location.coords)

            return location
        }
        catch (err) {
            // console.log(err, "errLocation")
            if (err = "Error: Location services are disabled") {
                alert(this.props.str.locationservicesaredisabled)
                // alert("this.props.str.locationservicesaredisabled")
            }
        }
    };

    locationSet = (locationSet) => {
        this.props.mapLocation(locationSet)
    }


    render() {
        const { location } = this.state
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }

        // console.log(location, "locationinrender", this.props.sendLocation.latitude,this.props.sendLocation.longitude)
        // console.log(this.props.str.locationservicesaredisabled, "locationerrr")
        return (
            <View >
                {
                    (this.props.sendLocation || this.props.coordsForEdit) ? (
                        (this.props.sendLocation && this.props.sendLocation.latitude && this.props.sendLocation.longitude) ? (
                            <MapView style={{ width: "99%", height: 500 }}
                                provider={PROVIDER_GOOGLE}
                                region={
                                    {
                                        latitude: Number(this.props.sendLocation.latitude),
                                        longitude: Number(this.props.sendLocation.longitude),
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LONGITUDE_DELTA,
                                    }
                                }
                            >
                                <Marker draggable={this.props.sendLocation ? false : true} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
                                    coordinate={
                                        {
                                            latitude: Number(this.props.sendLocation.latitude),
                                            longitude: Number(this.props.sendLocation.longitude),
                                            latitudeDelta: LATITUDE_DELTA,
                                            longitudeDelta: LONGITUDE_DELTA,
                                        }
                                    }
                                    onDragEnd={!this.props.sendLocation ? (e) => this.locationSet(e.nativeEvent.coordinate) : null}
                                />
                            </MapView>
                        ) :

                            // <MapView style={{ width: "99%", height: 500 }}
                            //     provider={PROVIDER_GOOGLE}
                            //     region={
                            //         {
                            //             latitude: Number(this.props.coordsForEdit.latitude),
                            //             longitude: Number(this.props.coordsForEdit.longitude),
                            //             latitudeDelta: LATITUDE_DELTA,
                            //             longitudeDelta: LONGITUDE_DELTA,
                            //         }
                            //     }
                            // >
                            //     <Marker
                            //         // draggable={this.props.coordsForEdit ? false : true} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
                            //         coordinate={
                            //             {
                            //                 latitude: Number(this.props.coordsForEdit.latitude),
                            //                 longitude: Number(this.props.coordsForEdit.longitude),
                            //                 latitudeDelta: LATITUDE_DELTA,
                            //                 longitudeDelta: LONGITUDE_DELTA,
                            //             }
                            //         }
                            //         onDragEnd={!this.props.coordsForEdit ? (e) => this.locationSet(e.nativeEvent.coordinate) : null}
                            //     />
                            // </MapView>

                            <MapView style={{ width: "99%", height: 300 }}
                                provider={PROVIDER_GOOGLE}
                                region={
                                    {
                                        latitude: Number(this.props.coordsForEdit.latitude),
                                        longitude: Number(this.props.coordsForEdit.longitude),
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LONGITUDE_DELTA,
                                    }
                                }
                            >
                                <Marker draggable={this.props.sendLocation ? false : true} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
                                    coordinate={
                                        {
                                            latitude: Number(this.props.coordsForEdit.latitude),
                                            longitude: Number(this.props.coordsForEdit.longitude),
                                            latitudeDelta: LATITUDE_DELTA,
                                            longitudeDelta: LONGITUDE_DELTA,
                                        }
                                    }
                                    onDragEnd={!this.props.sendLocation ? (e) => this.locationSet(e.nativeEvent.coordinate) : null}
                                />
                            </MapView>


                    ) :
                        <MapView style={{ width: "99%", height: 300 }}
                            provider={PROVIDER_GOOGLE}
                            region={
                                {
                                    latitude: location && location.coords ? location.coords.latitude : 31.205753,
                                    longitude: location && location.coords ? location.coords.longitude : 29.924526,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                }
                            }
                        >
                            <Marker draggable={this.props.sendLocation ? false : true} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
                                coordinate={
                                    {
                                        latitude: location && location.coords ? location.coords.latitude : 31.205753,
                                        longitude: location && location.coords ? location.coords.longitude : 29.924526,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LONGITUDE_DELTA,
                                    }
                                }
                                onDragEnd={!this.props.sendLocation ? (e) => this.locationSet(e.nativeEvent.coordinate) : null}
                            />
                        </MapView>
                }

            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});

const mapStateToProps = state => {
    return {
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        str: state.root.str,
        user: state.auth.user
    };
};


function mapDispatchToProps(dispatch) {
    return ({
        // userAuth: (Email, Password) => {
        //     dispatch(userAction(Email, Password));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDirection);



