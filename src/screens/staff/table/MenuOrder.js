import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, FlatList, Button } from 'react-native';
import { colors, veg, nonveg } from '../../../globals/style'
import HomeHeadNav from '../../../components/Header.js'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { firebase } from '../../../../Firebase/firebase';
import { fetchMenuData, addOrderByTable, fetchCategoryData } from '../../../utils/firestore';

const MenuOrder = ({ navigation, route }) => {
    const { table_id } = route.params;

    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [type, setType] = useState([]);

    const [categoryIcons, setCategoryIcons] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    const [itemsArray, setItemsArray] = useState([]);

    useEffect(() => {
        const filteredItems = data
            .map(category => category.items)
            .flat()
            .filter(item => item.data.status); // Lọc ra những mục có status là true
        setItemsArray(filteredItems);
    }, [data]);
    

    useEffect(() => {
        if (selectedCategory !== null && selectedCategory !== undefined) {
            const fetchCategoryItems = async () => {
                const items = await fetchCategoryData(selectedCategory);
                const filteredItems = items.filter(item => item.data.status); // Lọc ra những mục có status là true
                setItemsArray(filteredItems);
            };    
    
            fetchCategoryItems();
        }
    }, [selectedCategory]);
    
    

    const [itemInfo, setItemInfo] = useState({});

    const handleAdd = useCallback((itemName, itemImage, itemPrice) => {
        setItemInfo(prevState => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                add: true
            }
        })); 

        setSelectedItems(prevItems => [...prevItems, { name: itemName, image: itemImage, price: itemPrice}]);
    }, [setItemInfo]);
    
    const handleDecrease = useCallback((itemName) => {
        if (itemInfo[itemName].quantity > 0) {
            setItemInfo(prevState => ({
                ...prevState,
                [itemName]: {
                    ...prevState[itemName],
                    quantity: prevState[itemName].quantity - 1
                }
            }));
        }
    }, [itemInfo, setItemInfo]);
    
    const handleIncrease = useCallback((itemName) => {
        setItemInfo(prevState => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                quantity: prevState[itemName].quantity + 1
            }
        }));
    }, [setItemInfo]);
    
    
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
    
    
    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            reloadData();
        });
    
        return reload;
    }, [navigation, reloadData, type]);
    
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
            style={selectedCategory === item ? styles.categorySelectItemContainer : styles.categoryItemContainer}
            onPress={() => setSelectedCategory(item)}
        >
            {categoryIcons[item] && (
            <Image source={{ uri: categoryIcons[item] }} style={styles.categoryImage} />
            )}
            <Text style={styles.categoryItem}>{item}</Text>
        </TouchableOpacity>
    );
    
    const renderItem = ({ item }) => {
        return (
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
                        <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item.data.name, item.data.image, item.data.price)}>
                            <Ionicons name="add-circle" style={styles.addIcon} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    const handleConfirmPress = async () => {
        const updatedItemsOrder = selectedItems.map(item => ({
            name: item.name,
            image: item.image,
            quantity: itemInfo[item.name].quantity,
            price: item.price
        }));
    
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
        marginHorizontal: 10,
        marginBottom: 3,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    itemName: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        flex: 1
    },
    addButton: {
        marginTop: -5
    },
    addIcon: {
        fontSize: 30,
        color: colors.bg,
        flex: 1,
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
        height: 25,
        marginBottom: 6
    },
    
});
