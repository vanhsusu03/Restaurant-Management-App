import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, FlatList, Button } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { firebase } from '../../../Firebase/firebase';
import { fetchMenuData } from '../../utils/firestore';

const OrderedDishesScreen = ({ navigation }) => {

    return (
        <View>
            <HomeHeadNav navigation={navigation} title='MÓN ĐÃ ĐẶT' user='kitchen_manager'/>
        </View>
    )
}

export default OrderedDishesScreen;

const styles = StyleSheet.create({

});