/**
 * Created by zhangchuang on 16/10/1.
 */
/**
 * Created by zhangchuang on 16/9/29.
 */
import React, {Component} from 'react';
import myInfo from './myinfo'
import aboutus from './aboutus'
import myLocation from './mylocation'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Image,
    TabBarIOS,
    TouchableOpacity,
} from 'react-native';

var title_block_arr = ['我的资料', '我的位置', '我的收藏', '我的作品', '我的', '意见反馈', '设置', '关于'];


class Index_three extends Component {


    onPressNews(info) {
        // alert(info);

        var nextPage;
        if (info == '关于') {
            nextPage = aboutus;
        } else if (info == '我的位置'){
            nextPage = myLocation;
        } else  {
            nextPage = myInfo;
        }


        this.props.navigator.push({
            title: info,

            passProps: {info},
            component: nextPage,

        });

    }


    render() {
        return (

            <View style={{paddingTop:64}}>
                <View>
                    <Image style={[styles.back_image]} resizeMode='stretch' source={require("../images/m.png")}></Image>
                </View>


                <View style={[styles.user_info_view]}>
                    <Image resizeMode='stretch' style={[styles.user_icon]}
                           source={require("../images/touxiang.png")}></Image>
                    <Text style={[styles.user_text]}>ACK</Text>
                    <Text style={[styles.user_text]}>talk is cheap,show me the code</Text>
                </View>


                <View style={{marginLeft:20,marginRight:20,marginTop:50,}}>

                    <View style={[styles.info_block]}>
                        <TouchableOpacity onPress={() => this.onPressNews(title_block_arr[0])}>
                            <View
                                style={{height:40,  flexDirection:'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                <Image resizeMode='stretch' style={[styles.image_block]}
                                       source={require("../images/ziliao.png")}></Image>
                                <Text style={[styles.text_block]}>{title_block_arr[0]}</Text>
                                <Image resizeMode='stretch' style={[styles.arrow_block]}
                                       source={require("../images/arrow.png")}></Image>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.onPressNews(title_block_arr[1])}>
                            <View
                                style={{height:40,  flexDirection:'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                <Image resizeMode='stretch' style={[styles.image_block]}
                                       source={require("../images/ziliao.png")}></Image>
                                <Text style={[styles.text_block]}>{title_block_arr[1]}</Text>
                                <Image resizeMode='stretch' style={[styles.arrow_block]}
                                       source={require("../images/arrow.png")}></Image>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.onPressNews(title_block_arr[2])}>
                            <View style={{height:40, flexDirection:'row'}}>
                                <Image resizeMode='stretch' style={[styles.image_block]}
                                       source={require("../images/ziliao.png")}></Image>
                                <Text style={[styles.text_block]}>{title_block_arr[2]}</Text>
                                <Image resizeMode='stretch' style={[styles.arrow_block]}
                                       source={require("../images/arrow.png")}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.info_block, {marginTop:10}]}>

                        <TouchableOpacity onPress={() => this.onPressNews(title_block_arr[3])}>
                            <View
                                style={{height:40,  flexDirection:'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                <Image resizeMode='stretch' style={[styles.image_block]}
                                       source={require("../images/ziliao.png")}></Image>
                                <Text style={[styles.text_block]}>{title_block_arr[3]}</Text>
                                <Image resizeMode='stretch' style={[styles.arrow_block]}
                                       source={require("../images/arrow.png")}></Image>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.onPressNews(title_block_arr[4])}>
                            <View
                                style={{height:40,  flexDirection:'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                <Image resizeMode='stretch' style={[styles.image_block]}
                                       source={require("../images/ziliao.png")}></Image>
                                <Text style={[styles.text_block]}>{title_block_arr[4]}</Text>
                                <Image resizeMode='stretch' style={[styles.arrow_block]}
                                       source={require("../images/arrow.png")}></Image>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.onPressNews(title_block_arr[5])}>
                            <View style={{height:40, flexDirection:'row'}}>
                                <Image resizeMode='stretch' style={[styles.image_block]}
                                       source={require("../images/ziliao.png")}></Image>
                                <Text style={[styles.text_block]}>{title_block_arr[5]}</Text>
                                <Image resizeMode='stretch' style={[styles.arrow_block]}
                                       source={require("../images/arrow.png")}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.info_block, {marginTop:10}]}>
                        <TouchableOpacity onPress={() => this.onPressNews(title_block_arr[6])}>
                            <View
                                style={{height:40,  flexDirection:'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                <Image resizeMode='stretch' style={[styles.image_block]}
                                       source={require("../images/ziliao.png")}></Image>
                                <Text style={[styles.text_block]}>{title_block_arr[6]}</Text>
                                <Image resizeMode='stretch' style={[styles.arrow_block]}
                                       source={require("../images/arrow.png")}></Image>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.onPressNews(title_block_arr[7])}>
                            <View style={{height:40,  flexDirection:'row',}}>
                                <Image resizeMode='stretch' style={[styles.image_block]}
                                       source={require("../images/ziliao.png")}></Image>
                                <Text style={[styles.text_block]}>{title_block_arr[7]}</Text>
                                <Image resizeMode='stretch' style={[styles.arrow_block]}
                                       source={require("../images/arrow.png")}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        );
    }
};

var styles = StyleSheet.create({

    back_image: {
        height: 170,
        flex: 1
    },

    user_info_view: {
        // backgroundColor: 'red',
        width: 250,
        height: 120,
        alignSelf: 'center',
        marginTop: -150
    },

    user_icon: {
        marginTop: 10,
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
    user_text: {
        marginTop: 10,
        color: 'white',
        alignSelf: 'center',
        fontSize: 14,
        backgroundColor: 'rgb(0,0,0)'
    },

    info_block: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        paddingTop: 1,
        paddingBottom: 1
    },

    text_block: {
        marginLeft: 10,
        marginTop: 14,
        flex: 3
    },

    image_block: {
        width: 25,
        height: 25,
        marginTop: 7,
        marginLeft: 5,
        flex: 0.1
    },

    arrow_block: {
        right: 10,
        height: 13,
        width: 8,
        flex: 0.05,
        marginTop: 13
    }

})


module.exports = Index_three;