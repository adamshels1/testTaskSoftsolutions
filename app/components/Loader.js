import React from 'react';
import {
    StyleSheet, ActivityIndicator, Modal, View, Text
} from 'react-native';

class Loader extends React.Component {
    render() {
        return (
            <Modal style={{flex: 1}} transparent={true} {...this.props}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                }}>
                    {this.props.loaderText && (
                        <Text style={{marginBottom: 20, color: 'white', fontSize: 16}}>
                            {this.props.loaderText}
                        </Text>
                    )}

                    <ActivityIndicator size={'large'} color={'white'}/>
                </View>
            </Modal>
        );
    }
}


export default Loader;

const styles = StyleSheet.create({});
