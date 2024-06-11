import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList
} from 'react-native'
import { colors, veg, nonveg } from '../../globals/style.js'
import HomeHeadNav from '../../components/Header.js'
import { fetchPaymentData } from '../../utils/firestore.js'
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons'
import { SafeAreaView, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
const AdminSaleScreen = ({ navigation }) => {
  const [paymentList, setPaymentList] = useState([])
  const [day, setDay] = useState([])
  const [sale, setSale] = useState([])
  const [selectedData, setSelectedData] = useState(null)

  const mergeAndSortDataByDate = data => {
    const dateMap = {}

    data.forEach(item => {
      if (dateMap[item.date]) {
        dateMap[item.date].total += item.total
      } else {
        dateMap[item.date] = { ...item }
      }
    })

    return Object.values(dateMap).sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/')
      const [dayB, monthB, yearB] = b.date.split('/')
      return (
        new Date(`${yearA}-${monthA}-${dayA}`) -
        new Date(`${yearB}-${monthB}-${dayB}`)
      )
    })
  }

  const reloadPayment = useCallback(async () => {
    try {
      let newData = await fetchPaymentData()

      newData = mergeAndSortDataByDate(newData)

      setPaymentList(newData)

      newData.forEach(element => {
        setSale(sale => [...sale, element.total / 1000])
        setDay(day => [...day, element.date.toString()])
      })

      const processedDay = newData.map(item => {
        const [day, month, year] = item.date.split('/')
        return `${day}/${month}`
      })

      setDay(processedDay)
    } catch (error) {
      console.error('Error reloading data:', error)
    }
  }, [])

  const sortDayArray = dates => {
    return dates.sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('/')
      const [dayB, monthB, yearB] = b.split('/')
      return (
        new Date(`${yearB}-${monthB}-${dayB}`) -
        new Date(`${yearA}-${monthA}-${dayA}`)
      )
    })
  }

  useEffect(() => {
    const reload = navigation.addListener('focus', () => {
      reloadPayment()
    })

    return reload
  }, [navigation, reloadPayment])

  const renderPayment = ({ item }) => {
    return (
      <TouchableOpacity style={styles.paymentItem}>
        <View style={styles.paymentContainer}>
          <FontAwesome5 name='file-alt' style={styles.paymentIcon} />
          <View style={styles.paymentIdContainer}>
            <Text style={styles.paymentId}>{item.date}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.paymentId}>{item.total/1000}.000vnd</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const handleDataPointClick = data => {
    setSelectedData({
      value: data.value,
      x: data.x,
      y: data.y
    })
    setTimeout(() => {
      setSelectedData(null)
    }, 2000)
  }

  const renderChart = () => {
    return (
      <View>
        <LineChart
          data={{
            labels: day,
            datasets: [
              {
                data: sale
              }
            ]
          }}
          width={Dimensions.get('window').width - 20}
          height={220}
          yAxisSuffix='k'
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          
        />
      </View>
    )
  }

  return (
    <View>
      <HomeHeadNav navigation={navigation} title='DOANH THU' user='admin' />
      <View style={styles.listTitleContainer}>
        <Text style={styles.listTitle}>Biểu đồ thống kê doanh thu</Text>
      </View>
      <View style={styles.chartContainer}>{renderChart()}</View>
      <View style={styles.listTitleContainer}>
        <Text style={styles.listTitle}>Doanh thu chi tiết</Text>
      </View>
      <View>
        <FlatList
          data={paymentList}
          renderItem={renderPayment}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10
  },
  totalContainer: {
    alignItems: 'center',
    justifyContent: 'left',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  chartContainer: {
    marginLeft: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: '#EE9C37',
    paddingHorizontal: 40,
    paddingVertical: 10,
    color: '#fff'
  },
  icon: {
    marginLeft: 5,
    color: '#fff',
    backgroundColor: '#EE9C37',
    fontSize: 17,
    padding: 2,
    marginRight: 8
  },
  paymentItem: {
    padding: 5,
    marginLeft: 20,
    marginTop: 10
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentIcon: {
    fontSize: 24,
    marginLeft: 20
  },
  paymentIdContainer: {
    marginHorizontal: 30,
    flex: 2.5
  },
  paymentDateContainer: {
    marginHorizontal: 10,
    marginLeft: -50,
    flex: 1
  },
  paymentId: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  paymentDate: {
    fontSize: 16,
    color: '#666'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 30,
    marginTop: 10,
    marginBottom: 20
  },
  addButtonText: {
    fontSize: 18,
    color: '#EE9C37'
  },
  listTitleContainer: {
    marginVertical: 20,
    alignItems: 'center'
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text1
  },
})
export default AdminSaleScreen
