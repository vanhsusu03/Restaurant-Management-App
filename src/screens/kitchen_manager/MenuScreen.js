import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, FlatList, Modal, Pressable, Alert } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { fetchMenuData, fetchCategoryData, editDoc } from '../../utils/firestore';

const KitchenManagerMenuScreen = ({ navigation }) => {

    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [type, setType] = useState([]);

    const [categoryIcons, setCategoryIcons] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [itemsArray, setItemsArray] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [status, updateStatus] = useState();

    useEffect(() => {
        setItemsArray(data.map(category => category.items).flat());
    }, [data]);

    // Lấy danh sách món theo mục được chọn.
    useEffect(() => {
        if (selectedCategory !== null && selectedCategory !== undefined) {
            const fetchCategoryItems = async () => {
                const items = await fetchCategoryData(selectedCategory);
                setItemsArray(items);
            };    

            fetchCategoryItems();
        }
    }, [selectedCategory]);
    
    // Lấy toàn bộ dữ liệu
    const reloadData = useCallback(async () => {
        try {
            const newData = await fetchMenuData();
            setData(newData);
            setType(newData.map(item => item.category));
            
            const icons = {};
            newData.forEach(category => {
              icons[category.category] = category.image;
            });
            setCategoryIcons(icons);

        } catch (error) {
            console.error("Error reloading data:", error);
        }
    },[]);
    
    // Reload data.
    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            reloadData();
        });
    
        return reload;
    }, [navigation, reloadData, type]);

    const handleSearch = () => {
    }


    // Hiển thị danh sách danh mục để chọn.
    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={selectedCategory === item ? styles.categorySelectItemContainer : styles.categoryItemContainer}
            onPress={() => setSelectedCategory(item)}
        >
            {categoryIcons[item] && (
            <Image source={{ uri: categoryIcons[item] }} style={styles.categoryImage} />
            )}
            <Text style={styles.categoryItem}>{item}</Text>
        </TouchableOpacity>
    );
    
    // Hiển thị danh sách các món.
    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.data.image }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.data.name}</Text>
                <View style={styles.addContainer}>
                {item.data.status ? ( // Nếu status là true
                    <TouchableOpacity style={styles.saleButton} onPress={() => openModal(item.data)}>
                        <Text style={styles.saleText}>Sale</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.stopSaleButton} onPress={() => openModal(item.data)}>
                        <Text style={styles.saleText}>Stop Sale</Text>
                    </TouchableOpacity>
                    
                )}
                    <Text style={styles.itemPrice}>{item.data.price}</Text>
                </View>

            </View>
        );
    };

    const getCategoryFromData = (itemName) => {
        let category = null;
        data.forEach(categoryItem => {
            categoryItem.items.forEach(item => {
                if (item.data.name === itemName) {
                    category = categoryItem.category;
                    return;
                }
            });
            if (category) {
                return;
            }
        });
        return category;
    };
    
    const openModal = (item) => {
        setSelectedItem({
            ...item,
            category: getCategoryFromData(item.name) 
        });
        setModalVisible(true);
        updateStatus(item.status);
    }

    const handleSave = async (item) => {
        try {
            await editDoc(item.category, item.name, status, item.price, item.image);
            
            const updatedItemsArray = itemsArray.map((arrayItem) => {
                if (arrayItem.data.name === item.name) {
                    return {
                        ...arrayItem,
                        data: {
                            ...arrayItem.data,
                            status: status
                        }
                    };
                }
                return arrayItem;
            });
            
            setModalVisible(!modalVisible)
            
            Alert.alert(
                'Thành công!',
                'Đã lưu lại trạng thái món ăn!',
                [
                  {  text: 'OK', },
                ],
              );

            setItemsArray(updatedItemsArray);

        } catch (error) {
            console.error("Error saving data:", error);
        }
    };
    
    return (
        <View style={styles.container}>
            <HomeHeadNav navigation={navigation} title='MENU' user='kitchen_manager'/>
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Tìm kiếm"
                        style={styles.searchInput}
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <FontAwesome5 name="search" style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <View>
                <Text style={styles.categoryHeaderText}>Các danh mục</Text>
                <FlatList
                    data={type}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                />
            </View>

            <Text style={styles.categoryHeaderText}>Các món ăn</Text>
            <FlatList
                data={itemsArray}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                style={styles.flatList}
                contentContainerStyle={styles.flatListContent}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Thay đổi Status</Text>

                        <View style={styles.container2}>
                            <View style={styles.halfContainer}>
                                <TouchableOpacity style={styles.radioContainer} onPress={() => updateStatus(true)}>
                                    <View style={[styles.radio]}>
                                        {status && <View style={styles.radioSelected}/>}
                                    </View>
                                    <Text style={[styles.radioLabel, { color: '#5DA75A' }]}>Sale</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.halfContainer}>
                                <TouchableOpacity style={styles.radioContainer} onPress={() => updateStatus(false)}>
                                    <View style={[styles.radio]}>
                                        {!status && <View style={styles.radioSelected}/>}
                                    </View>
                                    <Text style={[styles.radioLabel, { color: '#BC1000' }]}>Stop Sale</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
    

                        <View style={styles.container2}>
                            <View style={styles.halfContainer}>
                                <Pressable
                                style={styles.buttonModal}
                                onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Hủy</Text>
                                </Pressable>
                            </View>

                            <View style={styles.halfContainer}>
                                <Pressable
                                style={styles.buttonModal}
                                onPress={() => handleSave(selectedItem)}
                                >
                                    <Text style={styles.textStyle}>OK</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
    
}

