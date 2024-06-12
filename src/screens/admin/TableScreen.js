import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, FlatList, } from "react-native";
import { colors, veg, nonveg } from "../../globals/style.js";
import { FontAwesome6 } from "@expo/vector-icons";
import HomeHeadNav from "../../components/Header.js";
import { fetchTableData } from "../../utils/firestore.js";

const AdminTableScreen = ({ navigation }) => {
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

  const editTables = async () => {
    try {
      navigation.navigate("edit_tables", tableList);
    } catch (error) {
      console.error("Error navigating to : EditTables", error);
    }
  };

  const renderTable = ({ item }) => {
    return (
      <Image
        source={
          item.state === "unavailable"
            ? null
            : { uri: item.img }
        }
        style={styles.imageTable}
      />
    );
  };

  return (
    reloadTable(),
    <View style={styles.container}>
      <HomeHeadNav navigation={navigation} title="QUẢN LÝ BÀN" user="admin" />
      <TouchableOpacity style={styles.edit} onPress={editTables}>
        <FontAwesome6 name="edit" style={styles.icon} />
        <Text style={styles.textStyle}>Sửa</Text>
      </TouchableOpacity>
      <FlatList
        data={tableList}
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
    backgroundColor: "#fff",
    flex: 1,
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

export default AdminTableScreen;
