/**
 * Created by zhangchuang on 16/10/1.
 */
import React, {Component} from 'react';

import detail from './detail'
// import RefreshableListView from 'react-native-refreshable-listview'
// var RefreshableListView = require('react-native-refreshable-listview');

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';

var url = "http://open3.bantangapp.com/recommend/index?app_installtime=1456845435.556073&app_versions=5.3.3&channel_name=appStore&client_id=bt_app_ios&client_secret=9c1e6634ce1c5098e056628cd66a17a5&device_token=9e192d8fb60bbd9c47fd285cbce170820c13218ee90ed560d34d52999ae2cbee&oauth_token=0c3fcd6dbec04287feb538d52fbe122c&os_versions=9.3.1&page=0&pagesize=20&screensize=750&track_device_info=iPhone7%2C2&track_deviceid=B3FA6AB9-231A-4848-BCB4-09125D566B79&track_user_id=1942239&v=10";;

class Index_two extends Component {


    constructor(props) {

        super(props);
        var data_source = new ListView.DataSource({rowHasChanged: ((r1, r2) => r1 !== r2)});
        this.state = {
            dataSource: data_source,
            loaded: false
        }
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData.data);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data.topic),
                    loaded: true
                })
            }).done();
    }

    onPressItem(info) {

        this.props.navigator.push({
            title: info.title,
            passProps: {
                topicId: info.id
            },
            component: detail,
            translucent: false

        });

    }

    render() {

        if (this.state.loaded) {
            return (

                <View style={{flex:1}}>
                    <ListView
                        style={{flex:1}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
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
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity onPress={() => this.onPressItem(rowData)}>
                <View style={styles.card}>
                    <View>
                        <Image style={{height:150}} source={{uri: rowData.pic}}></Image>
                    </View>
                    <View>
                        <Text style={{alignSelf: 'center', fontSize:16, marginTop:10}}>{rowData.title}</Text>
                        <Text style={{alignSelf: 'center', fontSize:14, marginTop:5}}>💖{rowData.likes}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
}
;

const styles = StyleSheet.create({

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
        margin: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },

    row: {
        height: 80,
        fontSize: 20,
        //布局优化当写此属性时只会加载屏幕能看到数据
        overflow: 'hidden'
    },

});

module.exports = Index_two;