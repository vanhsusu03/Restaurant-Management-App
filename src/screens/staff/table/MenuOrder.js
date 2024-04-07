import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, FlatList, Button } from 'react-native';
import { colors, veg, nonveg } from '../../../globals/style'
import HomeHeadNav from '../../../components/Header.js'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { firebase } from '../../../../Firebase/firebase';
import { fetchMenuData, addOrderByTable } from '../../../utils/firestore';

const MenuOrder = ({ navigation, route }) => {
    const { table_id } = route.params;

    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [type, setType] = useState([]);
    const itemsArray = data.map(category => category.items).flat();
    
    const [itemInfo, setItemInfo] = useState({});

    const handleAdd = (itemName) => {
        setItemInfo(prevState => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                add: true
            }
        }));
    
        
    };

    const handleDecrease = (itemName) => {
        if (itemInfo[itemName].quantity > 0) {
            setItemInfo(prevState => ({
                ...prevState,
                [itemName]: {
                    ...prevState[itemName],
                    quantity: prevState[itemName].quantity - 1
                }
            }));
        }
    };
    
    const handleIncrease = (itemName) => {
        setItemInfo(prevState => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                quantity: prevState[itemName].quantity + 1
            }
        }));
    };
    
    const reloadData = useCallback(async () => {
        try {
            const newData = await fetchMenuData();
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
    
    useEffect(() => {
        const initialItemInfo = {};
        data.forEach(category => {
            category.items.forEach(item => {
                initialItemInfo[item.data.name] = {
                    add: false,
                    quantity: 1
                };
            });
        });
        
        setItemInfo(initialItemInfo);
        
    }, [data]);
    

    const handleSearch = () => {
    }

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItemContainer}
            onPress={() => handleCategoryPress(item)}
        >
            <Text style={styles.categoryItem}>{item}</Text>
        </TouchableOpacity>
    );

    const handleCategoryPress = (category) => {
        // Xử lý khi người dùng chọn một danh mục
    }

    const renderItem = useCallback(({ item }) => {
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.data.image }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.data.name}</Text>
            <View style={styles.addContainer}>
                <Text style={styles.itemPrice}>{item.data.price}</Text>
                {itemInfo[item.data.name] && itemInfo[item.data.name].add ? (
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => handleDecrease(item.data.name)}>
                            <Ionicons name="remove" style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{itemInfo[item.data.name].quantity}</Text>
                        <TouchableOpacity onPress={() => handleIncrease(item.data.name)}>
                            <Ionicons name="add" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item.data.name, item.data.image)}>
                        <Ionicons name="add-circle" style={styles.addIcon} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
      }, [itemInfo]);



    const handleConfirmPress = async () => {
        const updatedItemsOrder = itemsArray.reduce((accumulator, item) => {
            if (itemInfo[item.data.name]?.add) {
                accumulator.push({
                    name: item.data.name,
                    image: item.data.image, 
                    quantity: itemInfo[item.data.name].quantity,
                    price: item.data.price
                });
            }
            return accumulator;
        }, []);
    
        try {
            await addOrderByTable(table_id, updatedItemsOrder);
        } catch (error) {
            console.error("Error saving data:", error);
        }
        navigation.goBack();
    }
    
    return (
        <View style={styles.container}>
            <HomeHeadNav navigation={navigation} title='MENU' user='staff'/>
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

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
                <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>

            <Text style={styles.categoryHeaderText}>Các món ăn</Text>
            <FlatList
                data={itemsArray}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                style={styles.flatList}
                contentContainerStyle={styles.flatListContent}
                
            />
        </View>
    )
}

export default MenuOrder;

const styles = StyleSheet.create({
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
        height: 190,
    },
    categoryItemContainer: {
        backgroundColor: '#F6CB99',
        marginHorizontal: 10,
        borderRadius: 50,
        paddingVertical: 20,
        alignItems: 'center',
        height: 100,
        width: 70,
        marginBottom: 10
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
        marginVertical: 10,
        marginLeft: 10,
    },
    categoryItem: {
        fontSize: 16,
    },
    itemImage: {
        width: 140,
        height: 120,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 5,
    },
    addContainer: {
        margin: 8,
        flexDirection: 'row',
    },
    itemName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        flex: 1
    },
    addIcon: {
        fontSize: 30,
        color: colors.bg,
        flex: 1
    },
    confirmButton: {
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 8,
        marginLeft: 200,
        marginRight: 50
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    flatList: {
        flexGrow: 1,
    },
    flatListContent: {
        alignItems: 'center',
    }, 
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 50,
        width: 45,
        height: 25
    },
    
});
