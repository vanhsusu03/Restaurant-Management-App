import React, { useState, useEffect, useCallback} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import SlideCard from '../../components/SlideCard';
import { firebase } from '../../../Firebase/firebase';
import { FontAwesome6 } from '@expo/vector-icons';
import { fetchData } from '../../utils/firestore';
import HomeHeadNav from '../../components/Header.js'


const AdminMenuScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [type, setType] = useState([]);

    const [visible, setvisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const reloadData = useCallback(async () => {
        try {
            const newData = await fetchData();
            setData(newData);
            setType(newData.map(item => item.category));
        } catch (error) {
            console.error("Error reloading data:", error);
        }
    },[]);
    
    
    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            reloadData();
        });

        return reload;
    }, [navigation, reloadData]);

    const renderItem = ({ item }) => (
        <SlideCard category={item.category} items={item.items} listType={type} reloadData={reloadData}/>
    );

    const handleAdd = async () => {
        Alert.alert(
            "Bạn muốn thêm gì?",
            "",
            [
                {text: 'Thêm mục', style: 'destructive', onPress: () => { setvisible(true); }},
                {text: 'Thêm món', style: 'default', onPress: () => { navigation.navigate('add_dish', {listType: type}) }},
                {text: '      Hủy', style: 'cancel', },
            ],
            {
                cancelable: false,
            }
        )
    }

    const addNewCategory = async () => {
        if (newCategoryName != "") {
            await firebase.firestore().collection('menu').doc(newCategoryName).set({});
            fetchData()
        }
        setNewCategoryName("")
        setvisible(false);
    }


    return (
        <View style={styles.container}>
            <HomeHeadNav navigation={navigation} title='MENU' />

            <TouchableOpacity style={styles.add} onPress={handleAdd }>
                <FontAwesome6 name="add" style={styles.icon}/>
                <Text style={styles.text}>Add</Text>
            </TouchableOpacity>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
            />

            <Modal animationType="slide" transparent={true} visible={visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Nhập tên danh mục mới:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setNewCategoryName(text)}
                            value={newCategoryName}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={addNewCategory}>
                                <Text style={styles.textStyle}>Thêm</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => setvisible(false)}>
                                <Text style={styles.textStyle}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menu: {
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: '#EE9C37',
        paddingHorizontal: 40,
        paddingVertical: 10,
        color: '#fff'
    },
    add: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 30,
        marginTop: 10,
    },
    icon: {
        marginLeft: 5,
        color: '#fff',
        backgroundColor: '#EE9C37',
        fontSize: 17,
        padding: 2,
        marginRight: 8
    },
    list: {
        marginLeft: 5,
        color: '#EE9C37',
        fontSize: 17,
        padding: 2,
        marginRight: 8
    },
    text: {
        fontSize: 18,
        color: '#EE9C37'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
        width: 60
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    }

});

export default AdminMenuScreen;
