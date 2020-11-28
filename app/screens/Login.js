import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Title, Input, Container, Loader } from '@components';
import { helper } from '@services';
import { userApi } from '@api';
import AlertAsync from "react-native-alert-async";
const isIos = Platform.OS === 'ios';


class Login extends React.Component {

    state = {
        email: '',
        password: '',
        isLoading: false
    };

    onLogin = async () => {
        try {
            const { email, password } = this.state;
            this.setState({ isLoading: true });

            const res = await userApi.login(email, password);
            this.setState({ isLoading: false });
            const { user, token } = res;
            if (token && user) {
                this.props.setToken(token);
                this.props.setUser(user);
            } else {
                await helper.sleep(100);
                await AlertAsync('Invalid username or password');
            }

        } catch (e) {
            this.setState({ isLoading: false });
            await helper.sleep(100);
            await AlertAsync('Invalid username or password');
        }
    }


    render() {
        return (
            <KeyboardAvoidingView
                behavior={isIos ? 'padding' : null}
                style={{ flex: 1 }}>
                <Loader visible={this.state.isLoading} />
                <Container safeArea={true} style={{ justifyContent: 'center' }}>
                    <Image
                        source={require('@assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode={'contain'}
                    />

                    <View style={styles.wrapForm}>

                        <Text style={styles.signIn}>
                            Sign In
                        </Text>

                        <Input
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            autoFocus={true}
                            placeholder={'Email'}
                            autoCapitalize='none'
                            autoCompleteType={'email'}
                        />


                        <Input
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            placeholder={'Password'}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            autoCompleteType={'password'}
                        />



                        <View style={styles.buttonsWrap}>
                            <Button
                                text='Sign In'
                                onPress={this.onLogin}
                                disabled={!this.state.email || !this.state.password}
                            />
                        </View>

                        <View style={styles.forgotWrap}>
                            <TouchableOpacity
                                style={styles.forgotButton}
                                onPress={() => this.props.navigation.navigate('ResetPassword')}
                            >
                                <Text style={styles.forgotText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.enterWithWrap}>
                        <View style={styles.line} />
                        <Text style={styles.enterWithText}>or enter with</Text>
                        <View style={styles.line} />
                    </View>

                    <TouchableOpacity style={{ marginTop: 23 }}>
                        <Image
                            source={require('@assets/images/facebook_sign_in.png')}
                            style={styles.facebookIcon}
                        />
                    </TouchableOpacity>

                    <Text style={styles.dontHaveAccount}>
                        Dont’t have an  account? <Text style={{ color: '#00FF00' }}>Sign Up</Text>
                    </Text>

                    <Text style={styles.buildVersion}>Build Version DEV 1.1</Text>


                </Container>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    buttonsWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24
    },
    logo: {
        width: 46,
        height: 58
    },
    wrapForm: {
        backgroundColor: '#4A455B',
        width: 351,
        padding: 33,
        borderRadius: 11,
        marginTop: 21
    },
    signIn: {
        fontSize: 22,
        color: '#fff',
        fontFamily: 'Helvetica',
        letterSpacing: 0,
        fontWeight: 'bold'
    },
    forgotWrap: {
        justifyContent: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    forgotButton: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 30
    },
    forgotText: {
        fontFamily: 'Helvetica',
        fontSize: 16,
        color: '#2EE62E',
        fontWeight: 'bold'
    },
    enterWithWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 28
    },
    line: {
        width: 79,
        height: 1,
        backgroundColor: '#fff'
    },
    enterWithText: {
        fontFamily: 'Helvetica',
        fontSize: 16,
        color: '#FFFFFF',
        paddingHorizontal: 9
    },
    facebookIcon: {
        width: 44,
        height: 44
    },
    dontHaveAccount: {
        fontFamily: 'Helvetica',
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 19
    },
    buildVersion: {
        marginTop: 11,
        fontFamily: 'Helvetica',
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
})

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {

        setUser: payload =>
            dispatch({
                type: 'SET_USER',
                payload,
            }),

        setToken: payload =>
            dispatch({
                type: 'SET_TOKEN',
                payload,
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);