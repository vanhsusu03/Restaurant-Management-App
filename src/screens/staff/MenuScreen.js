import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, FlatList, Button } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { firebase } from '../../../Firebase/firebase';
import { fetchMenuData } from '../../utils/firestore';

const StaffMenuScreen = ({ navigation }) => {
   
    return (
        <View>
            <HomeHeadNav navigation={navigation} title='KHÁCH HÀNG' user='staff'/>
        </View>
    )
}

export default StaffMenuScreen;

const styles = StyleSheet.create({
    
});
