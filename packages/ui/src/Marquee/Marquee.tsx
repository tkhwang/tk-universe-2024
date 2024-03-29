import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native"
import MarqueeItem from "./MarqueeItem"

const itemWidth = Dimensions.get("window").width / 5

export type IMarqueItem = {
  title: string
  price: number
  change: number
  isGain: boolean
}

interface Props {
  data: IMarqueItem[]
}

export default function Marquee({ data }: Props) {
  const renderItem = (item: IMarqueItem, index: number) => {
    return (
      <MarqueeItem
        title={item.title}
        price={item.price}
        change={item.change}
        isGain={item.isGain}
        itemWidth={itemWidth}
        style={{
          marginStart: index === 0 ? 16 : 0,
        }}
      />
    )
  }

  return (
    <FlatList
      // getItemLayout={(_, index) => ({
      //   gth,
      //   offset: itemWidth * index,
      //   index,
      // })}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item, index }) => renderItem(item, index)}
      horizontal
      style={styles.wrapper}
      keyExtractor={(item, index) => item.title + index}
    />
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 40,
    flexGrow: 0,
  },
})
