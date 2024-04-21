import React, { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { firebase } from "../../Firebase/firebase";
import * as ImagePicker from "expo-image-picker";

const fetchMenuData = async () => {
  try {
    const customOrder = [
      "Lẩu",
      "Thịt",
      "Hải sản",
      "Viên thả lẩu",
      "Rau & Nấm",
      "Đậu",
      "Mỳ",
      "Món chiên",
      "Đồ uống",
    ];

    const snapshot = await firebase.firestore().collection("menu").get();
    const updateData = await Promise.all(
      snapshot.docs.map(async (categoryDoc) => {
        const category = categoryDoc.id;
        const itemsSnap = await categoryDoc.ref.collection("items").get();
        const items = itemsSnap.docs.map((itemDoc) => {
          const itemName = itemDoc.id;
          const itemData = itemDoc.data();
          return { name: itemName, data: itemData };
        });

        const categoryImage = await fetchCategoryImages([category]);

        return { category, items, image: categoryImage[category] };
      })
    );

    updateData.sort((a, b) => {
      const fallbackIndex = customOrder.length;

      const adjustedIndexA =
        customOrder.indexOf(a.category) !== -1
          ? customOrder.indexOf(a.category)
          : fallbackIndex;
      const adjustedIndexB =
        customOrder.indexOf(b.category) !== -1
          ? customOrder.indexOf(b.category)
          : fallbackIndex;

      return adjustedIndexA - adjustedIndexB;
    });

    return updateData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchStaffData = async () => {
  try {
    const staff = await firebase.firestore().collection("staff").get();
    const staffData = staff.docs.map((staffDoc) => {
      const itemData = staffDoc.data();
      return { ...itemData };
    });

    return staffData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchCustomerData = async () => {
  try {
    const customer = await firebase.firestore().collection("customer").get();
    const customerData = customer.docs.map((cusDoc) => {
      const itemData = cusDoc.data();
      return { ...itemData };
    });
    return customerData;
  } catch (err) {
    console.log("Error when fetching data customer:", err);
  }
};

const getDocumentById = async (collectionName, documentId) => {
  try {
    const documentRef = firebase
      .firestore()
      .collection(collectionName)
      .doc(documentId);
    const documentSnapshot = await documentRef.get();

    if (documentSnapshot.exists) {
      console.log("Getting document successfully!");
      return { id: documentSnapshot.id, ...documentSnapshot.data() };
    } else {
      console.log("Document not found");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

const fetchReportData = async () => {
  try {
    const report = await firebase.firestore().collection("report").get();
    const reportList = [];

    report.forEach((doc) => {
      const data = doc.data();
      const formattedDate = new Date(
        data.date.seconds * 1000
      ).toLocaleDateString();

      reportList.push({ ...data, date: formattedDate });
    });
    return reportList;
  } catch (err) {
    console.log("Error when fetching data report:", err);
    return [];
  }
};

const fetchTableData = async () => {
  try {
    const table = await firebase.firestore().collection("tables").get();
    const tablesList = table.docs.map((tableDoc) => {
      const itemData = tableDoc.data();
      return { ...itemData };
    });
    return tablesList;
  } catch (err) {
    console.log("Error when fetching data table:", err);
    return [];
  }
};

const fetchPendingOrderData = async () => {
  try {
      const ordersSnapshot = await firebase.firestore().collection('order').where('state', '==', 'Chờ thanh toán').get();
      const pendingOrders = ordersSnapshot.docs.map(orderDoc => {
          const orderData = orderDoc.data();
          return {  id: orderDoc.id, ...orderData }; // Đảm bảo cả id của tài liệu được bao gồm
      });
      console.log("Lấy dữ liệu đơn hàng thành công!");
      return pendingOrders;
  } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
  }
};

const fetchCategoryData = async (category) => {
  try {
    const categoryData = await firebase.firestore().collection("menu").doc(category).collection("items").get();
    
    const items = [];
  
    categoryData.forEach((itemDoc) => {
      const itemName = itemDoc.id;
      const itemData = itemDoc.data();
      items.push({name: itemName, data: itemData});
    });

    return items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchCategoryImages = async (category) => {
  const storageRef = firebase.storage().ref();
  const categoryImages = {};
  try {
    const imageURL = await storageRef.child(`icon/${category}.png`).getDownloadURL();
    categoryImages[category] = imageURL;
} catch (error) {
    console.error(`Error fetching image for category ${category}:`, error);
}
  return categoryImages;
};


const getImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  } else {
    return "";
  }
};

const upImgStogare = async (image, name) => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();
    const storage = firebase.storage().ref();
    const imageRef = storage.child(`image/${name}`);
    await imageRef.put(blob);

    const imageUrl = await imageRef.getDownloadURL();
    return imageUrl;
  } catch (error) {
    console.log("Error up image!");
    return null;
  }
};

const addDish = async (type, name, status, price, image) => {
  try {
    const priceNumber = parseFloat(price);

    const imageUrl = await upImgStogare(image, name);

    await firebase
      .firestore()
      .collection("menu")
      .doc(type)
      .collection("items")
      .doc(name)
      .set({
        name: name,
        price: priceNumber,
        status: status,
        image: imageUrl,
      });
    return imageUrl;
  } catch (error) {
    console.error("Error saving data:", error);
    return null;
  }
};

const addStaff = async (role, name, age, gender, email, phone) => {
  try {
    await firebase.firestore().collection("staff").add({
      role: role,
      name: name,
      age: age,
      gender: gender,
      email: email,
      phone: phone,
    });
    console.log("Staff added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding staff:", error);
    return false;
  }
};

const addCustomer = async (name, phone) => {
  try {
    await firebase.firestore().collection("customer").add({
      name: name,
      phone: phone,
    });
    console.log("Customer added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding customer:", error);
    return false;
  }
};

const addOrder = async (date, total, guests, customer, items) => {
  try {
    await firebase.firestore().collection("order").add({
      date: date,
      total: total,
      guests: guests,
      customer: customer,
      items: items,
      state: "Chờ thanh toán",
    });
    console.log("Order added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding order:", error);
    return false;
  }
};

const addOrderByTable = async (table_id, newItems) => {
  try {
      const tableRef = firebase.firestore().collection('tables').doc(table_id);
      const tableSnapshot = await tableRef.get();
      const existingItems = tableSnapshot.exists ? tableSnapshot.data().items : [];
      console.log(newItems)

      newItems.forEach((newItem) => {
          const existingItemIndex = existingItems.findIndex(item => item.name === newItem.name);
          if (existingItemIndex !== -1) {
              existingItems[existingItemIndex].quantity += newItem.quantity;
          } else if (newItem.quantity !== 0) {
              existingItems.push(newItem);
          }
      });

      const total = existingItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

      await tableRef.set(
          {
              items: existingItems,
              total: total
          },
          { merge: true }
      );

      console.log("Order added successfully!");
      return true;
  } catch (error) {
      console.error("Error adding order:", error);
      return false;
  }
};

const addReport = async (title, sender, content) => {
  try {
    const currentDate = new Date();
    const formattedDate = firebase.firestore.Timestamp.fromDate(currentDate);

    await firebase.firestore().collection("report").add({
      title: title,
      sender: sender,
      date: formattedDate,
      content: content,
    });

    return true;
  } catch (err) {
    console.log("Err add report: ", err);
    return false;
  }
};

// const addInforBooking = async (
//   id,
//   customerName,
//   phoneNumber,
//   bookingDate,
//   bookingTime,
//   numberOfGuests
// ) => {
//   const tableData = await getDocumentById("tables", id);
//   tableData.customer.name = customerName;
//   tableData.customer.phone = phoneNumber;
//   tableData.date = bookingDate;
//   tableData.time = bookingTime;
//   tableData.guests = numberOfGuests;
//   tableData.state = "booked";
//   await firebase.firestore().collection("tables").doc(id).update(tableData);
// };
const addInforBooking = async (
  id,
  customerName,
  phoneNumber,
  bookingDate,
  bookingTime,
  numberOfGuests
) => {
  try {
    // Lấy dữ liệu bàn từ Firestore
    const tableRef = firebase.firestore().collection("tables").doc(id);
    const tableSnapshot = await tableRef.get();
    const tableData = tableSnapshot.data();

    // Tạo một bản sao của dữ liệu bàn và thay đổi các giá trị
    const updatedTableData = {
      ...tableData,
      customer: {
        name: customerName,
        phone: phoneNumber,
      },
      date: bookingDate,
      time: bookingTime,
      guests: numberOfGuests,
      state: "booked",
    };

    // Cập nhật lại dữ liệu bàn trong Firestore
    await tableRef.update(updatedTableData);
    console.log("Thông tin đặt bàn đã được cập nhật thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin đặt bàn:", error);
  }
};

const editStaffInfo = async (staff, name, role, age, gender, email, phone) => {
  try {
    const staffRef = firebase.firestore().collection("staff");
    const querySnapshot = await staffRef
      .where("email", "==", staff.email)
      .get();

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return false;
    }

    querySnapshot.forEach(async (doc) => {
      await doc.ref.update({
        name: name,
        age: age,
        gender: gender,
        role: role,
        email: email,
        phone: phone,
      });
      console.log("Edit info staff successfully:", doc.id);
    });

    return true;
  } catch (err) {
    console.error("Error edit staff info:", err);
    return false;
  }
};

const editDoc = async (type, name, status, price, image) => {
  try {
    const priceNumber = parseFloat(price);
    const imageUrl = await upImgStogare(image, name);
    await firebase
      .firestore()
      .collection("menu")
      .doc(type)
      .collection("items")
      .doc(name)
      .update({
        name: name,
        price: priceNumber,
        status: status,
        image: imageUrl,
      });

    return imageUrl;
  } catch (error) {
    console.error("Error saving data:", error);
    return null;
  }
};

const deleteDoc = async (type, name) => {
  try {
    await firebase
      .firestore()
      .collection("menu")
      .doc(type)
      .collection("items")
      .doc(name)
      .delete({});
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

const updateTables = async (updatedTableList) => {
  try {
    const table = await firebase.firestore().collection("tables").get();
    const firestoreData = table.docs.map((doc) => doc.data());

    // So sánh dữ liệu trên Firestore với dữ liệu mới
    updatedTableList.forEach(async (updatedItem) => {
      const existingItem = firestoreData.find(
        (item) => item.id === updatedItem.id
      );
      if (existingItem && existingItem.state !== updatedItem.state) {
        // Nếu ID trùng khớp và trạng thái khác nhau, cập nhật dữ liệu trên Firestore
        await firebase
          .firestore()
          .collection("tables")
          .doc(existingItem.id)
          .update(updatedItem);
      }
    });
  } catch (error) {
    console.error("Error saving data of table:", error);
  }
};
const deleteTableData = async (tableId) => {
  try {
    const db = firebase.firestore();

    // Xóa dữ liệu về customer và items
    // Đặt trường customer về một map rỗng
    await db
      .collection("tables")
      .doc(tableId)
      .update({
        customer: { name: "", phone: "" },
        items: [],
      });

    // Cập nhật trạng thái và total
    await db.collection("tables").doc(tableId).update({
      state: "available",
      total: 0,
      guests: 0,
    });
    console.log(
      "Dữ liệu đã được xóa và trạng thái đã được cập nhật thành công."
    );
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu và cập nhật trạng thái:", error);
  }
};

const cancelBooking = async (table_id) => {
  try {
    const tableRef = firebase.firestore().collection("tables").doc(table_id);
    const updateData = {
      customer: {
        name: "", // Xóa tên khách hàng
        phone: "", // Xóa số điện thoại khách hàng
      },
      date: "", // Đặt ngày đặt bàn về giá trị rỗng
      time: "", // Đặt thời gian đặt bàn về giá trị rỗng
      guests: 0, // Đặt số lượng khách về 0 hoặc giá trị mặc định
      state: "available", // Đặt trạng thái về "available" hoặc giá trị mặc định
    };

    await tableRef.update(updateData);
    console.log("Đặt bàn đã được huỷ thành công!");
  } catch (error) {
    console.error("Lỗi khi huỷ đặt bàn:", error);
  };
}


export {
  getImage,
  upImgStogare,
  addDish,
  addStaff,
  addReport,
  editStaffInfo,
  editDoc,
  deleteDoc,
  fetchMenuData,
  fetchStaffData,
  fetchCustomerData,
  fetchReportData,
  getDocumentById,
  addOrder,
  addCustomer,
  deleteTableData,
  fetchTableData,
  updateTables,
  addInforBooking,
  cancelBooking,
  fetchPendingOrderData,
  fetchCategoryData,
  fetchCategoryImages,
  addOrderByTable
};