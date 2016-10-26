/**
 * Created by zhangchuang on 16/10/6.
 */
import React, {Component} from 'react';
import buy from './buy'
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Image,
    TabBarIOS,
    ListView,
    TouchableOpacity,
} from 'react-native';

var url_head = "http://open3.bantangapp.com/topic/newInfo?app_installtime=1456845435.556073&app_versions=5.3.3&channel_name=appStore&client_id=bt_app_ios&client_secret=9c1e6634ce1c5098e056628cd66a17a5&device_token=9e192d8fb60bbd9c47fd285cbce170820c13218ee90ed560d34d52999ae2cbee&id=";
var url_foot = "&os_versions=9.3.1&screensize=750&statistics_uv=0&track_device_info=iPhone7%2C2&track_deviceid=B3FA6AB9-231A-4848-BCB4-09125D566B79&v=10";
var url;
var product_pic_host;


class detail extends Component {

    constructor(props) {

        super(props);
        url = url_head + props.topicId + url_foot;
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
                // alert(JSON.stringify(responseData));
                this.setState({
                    titleDataSource: responseData.data,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data.product),
                    loaded: true
                });
            }).done();
    }


    onPressBuy(url) {

        this.props.navigator.push({
            title: '详情',
            passProps: {
                url
            },
            component: buy,

        });
        
    }

    //listView header
    renderHeader() {

        return (
            <View style={{flex:1}}>

                <View>
                    <Image style={{height:150}} source={{uri: this.state.titleDataSource.pic}}></Image>
                </View>

                <View style={{marginTop:10}}>
                     <Text style={{color: 'red', marginLeft:5, fontSize:17}}>{this.state.titleDataSource.title}</Text>
                </View>

                <View style={{marginTop:10}}>
                    <Text
                        style={{marginLeft:5, marginRight:5, fontSize:15, color: 'gray'}}>{this.state.titleDataSource.desc}</Text>
                </View>

            </View>


        )
    }


    render() {

        if (this.state.loaded) {
            return (
                <View style={{flex:1}}>
                    <ListView
                        style={{}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderDetail.bind(this)}
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
    }

    renderDetail(rowData) {

        product_pic_host = this.state.titleDataSource.product_pic_host;

        if (rowData.pic.length == 1) {
            return (
                <View style={[styles.card, {marginTop:15, paddingLeft:5, paddingRight: 5}]}>
                    <View>
                        <Text style={{fontSize:15, marginTop:10}}>{rowData.title}</Text>
                        <Text style={{fontSize:15, marginTop:10}}>{rowData.desc}</Text>
                        <TouchableOpacity onPress={() => this.onPressBuy(rowData.url)}>
                            <Image style={{height:200, marginTop:10}}
                                   source={{uri: product_pic_host+rowData.pic[0].p}}></Image>
                        </TouchableOpacity>
                    </View>
                </View>

            )
        } else if (rowData.pic.length == 2) {
            return (
                <View style={[styles.card, {marginTop:15, paddingLeft:5, paddingRight: 5}]}>
                    <View>
                        <Text style={{fontSize:15, marginTop:10}}>{rowData.title}</Text>
                        <Text style={{fontSize:15, marginTop:10}}>{rowData.desc}</Text>
                        <TouchableOpacity onPress={() => this.onPressBuy(rowData.url)}>
                            <View>
                                <Image style={{height:200, marginTop:10}}
                                       source={{uri: product_pic_host+rowData.pic[0].p}}></Image>
                                <Image style={{height:200, marginTop:10}}
                                       source={{uri: product_pic_host+rowData.pic[1].p}}></Image>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>

            )
        } else if (rowData.pic.length == 3) {
            return (
                <View style={[styles.card, {marginTop:15, paddingLeft:5, paddingRight: 5}]}>
                    <View>
                        <Text style={{fontSize:15, marginTop:10}}>{rowData.title}</Text>
                        <Text style={{fontSize:15, marginTop:10}}>{rowData.desc}</Text>

                        <TouchableOpacity onPress={() => this.onPressBuy(rowData.url)}>

                            <View>
                                <Image style={{height:200, marginTop:10}}
                                       source={{uri: product_pic_host+rowData.pic[0].p}}></Image>
                                <Image style={{height:200, marginTop:10}}
                                       source={{uri: product_pic_host+rowData.pic[1].p}}></Image>
                                <Image style={{height:200, marginTop:10}}
                                       source={{uri: product_pic_host+rowData.pic[2].p}}></Image>
                            </View>
                        </TouchableOpacity>


                    </View>
                </View>

            )
        } else {

            return (
                <View style={[styles.card, {marginTop:15, paddingLeft:5, paddingRight: 5}]}>
                    <View>
                        <Text style={{fontSize:15, marginTop:10}}>{rowData.title}</Text>
                        <Text style={{fontSize:15, marginTop:10}}>{rowData.desc}</Text>
                    </View>
                </View>
            )
        }
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


module.exports = detail;