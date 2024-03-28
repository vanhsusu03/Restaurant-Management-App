import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import {firebase} from '../../Firebase/firebase'

const SlideCard = ({ category, items, listType, reloadData }) => {
    const navigation = useNavigation();

    const renderFoodItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('dish_detail', { detail: item, category: category, listType: listType })}
            >
            <View>
                <Image source={{uri: item.data.image}} style={styles.image} />
            </View>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleEdit = () => {
       Alert.alert(
            "Bạn muốn sửa hay xóa danh mục?",
            "",
            [
                {text: 'Xóa', style: 'destructive', onPress: async () => { 
                    await firebase.firestore().collection('menu').doc(category).delete();
                    reloadData();
                }},
                {text: 'Sửa', style: 'default', onPress: () => { console.log("Đã sửa")}},
                {text: 'Hủy', style: 'cancel', },
            ],
            {
                cancelable: false,
            }
       )
    }


    return (
        <View style={styles.card}>
            <View style={styles.edit}>
                <Text style={styles.category}>{category}</Text>
                <TouchableOpacity onPress={handleEdit}>
                    <FontAwesome6 name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={items}
                renderItem={renderFoodItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFF',
        padding: 20,
    },
    category: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight: 10
    },
    itemContainer: {
        backgroundColor: '#F6CB99',
        marginRight: 10,
        alignItems: 'center',
        borderRadius: 10,
        width: 130,
        height: 160,
    },

    image: {
        width: 130,
        height: 120,
        marginBottom: 7,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    item: {
        fontSize: 17,
        textAlign: 'center',
    },
    edit: {
        flexDirection: 'row'
    }
});

export default SlideCard;