export default KitchenManagerMenuScreen;

const styles = StyleSheet.create({
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    itemContainer: {
        backgroundColor: '#F6CB99',
        margin: 10,
        marginHorizontal: 16,
        alignItems: 'center',
        borderRadius: 10,
        width: 140,
        height: 195,
        justifyContent: 'space-between',
    },
    categorySelectItemContainer: {
        backgroundColor: '#f2b269',
        marginHorizontal: 10,
        borderRadius: 50,
        paddingVertical: 10,
        alignItems: 'center',
        height: 115,
        width: 70,
        marginBottom: 10,
    },
    categoryItemContainer: {
        backgroundColor: '#DDDEE0',
        borderColor: '#B7B8BA',
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 50,
        paddingVertical: 10,
        alignItems: 'center',
        height: 115,
        width: 70,
        marginBottom: 10,
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        backgroundColor: colors.bg,
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    searchBox: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#9aa0a6',
        alignItems: 'center',
        width: 250,
        height: 45,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
    },
    searchButton: {
        padding: 10,
        paddingHorizontal: 20
    },
    searchIcon: {
        fontSize: 20,
    },
    icon: {
        fontSize: 15,
    },
    categoryHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10,
    },
    categoryItem: {
        marginTop: 4,
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
    },
    categoryImage: {
        borderRadius: 50,
        width: 55,
        height: 55
    },
    itemImage: {
        width: 140,
        height: 120,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 5,
    },
    addContainer: {
        marginHorizontal: 7,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemName: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
    },
    saleButton: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffffff',
        width: 60,
        height: 25,
        backgroundColor: "#5DA75A", 
        alignItems: 'center',
        flex: 1.3,
    },
    stopSaleButton: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffffff',
        width: 60,
        height: 25,
        backgroundColor: "#BC1000", 
        alignItems: 'center',
        flex: 1.3,
    },
    saleText: {
        fontSize: 13,
        color: "#ffffff",
    },
    flatList: {
        flexGrow: 1,
    },
    flatListContent: {
        alignItems: 'center',
    }, 

    centeredView: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 25,
        backgroundColor: '#FEF3E3',
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
    },
    
    buttonModal: {
        borderRadius: 20,
        paddingVertical: 6,
        borderWidth: 1,
        marginTop: 15,
        marginHorizontal: 30,
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16
    },

    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center"
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 20,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000000',
        marginRight: 10,
        padding: 1
    },
    radioSelected: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -5.5 }, { translateY: -5.5 }],
        width: 13,
        height: 13,
        borderRadius: 50,
        backgroundColor: '#000',
    },
    radioLabel: {
        fontSize: 17,
        fontWeight: 'bold'
    },

});
