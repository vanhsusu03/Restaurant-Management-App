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
  TouchableOpacity
} from "react-native";
import { FlatList } from 'react-native';
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import HomeHeadNav from "../../../components/Header.js";
import {
  getDocumentById,
  addCustomer,
  addOrder,
  deleteTableData,
  addInforBooking,
  fetchPreOrderData
} from "../../../utils/firestore";
import { firebase } from "../../../../Firebase/firebase";

const BookedTableScreen = ({ navigation, route }) => {
    const table_id = route.params.table_id;
    const [preorderList, setPreOrderList] = useState("");

    const statusTable = route.params.status;

    const reloadPreOrder = useCallback(async () => {
            try {
                const newData = await fetchPreOrderData(table_id);
                setPreOrderList(newData);

            } catch (error) {
                console.error("Error reloading data:", error);
            }
        }, []);


        useEffect(() => {
            const reload = navigation.addListener('focus', () => {
                reloadPreOrder();
            });

            return reload;
        }, [navigation, reloadPreOrder]);

    const handleCancel = () => {
              navigation.goBack();
          };

      const renderPreOrder = ({ item }) => {

              return (
                  <TouchableOpacity
                      style={styles.preorderItem}
                      onPress={() => navigation.navigate('table_booked_detail', { table_id: table_id, preorder: item  })}
                  >
                      <View style={styles.preorderContainer}>
                          <FontAwesome5 name="file-alt" style={styles.preorderIcon} />
                          <View style={styles.preorderCusNameContainer}>
                              <Text style={styles.preorderCusName}>{item.name}...</Text>
                          </View>
                          <View style={styles.preorderDateContainer}>
                              <Text style={styles.preorderDate}>{item.date}, {item.time}</Text>
                          </View>
                          <View style={styles.preorderGuestContainer}>
                            <Text style={styles.preorderDate}>{item.guests}</Text>
                          </View>
                      </View>
                  </TouchableOpacity>
              )
          }
        const handleShowOptions = () => {
            try {
            if(statusTable === 'booked') {
                navigation.navigate("table_booking", {table_id: table_id});
            } else if (statusTable === 'in use') {
                navigation.navigate("table_detail", {table_id: table_id});
            }

        } catch(err) {
            console.error('Error navigating to AddPreOrder:', err);
          }
        }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <HomeHeadNav navigation={navigation} title="DANH SÁCH KHÁCH ĐÃ ĐẶT" user="staff" />
      <TouchableOpacity style={styles.addButton} onPress={handleShowOptions} >
               <FontAwesome6 name="add" style={styles.icon} />
               <Text style={styles.addButtonText}>
               {statusTable === 'booked' ? 'Sử dụng bàn' : statusTable === 'in use' ? 'Chi tiết bàn' : "NaN"}
               </Text>
            </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Text style={styles.tableId}>Bàn số {table_id} </Text>
        </View>
        <View>
                        <FlatList
                            data={preorderList}
                            renderItem={renderPreOrder}
                            keyExtractor={(_, index) => index.toString()}
                        />
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.buttonContainer}>
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
    marginTop: 25,
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
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  preorderItem: {
          padding: 5,
          marginLeft: 20,
          marginTop: 10,
      },
      preorderContainer: {
          flexDirection: 'row',
          alignItems: 'center',
      },
      preorderIcon: {
          fontSize: 24,
          marginRight: 10,
      },
      preorderCusNameContainer: {
          marginHorizontal: 10,
          flex: 5,
      },
      preorderDateContainer: {
          marginHorizontal: 10,
          flex: 7,
      },
      preorderGuestContainer: {
      marginHorizontal: 10,
      flex: 2,
            },
      preorderCusName: {
          fontSize: 18,
          fontWeight: 'bold',
      },
      preorderDate: {
          fontSize: 16,
          color: '#666',
      },
      addButton: {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: 30,
              marginTop: 20,
              marginBottom: 20
          },
          addButtonText: {
              fontSize: 18,
              color: '#EE9C37'
          },
          icon: {
                  marginLeft: 5,
                  color: '#fff',
                  backgroundColor: '#EE9C37',
                  fontSize: 17,
                  padding: 2,
                  marginRight: 8
              },
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

export default BookedTableScreen;
