import { useRef } from "react";
import { Animated } from "react-native";

const useScrollDirection = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const direction = useRef('up');

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY > lastScrollY.current && direction.current !== 'down') {
      direction.current = 'down';
      Animated.spring(scrollY, {
        toValue: 100,
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY < lastScrollY.current && direction.current !== 'up') {
      direction.current = 'up';
      Animated.spring(scrollY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
    lastScrollY.current = currentScrollY;
  };

  return { translateY, handleScroll };
};

export default useScrollDirection;
