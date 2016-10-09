/**
 * Created by zhangchuang on 16/10/4.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';


class myInfo extends Component {

    render() {
        return (


            <View style={{paddingTop:64}}>


                <View>
                    <Image style={[styles.my_icon]} source={require('../images/IMG_0825.jpg')}></Image>
                </View>

                <View>
                    <Text style={[styles.menu_text, {marginTop:20}]}>关于作者: ZCLegendary</Text>
                </View>

                <View style={{marginTop:20}}>
                    <Text style={[styles.menu_text]}>微 信: zhangchuang7788</Text>
                </View>

                <View style={{marginTop:20}}>
                    <Text style={[styles.menu_text]}>小白一枚,有什么意见大家多多对我提出,共同进步!!</Text>
                </View>


            </View>

        );
    }
}
;

var styles = StyleSheet.create({

    my_icon: {
        alignSelf: 'center',
        width:100,
        height:150,
    },

    menu_text: {
        marginLeft: 20,
        fontSize: 15
    }


})

module.exports = myInfo;

