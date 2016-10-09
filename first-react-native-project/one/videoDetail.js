/**
 * Created by zhangchuang on 16/10/8.
 */
import React, {Component} from 'react';
import {BlurView, VibrancyView} from 'react-native-blur';
import Video from 'react-native-video';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    AlertIOS
} from 'react-native';

var back_image;
var play_url;

class videoDetail extends Component {

    constructor(props) {

        super(props);
        back_image = props.backImage;
        play_url = props.playUrl;
        this.state = {
            animationType: 'fade',
            modalVisible: true,
            transparent: false,
            pageIndex: 0,

            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: false,
            paused: false,
            skin: 'custom'
        };

        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);

    }

    onLoad(data) {
        this.setState({duration: data.duration});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    render() {


        switch (this.state.pageIndex) {

            case 0:
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

            case 1:

                const videoStyle = styles.fullScreen;
                const flexCompleted = this.getCurrentTimePercentage() * 100;
                const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

                return (
                    <Modal
                        animationType={this.state.animationType}
                        transparent={this.state.transparent}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setModalVisible(false)}}>

                        <View style={styles.container}>
                            <View style={styles.fullScreen}>
                                <TouchableOpacity style={styles.fullScreen}
                                                  onPress={() => {this.setState({paused: !this.state.paused})}}>
                                    <Video
                                        source={{uri: play_url}}
                                        style={videoStyle}
                                        rate={this.state.rate}
                                        paused={this.state.paused}
                                        volume={this.state.volume}
                                        muted={this.state.muted}
                                        resizeMode={this.state.resizeMode}
                                        onLoad={this.onLoad}
                                        onProgress={this.onProgress}
                                        onEnd={() => { AlertIOS.alert('Done!') }}
                                        repeat={true}
                                        controls={this.state.controls}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.controls}>
                            <View>

                                <View style={{alignItems:'center'}}>
                                    <TouchableHighlight
                                        underlayColor='#4169e1'
                                        onPress={this.setModalVisible.bind(this,true)}>
                                        <Text style={{fontSize:17,alignSelf:'center',color:'white'}}>退出</Text>
                                    </TouchableHighlight>
                                </View>

                                <View style={styles.progress}>
                                    <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
                                    <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
                                </View>
                            </View>
                        </View>
                    </Modal>
                );
        }
    }


    onPressPlayVideo() {
        this.setState({pageIndex: 1});
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
        this.setState({pageIndex: 0});
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 10,
        left: 4,
        right: 4,
    },
    progress: {
        marginTop: 40,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },

})

module.exports = videoDetail;