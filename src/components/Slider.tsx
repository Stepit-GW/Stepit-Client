import React, {useState} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import styled from 'styled-components/native';
import {Platform, StyleSheet, Text, View} from 'react-native';

const Slider = () => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100]);

  const multiSliderValuesChange = (values: any) => setMultiSliderValue(values);

  return (
    <View style={styles.viewContainer}>
      <View style={styles.sliderWrapper}>
        <View style={styles.labelWrapper}>
          <Text style={styles.labelText}>{multiSliderValue[0]} </Text>
          <Text>{multiSliderValue[1]}</Text>
        </View>
        <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 30,
                width: 30,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
              },
              android: {
                height: 30,
                width: 30,
                borderRadius: 50,
                backgroundColor: '#1792E8',
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 30,
                width: 30,
                borderRadius: 20,
                backgroundColor: '#148ADC',
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: '#1792E8',
          }}
          trackStyle={{
            backgroundColor: '#CECECE',
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          values={[multiSliderValue[0], multiSliderValue[1]]}
          sliderLength={280}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={100}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
        />
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  viewContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  sliderWrapper: {
    margin: 20,
    width: 280,
    height: 300,
    justifyContent: 'center',
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  labelText: {
    fontSize: 20,
  },
});
