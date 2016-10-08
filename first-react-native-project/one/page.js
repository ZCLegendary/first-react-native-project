/**
 * Created by zhangchuang on 16/9/29.
 */
import React, {Component} from 'react';

import ScrollableTabView, {DefaultTabBar,} from 'react-native-scrollable-tab-view'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Image,
    ScrollView,
    ListView,
    TouchableOpacity
} from 'react-native';

import videoDetail from './videoDetail'

var video_url = "http://baobab.wandoujia.com/api/v1/videos?start=0&num=10&categoryName=旅行&strategy=shareCount";
var music_url = "http://mobile.ximalaya.com/mobile/discovery/v2/category/keyword/albums?calcDimension=hot&categoryId=2&device=iPhone&keywordId=115&pageId=1&pageSize=20&statEvent=pageview%2Fcategory%40%E9%9F%B3%E4%B9%90&statModule=%E9%9F%B3%E4%B9%90&statPage=tab%40%E5%8F%91%E7%8E%B0_%E5%88%86%E7%B1%BB&status=0&version=5.4.33";

class page extends Component {


    constructor(props) {

        super(props);
        var data_source = new ListView.DataSource({rowHasChanged: ((r1, r2) => r1 !== r2)});
        this.state = {
            dataSource_video: data_source,
            dataSource_music: data_source,
            loaded: false
        }
    }

    componentDidMount() {
        this.fetchData_video();
        this.fetchData_music();
    }


    // video data
    fetchData_video() {
        fetch(video_url)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData.data);
                this.setState({
                    dataSource_video: this.state.dataSource_video.cloneWithRows(responseData.videoList),
                    loaded: true
                })
            }).done();
    }

    // music data
    fetchData_music() {
        fetch(music_url)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData.data);
                this.setState({
                    dataSource_music: this.state.dataSource_music.cloneWithRows(responseData.list),
                    loaded: true
                })
            }).done();
    }


    render() {

        if (this.state.loaded) {

            return (

                <ScrollableTabView
                    style={{marginTop: 64}}
                    renderTabBar={() => <DefaultTabBar />}
                >
                    <ScrollView tabLabel="Video" style={styles.tabView}>
                        <ListView
                            style={{flex:1}}
                            dataSource={this.state.dataSource_video}
                            renderRow={this.renderRow_video.bind(this)}
                        />
                    </ScrollView>


                    <ScrollView tabLabel="Music" style={styles.tabView}>
                        <ListView
                            style={{flex:1}}
                            dataSource={this.state.dataSource_music}
                            renderRow={this.renderRow_music.bind(this)}
                        />
                    </ScrollView>
                </ScrollableTabView>
            );

        } else {

            return (

                <View style={styles.container}>
                    <Text style={{fontSize:16}}>
                        Loading...
                    </Text>
                </View>
            )
        }
    }


    //video listView
    renderRow_video(rowData) {
        return (

            <TouchableOpacity onPress={() => this.onPressVideoItem(rowData)}>
                <View style={[styles.card, {marginTop:10}]}>
                    <View>
                        <Image style={{height:150}} source={{uri: rowData.coverForDetail}}></Image>
                    </View>
                    <View>
                        <Text style={{alignSelf: 'center', fontSize:16, marginTop:10}}>{rowData.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    // music listView
    renderRow_music(rowData) {

        var count = (rowData.playsCounts / 10000).toString().substr(0, 5);
        return (

            <TouchableOpacity onPress={() => this.onPressMusicItem(rowData)}>
                <View style={[styles.card, {marginTop:6, flexDirection: 'row'}]}>
                    <View style={[styles.image_view]}>
                        <Image style={{width:50, height:50}} source={{uri: rowData.coverMiddle}}></Image>
                    </View>
                    <View>
                        <Text style={[styles.text_item, {fontSize:14, color: 'black'}]}>{rowData.title}</Text>
                        <Text style={[styles.text_item]}>{rowData.intro}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.text_item]}>{rowData.tracks}集</Text>
                            <Text style={[styles.text_item]}>{count}万次播放</Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    //onPressVideoItem
    onPressVideoItem(info) {
        // alert("video");
        this.props.navigator.push({
            title: info.title,
            passProps: {
                playUrl: info.playUrl,
                backImage: info.coverForDetail,
                title: info.title,
                categoty: info.category,
                description: info.description
            },
            component: videoDetail,
            // translucent: false
        });
    }

    //onPressMusicItem
    onPressMusicItem() {
        alert("music");
    }

}
;

var styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        padding: 5,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },

    image_view: {
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        backgroundColor: '#fff',
        padding: 3,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        width: 58
    },

    text_item: {
        alignSelf: 'flex-start',
        fontSize: 11,
        marginTop: 5,
        marginLeft: 5,
        color: 'gray'
    }
})


module.exports = page;