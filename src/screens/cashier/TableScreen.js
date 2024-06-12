import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { colors, veg, nonveg } from "../../globals/style.js";
import HomeHeadNav from "../../components/Header.js";
import { fetchTableData } from "../../utils/firestore.js";
import { firebase } from "../../../Firebase/firebase";

const CashierTableScreen = ({ navigation }) => {
  const [tableList, setTableList] = useState([]);
  const reloadTable = useCallback(async () => {
    try {
      const newData = await fetchTableData();
      setTableList(newData);
    } catch (error) {
      console.error("Error reloading data:", error);
    }
  }, []);

  useEffect(() => {
    const reload = navigation.addListener("focus", () => {
      reloadTable();
    });

    return reload;
  }, [navigation, reloadTable]);

  const renderTable = ({ item }) => {
    const ID = item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          switch (item.state) {
            case "unavailable":
              return;
            case "available":
              return navigation.navigate("preorder_table", {table_id: ID, img: item.img });
            case "booked":
              return navigation.navigate("add_preorder", { table_id: ID, img: item.img });
            case "in use":
            return navigation.navigate("add_preorder", {table_id: ID});
          }
//          navigation.navigate("table_detail", { table_id: ID });
        }}
      >
        <Image
          source={(() => {
            switch (item.state) {
              case "unavailable":
                return null;
              case "available":
                return { uri: item.img };
              case "booked":
                return { uri: item.imgBooked };
              case "in use":
                return { uri: item.imgUsing };
            }
          })()}
          style={styles.imageTable}
        />
      </TouchableOpacity>
    );
  };

  return (
    reloadTable(),
    (
      <View>
        <HomeHeadNav navigation={navigation} title="QUẢN LÝ BÀN" user="cashier" />
        <View style={styles.container}>
          <View style={[styles.square, { backgroundColor: "grey" }]}></View>
          <Text style={styles.text}>Chưa đặt</Text>
          <View style={[styles.square, { backgroundColor: "red" }]}></View>
          <Text style={styles.text}>Đã đặt</Text>
          <View style={[styles.square, { backgroundColor: "green" }]}></View>
          <Text style={styles.text}>Đang dùng</Text>
        </View>
        <FlatList
          data={tableList}
          renderItem={renderTable}
          keyExtractor={(_, index) => index.toString()}
          horizontal={false} // Không hiển thị theo chiều ngang
          numColumns={3} // Số lượng cột trong mỗi hàng
          contentContainerStyle={styles.flatListContent} // Kiểm soát phần tử container của FlatList
        />
      </View>
    )
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Sắp xếp các phần tử con theo hàng ngang
    alignItems: "center", // Căn giữa các phần tử theo chiều dọc
    padding: 20,
  },
  square: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginRight: 5, // Khoảng cách giữa các ô vuông
    borderRadius: 5,
  },
  text: {
    color: "black", // Màu chữ
    marginRight: 35,
  },
  tables: {
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: "#EE9C37",
    paddingHorizontal: 40,
    paddingVertical: 10,
    color: "#fff",
  },
  edit: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 30,
    marginTop: 10,
  },
  icon: {
    marginLeft: 5,
    color: "#fff",
    backgroundColor: "#42c2f5",
    fontSize: 17,
    padding: 2,
    marginRight: 8,
  },

  textStyle: {
    fontSize: 18,
    color: "#42c2f5",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageTable: {
    width: 90,
    height: 90,
    margin: 15,
  },
});

export default CashierTableScreen;
