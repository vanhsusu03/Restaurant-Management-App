import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomAlert = ({ message, onCancel, onConfirm }) => {
  return (
    <View style={styles.container}>
      <View style={styles.alertBox}>
        <Text style={styles.message}>{message}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.button}>
            <MaterialIcons name="cancel" size={24} color="red" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onConfirm}>
            <MaterialIcons name="check-circle" size={24} color="green" />
          </TouchableOpacity>
        
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertBox: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
    },
    message: {
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    button: {
      marginRight: 10,
    },
  });

export default CustomAlert;
