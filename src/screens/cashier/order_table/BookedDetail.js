import React, { useState, useCallback, useEffect } from "react";
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
  cancelPreorderBooking
} from "../../../utils/firestore";
import { firebase } from "../../../../Firebase/firebase";

const BookedDetailScreen = ({ navigation, route }) => {
  const table_id = route.params.table_id;
  const preorderDetail = route.params.preorder;
        
  const handleCancel = () => {
            navigation.goBack();
        };
  const handleCancelPreorderBooking = async () => {
        await cancelPreorderBooking(table_id, preorderDetail)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <HomeHeadNav navigation={navigation} title="CHI TIẾT ĐẶT TRƯỚC BÀN" user="cashier" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
           <Text style={styles.tableId}>Bàn số {table_id} </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tên khách hàng:</Text>
          <Text
            style={styles.input}
          >{preorderDetail.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text
                      style={styles.input}
                    >{preorderDetail.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ngày đặt bàn:</Text>
          <Text
                      style={styles.input}
                    >{preorderDetail.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian đặt:</Text>
          <Text
                      style={styles.input}
                    >{preorderDetail.time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Số khách:</Text>
          <Text
                      style={styles.input}
                    >{preorderDetail.guests}</Text>
        </View>
        <Button
                  title="Hủy đặt bàn"
                  color="#FF5733"
                  onPress={() => {
                    handleCancelPreorderBooking();
                    Alert.alert(
                                  "Thông báo",
                                  "Hủy đặt trước bàn thành công"
                                )
                                try {
                                  navigation.navigate("table_cashier");
                                } catch (error) {
                                  console.error("Error navigating to :TableScreen", error);
                                }
                  }
                    }
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
      marginTop: 5,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
    tableId: {
      fontSize: 30
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
    color: (170,93,89)
  },
  input: {
    flex: 1,
    fontSize: 20,
    padding: 10,
  },
});

export default BookedDetailScreen;
