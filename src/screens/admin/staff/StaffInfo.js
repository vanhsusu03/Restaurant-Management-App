import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    ScrollView, View, Text, FlatList, Button, TextInput, StyleSheet, Image, TouchableOpacity,
    Animated, Keyboard, Platform, ActivityIndicator, Alert
} from 'react-native';
import { colors, veg, nonveg } from '../../../globals/style.js';
import { firebase } from '../../../../Firebase/firebase';
import { Picker } from '@react-native-picker/picker';
import { addStaff, editStaffInfo } from '../../../utils/firestore';
import HomeHeadNav from '../../../components/Header.js';
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { fetchStaffData } from '../../../utils/firestore.js';

const StaffInfo = ({ navigation, route }) => {

    const staff = route.params.staff;

    const [name, onchangeName] = useState(staff.name);
    const [age, onchangeAge] = useState(staff.age);
    const [role, setRole] = useState(staff.role);
    const [email, onchangeEmail] = useState(staff.email);
    const [phone, onchangePhone] = useState(staff.phone);
    const [gender, setGender] = useState(staff.gender);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setEditStatus] = useState(false);

    const [isRoleSelectorOpen, setIsRoleSelectorOpen] = useState(null);
    const animatedContainerRef = useRef(new Animated.Value(0)).current;

    // const reloadStaff = useCallback(async () => {
    //     try {
    //         const newData = await fetchStaffData();
    //         setStaffList(newData);

    //     } catch (error) {
    //         console.error("Error reloading data:", error);
    //     }
    // }, []);

    // useEffect(() => {
    //     const reload = navigation.addListener('focus', () => {
    //         reloadStaff();
    //     });

    //     return reload;
    // }, [navigation, reloadStaff]);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            await addStaff(role, name, age, gender, email, phone);

            Alert.alert(
                'Thành công!',
                'Thông tin đã được thêm!',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK pressed'),
                    },
                ],
                {
                    alertContainerStyle: styles.alertContainer,
                    backgroundColor: 'blue',
                }
            );
        } catch (error) {
            console.error("Error saving data:", error);
        } finally {
            setIsLoading(false);
            navigation.navigate('staff_admin');
        }
    };

    const handleChangeRole = (role) => {
        setRole(role);
        setIsRoleSelectorOpen(false);
    }

    const handleCanEdit = () => {
        setEditStatus(true);
    }

    const handleCancelEdit = () => {
        setEditStatus(false);
    }

    const handleSaveInfo = async () => {
        try {
            setIsLoading(true);
            await editStaffInfo(staff,name, role, age, gender, email, phone);

            Alert.alert(
                'Thành công!',
                'Thông tin đã được cập nhật!',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK pressed'),
                    },
                ],
                {
                    alertContainerStyle: styles.alertContainer,
                    backgroundColor: 'blue',
                }
            );
        } catch (error) {
            console.error("Error saving data:", error);
        } finally {
            setIsLoading(false);
            navigation.navigate('staff_admin');
        }
    }

    const handleCancel = () => {
        navigation.goBack();
    };
    const renderStaffInfo = () => {
        return (
            <TouchableOpacity
                style={styles.staffItem}
            >
                <View style={styles.staffInfoContainer}>
                    <FontAwesome5 name="user-circle" style={styles.staffIcon} />
                    <View style={styles.staffNameContainer}>
                        <Text style={styles.staffName}>{staff.name}</Text>
                    </View>
                    <View style={styles.staffRoleContainer}>
                        <Text style={styles.staffRole}>{staff.role}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animatedContainerRef }] }]}>
            {!isEditing && (<><HomeHeadNav navigation={navigation} title='THÔNG TIN NHÂN VIÊN' user='admin' /><ScrollView>
                <Text style={styles.header}>Họ và tên:</Text>
                <Text
                    style={styles.showinfo}>{staff.name} </Text>
                <Text style={styles.header}>Tuổi:</Text>
                <Text
                    style={styles.showinfo}>{staff.age} </Text>

                <Text style={styles.header}>Chức vụ:</Text>
                <Text
                    style={styles.showinfo}>{staff.role} </Text>

                <Text style={styles.header}>Email:</Text>
                <Text
                    style={styles.showinfo}>{staff.email} </Text>

                <Text style={styles.header}>Số điện thoại:</Text>
                <Text
                    style={styles.showinfo}>{staff.phone} </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleCanEdit}>
                        <Text style={styles.buttonText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                    </View>
                )}
            </ScrollView></>
            )}

            {isEditing && (<><HomeHeadNav navigation={navigation} title='CHỈNH SỬA THÔNG TIN' user='admin' /><ScrollView>
                <Text style={styles.header}>Họ và tên:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangeName}
                    value={name} />
                <Text style={styles.header}>Tuổi:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangeAge}
                    value={age}
                    keyboardType='numeric' />

                <Text style={styles.header}>Chức vụ:</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        setIsRoleSelectorOpen(!isRoleSelectorOpen);
                    }}
                >
                    <Text style={styles.selectorText}> {role}</Text>
                </TouchableOpacity>
                {isRoleSelectorOpen && (
                    <View style={styles.genderOptions}>
                        <Picker
                            selectedValue={role}
                            onValueChange={handleChangeRole}
                            style={{ width: 250 }}
                        >
                            <Picker.Item label="Quản lý nhà hàng" value="Quản lý nhà hàng" />
                            <Picker.Item label="Quản lý bếp" value="Quản lý bếp" />
                            <Picker.Item label="Thu ngân" value="Thu ngân" />
                            <Picker.Item label="Nhân viên phục vụ" value="Nhân viên phục vụ" />
                        </Picker>
                    </View>
                )}

                <Text style={styles.header}>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangeEmail}
                    value={email} />

                <Text style={styles.header}>Số điện thoại:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangePhone}
                    value={phone} />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSaveInfo}>
                        <Text style={styles.buttonText}>Lưu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleCancelEdit}>
                        <Text style={styles.buttonText}>Hủy</Text>
                    </TouchableOpacity>
                </View>
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                    </View>
                )}
            </ScrollView></>
            )}
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
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
        marginTop: 15,
        marginHorizontal: 30
    },
    icon: {
        marginLeft: 5,
        color: '#fff',
        backgroundColor: '#EE9C37',
        fontSize: 17,
        padding: 2,
        marginRight: 8
    },
    input: {
        borderColor: '#EE9C37',
        borderWidth: 2,
        marginHorizontal: 30,
        borderRadius: 10,
        paddingLeft: 20,
        paddingVertical: 5,
        fontSize: 16,
        minHeight: 45,
    },
    showinfo: {
        marginHorizontal: 30,
        borderRadius: 10,
        paddingLeft: 50,
        paddingVertical: 5,
        fontSize: 20,
        minHeight: 45,
    },
    genderSelector: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 20,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    selectorText: {
        fontSize: 16,
        color: '#333',
    },
    genderOptions: {
        // marginTop: 5,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        paddingLeft: 20,
        // paddingVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        paddingTop: 45
    },
    button: {
        backgroundColor: '#EE9C37',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 30,
        marginTop: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioCheck: {
        marginLeft: 5,
    },
    alertContainer: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'lightblue',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
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
});




export default StaffInfo;
