import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { Feather, Ionicons, MaterialIcons, FontAwesome, SimpleLineIcons, FontAwesome6 } from '@expo/vector-icons';

const AdminHomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HomeHeadNav navigation={navigation} title='TRANG CHỦ' />
            <View style={styles.iconContainer}>
                <View style={styles.row}>
                    {/* Row 1 */}
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('staff_admin') }}>
                        <Feather name={'user'} size={80} color={colors.text1} style={styles.icon} />
                        <Text style={styles.iconText}>NHÂN VIÊN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('customer_admin') }}>
                         <Feather name={'users'} size={80} color={colors.text1} style={styles.icon} />
                        <Text style={styles.iconText}>KHÁCH HÀNG</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    {/* Row 2 */}
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('menu_admin')}}>
                        <Ionicons name={'restaurant-outline'} size={80} color={colors.text1} style={styles.icon} />
                        <Text style={styles.iconText}>MENU</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.icon, { marginLeft: 25 }]} onPress={() => { navigation.navigate('table_admin')}}>
                         <MaterialIcons name={'table-restaurant'} size={80} color={colors.text1} style={styles.icon} />
                         <Text style={styles.iconText}>QUẢN LÝ BÀN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    {/* Row 2 */}
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('report_admin') }}>
                         <SimpleLineIcons name={'notebook'} size={80} color={colors.text1} style={styles.icon} />
                         <Text style={styles.iconText}>BÁO CÁO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.icon, { marginLeft: 20 }]} onPress={() => { navigation.navigate('sale_admin')}}>
                         <FontAwesome6 name={'money-check-dollar'} size={80} color={colors.text1} style={styles.icon} />
                        <Text style={styles.iconText}>DOANH THU</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 300, // Điều chỉnh kích thước của hình ảnh ở đây
        height: 300, // Điều chỉnh kích thước của hình ảnh ở đây
    },
    iconContainer: {
        position: 'relative',
        zIndex: 0,
        marginTop: 50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },
    iconText: {
        fontSize: 24,
        marginLeft: 10,
        color: colors.text1,
        textAlign: 'center',
    }
});

export default AdminHomeScreen;
