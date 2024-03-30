import React, { useState, useEffect, useRef, useCallback } from "react"
import { Dimensions, FlatList, StyleSheet } from "react-native"
import MarqueeItem, { IMarqueItem } from "./MarqueeItem"

const NO_PER_SCREEN = 5
const itemWidth = Dimensions.get("window").width / NO_PER_SCREEN

interface Props {
  data: IMarqueItem[]
}

const StockMarquee = ({ data }: Props) => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const tickerRef = useRef<FlatList<IMarqueItem> | null>(null)

  const renderItem = useCallback(
    (item: IMarqueItem, index: number) => (
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
    ),
    []
  )

  const scrolling = useCallback(() => {
    if (data.length > NO_PER_SCREEN) {
      const position = currentPosition + 4
      tickerRef.current?.scrollToOffset({ offset: position, animated: false })
      const maxOffset = data.length * itemWidth
      if (currentPosition > maxOffset) {
        tickerRef.current?.scrollToOffset({ offset: 0, animated: false })
        setCurrentPosition(0)
      } else {
        setCurrentPosition(position)
      }
    }
  }, [currentPosition, data.length])

  useEffect(() => {
    const activeInterval = setInterval(scrolling, 32)

    return () => clearInterval(activeInterval)
  }, [scrolling])

  return (
    <FlatList
      ref={tickerRef}
      getItemLayout={(_, index) => ({
        length: data.length,
        offset: itemWidth * index,
        index,
      })}
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

export default StockMarquee
