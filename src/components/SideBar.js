import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../globals/style.js';
import { MaterialIcons, FontAwesome, SimpleLineIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';

const SideBar = ({ navigation, title, user }) => {
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        // Tìm index của mục có tiêu đề trùng khớp với tiêu đề được truyền từ HomeHeadNav
        const index = items.findIndex(item => item.title === title);
        setActiveItem(index);
    }, [title]);

    // Khai báo các mục cho người dùng "admin"
    const adminItems = [
        { title: 'TRANG CHỦ', screenName: 'home_admin', type: MaterialIcons, icon: 'home' },
        { title: 'NHÂN VIÊN', screenName: 'staff_admin', type: FontAwesome, icon: 'user' },
        { title: 'KHÁCH HÀNG', screenName: 'customer_admin', type: MaterialIcons, icon: 'people' },
        { title: 'MENU', screenName: 'menu_admin', type: Ionicons, icon: 'restaurant-outline' },
        { title: 'QUẢN LÝ BÀN', screenName: 'table_admin', type: MaterialIcons, icon: 'table-restaurant' },
        { title: 'BÁO CÁO', screenName: 'report_admin', type: SimpleLineIcons, icon: 'notebook' },
        { title: 'DOANH THU', screenName: 'sale_admin', type: FontAwesome6, icon: 'money-check-dollar' },
    ];

    // Khai báo các mục cho người dùng "staff"
    const staffItems = [
        { title: 'MENU', screenName: 'menu_staff', type: Ionicons, icon: 'restaurant-outline' },
        { title: 'KHÁCH HÀNG', screenName: 'customer_staff', type: MaterialIcons, icon: 'people' },
        { title: 'BÁO CÁO', screenName: 'report_staff', type: SimpleLineIcons, icon: 'notebook' },
        { title: 'QUẢN LÝ BÀN', screenName: 'table_staff', type: MaterialIcons, icon: 'table-restaurant' },
    ];

    // Khai báo các mục cho người dùng "cashier"
    const cashierItems = [
        { title: 'THANH TOÁN', screenName: 'payment_cashier', type: MaterialIcons, icon: 'payment' },
        { title: 'ĐẶT BÀN', screenName: 'table_cashier', type: MaterialIcons, icon: 'table-restaurant' },
        { title: 'DOANH THU', screenName: 'sale_cashier', type: FontAwesome6, icon: 'money-check-dollar' },
    ];

    // Khai báo các mục cho người dùng "kitchen_manager"
    const kitchenManagerItems = [
        { title: 'TRANG CHỦ', screenName: 'home_kitchen_manager', type: MaterialIcons, icon: 'home' },
        { title: 'MENU', screenName: 'menu_kitchen_manager', type: Ionicons, icon: 'restaurant-outline' },
        { title: 'QUẢN LÝ BÀN', screenName: 'table_kitchen_manager', type: MaterialIcons, icon: 'table-restaurant' },
    ];

    let items = [];
    switch (user) {
        case 'admin':
            items = adminItems;
            break;
        case 'staff':
            items = staffItems;
            break;
        case 'cashier':
            items = cashierItems;
            break;
        case 'kitchen_manager':
            items = kitchenManagerItems;
            break;
        default:
            items = [];
            break;
    }

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
                        <View style={styles.itemContent}>
                            <item.type name={item.icon} size={26} color={colors.text1} />
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
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
        fontSize: 22,
        color: colors.bg,
        paddingLeft: 15,
    },
    activeItem: {
        backgroundColor: '#FFE4B5', // Đặt màu nền cho mục active
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
});

export default SideBar;
