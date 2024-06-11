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

import DropdownSelect from '../../components/DropdownSelect.js'

const AdminSaleScreen = ({ navigation }) => {
  const [paymentList, setPaymentList] = useState([])
  const [day, setDay] = useState(['1', '2', '3'])
  const [sale, setSale] = useState([0, 0, 0])

  const [day_w, setDayW] = useState([])
  const [sale_w, setSaleW] = useState([])

  const [day_m, setDayM] = useState([])
  const [sale_m, setSaleM] = useState([])

  const [day_y, setDayY] = useState([])
  const [sale_y, setSaleY] = useState([])

  let selectedOption = 'Trong tuần'
  const options = ['Trong tuần', 'Trong tháng', 'Trong năm']

  const handleSelect = option => {
    selectedOption = option
    filterSales(selectedOption)
  }

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

      let newDataCopy_w = JSON.parse(JSON.stringify(newData))
      let newDataCopy_m = JSON.parse(JSON.stringify(newData))
      let newDataCopy_y = JSON.parse(JSON.stringify(newData))
      newData = mergeAndSortDataByDate(newData)

      newDataCopy_w = mergeAndSortDataByDate(newDataCopy_w)
      newDataCopy_m = mergeAndSortDataByDate(newDataCopy_m)
      newDataCopy_y = mergeAndSortDataByDate(newDataCopy_y)

      setPaymentList(newData)

      weekFormat(newDataCopy_w)
      monthFormat(newDataCopy_m)
      yearFormat(newDataCopy_y)
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

  const weekFormat = ndt => {
    setSaleW([])
    setDayW([])
    const curDate = new Date().getDate()
    const curMonth = new Date().getMonth() + 1
    for (let i = ndt.length - 1; i >= 0; i--) {
      const element = ndt[i]
      const [dayString, month, year] = element.date.split('/')
      const day = parseInt(dayString, 10)
      const m = parseInt(month, 10)
      if (m != curMonth || day < curDate - 6) {
        ndt.splice(i, 1)
      }
    }

    for (let i = 6; i >= 0; i--) {
      var dayy = curDate - i
      var dayyString = dayy.toString()
      if (dayy / 10 == 0) {
        dayyString = '0' + dayyString
      }
      setDayW(day_w => [...day_w, dayyString + '/' + curMonth])
    }
    var zero = 0,
      one = 0,
      two = 0,
      three = 0,
      four = 0,
      five = 0,
      six = 0 // distance from curDate
    ndt.forEach(element => {
      const [dayString, monthString, year] = element.date.split('/')
      const day = parseInt(dayString, 10)
      if (day == curDate - 6) {
        six = element.total / 1000000
      } else if (day == curDate - 5) {
        five = element.total / 1000000
      } else if (day == curDate - 4) {
        four = element.total / 1000000
      } else if (day == curDate - 3) {
        three = element.total / 1000000
      } else if (day == curDate - 2) {
        two = element.total / 1000000
      } else if (day == curDate - 1) {
        one = element.total / 1000000
      } else if (day == curDate) {
        zero = element.total / 1000000
      }
    })
    setSaleW([six, five, four, three, two, one, zero])
  }

  const monthFormat = ndt => {
    setSaleM([])
    setDayM([])
    var curMonth = new Date().getMonth() + 1
    const curYear = new Date().getFullYear()
    let sundays = []
    for (let i = ndt.length - 1; i >= 0; i--) {
      const element = ndt[i]
      const [day, monthString, year] = element.date.split('/')
      const month = parseInt(monthString, 10)

      if (month !== curMonth) {
        ndt.splice(i, 1)
      }
    }

    const daysInMonth = new Date(curYear, curMonth, 0).getDate()
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(curYear, curMonth, day)
      if (date.getDay() == 2) {
        // 0 corresponds to Sunday
        setDayM(day_m => [...day_m, day.toString() + '/' + curMonth.toString()])
        sundays.push(day)
      }
    }
    let totals = new Array(sundays.length).fill(0)

    ndt.forEach(element => {
      const [dayString, month, year] = element.date.split('/')
      const day = parseInt(dayString, 10)
      if (day <= sundays[0]) {
        totals[0] += element.total / 1000000
      } else if (day <= sundays[1]) {
        totals[1] += element.total / 1000000
      } else if (day <= sundays[2]) {
        totals[2] += element.total / 1000000
      } else if (day <= sundays[3]) {
        totals[3] += element.total / 1000000
      }
      if (sundays.length === 5 && day > sundays[3]) {
        totals[4] += element.total / 1000000
      }
    })
    setSaleM(totals)
  }

  const yearFormat = ndt => {
    setDayY([])
    setSaleY([])
    var curYear = new Date().getFullYear()

    for (let i = ndt.length - 1; i >= 0; i--) {
      const element = ndt[i]
      const [day, month, yearString] = element.date.split('/')
      const year = parseInt(yearString, 10)

      if (year !== curYear) {
        ndt.splice(i, 1)
      }
    }

    var jan = 0,
      feb = 0,
      mar = 0,
      apr = 0,
      may = 0,
      jun = 0,
      jul = 0,
      aug = 0,
      sep = 0,
      oct = 0,
      nov = 0,
      dec = 0

    ndt.forEach(element => {
      const [d, m, y] = element.date.split('/')
      const month = parseInt(m, 10)
      if (month == 1) {
        jan += element.total / 1000000
      } else if (month == 2) feb += element.total / 1000000
      else if (month == 3) mar += element.total / 1000000
      else if (month == 4) apr += element.total / 1000000
      else if (month == 5) may += element.total / 1000000
      else if (month == 6) jun += element.total / 1000000
      else if (month == 7) jul += element.total / 1000000
      else if (month == 8) aug += element.total / 1000000
      else if (month == 9) sep += element.total / 1000000
      else if (month == 10) oct += element.total / 1000000
      else if (month == 11) nov += element.total / 1000000
      else if (month == 12) dec += element.total / 1000000
    })
    setSaleY([jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec])
    setDayY([
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ])
  }

  const renderPayment = ({ item }) => {
    return (
      <TouchableOpacity style={styles.paymentItem}>
        <View style={styles.paymentContainer}>
          <FontAwesome5 name='file-alt' style={styles.paymentIcon} />
          <View style={styles.paymentIdContainer}>
            <Text style={styles.paymentId}>{item.date}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.paymentId}>{item.total / 1000}.000vnd</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const filterSales = selectedOption => {
    if (selectedOption === 'Trong tuần') {
      setSale(sale_w)
      setDay(day_w)
    } else if (selectedOption === 'Trong tháng') {
      setDay(day_m)
      setSale(sale_m)
    } else if (selectedOption === 'Trong năm') {
      setSale(sale_y)
      setDay(day_y)
    }
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
          yAxisSuffix='tr'
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
      <TouchableOpacity style={styles.add}>
        <DropdownSelect options={options} onSelect={handleSelect} />
      </TouchableOpacity>
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
    justifyContent: 'left'
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
  add: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 30,
    marginTop: -10,
    zIndex: 3, // works on ios
    elevation: 3 // works on android
  },
  icon: {
    marginLeft: 5,
    color: '#fff',
    backgroundColor: '#EE9C37',
    fontSize: 17,
    padding: 2,
    marginRight: 8
  },
  text: {
    fontSize: 18,
    color: '#EE9C37'
  }
})
export default AdminSaleScreen
