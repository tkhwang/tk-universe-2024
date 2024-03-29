import { StyleSheet, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Button, Marquee } from "@repo/ui"

const Index = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Native</Text>
      <Button
        onClick={() => {
          console.log("Pressed!")
          alert("Pressed!")
        }}
        text="Boop222"
      />
      <Marquee />
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
