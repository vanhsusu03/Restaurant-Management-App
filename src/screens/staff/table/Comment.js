import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import HomeHeadNav from "../../../components/Header.js";
import {
  getDocumentById,
  addCustomer,
  addOrder,
  deleteTableData,
} from "../../../utils/firestore";
const Comment = ({ navigation, route }) => {
  const [content, onContentChange] = useState();
  const [sender, onSenderChange] = useState();
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
    navigation.navigate("table_staff");
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
        data.items,
        content,
      );
      await deleteTableData(table_id);
      alert("Hóa đơn này đã được chuyển sang trạng thái chờ thanh toán!");
      navigation.navigate("table_staff");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <Animated.View style={[styles.container]}>
        <HomeHeadNav navigation={navigation} title="NHẬN XÉT" user="staff" />
        <ScrollView>
          {data && (
            <View>
              <Text style={styles.header}>Người viết:</Text>
              <Text style={styles.input}>{data.customer.name}</Text>

              <Text style={styles.header}>Ngày viết:</Text>
              <Text style={styles.input}>{data.date}</Text>

              <Text style={styles.header}>Nội dung:</Text>
              <TextInput
                style={[styles.input, { height: 150 }]} // Adjust height for multiline input
                multiline={true} // Allow multiline input
                onChangeText={onContentChange}
                value={content}
                onFocus={() => {}}
              ></TextInput>
            </View>
          )}

          <Text style={styles.header}>Đánh giá</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePayment}>
              <Text style={styles.buttonText}>Gửi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: "#EE9C37",
    paddingHorizontal: 40,
    paddingVertical: 10,
    color: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
    marginTop: 15,
    marginHorizontal: 30,
  },
  icon: {
    marginLeft: 5,
    color: "#fff",
    backgroundColor: "#EE9C37",
    fontSize: 17,
    padding: 2,
    marginRight: 8,
  },
  reportItem: {
    padding: 5,
    marginLeft: 20,
  },
  reportContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reportIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  reportTitleContainer: {
    marginHorizontal: 10,
    flex: 2.5,
  },
  reportDateContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  reportDate: {
    fontSize: 16,
    color: "#666",
  },
  input: {
    borderColor: "#EE9C37",
    borderWidth: 2,
    marginHorizontal: 30,
    borderRadius: 10,
    paddingLeft: 20,
    paddingVertical: 5,
    fontSize: 16,
    minHeight: 45,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    paddingTop: 45,
  },
  button: {
    backgroundColor: "#EE9C37",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  alertContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "lightblue",
  },
});

export default Comment;
