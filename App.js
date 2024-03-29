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


export default function App() {
const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='admin'>
            <Stack.Screen name="login" component={LogInScreen}
                options={{
                    headerShown: false,

                }}
            />
            <Stack.Screen name="home_admin" component={AdminHomeScreen}
                 options={{
                    headerShown: false,

                 }}
            />
            <Stack.Screen name="staff_admin" component={AdminStaffScreen}
                 options={{
                    headerShown: false,

                 }}
            />
            <Stack.Screen name="customer_admin" component={AdminCustomerScreen}
                 options={{
                    headerShown: false,

                 }}
            />
            <Stack.Screen name="menu_admin" component={AdminMenuScreen}
                 options={{
                    headerShown: false,

                 }}
            />
            <Stack.Screen name="table_admin" component={AdminTableScreen}
                 options={{
                    headerShown: false,

                 }}
            />
            <Stack.Screen name="report_admin" component={AdminReportScreen}
                 options={{
                    headerShown: false,

                 }}
            />
            <Stack.Screen name="sale_admin" component={AdminSaleScreen}
                 options={{
                    headerShown: false,

                 }}
            />

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
