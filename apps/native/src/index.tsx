import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import Marquee from "@repo/ui/src/Marquee"

const Index = () => {
  const data = ["AAPL", "GOOGL", "GOOG", "MSFT", "FB", "TSM", "INTC", "ORCL", "CSCO"].map((item) => ({
    title: item,
    price: parseInt((Math.random() * 1000).toFixed(2), 10),
    change: parseInt((Math.random() * 100).toFixed(2), 10),
    isGain: Math.floor(Math.random() * 10).toFixed(2) > 5,
  }))

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Marquee data={data} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
})

export default Index
