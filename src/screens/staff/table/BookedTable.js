import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import HomeHeadNav from "../../../components/Header.js";
import { colors } from "../../../globals/style.js";
import { firebase } from "../../../../Firebase/firebase";
import {
  getDocumentById,
  addCustomer,
  addOrder,
  deleteTableData,
  cancelBooking,
} from "../../../utils/firestore";
import { MaterialIcons, Feather, Fontisto, Entypo } from "@expo/vector-icons";

const BookedTable = ({ navigation, route }) => {
  const { table_id } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const tableData = await getDocumentById("tables", table_id);
        setData(tableData);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };
    fetchTableData();
  }, []);

  const handleCancel = () => {
    cancelBooking(table_id), 
    navigation.goBack();
  };

  const handleUsing = async () => {
    try {

    // Cập nhật trạng thái "in use" cho bàn
    await firebase.firestore().collection("tables").doc(table_id).update({ state: "in use", items: [] });

      navigation.navigate("table_staff");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <View styles={styles.container}>
      <HomeHeadNav navigation={navigation} title="CHI TIẾT BÀN" user="staff" />
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/TableList/Table1booked.png")}
        />
      </View>
      {data && (
        <View style={styles.customer}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerTitle}>Tên khách hàng: </Text>
            <Text style={styles.customerName}>{data.customer.name}</Text>
          </View>
          <View style={styles.tableInfo}>
            <View style={styles.tableId}>
              <MaterialIcons name={"table-restaurant"} size={20} />
              <Text style={styles.customerText}>Bàn: </Text>
              <Text style={styles.tableText}>{data.id}</Text>
            </View>
            <View style={styles.tableGuests}>
              <Feather name={"users"} size={20} />
              <Text style={styles.customerText}>Số khách: </Text>
              <Text style={styles.tableText}>{data.guests}</Text>
            </View>
          </View>
          <View style={styles.dateInfo}>
            <Fontisto name={"date"} size={20} />
            <Text style={styles.customerText}>Ngày: </Text>
            <Text style={styles.tableText}>{data.date}</Text>
          </View>
          <View style={styles.dateInfo}>
            <Entypo name={"time-slot"} size={20} />
            <Text style={styles.customerText}>Giờ: </Text>
            <Text style={styles.tableText}>{data.time}</Text>
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "green" }]} onPress={handleUsing}>
          <Text style={styles.buttonText}>Sử dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Huỷ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  customer: {
    marginTop: 30,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 10,
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  customerTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },
  customerName: {
    fontSize: 22,
    paddingLeft: 10,
  },
  customerText: {
    fontSize: 22,
    paddingLeft: 7,
  },
  tableInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  tableText: {
    fontSize: 22,
    color: colors.text1,
    paddingLeft: 10,
  },
  tableId: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  tableGuests: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  table: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  image: {
    width: 200,
    height: 200,
  },

  infor: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },

  textStyle: {
    fontSize: 18,
    color: "#42c2f5",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
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

export default BookedTable;
