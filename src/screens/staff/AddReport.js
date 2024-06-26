import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StyleSheet, FlatList, View, ScrollView, Image, TouchableOpacity,
    Text, TextInput, Animated, KeyboardAvoidingView, ActivityIndicator, Alert
} from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { addReport } from '../../utils/firestore.js';

const StaffAddReportScreen = ({ navigation }) => {

    const [title, onTitleChange] = useState();
    const [sender, onSenderChange] = useState();
    const [content, onContentChange] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US');

    const handleAddReport = async () => {
        try {
            setIsLoading(true);
            await addReport(title, sender, content);

            Alert.alert(
                'Thành công!',
                'Báo cáo đã được gửi!',
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
            navigation.navigate('report_staff');
        }
    }

    const handleCancel = () => {
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <Animated.View style={[styles.container]}>
                <HomeHeadNav navigation={navigation} title='VIẾT BÁO CÁO' user='staff'/>
                <ScrollView>
                    <Text style={styles.header}>Tiêu đề:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onTitleChange}
                        value={title}
                    ></TextInput>

                    <Text style={styles.header}>Người viết:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onSenderChange}
                        value={sender}
                    ></TextInput>

                    <Text style={styles.header}>Ngày viết:</Text>
                    <Text
                        style={styles.input}
                    >{formattedDate}</Text>

                    <Text style={styles.header}>Nội dung:</Text>
                    <TextInput
                        style={[styles.input, { height: 150 }]} // Adjust height for multiline input
                        multiline={true} // Allow multiline input
                        onChangeText={onContentChange}
                        value={content}
                        onFocus={() => { }}
                    ></TextInput>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleAddReport}>
                            <Text style={styles.buttonText}>Gửi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleCancel}>
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

                </ScrollView>
            </Animated.View>
        </KeyboardAvoidingView >
    )
}

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
    reportItem: {
        padding: 5,
        marginLeft: 20
    },
    reportContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reportIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    reportTitleContainer: {
        marginHorizontal: 10,
        flex: 2.5,
    },
    reportDateContainer: {
        marginHorizontal: 10,
        flex: 1,
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    reportDate: {
        fontSize: 16,
        color: '#666',
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

export default StaffAddReportScreen;