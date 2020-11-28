import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
    render() {
        return (
            <View style={{
                width: '100%', backgroundColor: '#FFFFFF',
                borderRadius: 11,
                marginTop: 20
            }}>
                <Image source={{ uri: 'https://istanbulfotograf.com/wp-content/uploads/2019/08/online-live-video-marketing-concept_12892-37-626x313.jpg' }}
                    style={{ height: 194, width: '100%', borderTopRightRadius: 11, borderTopLeftRadius: 11, position: 'absolute' }}
                />
                <TouchableOpacity style={{ height: 194, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('@assets/images/play_button.png')} style={{ width: 68, height: 68 }} />
                </TouchableOpacity>

                <View style={{ padding: 20, padddingTop: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('@assets/images/video_icon.png')} style={{ width: 64, height: 64, left: -10, top: 7 }} />
                        <Text style={{
                            fontWeight: 'bold', width: '80%', fontFamily: 'Helvetica', fontSize: 18,
                            color: '#202020'
                        }}>
                            Karyn was professional, yet personal.
                        </Text>
                    </View>


                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: 66, height: 23, backgroundColor: '#ADB6D4', borderRadius: 11.5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Helvetica', fontSize: 14, color: '#FFFFFF', letterSpacing: 0, fontWeight: 'bold' }}>
                                DRAFT
                                </Text>
                        </View>
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 13, color: '#ADB6D4' }}>12 Nov 2019 • 05:11 PM</Text>
                    </View>

                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: '#000000', lineHeight: 22, marginTop: 20 }}>
                        Kristen was amazing from the start!  She was always professional and understanding of our needs.  She went far and beyond to help us …houses.
                    </Text>

                </View>



            </View>
        );
    }
}

Button.propTypes = {
    // title: PropTypes.string,
    // disabled: PropTypes.bool,
    // onPress: PropTypes.func,
    // rightComponent: PropTypes.element,
    // leftComponent: PropTypes.element
};


const styles = StyleSheet.create({

})
