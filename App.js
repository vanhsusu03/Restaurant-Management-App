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
import OrderRateScreen from './src/screens/admin/OrderRateScreen.js'
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
import TableDetail from './src/screens/staff/table/TableDetail';
import MenuOrder from './src/screens/staff/table/MenuOrder.js';
import PaymentScreen from './src/screens/cashier/PaymentScreen.js'
import CashierTableScreen from './src/screens/cashier/TableScreen.js'
import PaymentDetail from './src/screens/cashier/payment/PaymentDetail';
import PreOrderScreen from './src/screens/cashier/order_table/PreOrderScreen.js';
import BookedTableScreen from './src/screens/cashier/order_table/BookedTableScreen.js';
import BookedDetailScreen from './src/screens/cashier/order_table/BookedDetail.js';
import BookedDetail from './src/screens/staff/table/BookedDetail.js';
import KitchenManagerMenuScreen from './src/screens/kitchen_manager/MenuScreen.js'
import OrderedDishesScreen from './src/screens/kitchen_manager/OrderedDishes.js'
import CompletedDishesScreen from './src/screens/kitchen_manager/CompletedDishes.js'

import EditTables from './src/screens/admin/table/EditTables.js';
import AddInforBooking from './src/screens/staff/table/AddInforBooking.js';
import BookedTable from './src/screens/staff/table/BookedTable.js';
import Comment from './src/screens/staff/table/Comment.js';
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
            <Stack.Screen name="user" component={AdminUserScreen} options={{ headerShown: false }} />
            <Stack.Screen name="order_rate" component={OrderRateScreen} options={{ headerShown: false }} />

            {/* Trang dành cho staff */}
            <Stack.Screen name="customer_staff" component={StaffCustomerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="menu_staff" component={StaffMenuScreen} options={{ headerShown: false }} />
            <Stack.Screen name="table_staff" component={StaffTableScreen} options={{ headerShown: false }} />
            <Stack.Screen name="report_staff" component={StaffReportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="report_staff_view" component={StaffViewReport} options={{ headerShown: false }} />
            <Stack.Screen name="report_staff_add" component={StaffAddReportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="table_detail" component={TableDetail} options={{ headerShown: false }} />
            <Stack.Screen name="table_booking" component={AddInforBooking} options={{ headerShown: false }} />
            <Stack.Screen name="table_booked" component={BookedTable} options={{ headerShown: false }} />
            <Stack.Screen name="table_booked_detail" component={BookedDetail} options={{ headerShown: false }} />
            <Stack.Screen name="menu_order" component={MenuOrder} options={{ headerShown: false }} />
            <Stack.Screen name="comment" component={Comment} options={{heaederShown: false}} />
            
            {/* Trang dành cho cashier */}
            <Stack.Screen name="payment_cashier" component={PaymentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="table_cashier" component={CashierTableScreen} options={{ headerShown: false }} />
            <Stack.Screen name="payment_detail" component={PaymentDetail} options={{ headerShown: false }} />
            <Stack.Screen name="preorder_table" component={PreOrderScreen} options={{ headerShown: false }} />
            <Stack.Screen name="add_preorder" component={BookedTableScreen} options={{ headerShown: false }} />
            <Stack.Screen name="preorder_detail" component={BookedDetailScreen} options={{ headerShown: false }} />

            {/* Trang dành cho kitchen_manager */}
            <Stack.Screen name="menu_kitchen_manager" component={KitchenManagerMenuScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ordered_dishes" component={OrderedDishesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="completed_dishes" component={CompletedDishesScreen} options={{ headerShown: false }} />

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
