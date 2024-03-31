import React, { useState, useEffect, useRef } from 'react';
import {
    ScrollView, View, Text, FlatList, Button, TextInput, StyleSheet, Image, TouchableOpacity,
    Animated, Keyboard, Platform, ActivityIndicator, Alert
} from 'react-native';
import { colors, veg, nonveg } from '../../../globals/style.js';
import { firebase } from '../../../../Firebase/firebase';
import { Picker } from '@react-native-picker/picker';
import { addStaff } from '../../../utils/firestore';
import HomeHeadNav from '../../../components/Header.js'


const AddStaff = ({ navigation, route }) => {
    const [name, onchangeName] = useState();
    const [age, onchangeAge] = useState(63);
    const [role, setRole] = useState();
    const [email, onchangeEmail] = useState();
    const [phone, onchangePhone] = useState();
    const [gender, setGender] = useState(null);
    const [isGenderSelectorOpen, setIsGenderSelectorOpen] = useState(null);
    const [isRoleSelectorOpen, setIsRoleSelectorOpen] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const animatedContainerRef = useRef(new Animated.Value(0)).current;

    const handleChangeGender = (gender) => {
        setGender(gender);
        setIsGenderSelectorOpen(false);
    }
    const handleChangeRole = (role) => {
        setRole(role);
        setIsRoleSelectorOpen(false);
    }

    const closeAllOpts = () => {
        setIsGenderSelectorOpen(false);
        setIsRoleSelectorOpen(false);
    }

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
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animatedContainerRef }] }
        ]}>
            <HomeHeadNav navigation={navigation} title='THÊM NHÂN VIÊN' />
            <ScrollView>
                <Text style={styles.header}>Chức vụ:</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        setIsGenderSelectorOpen(false);
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

                <Text style={styles.header}>Họ và tên:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangeName}
                    value={name}
                    onPressIn={closeAllOpts}
                ></TextInput>
                <Text style={styles.header}>Tuổi:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangeAge}
                    value={age}
                    keyboardType='numeric'
                ></TextInput>

                <Text style={styles.header}>Giới tính:</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        setIsRoleSelectorOpen(false);
                        setIsGenderSelectorOpen(!isGenderSelectorOpen)
                    }}
                >
                    <Text style={styles.selectorText}> {gender}</Text>
                </TouchableOpacity>
                {isGenderSelectorOpen && (
                    <View style={styles.genderOptions}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={handleChangeGender}
                            style={{ height: 50, width: 150 }}
                        >
                            <Picker.Item label="Nam" value="Nam" />
                            <Picker.Item label="Nữ" value="Nữ" />
                        </Picker>
                    </View>
                )}
                <Text style={styles.header}>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangeEmail}
                    value={email}
                ></TextInput>

                <Text style={styles.header}>Số điện thoại:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangePhone}
                    value={phone}
                ></TextInput>

                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </View>
            )}
            </ScrollView>
            {/* </ScrollView> */}
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
});




export default AddStaff;
