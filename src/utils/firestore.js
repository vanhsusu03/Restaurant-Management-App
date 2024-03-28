import React, { useState, useEffect, useCallback} from 'react';
import { Alert } from 'react-native';
import {firebase} from '../../Firebase/firebase'
import * as ImagePicker from 'expo-image-picker';

const fetchData = async () => {
    try {
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
        return updateData;
        // setData(updateData);
        // setType(updateData.map(item => item.category));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
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
}

const addDoc = async (type, name, cost, price, description, image) => {
    try {
        const costNumber = parseFloat(cost);
        const priceNumber = parseFloat(price);

        const imageUrl = await upImgStogare(image, name);

        await firebase.firestore().collection('menu').doc(type).collection('items').doc(name).set({
            cost: costNumber,
            price: priceNumber,
            description: description,
            image: imageUrl
        });
        return imageUrl;
    } catch (error) {
        console.error("Error saving data:", error);
        return null;
    }
};

const editDoc = async (type,  name, cost, price, description, image) => {
    try {
        const imageUrl = await upImgStogare(image, name);
        await firebase.firestore().collection('menu').doc(type).collection('items').doc(name).update({
            cost: cost,
            price: price,
            description: description,
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


export {getImage, upImgStogare, addDoc, editDoc, deleteDoc, fetchData}