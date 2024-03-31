import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useState} from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../globals/style';
import SideBar from '../components/SideBar.js';

const HomeHeadNav = ({ navigation, title}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            {/* Title and Icons */}
            <View style={styles.header}>
                {/* Sidebar icon */}
                <TouchableOpacity onPress={handleToggleSidebar} style={styles.sidebarIcon}>
                    <MaterialCommunityIcons name="menu" size={30} color="white" />
                </TouchableOpacity>
                {/* Title */}
                <Text style={styles.title}>{title}</Text>
                {/* User icon */}
                <TouchableOpacity onPress={() => { navigation.navigate('user_admin') }} style={styles.userIcon}>
                    <FontAwesome5 name="user-circle" size={35} color="white" />
                </TouchableOpacity>
            </View>
            {/* Sidebar */}
            {isOpen && <SideBar navigation={navigation} title={title} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: colors.bg,
        marginTop: 40,
        zIndex: 1,
    },
    header: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    sidebarIcon: {
        padding: 5,
    },
    userIcon: {
        padding: 5,
    },
    title: {
        fontSize: 23,
        color: 'white',
        marginLeft: 10,
    },
});

export default HomeHeadNav;
