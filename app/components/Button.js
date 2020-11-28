import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
    render() {
        const opacity = { opacity: this.props.disabled ? 0.65 : 1 };
        return (
            <TouchableOpacity
                {...this.props}
                style={[styles.buttonWrap, this.props.styles, opacity]}>
                <View style={styles.buttonContainer}>
                    {this.props.leftComponent}
                    <Text style={[styles.buttonText, this.props.textStyle]}>
                        {this.props.text}
                    </Text>
                    {this.props.rightComponent}
                </View>
            </TouchableOpacity>
        );
    }
}

Button.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    rightComponent: PropTypes.element,
    leftComponent: PropTypes.element
};


const styles = StyleSheet.create({
    buttonWrap: {
        width: '100%',
        backgroundColor: '#00FF00',
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Helvetica',
        fontSize: 16,
        color: '#131322',
        letterSpacing: 0,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
