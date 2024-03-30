import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
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

  const wrappedData = useMemo(() => {
    return [...data, ...data]
  }, [data])

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

  const scrolling = () => {
    let localCurrentPosition = currentPosition

    if (localCurrentPosition < 0) localCurrentPosition = 0

    if (data.length > NO_PER_SCREEN) {
      const position = currentPosition + 1
      tickerRef.current?.scrollToOffset({ offset: position, animated: false })
      const maxOffset = data.length * itemWidth

      if (localCurrentPosition > maxOffset) {
        const offset = localCurrentPosition - maxOffset
        tickerRef.current?.scrollToOffset({ offset, animated: false })
        setCurrentPosition(offset)
      } else {
        setCurrentPosition(position)
      }
    }
  }

  useEffect(() => {
    const activeInterval = setInterval(scrolling, 0.1)

    return () => clearInterval(activeInterval)
  }, [scrolling])

  return (
    <FlatList
      ref={tickerRef}
      initialNumToRender={4}
      getItemLayout={(_, index) => ({
        length: data.length,
        offset: itemWidth * index,
        index,
      })}
      showsHorizontalScrollIndicator={false}
      data={wrappedData}
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
