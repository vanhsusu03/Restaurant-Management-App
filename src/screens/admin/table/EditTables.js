import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import HomeHeadNav from "../../../components/Header.js";
import { FontAwesome6 } from "@expo/vector-icons";
import { firebase } from "../../../../Firebase/firebase";
import { updateTables } from "../../../utils/firestore.js";

const EditTables = ({ navigation, route }) => {
  const tableList = route.params;
  const [updatedTableList, setUpdateTableList] = useState(tableList);
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

  const fixTable = (item) => {
    Alert.alert(
      "Xác nhận",
      "Bạn muốn xoá bàn này?",
      [
        {
          text: "Không",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        {
          text: "Có",
          // onPress: () => {
          // item.state = "unavailable";
          // setTableList([...tableList]); // Cập nhật mảng tableList với bản sao đã thay đổi
          // },
          onPress: () => {
            item.state = "unavailable";
            setUpdateTableList([...updatedTableList]); // Cập nhật tableList với bản sao mới đã thay đổi
          },
        },
      ],
      { alertContainerStyle: styles.alertContainer, cancelable: false }
    );
  };
  const addTable = async (item) => {
    Alert.alert(
      "Xác nhận",
      "Bạn muốn thêm bàn này?",
      [
        {
          text: "Không",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        {
          text: "Có",
          onPress: async () => {
            item.state = "available";
            await firebase.firestore().collection("tables").doc(item.id).update({ preorder: [] });
            setUpdateTableList([...updatedTableList]); // Cập nhật tableList với bản sao mới đã thay đổi
          },
        },
      ],
      { alertContainerStyle: styles.alertContainer, cancelable: false }
    );
  };
  const renderTable = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.state == "unavailable") {
            addTable(item);
          } else {
            fixTable(item);
          }
        }}
      >
        <Image
          source={
            item.state == "unavailable"
              ? require("../../../../assets/TableList/TableAdd.png")
              : images[item.id]
          }
          style={styles.imageTable}
        />
      </TouchableOpacity>
    );
  };
  const tableScreen = async () => {
    try {
      navigation.navigate("table_admin");
    } catch (error) {
      console.error("Error navigating to :TableScreen", error);
    }
  };
  return (
    <View style={styles.container}>
      <HomeHeadNav navigation={navigation} title="CHỈNH SỬA BÀN" user="admin" />
      <TouchableOpacity
        style={styles.save}
        onPress={() => {
          updateTables(updatedTableList);
          try {
            navigation.navigate("table_admin");
          } catch (error) {
            console.error("Error navigating to :TableScreen", error);
          }
        }}
      >
        <FontAwesome6 name="save" style={styles.icon} />
        <Text style={styles.textStyle}>Lưu</Text>
      </TouchableOpacity>
      <FlatList
        data={updatedTableList}
        renderItem={renderTable}
        keyExtractor={(_, index) => index.toString()}
        horizontal={false} // Không hiển thị theo chiều ngang
        numColumns={3} // Số lượng cột trong mỗi hàng
        contentContainerStyle={styles.flatListContent} // Kiểm soát phần tử container của FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tables: {
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: "#EE9C37",
    paddingHorizontal: 40,
    paddingVertical: 10,
    color: "#fff",
  },
  save: {
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
  list: {
    marginLeft: 5,
    color: "#EE9C37",
    fontSize: 17,
    padding: 2,
    marginRight: 8,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  alertContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "lightblue",
  },
  textStyle: {
    fontSize: 18,
    color: "#42c2f5",
  },
  row: {
    flexDirection: "row",
  },
  imageTable: {
    width: 90,
    height: 90,
    margin: 15,
  },
});

export default EditTables;
