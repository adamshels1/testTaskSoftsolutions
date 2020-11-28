import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COUNT_STEP = 100;


export default class CameraCounter extends React.Component {
    interval = 0;

    state = {
        count: moment().startOf('day'),
    };

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        return this.props.isVisible ? (
            <View style={styles.headerButtonWrap}>
                <View style={styles.container}>
                    <View style={styles.circle} />
                    <Text style={styles.counter}>{this.state.count.format('HH:mm:ss')}</Text>
                </View>
            </View>
        ) : null;
    }

    startCount = () => {
        this.interval = setInterval(() => {
            this.setState((prevState) => ({
                count: prevState.count.add(100, 'milliseconds'),
            }));
        }, COUNT_STEP);
    };

    clearCount() {
        if (this.interval) {
            clearInterval(this.interval);
            this.setState({
                count: moment().startOf('day'),
            });
        }
    };

    pauseCount = () => {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}


const styles = StyleSheet.create({
    headerButtonWrap: {
        flexDirection: 'row',
        width: 131,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.36)',
        borderRadius: 14
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    counter: {
        color: '#fff',
        fontSize: 16,
        width: 80,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#EB000C',
        marginRight: 10,
    },
});
