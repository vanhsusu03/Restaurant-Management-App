import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../globals/style.js';

const SideBar = ({ navigation, title }) => {
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        // Tìm index của mục có tiêu đề trùng khớp với tiêu đề được truyền từ HomeHeadNav
        const index = items.findIndex(item => item.title === title);
        setActiveItem(index);
    }, [title]);

    const items = [
        { title: 'HOME', screenName: 'home_admin' },
        { title: 'STAFF', screenName: 'staff_admin' },
        { title: 'CUSTOMER', screenName: 'customer_admin' },
        { title: 'MENU', screenName: 'menu_admin' },
        { title: 'TABLE', screenName: 'table_admin' },
        { title: 'REPORT', screenName: 'report_admin' },
        { title: 'SALE', screenName: 'sale_admin' },
        { title: 'ACCOUNT', screenName: 'account_admin' },
        // Thêm các mục khác nếu cần
    ];

    const handleItemPress = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleItemPress(item.screenName)}
                        style={[
                            styles.item,
                            activeItem === index && styles.activeItem
                        ]}
                    >
                        <Text style={styles.text}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 220,
        height: 800,
        backgroundColor: 'white',
        paddingTop: 10,
        zIndex: 1, // Đảm bảo thanh bên ở phía trên các nội dung khác
    },
    item: {
        paddingVertical: 10,
    },
    text: {
        fontSize: 21,
        color: colors.bg,
        paddingLeft: 30,
    },
    activeItem: {
        backgroundColor: '#FFE4B5', // Đặt màu nền cho mục active
    },
});

export default SideBar;
