import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'

const StaffCustomerScreen = ({ navigation }) => {
    return (
        <View>
            <HomeHeadNav navigation={navigation} title='KHÁCH HÀNG' user='staff'/>
        </View>
    )
}

export default StaffCustomerScreen;