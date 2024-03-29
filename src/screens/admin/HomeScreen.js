import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'

const AdminHomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/icon3.png')} // Thay đổi đường dẫn và tên của hình ảnh tương đối ở đây
                style={styles.logo}
                resizeMode="cover"
            />
            <View style={styles.iconContainer}>
                <View style={styles.row}>
                    {/* Row 1 */}
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('staff_admin') }}>
                        <Image source={require('../../../assets/icon3.png')} style={styles.iconImage} />
                        <Text style={styles.iconText}>Staffs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('customer_admin') }}>
                        <Image source={require('../../../assets/icon3.png')} style={styles.iconImage} />
                        <Text style={styles.iconText}>Customers</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    {/* Row 2 */}
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('menu_admin')}}>
                        <Image source={require('../../../assets/icon3.png')} style={styles.iconImage} />
                        <Text style={styles.iconText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('table_admin')}}>
                        <Image source={require('../../../assets/icon3.png')} style={styles.iconImage} />
                        <Text style={styles.iconText}>Tables</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    {/* Row 2 */}
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('report_admin') }}>
                        <Image source={require('../../../assets/icon3.png')} style={styles.iconImage} />
                        <Text style={styles.iconText}>Reports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('sale_admin')}}>
                        <Image source={require('../../../assets/icon3.png')} style={styles.iconImage} />
                        <Text style={styles.iconText}>Sales</Text>
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
        justifyContent: 'center',
        marginTop: -70,
    },
    logo: {
        width: 300, // Điều chỉnh kích thước của hình ảnh ở đây
        height: 300, // Điều chỉnh kích thước của hình ảnh ở đây
    },
    iconContainer: {

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconImage: {
        width: 160, // Điều chỉnh kích thước của icon ở đây
        height: 160, // Điều chỉnh kích thước của icon ở đây
    },
    iconText: {
        fontSize: 30,
        marginTop: -30,
        marginLeft: 10,
        color: colors.text1,
        textAlign: 'center',
    }
});

export default AdminHomeScreen;
