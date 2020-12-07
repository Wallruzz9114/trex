import React, { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SCREEN_WIDTH } from '../../constants';

export interface IDatePickerProps {
  style?: StyleProp<ViewStyle>;
  defaultYear?: number;
  defaultMonth?:
    | 'Jan'
    | 'Feb'
    | 'Mar'
    | 'Apr'
    | 'May'
    | 'Jun'
    | 'Jul'
    | 'Aug'
    | 'Sep'
    | 'Oct'
    | 'Nov'
    | 'Dec';
  defaultDate?: number;
  onDateChange?: (date: number) => void;
  onMonthIndexChange?: (index: number) => void;
  onYearChange?: (year: number) => void;
}

export const MONTH_ALIAS = [
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
  'Dec',
];

// const DAY_LIMITS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DATES = [...Array(32).keys()].splice(1, 31);
const YEARS = [...Array(2021).keys()].splice(1900, 121);

const styles = StyleSheet.create({
  container: {
    width: 0.6 * SCREEN_WIDTH,
  },

  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44 * 3,
    overflow: 'hidden',
  },

  timeColumn: {
    width: '32%',
  },

  optionItem: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTopLine: {
    width: '100%',
    top: 44,
    left: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  activeBottomLine: {
    width: '100%',
    top: 88,
    left: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  blackLine: {
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '32%',
  },
});

const scrollEventHandlers = (
  onYearChange: Function,
  onMonthIndexChange: Function,
  onDateChange: Function,
  activeDateIndex: number,
  setActiveDateIndex: React.Dispatch<React.SetStateAction<number>>,
  activeMonthIndex: number,
  setActiveMonthIndex: React.Dispatch<React.SetStateAction<number>>,
  activeYearIndex: number,
  setActiveYearIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const _onScrollDate = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    const offsetForScroll = offsetY / 44 - Math.floor(offsetY / 44);

    let nextIndex: number = 0;

    if (offsetForScroll > 0.5) {
      nextIndex = Math.floor(offsetY / 44) + 1;
    } else nextIndex = Math.floor(offsetY / 44);

    if (activeDateIndex !== nextIndex) {
      setActiveDateIndex(nextIndex);
      onDateChange(DATES[nextIndex]);
    }
  };

  const _onScrollMonth = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    const offsetForScroll = offsetY / 44 - Math.floor(offsetY / 44);
    console.log(offsetForScroll);

    let nextIndex: number = 0;

    if (offsetForScroll > 0.5) {
      nextIndex = Math.floor(offsetY / 44) + 1;
    } else nextIndex = Math.floor(offsetY / 44);

    if (activeMonthIndex !== nextIndex) {
      setActiveMonthIndex(nextIndex);
      onMonthIndexChange(nextIndex);
    }
  };

  const _onScrollYear = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    const offsetForScroll = offsetY / 44 - Math.floor(offsetY / 44);

    let nextIndex: number = 0;

    if (offsetForScroll > 0.5) {
      nextIndex = Math.floor(offsetY / 44) + 1;
    } else nextIndex = Math.floor(offsetY / 44);

    if (activeYearIndex !== nextIndex) {
      setActiveYearIndex(nextIndex);
      onYearChange(YEARS[nextIndex]);
    }
  };

  return { _onScrollDate, _onScrollMonth, _onScrollYear };
};

