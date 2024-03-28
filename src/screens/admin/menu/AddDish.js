import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, Button,  TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { firebase } from '../../../../Firebase/firebase';
import { Picker } from '@react-native-picker/picker';
import {getImage, addDoc } from '../../../utils/firestore';

const AddDish = ({navigation, route}) => {
    const {listType} = route.params;

    const [name, onChangeName] = useState();
    const [type, onChangeType] = useState(listType[0]);
    const [cost, onChangeCost] = useState();
    const [price, onChangePrice] = useState();
    const [description, onChangeDescription] = useState();
    const [image, onChangeImage] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        const imageUrl = await getImage()
        onChangeImage(imageUrl);
    };
 
    const handleSave = async () => {
        try {
            setIsLoading(true); 
            const imageUrl = await addDoc(type, name, cost, price, description, image);
            onChangeImage(imageUrl);

            Alert.alert(
                'Thành công!',
                'Thông tin đã được thêm!',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK pressed'),
                  },
                ],
                {
                  alertContainerStyle: styles.alertContainer,
                  backgroundColor: 'blue',
                }
              );
        } catch (error) {
            console.error("Error saving data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.menu}>Thêm món</Text>
            <Text style={styles.name}>Tên món</Text>
            <TextInput  
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
            ></TextInput>

            <View style={styles.container2}>
                <View style={styles.halfContainer}>
                    <Text style={styles.name}>Chi phí</Text>
                    <TextInput  
                        style={styles.input}
                        onChangeText={onChangeCost}
                        value={cost}
                    ></TextInput>
                </View>

                <View style={styles.halfContainer}>
                    <Text style={styles.name}>Giá bán</Text>
                    <TextInput  
                        style={styles.input}
                        onChangeText={onChangePrice}
                        value={price}
                    ></TextInput>
                </View>
            </View>

            <Text style={styles.name}>Loại</Text>
            <View style={styles.select}>
                <Picker
                    style={styles.itemSelect}
                    selectedValue={type}
                    onValueChange={(itemValue, itemIndex) => onChangeType(itemValue)}
                >
                    {listType.map((type, index) => (
                        <Picker.Item key={index} label={type} value={type} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.name}>Mô tả</Text>
            <TextInput  
                style={styles.input}
                onChangeText={onChangeDescription}
                value={description}
                multiline={true}
            ></TextInput>


            <Text style={styles.name}>Hình ảnh </Text>
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                {image ? <Image source={{ uri: image }} style={styles.image} />: <Text style={styles.upload}>Tải ảnh lên</Text>}
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>

            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </View>
            )}
        
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 45,
    },
    menu: {
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: '#EE9C37',
        paddingHorizontal: 40,
        paddingVertical: 10,
        color: '#fff'
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
        marginTop: 15,
        marginHorizontal: 30
    },
    input: {
        borderColor: '#EE9C37',
        borderWidth: 2,
        marginHorizontal: 30,
        borderRadius: 10,
        paddingLeft: 20,
        paddingVertical: 5,
        fontSize: 16,
        minHeight: 45,
    },
    upload: {
        borderColor: '#EE9C37',
        borderWidth: 3,
        justifyContent: 'center',
        borderRadius: 10,
        fontSize: 16,
        paddingVertical: 6,
        paddingHorizontal: 7,
    },
    select: {
        borderColor: '#EE9C37',
        borderWidth: 2,
        marginHorizontal: 30,
        borderRadius: 10,
        height: 45,
    },
    itemSelect: {
        fontSize: 16,
        marginTop: -8,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 130,
        height: 120,
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
        fontSize: 16,
        color: '#fff',
    },
    alertContainer: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'lightblue',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
    },
});

export default AddDish;