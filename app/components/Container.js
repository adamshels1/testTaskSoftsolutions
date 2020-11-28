import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView
} from 'react-native';

export default class Button extends React.Component {
    render() {
        return this.props.safeArea ? (
                <SafeAreaView style={[styles.container, this.props.style]}>
                    {this.props.children}
                </SafeAreaView>
            ) : (
                <View style={[styles.container, this.props.style]}>
                    {this.props.children}
                </View>
            )
        
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: '#252333' }
})
