/**
 * Created by zhangchuang on 16/10/1.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import TabbarView from './tabbar';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    TabBarIOS,
} from 'react-native';




class css_two extends Component {

    render() {
        return (

            <TabbarView style={styles.container} />

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});

AppRegistry.registerComponent('css_two', () => css_two);
