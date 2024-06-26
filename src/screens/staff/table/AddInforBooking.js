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
  TouchableOpacity
} from "react-native";
import moment from 'moment' // import moment library
import HomeHeadNav from "../../../components/Header.js";
import {
  getDocumentById,
  addCustomer,
  addOrder,
  deleteTableData,
  addInforUsing,
} from "../../../utils/firestore";
import { firebase } from "../../../../Firebase/firebase";

const AddInforBooking = ({ navigation, route }) => {
  const table_id = route.params.table_id;
  const img = route.params.img;
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(null);

  const images = {
      1: require("../../../../assets/TableList/Table1.png"),
      2: require("../../../../assets/TableList/Table2.png"),
      3: require("../../../../assets/TableList/Table3.png"),
      4: require("../../../../assets/TableList/Table4.png"),
      5: require("../../../../assets/TableList/Table5.png"),
      6: require("../../../../assets/TableList/Table6.png"),
      7: require("../../../../assets/TableList/Table7.png"),
      8: require("../../../../assets/TableList/Table8.png"),
      9: require("../../../../assets/TableList/Table9.png"),
    };


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
        // Convert bookingDate and bookingTime to a Firestore timestamp
        const dateTimeString = `${bookingDate} ${bookingTime}`
        const timestamp = moment(dateTimeString, 'DD/MM/YYYY HH:mm').toDate()
        console.log(timestamp)
        addInforUsing(
                      table_id,
                      customerName,
                      phoneNumber,
                      timestamp, // save as timestamp
                      numberOfGuests
                    );
        await firebase.firestore().collection("tables").doc(table_id).update({ items: [] });
                    Alert.alert(
                      "Thông báo",
                      "Bàn bắt đầu được sử dụng!"
                    )
                    try {
                      navigation.navigate("table_staff");
                    } catch (error) {
                      console.error("Error navigating to :TableScreen", error);
                    }
      }
      }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <HomeHeadNav navigation={navigation} title="THÔNG TIN KHÁCH HÀNG" user="staff" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image source={images[table_id]} />
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
          <Text style={styles.label}>Ngày ăn:</Text>
          <TextInput
            style={styles.input}
            value={bookingDate}
            onChangeText={(text) => setBookingDate(text)}
            placeholder="DD-MM-YYYY"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian bắt đầu:</Text>
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
        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={checkBookingTable}>
                          <Text style={styles.buttonText}>Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleCancel}>
                                                  <Text style={styles.buttonText}>Quay lại</Text>
                                                </TouchableOpacity>
                      </View>
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
    marginTop: 10
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
  button: {
  marginBottom: 10,},
  buttonContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20
              },
              button: {
                backgroundColor: '#EE9C37',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                marginHorizontal: 10,
              },
              buttonText: {
                fontSize: 18,
                color: '#fff',
              },
});

export default AddInforBooking;
