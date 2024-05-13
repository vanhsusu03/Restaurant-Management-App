import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Image, TouchableOpacity, Animated, Keyboard, Platform, Alert } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../../Firebase/firebase';
import { fetchCompletedDishesData, updateDishState  } from '../../utils/firestore';

const CompletedDishesScreen = ({ navigation, route }) => {
const [dishList, setDishList] = useState([]);
    const animatedContainerRef = useRef(new Animated.Value(0)).current;
    const user = route.params.user;

    const reloadDish = useCallback(async () => {
        try {
            const newData = await fetchCompletedDishesData();
            setDishList(newData);

        } catch (error) {
            console.error("Error reloading data:", error);
        }
    }, []);


    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            reloadDish();
        });

        return reload;
    }, [navigation, reloadDish]);

    const handelChangeState = (itemId, itemState) => {
        if (itemState === "cooked") {
            Alert.alert(
                'Thay đổi trạng thái món ăn?',
                "Bạn có chắc muốn thay đổi trạng thái món ăn thành 'Đã phục vụ' không?",
                [
                    {text: 'Hủy', style: 'cancel', },
                    {text: 'OK', style: 'default', onPress: () => {
                        updateDishState(itemId, "served")
                            .then(() => reloadDish())
                            .catch(error => console.error(error));
                    }},
                ],
                {
                    cancelable: false,
                }
            )
        } else if (itemState === "served") {
            Alert.alert(
                'Món ăn này đã được phục vụ!',
            )
        }
    };

    const renderDish = ({ item }) => {
        let ComponentType = user === "staff" ? TouchableOpacity : View;
        let iconColor = "black";
        if (item.state === "cooked") {
            iconColor = "red";
        } else if (item.state === "served") {
            iconColor = "green";
        }
        return (
            <ComponentType
                style={styles.dishItem}
                onPress={() => handelChangeState(item.id, item.state)}
            >
                <View style={styles.dishInfoContainer}>
                    <MaterialCommunityIcons name="food" style={[styles.dishIcon, { color: iconColor }]}/>
                    <View style={styles.dishNameContainer}>
                        <Text style={styles.dishName}>{item.name}</Text>
                    </View>
                    <View style={styles.dishQuantityContainer}>
                        <Text style={styles.dishQuantity}>SL: {item.quantity}</Text>
                    </View>
                    <View style={styles.dishTableContainer}>
                        <Text style={styles.dishQuantity}>Bàn {item.table}</Text>
                    </View>
                </View>
            </ComponentType>
        )
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animatedContainerRef }] }]}>
            <HomeHeadNav navigation={navigation} title='MÓN ĐÃ XONG' user={user} />
            <View style={styles.listTitleContainer}>
                 <Text style={styles.listTitle}>MÓN ĂN ĐÃ HOÀN THÀNH </Text>
            </View>
            <View style={styles.noteContainer}>
              <MaterialCommunityIcons name="food" size={20} color="red"/>
              <Text style={styles.noteText}>Chờ phục vụ</Text>
              <MaterialCommunityIcons name="food" size={20} color="green"/>
              <Text style={styles.noteText}>Đã phục vụ</Text>
            </View>
            <FlatList
                data={dishList}
                renderItem={renderDish}
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
    dishItem: {
        padding: 5,
        marginLeft: 20
    },
    dishInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    dishIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    dishNameContainer: {
        marginHorizontal: 10,
        flex: 1.5,
    },
    dishQuantityContainer: {
        marginHorizontal: 10,
        flex: 0.5,
    },
    dishTableContainer: {
        marginHorizontal: 10,
    },
    dishName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dishQuantity: {
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
    noteContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    noteText: {
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
    }
});


export default CompletedDishesScreen;