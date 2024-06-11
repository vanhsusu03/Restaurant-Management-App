import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const DropdownSelect = ({ options, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Trong tuần')

  const handleSelect = option => {
    setSelectedOption(option)
    onSelect(option)
    setIsVisible(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.toggleButtonText}>{selectedOption}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => handleSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1
  },
  toggleButton: {
    padding: 6,
    backgroundColor: '#EE9C37',
    borderRadius: 4,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 4,
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    paddingVertical: 10
  },
  option: {
    marginLeft: 6,
    paddingVertical: 10
  },
  optionText: {
    fontSize: 14
  }
})

export default DropdownSelect
