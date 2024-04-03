import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { firebase } from '../../Firebase/firebase'
import * as ImagePicker from 'expo-image-picker';

const fetchMenuData = async () => {
    try {
        const customOrder = [
            'Lẩu',
            'Thịt',
            'Hải sản',
            'Viên thả lẩu',
            'Rau & Nấm',
            'Đậu',
            'Mỳ',
            'Món chiên',
            'Đồ uống',
        ];

        const snapshot = await firebase.firestore().collection('menu').get();
        const updateData = await Promise.all(snapshot.docs.map(async categoryDoc => {
            const category = categoryDoc.id;
            const itemsSnap = await categoryDoc.ref.collection('items').get();
            const items = itemsSnap.docs.map(itemDoc => {
                const itemName = itemDoc.id;
                const itemData = itemDoc.data();
                return { name: itemName, data: itemData };
            });

            return { category, items };
        }));

        updateData.sort((a, b) => {
            const fallbackIndex = customOrder.length;

            const adjustedIndexA = customOrder.indexOf(a.category) !== -1 ? customOrder.indexOf(a.category) : fallbackIndex;
            const adjustedIndexB = customOrder.indexOf(b.category) !== -1 ? customOrder.indexOf(b.category) : fallbackIndex;

            return adjustedIndexA - adjustedIndexB;
        });


        return updateData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const fetchStaffData = async () => {
    try {
        const staff = await firebase.firestore().collection('staff').get();
        const staffData = staff.docs.map(staffDoc => {
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
        const customer = await firebase.firestore().collection('customer').get();
        const customerData = customer.docs.map(cusDoc => {
            const itemData = cusDoc.data();
            return { ...itemData };
        })
        return customerData;
    } catch (err) {
        console.log("Error when fetching data customer:", err);
    }
}
const fetchReportData = async () => {
    try {
        const report = await firebase.firestore().collection('report').get();
        const reportList = [];

        report.forEach((doc) => {
            const data = doc.data();
            const formattedDate = new Date(data.date.seconds * 1000).toLocaleDateString();

            reportList.push({ ...data, date: formattedDate });
        })
        return reportList;

    } catch (err) {
        console.log("Error when fetching data report:", err);
        return [];
    }
}

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
}

const addDish = async (type, name, status, price, image) => {
    try {
        const priceNumber = parseFloat(price);

        const imageUrl = await upImgStogare(image, name);

        await firebase.firestore().collection('menu').doc(type).collection('items').doc(name).set({
            name: name,
            price: priceNumber,
            status: status,
            image: imageUrl
        });
        return imageUrl;
    } catch (error) {
        console.error("Error saving data:", error);
        return null;
    }
};

const addStaff = async (role, name, age, gender, email, phone) => {
    try {
        await firebase.firestore().collection('staff').add({
            role: role,
            name: name,
            age: age,
            gender: gender,
            email: email,
            phone: phone
        });
        console.log("Staff added successfully!");
        return true;
    } catch (error) {
        console.error("Error adding staff:", error);
        return false;
    }
};

const addReport = async (title, sender, content) => {
    try {
        const currentDate = new Date();
        const formattedDate = firebase.firestore.Timestamp.fromDate(currentDate);


        await firebase.firestore().collection('report').add({
            title: title,
            sender: sender,
            date: formattedDate,
            content: content,
        })

        return true;
    } catch (err) {
        console.log("Err add report: ", err);
        return false;
    }
}

const editStaffInfo = async (staff, name, role, age, gender, email, phone) => {
    try {
        const staffRef = firebase.firestore().collection('staff');
        const querySnapshot = await staffRef.where('email', '==', staff.email).get();

        if (querySnapshot.empty) {
            console.log('No matching documents.');
            return false;
        }

        querySnapshot.forEach(async (doc) => {
            await doc.ref.update({
                name: name,
                age: age,
                gender: gender,
                role: role,
                email: email,
                phone: phone
            });
            console.log('Edit info staff successfully:', doc.id);
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
        await firebase.firestore().collection('menu').doc(type).collection('items').doc(name).update({
            name: name,
            price: priceNumber,
            status: status,
            image: imageUrl
        })

        return imageUrl;
    } catch (error) {
        console.error("Error saving data:", error);
        return null;
    }
};

const deleteDoc = async (type, name) => {
    try {
        await firebase.firestore().collection('menu').doc(type).collection('items').doc(name).delete({})
    } catch (error) {
        console.error('Error deleting document: ', error);
    }
};


export {
    getImage, upImgStogare, addDish, addStaff, addReport, editStaffInfo, editDoc, deleteDoc,
    fetchMenuData, fetchStaffData, fetchCustomerData, fetchReportData
}