const DatePicker: React.FC<IDatePickerProps> = ({
  defaultDate,
  defaultMonth,
  defaultYear,
  onYearChange,
  onMonthIndexChange,
  onDateChange,
  style,
}) => {
  const dateReference = useRef<ScrollView>(null);
  const monthRefence = useRef<ScrollView>(null);
  const yearReference = useRef<ScrollView>(null);
  const [activeDateIndex, setActiveDateIndex] = useState<number>(
    defaultDate ? DATES.indexOf(defaultDate) : 1
  );
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(
    defaultMonth ? MONTH_ALIAS.indexOf(defaultMonth) : 1
  );
  const [activeYearIndex, setActiveYearIndex] = useState<number>(
    defaultYear ? YEARS.indexOf(defaultYear) : 1
  );

  const { _onScrollDate, _onScrollMonth, _onScrollYear } = scrollEventHandlers(
    onYearChange || Function,
    onMonthIndexChange || Function,
    onDateChange || Function,
    activeDateIndex,
    setActiveDateIndex,
    activeMonthIndex,
    setActiveMonthIndex,
    activeYearIndex,
    setActiveYearIndex
  );

  const _onScrollEnd = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>, type: number) => {
    /**
     * TYPE:1 => SCROLLDATE
     * TYPE:2=>SCROLLMONTH
     * TYPE:3=>SCROLLYEAR
     */
    const offsetY = nativeEvent.contentOffset.y;
    const offsetForScroll = offsetY / 44 - Math.floor(offsetY / 44);

    let nextIndex = 0;

    if (offsetForScroll > 0.5) {
      nextIndex = Math.floor(offsetY / 44) + 1;
    } else {
      nextIndex = Math.floor(offsetY / 44);
    }

    switch (type) {
      case 1:
        dateReference.current?.scrollTo({ x: 0, y: nextIndex * 44, animated: true });
        break;
      case 2:
        monthRefence.current?.scrollTo({ x: 0, y: nextIndex * 44, animated: true });
        break;
      case 2:
        yearReference.current?.scrollTo({ x: 0, y: nextIndex * 44, animated: true });
        break;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.wrapper}>
        <ScrollView
          onScrollEndDrag={(event) => {
            _onScrollEnd(event, 2);
          }}
          scrollEventThrottle={30}
          onScroll={_onScrollMonth}
          onLayout={() => {
            monthRefence.current?.scrollTo({ x: 0, y: activeMonthIndex * 44, animated: false });
          }}
          ref={monthRefence}
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.timeColumn}
        >
          <View>
            <TouchableOpacity activeOpacity={1} style={styles.optionItem}></TouchableOpacity>
            {MONTH_ALIAS.map((month: string, index: number) => (
              <TouchableOpacity activeOpacity={1} key={index} style={styles.optionItem}>
                <Text
                  style={{
                    color: activeMonthIndex == index ? '#000' : '#666',
                    fontWeight: activeMonthIndex == index ? '600' : '400',
                    fontSize: activeMonthIndex == index ? 16 : 14,
                  }}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity activeOpacity={1} style={styles.optionItem}></TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView
          onScrollEndDrag={(event) => {
            _onScrollEnd(event, 1);
          }}
          scrollEventThrottle={30}
          onScroll={_onScrollDate}
          onLayout={() => {
            dateReference.current?.scrollTo({ x: 0, y: activeDateIndex * 44, animated: false });
          }}
          ref={dateReference}
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.timeColumn}
        >
          <View>
            <TouchableOpacity activeOpacity={1} style={styles.optionItem}></TouchableOpacity>
            {YEARS.map((years: number, index: number) => (
              <TouchableOpacity activeOpacity={1} key={index} style={styles.optionItem}>
                <Text
                  style={{
                    color: activeYearIndex === index ? '#000' : '#666',
                    fontWeight: activeYearIndex === index ? '600' : '400',
                    fontSize: activeYearIndex === index ? 16 : 14,
                  }}
                >
                  {years}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity activeOpacity={1} style={styles.optionItem}></TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView
          onScrollEndDrag={(e) => {
            _onScrollEnd(e, 3);
          }}
          scrollEventThrottle={30}
          onScroll={_onScrollYear}
          onLayout={() => {
            yearReference.current?.scrollTo({
              x: 0,
              y: activeYearIndex * 44,
              animated: false,
            });
          }}
          ref={yearReference}
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.timeColumn}
        >
          <View>
            <TouchableOpacity activeOpacity={1} style={styles.optionItem}></TouchableOpacity>
            {YEARS.map((years: number, index: number) => (
              <TouchableOpacity activeOpacity={1} key={index} style={styles.optionItem}>
                <Text
                  style={{
                    color: activeYearIndex === index ? '#000' : '#666',
                    fontWeight: activeYearIndex === index ? '600' : '400',
                    fontSize: activeYearIndex === index ? 16 : 14,
                  }}
                >
                  {years}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity activeOpacity={1} style={styles.optionItem}></TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.activeTopLine}>
          <View style={styles.blackLine} />
          <View style={styles.blackLine} />
          <View style={styles.blackLine} />
        </View>
        <View style={styles.activeBottomLine}>
          <View style={styles.blackLine} />
          <View style={styles.blackLine} />
          <View style={styles.blackLine} />
        </View>
      </View>
    </View>
  );
};

export default DatePicker;
