/**
 * Created by zhangchuang on 16/10/5.
 */
'use strict';

import React, {Component} from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Util from '../Util';
import MapView from 'react-native-maps';
// import Icon from 'react-native-vector-icons/Ionicons';
let id = 0;

class mylocation extends Component {

    constructor() {
        super();
        this.state = {
            isFirstLoad: true,
            mapRegion: undefined,
            // mapRegionInput: ,
            annotations: [],
            markers: [],
            events: [],
        };
    }


    makeEvent(e, name) {
        return {
            id: id++,
            name,
            data: e.nativeEvent ? e.nativeEvent : e,
        };
    }

    recordEvent(name) {
        return e => {
            const { events } = this.state;
            this.setState({
                events: [
                    this.makeEvent(e, name),
                    ...events.slice(0, 10),
                ],
            });
        };
    }

    render() {
        return (
            <View>
                <MapView
                    mapTyle = "standard"
                    style = {styles.map}
                    showsUserLocation = {true}
                    followUserLocation = {true}
                    onPress={this.recordEvent('Map::onPress')}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.latlng}
                            title={'uygjuyguy'}
                            description={marker.description}
                        />
                    ))}
                </MapView>


            </View>
        )
    }

    ssss() {
        // alert("dddd");
        console.log("ddddd");
    }
    _onRegionChange(region) {
        this.setState({
            mapRegionInput: region,
        });
    }

    _onRegionChangeComplete(region) {
        if (this.state.isFirstLoad) {
            this.setState({
                // mapRegionInput: region,
                annotations: this._getAnnotations(region),
                isFirstLoad: false,
            });
        }
    }

    _getAnnotations(region): Annotations {
        return [{
            longitude: region.longitude,
            latitude: region.latitude,
            title: 'You Are Here',
        }];
    }



}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 60
    },
    map: {
        marginTop:64,
        width: Util.size.width,
        height: Util.size.height - 64
        // margin: 0
    },
    btn: {
        backgroundColor: "#00a803",
        width: Util.size.width - 80,
        height: 40,
        borderWidth: Util.pixel,
        borderColor: "#009302",
        borderRadius: 4,
        justifyContent: "center",
        marginTop: 10
    },
    btnText: {
        textAlign: "center",
        fontSize: 18,
        color: "#fff"
    },
});

module.exports = mylocation;