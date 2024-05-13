import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import HomeHeadNav from "../../../components/Header.js";
import {
  getDocumentById,
  addCustomer,
  addOrder,
  deleteTableData,
  addInforBooking,
} from "../../../utils/firestore";
import { firebase } from "../../../../Firebase/firebase";

const PreOrderScreen = ({ navigation, route }) => {
  const { table_id } = route.params;
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(null);

  const handleCancel = () => {
            navigation.goBack();
        };

  const checkBookingTable = async  () => {
        if(!customerName
            || !phoneNumber
            || !bookingDate
            || !bookingTime
            || !numberOfGuests)
        {
          Alert.alert(
              "Thông báo",
              "Điền thiếu thông tin khách hàng"
              )
        }
        else {
          addInforBooking(
                        table_id,
                        customerName,
                        phoneNumber,
                        bookingDate,
                        bookingTime,
                        numberOfGuests
                      );

                      Alert.alert(
                        "Thông báo",
                        "Đặt trước bàn thành công!"
                      )
                      try {
                        navigation.navigate("table_cashier");
                      } catch (error) {
                        console.error("Error navigating to :TableScreen", error);
                      }
        }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <HomeHeadNav navigation={navigation} title="ĐẶT BÀN TRƯỚC" user="cashier" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image source={require("../../../../assets/TableList/Table1.png")} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tên khách hàng:</Text>
          <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={(text) => setCustomerName(text)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ngày đặt bàn:</Text>
          <TextInput
            style={styles.input}
            value={bookingDate}
            onChangeText={(text) => setBookingDate(text)}
            placeholder="DD-MM-YYYY"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian đặt:</Text>
          <TextInput
            style={styles.input}
            value={bookingTime}
            onChangeText={(text) => setBookingTime(text)}
            placeholder="HH:MM"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Số khách:</Text>
          <TextInput
            style={styles.input}
            value={numberOfGuests}
            onChangeText={(text) => setNumberOfGuests(text)}
            keyboardType="numeric"
          />
        </View>
        <Button
          title="Đặt bàn"
          color="#FF5733"
          onPress={() => {
            addInforBooking(
              table_id,
              customerName,
              phoneNumber,
              bookingDate,
              bookingTime,
              numberOfGuests
            );
            Alert.alert(
              "Thông báo",
              "Bàn đã được đặt"
            )
            try {
              navigation.navigate("table_cashier");
            } catch (error) {
              console.error("Error navigating to :TableScreen", error);
            }
          }}
        />
        <Button
                  title="Quay lại"
                  color="#FF5733"
                  onPress={() => {
                    handleCancel();
                  }
                    }
                />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  imageContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 200,
    height: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
});

export default PreOrderScreen;
