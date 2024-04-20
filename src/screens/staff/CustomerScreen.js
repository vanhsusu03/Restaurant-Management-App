import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Image, TouchableOpacity, Animated, Keyboard, Platform } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import HomeHeadNav from '../../components/Header.js'
import { fetchCustomerData } from '../../utils/firestore.js';

const StaffCustomerScreen = ({ navigation }) => {
    const [cusList, setCusList] = useState([]);
    const animatedContainerRef = useRef(new Animated.Value(0)).current;

    const reloadCus = useCallback(async () => {
        try {
            const newData = await fetchCustomerData();
            setCusList(newData);

        } catch (error) {
            console.error("Error reloading data:", error);
        }
    }, []);


    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            reloadCus();
        });

        return reload;
    }, [navigation, reloadCus]);

    const renderCus = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.cusItem}
                onPress={() => navigation.navigate('customer_info', { customer: item })}
            >
                <View style={styles.customerInfoContainer}>
                    <FontAwesome5 name="user-circle" style={styles.customerIcon} />
                    <View style={styles.customerNameContainer}>
                        <Text style={styles.cusName}>{item.name}</Text>
                    </View>
                    <View style={styles.customerPhoneContainer}>
                        <Text style={styles.customerPhone}>{item.phone}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animatedContainerRef }] }]}>
            <HomeHeadNav navigation={navigation} title='KHÁCH HÀNG' user='staff' />
            <View style={styles.listTitleContainer}>
                 <Text style={styles.listTitle}>DANH SÁCH KHÁCH HÀNG</Text>
            </View>
            <FlatList
                data={cusList}
                renderItem={renderCus}
                keyExtractor={(_, index) => index.toString()}
            />
        </Animated.View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: '#EE9C37',
        paddingHorizontal: 40,
        paddingVertical: 10,
        color: '#fff',
    },
    icon: {
        marginLeft: 5,
        color: '#fff',
        backgroundColor: '#EE9C37',
        fontSize: 17,
        padding: 2,
        marginRight: 8
    },
    cusItem: {
        padding: 5,
        marginLeft: 20
    },
    customerInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    customerIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    customerNameContainer: {
        marginHorizontal: 10,
        flex: 1.2,
    },
    customerPhoneContainer: {
        marginHorizontal: 10,
        flex: 1,
    },
    cusName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    customerPhone: {
        fontSize: 16,
        color: '#666',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 30,
        marginTop: 10,
        marginBottom: 20
    },
    addButtonText: {
        fontSize: 18,
        color: '#EE9C37'
    },
    listTitleContainer: {
        marginVertical: 20,
        alignItems: 'center'
    },
    listTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text1,
    },
});


export default StaffCustomerScreen;
