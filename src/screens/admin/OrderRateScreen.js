import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Text, Animated } from 'react-native';
import HomeHeadNav from '../../components/Header.js'
import { FlatList } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'

import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { fetchOrderRateData } from '../../utils/firestore.js';

const OrderRateScreen = ({ navigation }) => {
    const [rateList, setRateList] = useState([]);
    const animatedContainerRef = useRef(new Animated.Value(0)).current;

    const reloadRate = useCallback(async () => {
        try {
            const newData = await fetchOrderRateData();
            setRateList(newData);

        } catch (error) {
            console.error("Error reloading data:", error);
        }
    }, []);


    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            reloadRate();
        });

        return reload;
    }, [navigation, reloadRate]);

    const renderRate = ({ item }) => {
        const limitedTitle = item.rate.slice(0, 20);

        return (
            <View style={styles.reportItem}>
                <View style={styles.reportContainer}>
                    <FontAwesome5 name="file-alt" style={styles.reportIcon} />
                    <View style={styles.reportTitleContainer}>
                        <Text style={styles.reportTitle}>{limitedTitle}...</Text>
                    </View>
                    <View style={styles.reportDateContainer}>
                        <Text style={styles.reportDate}>{item.date}</Text>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <View>
            <HomeHeadNav navigation={navigation} title='ĐÁNH GIÁ' user='admin' />
            <View style={styles.listTitleContainer}>
                 <Text style={styles.listTitle}>ĐÁNH GIÁ CỦA KHÁCH HÀNG</Text>
            </View>
            <View>
                <FlatList
                    data={rateList}
                    renderItem={renderRate}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>
        </View>
    )
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
    reportItem: {
        padding: 5,
        marginLeft: 20,
        marginTop: 10,
    },
    reportContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reportIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    reportTitleContainer: {
        marginHorizontal: 10,
        flex: 2.5,
    },
    reportDateContainer: {
        marginHorizontal: 10,
        flex: 1,
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    reportDate: {
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

export default OrderRateScreen;