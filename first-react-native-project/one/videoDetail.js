/**
 * Created by zhangchuang on 16/10/8.
 */
import React, {Component} from 'react';
import {BlurView, VibrancyView} from 'react-native-blur';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import VideoPlayer from './videoPlay'

var back_image;
var play_url;

class videoDetail extends Component {

    constructor(props) {

        super(props);
        back_image = props.backImage;
        play_url = props.playUrl;

    }


    render() {
        return (

            <View style={{marginTop:64}}>

                <View style={{flex:1}}>
                    <Image style={{height:280}} source={{uri: back_image}}>
                        <TouchableOpacity onPress={() => this.onPressPlayVideo(play_url)}>
                            <Image style={{height:50,width:50,alignSelf:'center',marginTop:120}}
                                   source={require('../images/play.png')}></Image>
                        </TouchableOpacity>
                    </Image>
                </View>
                <View style={{flex:1.2}}>
                    <Image style={{height:350}} source={{uri: back_image}}>
                        <BlurView blurType="light" style={{height:350}}>
                            <Text style={styles.title_text}>{this.props.title} | {this.props.categoty}</Text>
                            <View style={styles.line_view}></View>
                            <Text style={[styles.title_text, {marginRight:20}]}>{this.props.description}</Text>
                        </BlurView>
                    </Image>
                </View>

            </View>

        );
    }

    onPressPlayVideo(play_url) {


        // alert(play_url);

        this.props.navigator.push({
            title: 'play',
            passProps: {
                playUrl: play_url,
            },
            component: VideoPlayer,
            // translucent: false
        });

    }
    
}
;

var styles = StyleSheet.create({

    my_icon: {
        alignSelf: 'center',
        width: 100,
        height: 150,
    },

    menu_text: {
        marginLeft: 20,
        fontSize: 15
    },

    title_text: {
        fontSize: 15,
        color: 'white',
        marginTop: 15,
        marginLeft: 20
    },

    line_view: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        height: 1,
        backgroundColor: 'white'
    }


})

module.exports = videoDetail;