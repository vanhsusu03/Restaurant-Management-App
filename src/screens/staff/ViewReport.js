import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, FlatList, View, Image, TouchableOpacity, Text, Animated , ScrollView} from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { fetchReportData, addReport } from '../../utils/firestore.js';

const StaffViewReport = ({ navigation, route }) => {

    const [reportList, setReportList] = useState([]);
    const animatedContainerRef = useRef(new Animated.Value(0)).current;

    const report = route.params.report;

    const handleCancel = () => {
        navigation.goBack();
    }
    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animatedContainerRef }] }]}>
            <HomeHeadNav navigation={navigation} title='CHI TIẾT BÁO CÁO' user='staff' />
            <ScrollView>
                <Text style={styles.header}>Tiêu đề:</Text>
                <Text
                    style={styles.showinfo}>{report.title} </Text>
                <Text style={styles.header}>Người gửi:</Text>
                <Text
                    style={styles.showinfo}>{report.sender} </Text>

                <Text style={styles.header}>Ngày gửi:</Text>
                <Text
                    style={styles.showinfo}>{report.date} </Text>

                <Text style={styles.header}>Nội dung:</Text>
                <Text
                    style={styles.showinfo}>{report.content} </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animated.View>
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

export default StaffViewReport;