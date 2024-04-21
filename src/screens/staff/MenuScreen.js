import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, FlatList, Button } from 'react-native';
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { firebase } from '../../../Firebase/firebase';
import { fetchMenuData, fetchCategoryData } from '../../utils/firestore';

const StaffMenuScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [type, setType] = useState([]);

    const [categoryIcons, setCategoryIcons] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [itemsArray, setItemsArray] = useState([]);

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
                    <View style={styles.saleButton}>
                        <Text style={styles.saleText}>Sale</Text>
                    </View>
                ) : (
                    <View style={styles.stopSaleButton}>
                        <Text style={styles.saleText}>Stop Sale</Text>
                    </View>
                    
                )}
                    <Text style={styles.itemPrice}>{item.data.price}</Text>
                </View>

            </View>
        );
    };

   
    return (
        <View style={styles.container}>
            <HomeHeadNav navigation={navigation} title='MENUuu' user='staff'/>

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
        </View>
    )
}

export default StaffMenuScreen;

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
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfContainer: {
        flex: 1,
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
    
    flatListContent: {
        alignItems: 'center',
    },  
});