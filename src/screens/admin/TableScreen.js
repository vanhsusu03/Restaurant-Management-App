import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { colors, veg, nonveg } from "../../globals/style.js";
import { FontAwesome6 } from "@expo/vector-icons";
import HomeHeadNav from '../../components/Header.js'

const AdminTableScreen = ({ navigation }) => {
  const editTables = async () => {
    try {
      navigation.navigate("edit_tables");
    } catch (error) {
      console.error("Error navigating to : EditTables", error);
    }
  };
  return (
    <View style={styles.container}>
     <HomeHeadNav navigation={navigation} title='QUẢN LÝ BÀN' user='admin'/>
      <Text style={styles.tables}>Bàn</Text>

      <TouchableOpacity style={styles.edit} onPress={editTables}>
        <FontAwesome6 name="edit" style={styles.icon} />
        <Text style={styles.text}>Sửa</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        {/* Row 1 */}
        <Image
          source={require("../../../assets/TableList/Table1.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table2.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table3.png")}
          style={styles.imageTable}
        />
      </View>
      <View style={styles.row}>
        {/* Row 2 */}
        <Image
          source={require("../../../assets/TableList/Table4.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table5.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table6.png")}
          style={styles.imageTable}
        />
      </View>
      <View style={styles.row}>
        {/* Row 3 */}
        <Image
          source={require("../../../assets/TableList/Table7.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table8.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table9.png")}
          style={styles.imageTable}
        />
      </View>
      <View style={styles.row}>
        {/* Row 4 */}
        <Image
          source={require("../../../assets/TableList/Table10.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table11.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table12.png")}
          style={styles.imageTable}
        />
      </View>
      <View style={styles.row}>
        {/* Row 5 */}
        <Image
          source={require("../../../assets/TableList/Table13.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table14.png")}
          style={styles.imageTable}
        />
        <Image
          source={require("../../../assets/TableList/Table15.png")}
          style={styles.imageTable}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
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
  list: {
    marginLeft: 5,
    color: "#EE9C37",
    fontSize: 17,
    padding: 2,
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    color: "#42c2f5",
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
  button: {
    marginHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#EE9C37",
    width: 60,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
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

export default AdminTableScreen;
