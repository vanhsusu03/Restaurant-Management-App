import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Image, TouchableOpacity, Animated, Keyboard, Platform } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import { FontAwesome6 } from '@expo/vector-icons';
import HomeHeadNav from '../../components/Header.js'

const AdminStaffScreen = ({ navigation }) => {
    // return (
    //     <View></View>
    // )
    const [staffList, setStaffList] = useState([]);
    const [newStaffName, setNewStaffName] = useState('');
    const [newStaffRole, setNewStaffRole] = useState('');
    const animatedContainerRef = useRef(new Animated.Value(0)).current;

    // useEffect(() => {
    //     //   const unsubscribe = firebase.firestore().collection('staff').onSnapshot(snapshot => {
    //     // const staffData = [];
    //     //     snapshot.forEach(doc => {
    //     //       staffData.push({ id: doc.id, ...doc.data() });
    //     //     });
    //     // setStaffList(staffData);
    //     //   });

    //     //   return () => unsubscribe();
    //     const keyboardDidShowListener = Keyboard.addListener(
    //         Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
    //         () => {
    //             Animated.timing(animatedContainerRef, {
    //                 toValue: -100,
    //                 duration: 300,
    //                 useNativeDriver: false,
    //             }).start();
    //         }
    //     );

    //     const keyboardDidHideListener = Keyboard.addListener(
    //         Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
    //         () => {
    //             Animated.timing(animatedContainerRef, {
    //                 toValue: 0,
    //                 duration: 300,
    //                 useNativeDriver: false,
    //             }).start();
    //         }
    //     );

    //     return () => {
    //         // unsubscribe();
    //         keyboardDidShowListener.remove();
    //         keyboardDidHideListener.remove();
    //     };
    // }, []);



    const handleAddStaff = async () => {
        //   firebase.firestore().collection('staff').add({
        //     name: newStaffName,
        //     role: newStaffRole
        //   }).then(() => {
        //     console.log('Staff added successfully');
        //     setNewStaffName('');
        //     setNewStaffRole('');
        //   }).catch(error => {
        //     console.error('Error adding staff: ', error);
        //   });
        try {
            navigation.navigate('add_staff');
        } catch (error) {
            console.error('Error navigating to AddStaff:', error);
        }
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animatedContainerRef }] }]}>
            <HomeHeadNav navigation={navigation} title='QUẢN LÝ NHÂN VIÊN' />

            <TouchableOpacity style={styles.addButton} onPress={handleAddStaff}>
                <FontAwesome6 name="add" style={styles.icon} />
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

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
    staffItem: {
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    staffName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    staffRole: {
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
    },
    addButtonText: {
        fontSize: 18,
        color: '#EE9C37'
    },
});



export default AdminStaffScreen;
