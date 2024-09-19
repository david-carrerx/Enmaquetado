import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import searchIcon from '../assets/search.png'; 

const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={searchIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar en bikermarket..."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingBottom: "3%",
    backgroundColor: '#ff451b', 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
