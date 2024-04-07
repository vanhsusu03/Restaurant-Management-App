import React, {useEffect, useState, useRef, useCallback} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Animated, Keyboard, Platform, FlatList, } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { Feather, Ionicons, MaterialIcons, FontAwesome, SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import { fetchPendingOrderData } from '../../utils/firestore.js';

const PaymentScreen = ({ navigation }) => {
    const [orderList, setOrderList] = useState([]);
    const animatedContainerRef = useRef(new Animated.Value(0)).current;

    const reloadOrder = useCallback(async () => {
        try {
            const newData = await fetchPendingOrderData();
            setOrderList(newData);

        } catch (error) {
            console.error("Error reloading data:", error);
        }
    },[]);


    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            reloadOrder();
        });

        return reload;
    }, [navigation, reloadOrder]);

    const renderOrder = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.orderItem}
                onPress={() => navigation.navigate('payment_detail', {order: item })}
            >
                <View style={styles.orderInfoContainer}>
                    <MaterialIcons name={'table-restaurant'} style={styles.orderIcon}/>
                    <View style={styles.orderTableContainer}>
                        <Text style={styles.orderTable}>Bàn số {item.table}</Text>
                    </View>
                    <View style={styles.orderTotalContainer}>
                        <Text style={styles.orderTotal}>{item.total}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animatedContainerRef }] }]}>
            <HomeHeadNav navigation={navigation} title='THANH TOÁN' user='cashier'/>
            <View style={styles.listTitleContainer}>
                <Text style={styles.listTitle}>ĐƠN HÀNG CHỜ THANH TOÁN</Text>
            </View>
            <FlatList
                data={orderList}
                renderItem={renderOrder}
                keyExtractor={(_, index) => index.toString()}
            />
        </Animated.View>
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
    listTitleContainer: {
        marginVertical: 20,
        alignItems: 'center'
    },
    listTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text1,
    },
    icon: {
        marginLeft: 5,
        color: '#fff',
        backgroundColor: '#EE9C37',
        fontSize: 17,
        padding: 2,
        marginRight: 8
    },
    orderItem: {
        padding: 5,
        marginLeft: 20
    },
    orderInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    orderTableContainer: {
        marginHorizontal: 10,
        flex: 2.5,
    },
    orderTotalContainer: {
        marginHorizontal: 10,
        flex: 1,
    },
    orderTable: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    orderTotal: {
        fontSize: 18,
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
});

export default PaymentScreen;
