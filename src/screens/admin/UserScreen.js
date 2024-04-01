import React, { useState, useEffect } from 'react';
import { Statusbar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { titles, colors, btn1, hr80 } from '../../globals/style';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeHeadNav from '../../components/Header.js';
import { firebase } from '../../../Firebase/firebase';
import { changePassword, getCurrentUserEmail, logout } from '../../utils/auth';
//import { Toast } from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const AdminUserScreen = ({ navigation }) => {
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const [cpasswordfocus, setCpasswordfocus] = useState(false);
    const [showcpassword, setShowcpassword] = useState(false);
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [customerror, setcustomError] = useState('');
    const [email, setEmail] = useState('');
    const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

    useEffect(() => {
        const userEmail = getCurrentUserEmail();
        setEmail(userEmail);
    }, []);

    const handleChangePassword = () => {
        try {
            if(password === '' || cpassword === '') {
                setcustomError('Vui lòng điền đầy đủ thông tin mật khẩu.');
                return;
            }

            if(password.length < 6) {
                setcustomError('Mật khẩu phải có nhiều hơn 5 kí tự!');
                return;
            }

            if(password !== cpassword) {
                setcustomError('Mật khẩu không trùng khớp!');
                return;
            }

            // Gọi hàm changePassword từ utils/auth.js
            changePassword(password);
            setPassword('');
            setCpassword('');
            setChangePasswordSuccess(true); // Đánh dấu thành công
            setTimeout(() => {
                setChangePasswordSuccess(false); // Đặt lại thông báo sau một khoảng thời gian
            }, 3000);

        } catch (error) {
            console.error("Error changing password:", error);
        }
    }

    const handleToggleChangePassword = () => {
        setIsChangePasswordClicked(!isChangePasswordClicked);
    }

    const handleLogout = () => {
        logout(); // Gọi hàm logout từ utils/logout.js
        navigation.navigate('login');
    };

    return (
        <View style={styles.container}>
            <HomeHeadNav navigation={navigation} title='USER' />
            <TouchableOpacity onPress={() => handleToggleChangePassword()} style={{marginTop: 10}}>
                <View style={styles.linkContainer}>
                    <MaterialCommunityIcons name="key-change" size={27} color={colors.primary} style={styles.icon} />
                    <Text style={styles.link}>Đổi mật khẩu</Text>
                </View>
            </TouchableOpacity>
            {isChangePasswordClicked && (
                <View style={styles.changepw}>
                    {changePasswordSuccess &&
                        <View style={styles.successContainer}>
                            <FontAwesome5 style={styles.successIcon} name='check-circle' size={26} color='green' />
                            <Text style={styles.successMsg}>Mật khẩu đã được thay đổi!</Text>
                        </View>
                    }
                    {customerror !== '' &&
                        <View style={styles.errorContainer}>
                            <FontAwesome5 style={styles.errorIcon} name='exclamation-circle' size={26} color='red' />
                            <Text style={styles.errormsg}>{customerror}</Text>
                        </View>
                    }
                    <View style={styles.inputout}>
                        <AntDesign name="user" size={24} color={colors.text2} />
                        <Text style={styles.input}>{email}</Text>
                    </View>
                    <View style={styles.inputout}>
                        <MaterialCommunityIcons name="lock-outline" size={24} color={passwordfocus == true ? colors.text1 : colors.text2} />
                        <TextInput style={styles.input} placeholder="Mật khẩu mới" onFocus={() => {
                            setPasswordfocus(true)
                            setCpasswordfocus(false)
                            setcustomError('')
                        }}

                            secureTextEntry={showpassword === false ? true : false}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                        />

                        <Octicons name={showpassword == false ? "eye-closed" : "eye"} size={24} color="black" onPress={() => setShowpassword(!showpassword)} />
                    </View>
                    <View style={styles.inputout}>
                        <MaterialCommunityIcons name="lock-outline" size={24} color={cpasswordfocus == true ? colors.text1 : colors.text2} />
                        <TextInput style={styles.input} placeholder=" Nhâp lại mật khẩu mới" onFocus={() => {
                            setPasswordfocus(false)
                            setCpasswordfocus(true)
                            setcustomError('')
                        }}

                            secureTextEntry={showcpassword === false ? true : false}
                            onChangeText={(text) => setCpassword(text)}
                            value={cpassword}
                        />

                        <Octicons name={showcpassword == false ? "eye-closed" : "eye"} size={24} color="black" onPress={() => setShowcpassword(!showcpassword)} />
                    </View>
                    <TouchableOpacity style={btn1} onPress={() => handleChangePassword()}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity onPress={() => handleLogout()}>
                <View style={styles.linkContainer}>
                    <FontAwesome5 name="sign-out-alt" size={24} color={colors.primary} style={styles.icon} />
                    <Text style={styles.link}>Đăng xuất</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    changepw: {
        alignItems: 'center'
    },
    inputout: {
        flexDirection: 'row',
        width: '80%',
        marginBottom: 20,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: '80%',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 5,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
    },
    errorIcon: {
        marginRight: 5,
    },
    errormsg: {
        color: 'red',
        fontSize: 18,
        paddingLeft: 10,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 40,
    },
    link: {
        fontSize: 24,
        color: colors.text1,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
        color: colors.text1,
    },
    successContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 5,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 10,
    },
    successIcon: {
        marginRight: 5,
    },
    successMsg: {
        color: 'green',
        fontSize: 18,
        paddingLeft: 10,
    },
});

export default AdminUserScreen;
