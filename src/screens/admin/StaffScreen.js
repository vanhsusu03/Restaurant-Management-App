import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Image, TouchableOpacity, Animated, Keyboard, Platform } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import HomeHeadNav from '../../components/Header.js'
import { fetchStaffData } from '../../utils/firestore.js';


const AdminStaffScreen = ({ navigation }) => {
    const [staffList, setStaffList] = useState([]);
    const animatedContainerRef = useRef(new Animated.Value(0)).current;

    const reloadStaff = useCallback(async () => {
        try {
            const newData = await fetchStaffData();
            setStaffList(newData);
           
        } catch (error) {
            console.error("Error reloading data:", error);
        }
    },[]);
    
    
    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            reloadStaff();
        });

        return reload;
    }, [navigation, reloadStaff]);

    const renderStaff = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.staffItem}
                onPress={() => navigation.navigate('staff_info', {staff: item })}
            >
                <View style={styles.staffInfoContainer}>
                    <FontAwesome5 name="user-circle" style={styles.staffIcon}/>
                    <View style={styles.staffNameContainer}>
                        <Text style={styles.staffName}>{item.name}</Text>
                    </View>
                    <View style={styles.staffRoleContainer}>
                        <Text style={styles.staffRole}>{item.role}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    

    const handleAddStaff = async () => {
        try {
            navigation.navigate('add_staff');
        } catch (error) {
            console.error('Error navigating to AddStaff:', error);
        }
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animatedContainerRef }] }]}>
            <HomeHeadNav navigation={navigation} title='NHÂN VIÊN' user='admin'/>

            <TouchableOpacity style={styles.addButton} onPress={handleAddStaff}>
                <FontAwesome6 name="add" style={styles.icon} />
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            <FlatList
                data={staffList}
                renderItem={renderStaff}
                keyExtractor={(_, index) => index.toString()}
            />
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
        padding: 5,
        marginLeft: 20
    },
    staffInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    staffIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    staffNameContainer: {
        marginHorizontal: 10,
        flex: 2.5,
    },
    staffRoleContainer: {
        marginHorizontal: 10,
        flex: 1,
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
        marginBottom: 20
    },
    addButtonText: {
        fontSize: 18,
        color: '#EE9C37'
    },
});



export default AdminStaffScreen;
