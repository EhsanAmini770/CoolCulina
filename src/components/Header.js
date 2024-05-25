// src/components/Header.js
import React from 'react';
import { View, Text } from 'react-native';
import ProfileHeaderButton from './ProfileHeaderButton';
import { useNavigation } from '@react-navigation/native';
import { homeScreenStyles } from '../styles/homeScreenStyles';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={homeScreenStyles.headerContainer}>
      <Text style={homeScreenStyles.headerTitle}>{title}</Text>
      <ProfileHeaderButton navigation={navigation} />
    </View>
  );
};

export default Header;
