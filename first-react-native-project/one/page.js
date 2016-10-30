/**
 * Created by zhangchuang on 16/9/29.
 */
import React, {Component} from 'react';

import ScrollableTabView, {DefaultTabBar,} from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as WeChat from 'react-native-wechat';


import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Image,
    ScrollView,
    ListView,
    TouchableOpacity,
    RefreshControl,
    TextInput,
    AlertIOS
} from 'react-native';

import videoDetail from './videoDetail'
import musicDetail from './musicDetail'


var video_head = "http://baobab.wandoujia.com/api/v1/videos?start=0&num=40&categoryName="
var video_foot = "&strategy=shareCount"
var inputText = "时尚"
var video_url
var music_url = "http://mobile.ximalaya.com/mobile/discovery/v2/category/metadata/albums?calcDimension=hot&categoryId=2&device=iPhone&metadatas=73%3A567&pageId=1&pageSize=40&status=0&version=5.4.33";

var placeholder = "输入视频类型...";




class page extends Component {


    constructor(props) {

        super(props);
        WeChat.registerApp('wx865f1046cbd0ee5b');
        var data_source = new ListView.DataSource({rowHasChanged: ((r1, r2) => r1 !== r2)});
        this.state = {
            dataSource_video: data_source,
            dataSource_music: data_source,
            loaded: false,
            isRefreshing: false
        }
    }

    componentDidMount() {
        this.fetchData_video();
        this.fetchData_music();
    }


    // video data
    fetchData_video() {

        if (inputText == '生活' || inputText == '旅行' || inputText == '游戏' || inputText == '运动' || inputText == '音乐' || inputText == '创意' || inputText == '搞笑' || inputText == '时尚') {

            this.setState({
                loaded: false
            })
            video_url = video_head + inputText + video_foot;
            fetch(video_url)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData.data);
                    this.setState({
                        dataSource_video: this.state.dataSource_video.cloneWithRows(responseData.videoList),
                        loaded: true
                    })
                }).done();


        } else {

            AlertIOS.alert(
                '提示信息',
                '暂时只可输入生活,旅行,游戏,运动,音乐,创意,搞笑,时尚',
                [
                    {text: '确定', onPress: () => console.log('Bar Pressed!')},
                ]
            )
            // alert('')
        }
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


    getCurrentPage(page) {

        // alert(page.i)
        if (page.i == 0) {
            placeholder = "输入视频类型..."
        } else {
            placeholder = "输入音乐类型..."
        }
    }

    render() {

        if (this.state.loaded) {

            return (

                <View style={{flex:1}}>
                    <View style={styles.header}>
                        <TextInput
                            style={styles.searchInput}
                            returnKeyType="search"
                            placeholder={placeholder}
                            onChangeText={(text) => (inputText = text)}
                        />

                        <TouchableOpacity onPress={() => this.fetchData_video()}>
                            <Icon
                                name="search"
                                size={26}
                            />
                        </TouchableOpacity>

                    </View>

                    <ScrollableTabView
                        style={{marginTop: 0, flex:1}}
                        onChangeTab = {(page) => this.getCurrentPage(page)}
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

                </View>
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


    //refresh
    refreshVideoData() {
        this.setState({isRefreshing: true});
        alert("嘻嘻嘻");
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // 准备下拉刷新的5条数据


            this.setState({
                isRefreshing: false,
            });
        }, 5000);
    }

    onEndReach() {

        console.log("草泥马~~~")

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
            navigationBarHidden: false
        });
    }

    //onPressMusicItem
    onPressMusicItem(info) {
        this.props.navigator.push({
            title: '专辑详情',
            navigationBarHidden: false,
            passProps: {
                id: info.id,
                albumId: info.albumId,
                trackId: info.trackId
            },
            component: musicDetail,
        });
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
        flex:1,
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
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        marginTop: 20
    },

    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        width: 200,
        margin: 6,
        padding: 10,
        backgroundColor: 'rgb(245, 246, 247)',
        borderRadius: 2,
    },

    searchIcon: {
        width: 20,
        height: 20,
    },

    scanIcon: {
        width: 30,
        height: 30,
    },

    searchPlaceholder: {
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 15,
        color: 'gray'
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        width: 200,
        margin: 6,
        padding: 10,
        backgroundColor: 'rgb(245, 246, 247)',
        borderRadius: 2,
    },

})


module.exports = page;