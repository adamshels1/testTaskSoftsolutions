import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Html5Entities } from 'html-entities';
import PropTypes from 'prop-types';

export default class Review extends React.Component {
    render() {
        const { title, status, created, description } = this.props;
        const entities = new Html5Entities();
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: null }}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.playWrap}>
                    <Image source={require('@assets/images/play_button.png')} style={styles.playIcon} />
                </TouchableOpacity>

                <View style={styles.infoWrap}>
                    <View style={styles.titleWrap}>
                        <Image
                            source={require('@assets/images/video_icon.png')}
                            style={styles.videoIcon}
                        />
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </View>


                    <View style={styles.dateWrap}>
                        <View style={styles.draftWrap}>
                            <Text style={styles.draft}>
                                {status}
                            </Text>
                        </View>
                        <Text style={styles.date}>
                            {entities.decode(created)}
                        </Text>
                    </View>

                    <Text style={styles.description} numberOfLines={3}>
                        {description}
                    </Text>
                </View>
            </View>
        );
    }
}

Review.propTypes = {
    title: PropTypes.string,
    status: PropTypes.string,
    created: PropTypes.string,
    description: PropTypes.string,
    onPlay: PropTypes.func,
};


const styles = StyleSheet.create({
    container: {
        width: '100%', backgroundColor: '#FFFFFF',
        borderRadius: 11,
        marginTop: 20
    },
    image: {
        height: 194,
        width: '100%',
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11,
        position: 'absolute',
        backgroundColor: '#ADB6D4'
    },
    playWrap: {
        height: 194,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playIcon: {
        width: 68,
        height: 68
    },
    infoWrap: {
        padding: 20,
        paddingTop: 16
    },
    titleWrap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    videoIcon: {
        width: 64,
        height: 64,
        left: -10,
        top: 7
    },
    title: {
        fontWeight: 'bold', width: '80%', fontFamily: 'Helvetica', fontSize: 18,
        color: '#202020'
    },
    dateWrap: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    draftWrap: {
        width: 66,
        height: 23,
        backgroundColor: '#ADB6D4',
        borderRadius: 11.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    draft: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        color: '#FFFFFF',
        letterSpacing: 0,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    date: {
        fontFamily: 'Helvetica',
        fontSize: 13,
        color: '#ADB6D4'
    },
    description: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#000000',
        lineHeight: 22,
        marginTop: 20
    }
})
