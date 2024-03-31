import React, { useState, useEffect, useRef } from 'react';
import {
    ScrollView, View, Text, FlatList, Button, TextInput, StyleSheet, Image, TouchableOpacity,
    Animated, Keyboard, Platform, ActivityIndicator
} from 'react-native';
import { colors, veg, nonveg } from '../../../globals/style.js';
import { firebase } from '../../../../Firebase/firebase';
import { Picker } from '@react-native-picker/picker';
import { getImage, addDoc } from '../../../utils/firestore';
import HomeHeadNav from '../../../components/Header.js'


const AddStaff = ({ navigation, route }) => {
    // return (
    //     <View></View>
    // )
    // const [staffList, setStaffList] = useState([]);
    // const [newStaffName, setNewStaffName] = useState('');
    // const [newStaffRole, setNewStaffRole] = useState('');
    // const animatedContainerRef = useRef(new Animated.Value(0)).current;

    // const { listType } = route.params;

    const [name, onchangeName] = useState();
    const [age, setAge] = useState(63);
    const [role, setRole] = useState();
    const [email, onchangeEmail] = useState();
    const [phone, onchangePhone] = useState();
    const [gender, setGender] = useState(null);
    const [username, onchangeUsername] = useState();
    const [pass, onchangePass] = useState();
    const [isGenderSelectorOpen, setIsGenderSelectorOpen] = useState(null);
    const [isAgeSelectorOpen, setIsAgeSelectorOpen] = useState(null);
    const [isRoleSelectorOpen, setIsRoleSelectorOpen] = useState(null);
    const animatedContainerRef = useRef(new Animated.Value(0)).current;

    const handleChangeAge = (age) => {
        setAge(age);
        setIsAgeSelectorOpen(false);
    }
    const handleChangeGender = (gender) => {
        setGender(gender);
        setIsGenderSelectorOpen(false);
    }
    const handleChangeRole = (role) => {
        setRole(role);
        setIsRoleSelectorOpen(false);
    }

    const closeAllOpts = () => {
        setIsAgeSelectorOpen(false);
        setIsGenderSelectorOpen(false);
        setIsRoleSelectorOpen(false);
    }
    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animatedContainerRef }] }
        ]}>
            <HomeHeadNav navigation={navigation} title='THÊM NHÂN VIÊN' />
            <ScrollView>
                <Text style={styles.header}>Loại tài khoản:</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        setIsAgeSelectorOpen(false);
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

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        setIsGenderSelectorOpen(false);
                        setIsRoleSelectorOpen(false);
                        setIsAgeSelectorOpen(!isAgeSelectorOpen)
                    }}
                >
                </TouchableOpacity>
                {isAgeSelectorOpen && (
                    <View style={styles.genderOptions}>
                        <Picker
                            selectedValue={age}
                            onValueChange={handleChangeAge}
                            style={{ height: 50, width: 150 }}
                        >
                            {[...Array(63)].map((_, index) => {
                                const age = index + 18;
                                return <Picker.Item key={age} label={`${age}`} value={age} />;
                            })}
                        </Picker>
                    </View>
                )}

                <Text style={styles.header}>Giới tính:</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        setIsAgeSelectorOpen(false);
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

                <Text style={styles.header}>Tên đăng nhập:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangeUsername}
                    value={username}
                ></TextInput>

                <Text style={styles.header}>Mật khẩu:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onchangePass}
                    value={pass}
                ></TextInput>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress>
                        <Text style={styles.buttonText}>Thêm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress>
                        <Text style={styles.buttonText}>Hủy</Text>
                    </TouchableOpacity>
                </View>
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
});




export default AddStaff;
