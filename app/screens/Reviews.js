import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Loader, Review } from '@components';
import { reviewsApi } from '@api';


class Reviews extends React.Component {

    componentDidMount() {
        this.loadReviews();
    }

    state = {
        isLoadingReviews: false,
        reviews: []
    }

    onLogout = () => {
        this.props.setToken(null);
        this.props.setUser(null);
    }

    loadReviews = async () => {
        try {
            this.setState({ isLoadingReviews: true });
            const reviews = await reviewsApi.getReviews(this.props.token);
            this.setState({ isLoadingReviews: false, reviews });
        } catch (e) {
            this.setState({ isLoadingReviews: false });
            console.log(e);
        }
    }

    renderItem = ({ item }) => {
        const { title, status, created, description } = item;
        return <Review
            title={title}
            status={status}
            created={created}
            description={description}
        />
    }

    render() {
        return (
            <Container safeArea={true}>

                <View style={styles.headerWrap}>
                    <TouchableOpacity onPress={this.onLogout}>
                        <Text style={styles.headerButton}>Logout</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Reviews</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Camera')}
                    >
                        <Text style={styles.headerButton}>Add</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={this.state.reviews}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    style={styles.wrapReviews}
                    refreshing={this.state.isLoadingReviews}
                    onRefresh={this.loadReviews}
                />


            </Container>
        );
    }
}

const styles = StyleSheet.create({
    headerWrap: {
        marginTop: 23,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    headerButton: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00FF00',
        lineHeight: 21
    },
    headerTitle: {
        fontFamily: 'Helvetica',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: 21
    },
    wrapReviews: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 17
    }
})

const mapStateToProps = state => {
    const { token } = state.userReducer;
    return {
        token
    };
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
)(Reviews);