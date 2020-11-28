import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    StatusBar,
    Platform,
    Image,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as Animatable from 'react-native-animatable';
import {
    CameraCounter,
    Container,
} from '@components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { helper } from '@services';
import Orientation from 'react-native-orientation';

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

const landmarkSize = 2;

const rotate_0 = {
    0: {
        transform: [{ rotate: '90deg' }],
    },
    1: {
        transform: [{ rotate: '0deg' }],
    },
};

const rotate_90 = {
    0: {
        transform: [{ rotate: '0deg' }],
    },
    1: {
        transform: [{ rotate: '90deg' }],
    },
};

const DESIRED_RATIO = '16:9';

export default class CameraScreen extends React.Component {
    counterRef = null;
    state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        autoFocusPoint: {
            normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
            drawRectPosition: {
                x: Dimensions.get('window').width * 0.5 - 32,
                y: Dimensions.get('window').height * 0.5 - 32,
            },
        },
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        recordOptions: {
            mute: false,
            maxDuration: 60,
            quality: RNCamera.Constants.VideoQuality['720p'],
        },
        isRecording: false,
        canDetectText: false,
        textBlocks: [],
        focusPointAnimation: null,
        orientationRotateStyle: rotate_0,
    };

    async componentDidMount() {
        Orientation.addSpecificOrientationListener(this._orientationDidChange);
    }

    _orientationDidChange = orientation => {
        if (orientation === 'LANDSCAPE-LEFT') {
            this.setState({ orientationRotateStyle: rotate_90 });
        } else {
            this.setState({ orientationRotateStyle: rotate_0 });
        }
    };

    toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    toggleFocus() {
        this.setState({
            autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
    }

    animateFocus = null;

    touchToFocus(event) {
        clearTimeout(this.animateFocus);
        this.setState({ focusPointAnimation: 'bounceIn' });
        const { pageX, pageY } = event.nativeEvent;
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        const isPortrait = screenHeight > screenWidth;

        let x = pageX / screenWidth;
        let y = pageY / screenHeight;
        // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
        if (isPortrait) {
            x = pageY / screenHeight;
            y = -(pageX / screenWidth) + 1;
        }

        this.setState({
            autoFocusPoint: {
                normalized: { x, y },
                drawRectPosition: { x: pageX, y: pageY },
            },
        });
        this.animateFocus = setTimeout(() => {
            this.setState({ focusPointAnimation: null });
        }, 1000);
    };

    takeVideo = async () => {
        const { isRecording, recordOptions, question } = this.state;
        if (isRecording) {
            this.camera.stopRecording();
            return;
        }
        if (this.camera) {
            try {
                const promise = this.camera.recordAsync(recordOptions);
                this.counterRef.startCount();

                if (promise) {
                    this.setState({ isRecording: true });
                    let data = await promise;
                    data.uri = helper.filePathSource(data.uri);
                    this.counterRef.clearCount();
                    this.setState({ isRecording: false });
                    const { params } = this.props.navigation.state;
                    navigation.navigate('VideoView', {
                        data,
                        ...params,
                        question,
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    textRecognized = object => {
        const { textBlocks } = object;
        this.setState({ textBlocks });
    };

    prepareRatio = async () => {
        if (Platform.OS === 'android' && this.camera) {
            const ratios = await this.camera.getSupportedRatiosAsync();

            // See if the current device has your desired ratio, otherwise get the maximum supported one
            // Usually the last element of "ratios" is the maximum supported ratio
            const ratio =
                ratios.find(ratio => ratio === DESIRED_RATIO) ||
                ratios[ratios.length - 1];

            this.setState({ ratio });
        }
    };

    render() {
        const {
            canDetectText,
            focusPointAnimation,
        } = this.state;

        const drawFocusRingPosition = {
            top: this.state.autoFocusPoint.drawRectPosition.y - 32,
            left: this.state.autoFocusPoint.drawRectPosition.x - 32,
        };


        return (
            <Container safeArea={true} style={styles.mainContainer}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    onCameraReady={this.prepareRatio}
                    style={styles.rnCamera}
                    type={this.state.type}
                    flashMode={this.state.flash}
                    autoFocus={this.state.autoFocus}
                    autoFocusPointOfInterest={
                        this.state.autoFocusPoint.normalized
                    }
                    zoom={this.state.zoom}
                    whiteBalance={this.state.whiteBalance}
                    ratio={this.state.ratio}
                    focusDepth={this.state.depth}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    faceDetectionLandmarks={
                        RNCamera.Constants.FaceDetection.Landmarks
                            ? RNCamera.Constants.FaceDetection.Landmarks.all
                            : undefined
                    }
                    onTextRecognized={
                        canDetectText ? this.textRecognized : null
                    }>
                    <View style={StyleSheet.absoluteFill}>
                        {focusPointAnimation && (
                            <Animatable.View
                                animation={focusPointAnimation}
                                style={[
                                    styles.autoFocusBox,
                                    drawFocusRingPosition,
                                ]}
                            />
                        )}
                        <TouchableWithoutFeedback
                            onPress={this.touchToFocus.bind(this)}>
                            <View style={{ flex: 1 }} />
                        </TouchableWithoutFeedback>
                    </View>

                    {this.renderCameraHeader()}
                    {this.renderCameraFooter()}
                    <StatusBar hidden={true} />
                </RNCamera>
            </Container>
        );
    }

    renderCameraHeader() {
        const {
            flash,
            isRecording,
            orientationRotateStyle,
        } = this.state;
        const flashIcon = flash === 'torch' ? 'on' : flash;
        return (
            <View style={styles.cameraHeaderView}>
                <CameraCounter
                    ref={ref => (this.counterRef = ref)}
                    isVisible={isRecording}
                />
                {!isRecording && (
                    <View style={styles.headerButtonWrap}>
                        <Animatable.View animation={orientationRotateStyle}>
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={this.props.navigation.goBack}
                            >
                                <Image style={styles.iconBack} source={require('@assets/images/icon_back_white.png')} />
                            </TouchableOpacity>
                        </Animatable.View>

                        <Text style={{ color: '#fff', fontSize: 16 }}>00:00:00</Text>

                        <Animatable.View animation={orientationRotateStyle}>
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={this.toggleFlash.bind(this)}>
                                <Icon
                                    name={`flash-${flashIcon}`}
                                    style={styles.customIcon20}
                                />
                            </TouchableOpacity>
                        </Animatable.View>

                    </View>
                )}
            </View>
        );
    }

    renderCenterButton() {
        const { isRecording, orientationRotateStyle } = this.state;

        if (isRecording) {
            return (
                <Animatable.View animation={orientationRotateStyle}>
                    <TouchableOpacity
                        onPress={this.takeVideo.bind(this)}
                        style={styles.circleRed}>
                        <View style={styles.recordIconStop} />
                    </TouchableOpacity>
                </Animatable.View>
            );
        }

        return (
            <Animatable.View animation={orientationRotateStyle}>
                <TouchableOpacity
                    onPress={this.takeVideo.bind(this)}
                    style={styles.circle}>
                    <View style={styles.recordIcon} />
                </TouchableOpacity>
            </Animatable.View>
        );
    }

    renderRightButton() {
        const {
            isRecording,
            orientationRotateStyle,
        } = this.state;
        if (isRecording) {
            return <View style={styles.rightButton} />;
        }

        return (
            <Animatable.View animation={orientationRotateStyle}>
                <TouchableOpacity
                    style={styles.rightButton}
                    onPress={this.toggleFacing.bind(this)}>
                    <Image style={{ width: 38, height: 32 }} source={require('@assets/images/switch_camera_icon.png')} />
                </TouchableOpacity>
            </Animatable.View>
        );
    }

    renderCameraFooter() {
        return (
            <View style={styles.cameraFooterView}>
                <View style={styles.footerButtonWrap}>

                    <View style={styles.leftButton} />

                    {this.renderCenterButton()}

                    {this.renderRightButton()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    autoFocusBox: {
        position: 'absolute',
        height: 64,
        width: 64,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
        opacity: 0.4,
    },
    circle: {
        width: 87,
        height: 87,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 43.5,
    },
    circleRed: {
        width: 87,
        height: 87,
        backgroundColor: '#EB000C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 43.5,
    },
    recordIcon: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: '#EB000C',
    },
    recordIconStop: {
        height: 30,
        width: 30,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    footerButtonWrap: {
        flexDirection: 'row',
        width: 359,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    headerButtonWrap: {
        flexDirection: 'row',
        width: 359,
        height: 44,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.36)',
        borderRadius: 14
    },
    headerButton: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rnCamera: {
        flex: 1,
        justifyContent: 'space-between',
    },
    mainContainer: {
        backgroundColor: 'black',
        flex: 1,
    },
    customIcon20: {
        fontSize: 20,
        color: 'white',
    },
    leftButton: {
        width: 40
    },
    rightButton: {
        width: 40
    },
    cameraHeaderView: {
        alignItems: 'center',
        marginTop: 26
    },
    cameraFooterView: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    },
    iconBack: {
        width: 18,
        height: 14
    }
});
