

import { StatusBar, setStatusBarBackgroundColor } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const width = Dimensions.get('window').width - 20;
let currentSlideIndex = 0;
let intervalId;

export default function Slider({ data, title, onSlidePress }) {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSlideIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSlideIndex);
  });

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const flatList = useRef();

  const handleScrollTo = (index) => {
    flatList.current?.scrollToIndex({ animated: false, index });
  };

  const startSlider = () => {
    if (currentSlideIndex <= dataToRender.length - 2) {
      intervalId = setInterval(() => {
        flatList.current?.scrollToIndex({
          animated: true,
          index: currentSlideIndex + 1,
        });
      }, 4000);
    } else {
      pauseSlider();
    }
  };

  const pauseSlider = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (dataToRender.length && flatList.current) {
      startSlider();
    }
    return () => {
      pauseSlider();
    };
  }, [dataToRender.length]);

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataToRender([...newData]);
  }, [data.length]);

  useEffect(() => {
    const length = dataToRender.length;

    if (visibleSlideIndex === length - 1 && length) handleScrollTo(1);

    if (visibleSlideIndex === 0 && length) handleScrollTo(length - 2);

    const lastSlide = currentSlideIndex === length - 1;
    const firstSlide = currentSlideIndex === 0;

    if (lastSlide && length) setActiveSlideIndex(0);
    else if (firstSlide && length) setActiveSlideIndex(length - 2);
    else setActiveSlideIndex(currentSlideIndex - 1);
  }, [visibleSlideIndex]);

  //  082202 - 1
  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => onSlidePress(item)}>
        <View>
          <Image source={{ uri: item.thumbnail }} style={styles.slideImage} />
          <View style={{ width }}>
            <Text numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      {/* ANOMALY HERE SHOULD BE? TEST NALANG: <View style={styles.sliderHead}> */}
      <View style={styles.sliderContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.slideIndicatorContainer}>
          <SlideIndicators data={data} activeSlideIndex={activeSlideIndex} />
        </View>
      </View>
      <FlatList
        ref={flatList}
        data={dataToRender}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // ANOMALY HERE NAKALAGAY 1 SA ORIGINAL ANG VALUE 
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        onScrollBeginDrag={pauseSlider}
        onScrollEndDrag={startSlider}
        renderItem={renderItem}
      />
    </View>
  );
}

const SlideIndicators = ({ data, activeSlideIndex }) =>
  data.map((item, index) => {
    return (
      <View
        key={item.id}
        style={[
          styles.slides,
          {
            backgroundColor:
            activeSlideIndex === index ? "#383838" : "transparent",
          },
        ]}
      />
    );
  });

const styles = StyleSheet.create({
  container: {
    width,
    padding: 10,
    borderRadius: 10, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, 
    backgroundColor: "#fff", 
  },
  sliderContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontWeight: '700', color: "#383838", fontSize: 22 },
  slideIndicatorContainer: { flexDirection: 'row', alignItems: 'center' },
  slides: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginLeft: 5,
  },
  slideImage: { width, height: width / 1.7, borderRadius: 7 },
});