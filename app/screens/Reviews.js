import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Container, Loader, Review } from '@components';


class Reviews extends React.Component {

    renderItem = ({ item }) => {
        return <Review />
    }

    render() {
        return (
            <Container safeArea={true}>

                <View style={styles.headerWrap}>
                    <TouchableOpacity>
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
                    data={[{}, {}]}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    style={styles.wrapReviews}
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

export default Reviews;