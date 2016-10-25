/**
 * Created by zhangchuang on 16/10/9.
 */
import React, {Component} from 'react';
import Video from 'react-native-video';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity
} from 'react-native';

var url;
var url_head = 'http://mobile.ximalaya.com/mobile/v1/album?albumId=';
var url_foot = '&device=iPhone&pageSize=30&source=5&statEvent=pageview%2Falbum%402650009&statModule=%E9%9F%B3%E4%B9%90_%E7%94%B5%E5%8F%B0&statPage=categorytag%40%E9%9F%B3%E4%B9%90_%E7%94%B5%E5%8F%B0&statPosition=1&trackId='

class musicDetail extends Component {

    constructor(props) {

        super(props);
        var data_source = new ListView.DataSource({rowHasChanged: ((r1, r2) => r1 !== r2)});
        this.state = {
            dataSource: data_source,
            loaded: false
        }

        url = url_head + props.albumId + url_foot + props.trackId;
        console.log(url);
        ;
    }

    componentDidMount() {
        this.fetchData();
    }

    // video data
    fetchData() {
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                // console.log(responseData.data);
                this.setState({
                    titleDataSource: responseData.data.album,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data.tracks.list),
                    loaded: true
                })
            }).done();
    }

    //listView header
    renderHeader() {


        var play_count = (this.state.titleDataSource.playTimes / 10000).toString().substr(0, 5);
        return (
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.card}>
                    <Image style={{width:90,height:90}} source={{uri: this.state.titleDataSource.coverMiddle}}></Image>
                </View>

                <View style={styles.title_right}>
                    <Text style={{fontSize: 16}}>{this.state.titleDataSource.title}</Text>
                    <Text
                        style={[styles.title_right_text, {marginTop:10}]}>主播: {this.state.titleDataSource.nickname}</Text>
                    <Text style={styles.title_right_text}>播放: {play_count}万</Text>
                    <Text style={styles.title_right_text}>分类: {this.state.titleDataSource.categoryName}</Text>
                </View>
            </View>

        )
    }

    render() {
        if (this.state.loaded) {
            return (

                <View style={{flex:1, marginTop:64}}>
                    <ListView
                        style={{flex:1}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderHeader={this.renderHeader.bind(this)}
                    />
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
    }//render

    renderRow(rowData) {

        //播放次数
        var play_count = (rowData.playtimes / 1000).toString().substr(0, 4) + '万';
        //评论次数
        var comment_count;
        if (rowData.comments == 0) {
            comment_count = ''
        } else {
            comment_count = rowData.comments + '评论';
        }
        //时长
        var second = (rowData.duration - parseInt(rowData.duration / 60) * 60).toString();
        if (second.length == 1) second = '0' + second;
        var duration = parseInt(rowData.duration / 60).toString() + ':' + second;

        return (
            <TouchableOpacity onPress={() => this.playItem(rowData)}>
                <View style={[styles.item_card]}>

                    <View style={{marginTop:10}}>
                        <Image style={{width:40,height:40,borderRadius:20}} source={{uri: rowData.coverMiddle}}></Image>
                    </View>

                    <View style={{marginTop:10}}>
                        <Text style={{width:250,height:40, marginLeft:10,fontSize:15}}>{rowData.title}</Text>
                        <View style={{flexDirection:'row', marginTop:10}}>
                            <Text style={styles.item_text}>{play_count}</Text>
                            <Text style={styles.item_text}>{comment_count}</Text>
                            <Text style={styles.item_text}>{duration}</Text>
                        </View>
                    </View>


                </View>
            </TouchableOpacity>

        )
    }

    playItem (data) {

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

    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        marginTop: 10,
        marginLeft: 15,
        padding: 5,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        width: 105,
        alignItems: 'center'
    },

    row: {
        height: 80,
        fontSize: 20,
        //布局优化当写此属性时只会加载屏幕能看到数据
        overflow: 'hidden'
    },

    title_right: {
        marginTop: 15,
        marginLeft: 15,
    },
    title_right_text: {
        marginTop: 4,
        color: 'gray'
    },

    item_card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        padding: 5,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        flexDirection: 'row',
        borderRadius: 5
    },
    item_text: {
        marginLeft: 10,
        marginTop: 5,
        color: 'gray',
        fontSize: 13,

    }


})

module.exports = musicDetail;

