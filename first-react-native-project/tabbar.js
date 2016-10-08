/**
 * Created by zhangchuang on 16/10/5.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    TabBarIOS,
} from 'react-native';

import NV1 from './one/page'
import NV2 from './two/page_two'
import NV3 from './three/page_three'

var TabBarItemIOS = TabBarIOS.Item;

class tabbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'mainTab',
            notifCount: 0,
            presses: 0,
        };
    }

    render() {
        return (

            <TabBarIOS
                selectedTab={this.state.selectedTab}
                unselectedTintColor="black"
                tintColor="navy"
            >
                <TabBarItemIOS
                    title="首页"
                    name="mainTab"
                    icon={require('./images/homePageSelected.png')}
                    accessibilityLabel="Blue Tab"
                    selected={this.state.selectedTab === 'mainTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'mainTab',
                        });
                    }}>
                    <NavigatorIOS
                        style={[styles.container,{flex : 1, marginTop : 0}]}
                        initialRoute={{
                            title: '首页',
                            component: NV1,
                        }}/>
                </TabBarItemIOS>


                <TabBarItemIOS
                    title="其他"
                    name="otherTab"
                    icon={require('./images/mySelected@2x.png')}
                    accessibilityLabel="other Tab"
                    selected={this.state.selectedTab === 'otherTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'otherTab',
                        });
                    }}>
                    <NavigatorIOS
                        style={[styles.container,{flex : 1, marginTop : 0}]}
                        initialRoute={{
                            title: '其他',
                            component: NV2,
                            translucent: false
                        }}
                        // translucent: false
                    />
                </TabBarItemIOS>


                <TabBarItemIOS
                    title="我的"
                    name="myTab"
                    icon={require('./images/mySelected@2x.png')}
                    accessibilityLabel="my Tab"
                    selected={this.state.selectedTab === 'myTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'myTab',
                        });
                    }}>
                    <NavigatorIOS
                        style={[styles.container,{flex : 1, marginTop : 0}]}
                        initialRoute={{
                            title: '我的',
                            component: NV3,
                        }}/>
                </TabBarItemIOS>

            </TabBarIOS>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

module.exports = tabbar;