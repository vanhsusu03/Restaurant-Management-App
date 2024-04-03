import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogInScreen from './src/screens/LogIn.js'
import AdminHomeScreen from './src/screens/admin/HomeScreen.js'
import AdminStaffScreen from './src/screens/admin/StaffScreen.js'
import AdminCustomerScreen from './src/screens/admin/CustomerScreen.js'
import AdminMenuScreen from './src/screens/admin/MenuScreen.js'
import AdminTableScreen from './src/screens/admin/TableScreen.js'
import AdminReportScreen from './src/screens/admin/ReportScreen.js'
import AdminSaleScreen from './src/screens/admin/SaleScreen.js'
import AdminUserScreen from './src/screens/admin/UserScreen.js'
import SideBar from './src/components/SideBar.js'
import DishDetail from './src/screens/admin/menu/DishDetail';
import AddDish from './src/screens/admin/menu/AddDish';
import AddStaff from './src/screens/admin/staff/AddStaff.js';
import StaffInfo from './src/screens/admin/staff/StaffInfo.js';
import StaffCustomerScreen from './src/screens/staff/CustomerScreen.js'
import StaffMenuScreen from './src/screens/staff/MenuScreen.js'
import StaffTableScreen from './src/screens/staff/TableScreen.js'
import StaffReportScreen from './src/screens/staff/ReportScreen.js';
import StaffViewReport from './src/screens/staff/ViewReport.js';
import StaffAddReportScreen from './src/screens/staff/AddReport.js';
import CustomerInfo from './src/screens/admin/customer/CustomerInfo.js';
import EditTables from './src/screens/admin/table/EditTables.js';
export default function App() {
const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={LogInScreen} />

            {/* Trang dành cho admin */}
            <Stack.Screen name="home_admin" component={AdminHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="sidebar" component={SideBar} options={{ headerShown: false }} />
            <Stack.Screen name="staff_admin" component={AdminStaffScreen} options={{ headerShown: false }} />
            <Stack.Screen name="add_staff" component={AddStaff} options={{ headerShown: false }} />
            <Stack.Screen name="staff_info" component={StaffInfo} options={{ headerShown: false }} />
            <Stack.Screen name="customer_admin" component={AdminCustomerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="customer_info" component={CustomerInfo} options={{ headerShown: false }} />
            <Stack.Screen name="menu_admin" component={AdminMenuScreen} options={{ headerShown: false }} />
            <Stack.Screen name="dish_detail" component={DishDetail} options={{ headerShown: false }} />
            <Stack.Screen name="add_dish" component={AddDish} options={{ headerShown: false }} />
            <Stack.Screen name="table_admin" component={AdminTableScreen} options={{ headerShown: false }} />
            <Stack.Screen name="edit_tables" component={EditTables} options={{headerShown: false,}}/>
            <Stack.Screen name="report_admin" component={AdminReportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="sale_admin" component={AdminSaleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="user_admin" component={AdminUserScreen} options={{ headerShown: false }} />

            {/* Trang dành cho staff */}
            <Stack.Screen name="customer_staff" component={StaffCustomerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="menu_staff" component={StaffMenuScreen} options={{ headerShown: false }} />
            <Stack.Screen name="table_staff" component={StaffTableScreen} options={{ headerShown: false }} />
            <Stack.Screen name="report_staff" component={StaffReportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="report_staff_view" component={StaffViewReport} options={{ headerShown: false }} />
            <Stack.Screen name="report_staff_add" component={StaffAddReportScreen} options={{ headerShown: false }} />
            {/* Trang dành cho cashier */}

            {/* Trang dành cho kitchen_manager */}

        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
