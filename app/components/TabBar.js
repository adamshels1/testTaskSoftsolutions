import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const activeColor = 'rgba(0, 255, 0, 1)';
const color = '#fff';

export default function TabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{ flexDirection: 'row', }} style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const {icon} = options;
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                        style={styles.buttonWrap}
                        key={'tab-bar-'+index}
                    >
                        <FontAwesome5
                                name={icon}
                                solid
                                style={[styles.icon, { color: isFocused ? activeColor : color }]}
                            />
                        <Text style={{ color: isFocused ? '#673ab7' : '#222' }} style={styles.text}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#100819', width: '100%', height: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    buttonWrap: { alignItems: 'center', width: 100 },
    icon: { color: '#fff', fontSize: 20 },
    text: { color: '#fff', fontSize: 14, marginTop: 5 }
});
