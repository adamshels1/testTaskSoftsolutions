import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const borderRadius = 5;
const activeTabColor = '#4E4E4E';
const tabColor = '#343434';
const textColor = '#fff';

export default class Tabs extends Component {

    state = {
        activeTab: 0,
    };

    render() {
        const { tabs = [], disableTabs = [], disabled, activeTab } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.tabs}>
                    {tabs.map((item, i) => {
                        const backgroundColor = (i === activeTab) ? activeTabColor : tabColor;
                        let width = 100 / tabs.length;
                        width = width + '%';
                        const disableTab = disableTabs.includes(i);
                        const opacity = disableTab ? 0.3 : 1;
                        const borderLeftRadius = (i === 0) ? borderRadius : 0;
                        const borderRightRadius = (tabs.length - 1 === i) ? borderRadius : 0;
                        const borderRightWidth = (tabs.length - 1 === i) ? 0 : 1;
                        return <TouchableOpacity
                            key={i}
                            style={[styles.tab, { backgroundColor, width, opacity, borderTopLeftRadius: borderLeftRadius, borderBottomLeftRadius: borderLeftRadius, borderTopRightRadius: borderRightRadius, borderBottomRightRadius: borderRightRadius, borderRightWidth }]}
                            onPress={() => {
                                item.onPress();
                            }}
                            disabled={disableTab || disabled}
                        >
                            <Text style={[styles.tabText, { color: textColor }]}>
                                {item.text}
                            </Text>
                        </TouchableOpacity>;
                    })}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },
    tabs: {
        width: '100%',
        height: 35,
        borderRadius: borderRadius,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#4E4E4E',
        borderWidth: 1
    },
    tab: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        width: '50%',
        borderRadius: borderRadius,
        borderRightColor: '#4E4E4E',
        borderRightWidth: 1,
    },
    tabText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 5
    },
});
