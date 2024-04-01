import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { Feather, Ionicons, MaterialIcons, FontAwesome, SimpleLineIcons, FontAwesome6 } from '@expo/vector-icons';

const StaffMenuScreen = ({ navigation }) => {
    return (
        <View>
            <HomeHeadNav navigation={navigation} title='MENU' user='staff'/>
        </View>
    )
}

export default StaffMenuScreen;
