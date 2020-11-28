import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

const borderBottomColor = '#80869E';
const activeBorderBottomColor = '#fff';

export default class Input extends React.Component {

    componentDidMount(){
        // const { borderBottomColor } = this.props.style;
        // console.log('borderBottomColor', borderBottomColor)
        // this.setState({
        //     borderBottomColor
        // })
    }

    state = {
        borderBottomColor 
    }

    onFocus = () => {
        this.setState({ borderBottomColor: activeBorderBottomColor });
        this.props.onFocus  && this.props.onFocus();
    }

    onBlur = () => {
        this.setState({ borderBottomColor });
        this.props.onBlur && this.props.onBlur();
    }

    render() {
        const { borderBottomColor } = this.state;
        return (
            <View>
                {this.props.leftComponent}
                <TextInput
                    {...this.props}
                    style={[styles.input, this.props.style, { borderBottomColor }]}
                    placeholderTextColor="#80869E"
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
                {this.props.rightComponent}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        marginTop: 25,
        color: '#FFF',
        borderBottomWidth: 1,
        fontSize: 16, 
        fontFamily: 'Helvetica',
        marginHorizontal: 4
    }
})
