/**
 * Created by zhangchuang on 16/9/29.
 */
import React, {Component} from 'react';

import Swiper from 'react-native-swiper';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Image,
    ScrollView
} from 'react-native';


//http://baobab.wandoujia.com/api/v1/videos?start=0&num=10&categoryName=旅行&strategy=shareCount
//http://mobile.ximalaya.com/mobile/discovery/v2/category/keyword/albums?calcDimension=hot&categoryId=2&device=iPhone&keywordId=115&pageId=1&pageSize=20&statEvent=pageview%2Fcategory%40%E9%9F%B3%E4%B9%90&statModule=%E9%9F%B3%E4%B9%90&statPage=tab%40%E5%8F%91%E7%8E%B0_%E5%88%86%E7%B1%BB&status=0&version=5.4.33
var sliderImgs = [
    'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
    'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
];

var BUIcon = [
    'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/%E6%9C%AA%E6%A0%87%E9%A2%98-1.png',
    'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/feiji.png',
    'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/lvyou.png',
    'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/gonglue.png'

];

class page extends Component {


    render() {
        return (


            <ScrollView style={{flex:1}}>
                <View>
                    <Swiper height={120} showsButtons={false} autoplay={true} autoplayTimeout={3}
                            dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            paginationStyle={{ bottom: -23, left: null, right: 10}} loop>
                        <Image resizeMode='stretch' style={[styles.image]} source={{uri: sliderImgs[0]}}></Image>
                        <Image resizeMode='stretch' style={[styles.image]} source={{uri: sliderImgs[1]}}></Image>
                        <Image resizeMode='stretch' style={[styles.image]} source={{uri: sliderImgs[2]}}></Image>
                    </Swiper>
                </View>



                <View style={[styles.view_container, {backgroundColor: '#FA6778'}]}>
                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>酒店</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Image resizeMode='stretch' style={{width:40,height:30, alignSelf:'center'}} source={{uri: BUIcon[0]}}></Image>
                        </View>
                    </View>

                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1,borderBottomWidth:1, borderBottomColor:'white'}}>
                            <Text style={[styles.titleText]}>海外</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>周边</Text>
                        </View>
                    </View>

                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1,borderBottomWidth:1, borderBottomColor:'white'}}>
                            <Text style={[styles.titleText]}>团购.特惠</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>客栈.公寓</Text>
                        </View>
                    </View>
                </View>


                <View style={[styles.view_container, {backgroundColor: 'blue'}]}>
                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>机票</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Image resizeMode='stretch' style={{width:50,height:30, alignSelf:'center'}} source={{uri: BUIcon[1]}}></Image>
                        </View>
                    </View>

                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1,borderBottomWidth:1, borderBottomColor:'white'}}>
                            <Text style={[styles.titleText]}>火车票</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>接受机</Text>
                        </View>
                    </View>

                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1,borderBottomWidth:1, borderBottomColor:'white'}}>
                            <Text style={[styles.titleText]}>汽车票</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>自驾.专车</Text>
                        </View>
                    </View>
                </View>



                <View style={[styles.view_container, {backgroundColor: 'green'}]}>
                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>旅游</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Image resizeMode='stretch' style={{width:50,height:30, alignSelf:'center'}} source={{uri: BUIcon[2]}}></Image>
                        </View>
                    </View>

                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1,borderBottomWidth:1, borderBottomColor:'white'}}>
                            <Text style={[styles.titleText]}>门票.玩乐</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>出境.WIFI</Text>
                        </View>
                    </View>

                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1,borderBottomWidth:1, borderBottomColor:'white'}}>
                            <Text style={[styles.titleText]}>游轮</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>签证</Text>
                        </View>
                    </View>
                </View>



                <View style={[styles.view_container, {backgroundColor: 'orange'}]}>
                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>攻略</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Image style={{width:50,height:30, alignSelf:'center'}} source={{uri: BUIcon[3]}}></Image>
                        </View>
                    </View>

                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1,borderBottomWidth:1, borderBottomColor:'white'}}>
                            <Text style={[styles.titleText]}>周末游</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>礼品卡</Text>
                        </View>
                    </View>

                    <View style={{flex:1, borderRightWidth:1, borderRightColor:'white'}}>
                        <View style={{flex:1,borderBottomWidth:1, borderBottomColor:'white'}}>
                            <Text style={[styles.titleText]}>美食.购物</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={[styles.titleText]}>更多</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        );
    }
}
;

var styles = StyleSheet.create({

    image: {
        height: 120
    },

    view_container: {

        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 5,
        height: 100
    },

    titleText: {
        alignSelf: 'center',
        marginTop: 15,
        color: 'white',
        fontSize: 15,
    },

    flex: {
        flex: 1,
    },
    list_item: {
        lineHeight: 25,
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10
    }

})


module.exports = page;