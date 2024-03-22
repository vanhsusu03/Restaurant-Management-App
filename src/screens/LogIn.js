import React, { useState } from 'react'
import { Statusbar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { titles, colors, btn1, hr80 } from './../globals/style'
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'

import { firebase } from './../../Firebase/firebase'

const LogInScreen = ({ navigation }) => {
    const [emailfocus, setEmailfocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [showpassword, setShowpassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customerror, setcustomError] = useState('');

    const handlelogin = () => {
        // console.log(email, password);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                // var user = userCredential.user;
                // console.log(user);
                // ...

                navigation.navigate('home_admin');
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
                if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).'
                ) {
                    setcustomError('Please enter a valid email address')
                }
                else {
                    setcustomError('Incorrect email or password')
                }
            })
    }



    return (
            <View style={styles.container}>
                {/* <Statusbar /> */}
                <Image
                        source={require('./../../assets/icon3.png')} // Thay đổi đường dẫn và tên của hình ảnh tương đối ở đây
                        style={styles.logo}
                        resizeMode="cover"
                />
                <Text style={styles.head1}>Đăng nhập</Text>
                {customerror !== '' && <Text style={styles.errormsg}>{customerror}</Text>}
                <View style={styles.inputout}>
                    <AntDesign name="user" size={24} color={emailfocus === true ? colors.text1 : colors.text2} />
                    <TextInput style={styles.input} placeholder="Email" onFocus={() => {
                        setEmailfocus(true)
                        setPasswordfocus(false)
                        setShowpassword(false)
                        setcustomError('')
                    }}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputout}>
                    <MaterialCommunityIcons name="lock-outline" size={24} color={passwordfocus == true ? colors.text1 : colors.text2} />
                    <TextInput style={styles.input} placeholder="Password" onFocus={() => {
                        setEmailfocus(false)
                        setPasswordfocus(true)
                        setcustomError('')
                    }}

                        secureTextEntry={showpassword === false ? true : false}
                        onChangeText={(text) => setPassword(text)}
                    />

                    <Octicons name={showpassword == false ? "eye-closed" : "eye"} size={24} color="black" onPress={() => setShowpassword(!showpassword)} />
                </View>
                <Text style={styles.forgot} onPress={() => navigation.navigate('signup')}>Quên mật khẩu</Text>
                <TouchableOpacity style={btn1} onPress={() => handlelogin()}>
                    <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Đăng nhập</Text>
                </TouchableOpacity>

            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -70,
        },
        head1: {
            fontSize: 35,
            //fontWeight: 'bold',
            color: colors.text1,
            textAlign: 'center',
            marginVertical: 20,
            marginTop: -100,
        },
        inputout: {
            flexDirection: 'row',
            width: '80%',
            marginVertical: 10,
            backgroundColor: colors.col1,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
            // alignSelf: 'center',
            elevation: 20,
        },
        input: {
            fontSize: 18,
            marginLeft: 10,
            width: '80%',
        },
        forgot: {
            color: colors.text1,
            marginTop: 10,
            marginBottom: 15,
            fontSize: 18,
            alignSelf: 'flex-end',
            marginRight: '10%',
        },

        errormsg: {
            color: 'red',
            fontSize: 18,
            //textAlign: 'center',
            marginBottom: 10,
    //        borderColor: 'red',
    //        borderWidth: 1,
    //        borderRadius: 10,
            padding: 10,
        },
        logo: {
            width: 400, // Điều chỉnh kích thước của hình ảnh ở đây
            height: 400, // Điều chỉnh kích thước của hình ảnh ở đây
        },
    })

    export default LogInScreen