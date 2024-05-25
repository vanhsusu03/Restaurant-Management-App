import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Table, Row, TableWrapper } from "react-native-table-component";
import { firebase } from "../../../../Firebase/firebase";
import {
  getDocumentById,
  addCustomer,
  addOrder,
  deleteTableData,
} from "../../../utils/firestore";
import { colors, veg, nonveg } from "../../../globals/style.js";
import HomeHeadNav from "../../../components/Header.js";
import {
  MaterialIcons,
  Feather,
  Fontisto,
  FontAwesome6,
} from "@expo/vector-icons";

const TableDetail = ({ navigation, route }) => {
  const { table_id } = route.params;
  const [data, setData] = useState(null);

  const fetchTableData = useCallback(async () => {
    try {
      const tableData = await getDocumentById("tables", table_id);
      setData(tableData);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  }, [table_id]);

  useEffect(() => {
    const reload = navigation.addListener("focus", () => {
      fetchTableData();
    });
    return reload;
  }, [navigation, fetchTableData]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handlePayment = async () => {
    try {
      await addCustomer(data.customer.name, data.customer.phone);
      await addOrder(
        table_id,
        data.date,
        data.total,
        data.guests,
        data.customer,
        data.items
      );
      await deleteTableData(table_id);
      alert("Hóa đơn này đã được chuyển sang trạng thái chờ thanh toán!");
      navigation.navigate("comment");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleAdd = () => {
    navigation.navigate("menu_order", { table_id: table_id });
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString(); // Chuyển đổi timestamp sang ngày
    return formattedDate;
  };
  

  return (
    <ScrollView style={styles.container}>
      <HomeHeadNav navigation={navigation} title="CHI TIẾT BÀN" user="staff" />
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
            <Text style={styles.tableText}>{formatDateTime(data.timestamp)}</Text>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.add} onPress={handleAdd}>
        <FontAwesome6 name="add" style={styles.icon} />
        <Text style={styles.tableText}>Add</Text>
      </TouchableOpacity>

      {data && (
        <View style={styles.table}>
          <TableWrapper style={styles.tableWrapper}>
            <Table>
              <Row
                style={styles.tableTitle}
                textStyle={styles.headerText}
                data={[
                  <View style={styles.headerItemContainer}>
                    <Text style={styles.headerText}>{"MÓN ĂN"}</Text>
                    <Text style={styles.headerText}>{"SỐ LƯỢNG"}</Text>
                  </View>,
                ]}
              />

              {data.items.map((item) => (
                <Row
                  key={item.id}
                  data={[
                    <View style={styles.rowContainer}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.itemImage}
                      />
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                      </View>
                      <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    </View>,
                  ]}
                  style={styles.row}
                  textStyle={styles.rowText}
                />
              ))}
            </Table>
          </TableWrapper>
        </View>
      )}

      {data && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}> TỔNG: </Text>
          <Text style={styles.total}> {data.total} </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  tableWrapper: {
    justifyContent: "center",
  },
  tableTitle: {
    backgroundColor: colors.text1,
    borderRadius: 7,
    height: 40,
  },
  headerItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 21,
    color: "white",
  },
  row: {
    backgroundColor: "#EDE4C8", //#EDE4C8
    borderRadius: 7,
    marginTop: 10,
    borderRadius: 10,
    elevation: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#EE9C37",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 25,
  },
  itemInfo: {
    flex: 2,
    paddingLeft: 20,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 5,
  },
  itemName: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 22,
  },
  itemPrice: {
    color: "gray",
    fontSize: 21,
  },
  itemQuantity: {
    textAlign: "right",
    fontSize: 22,
    fontWeight: "bold",
  },
  totalContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "gray",
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  totalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    width: "70%",
  },
  total: {
    fontSize: 25,
  },
  add: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 30,
    marginTop: 10,
  },
  icon: {
    marginLeft: 5,
    color: "#fff",
    backgroundColor: "#EE9C37",
    fontSize: 17,
    padding: 2,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 18,
    color: "#EE9C37",
  },
});

export default TableDetail;
