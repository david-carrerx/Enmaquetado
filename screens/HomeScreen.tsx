import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, NativeScrollEvent, NativeSyntheticEvent, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar'; 
import poster from '../assets/poster.jpg';
import promocion from "../assets/promocion.png"
import motorcycle from "../assets/motorcycle.jpg"
import socialIcon from '../assets/social.png';
import cartIcon from '../assets/cart.png';
import moreIcon from '../assets/plus.png'
import motoIcon from '../assets/moto.png'
import promoIcon from '../assets/promo.png'
import miniIcon from '../assets/iconMoto.png'
import { useInfiniteQuery } from 'react-query';

const { width } = Dimensions.get('window');


export default function HomeScreen() {
  const [images, setImages] = useState([poster, promocion]);
  const [isLoading, setIsLoading] = useState(false);

  const renderItem = ({ item }: { item: any }) => (
    <Image
      source={item}
      style={styles.image}
      resizeMode='cover'
    />
  );

  const renderLoader = () => {
    return(
      <View>
        <ActivityIndicator size="large" color="#aaa"></ActivityIndicator>
      </View>
    )
  }

  const loadMoreItem = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setImages(prevImages => [
        ...prevImages,
        poster, 
        promocion
      ]);
      setIsLoading(false);
    }, 0); 
  }  
  
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTitle}>Bikermarket</Text>
        <SearchBar />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imagesScroll}>
            <FlatList
              data={images}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              //ListFooterComponent={renderLoader}
              onEndReached={loadMoreItem}
              onEndReachedThreshold={0}
              ListFooterComponent={isLoading ? renderLoader : null}
            >
            </FlatList>
        </View>
        
        <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button}>
                <Image source={motoIcon} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.buttonLabel}>Eventos</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button}>
                <Image source={cartIcon} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.buttonLabel}>Marketplace</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button}>
                <Image source={promoIcon} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.buttonLabel}>Promociones</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button}>
                <Image source={socialIcon} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.buttonLabel}>Sociales</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button}>
                <Image source={moreIcon} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.buttonLabel}>Otros</Text>
            </View>  
        </View>

        <View style={styles.promoScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <Image source={promocion}  style={styles.promoImage} resizeMode="stretch"/>
            </ScrollView>
        </View>

        <View style={styles.products}>
            <Text style={styles.productText}>Los mejores productos 🔥</Text>
            <View style={styles.separatorOrange} />
            <ScrollView horizontal showsHorizontalScrollIndicator={true} >
            <View  style={styles.card}>
                <View style={styles.productNameContainer}>
                    <Text style={styles.productName}>Motocicleta</Text>
                    <Image source={miniIcon} style={styles.productIcon} />
                </View>
                  <Image source={motorcycle} style={styles.productImage} resizeMode="cover" />
                <Text style={styles.productBrand}>Italika 2023</Text>
                <Text style={styles.productStatus}>Usado - Como nuevo</Text>
                <View style={styles.separator} />
                <Text style={styles.productPrice}>$15,000</Text>
              </View>

              <View  style={styles.card}>
                <View style={styles.productNameContainer}>
                <Text style={styles.productName}>Motocicleta</Text>
                <Image source={miniIcon} style={styles.productIcon} />
                </View>
                <View style={styles.imageContainer}>
                  <Image source={motorcycle} style={styles.productImage} resizeMode="cover" />
                </View>
                <Text style={styles.productBrand}>Italika 2023</Text>
                <Text style={styles.productStatus}>Usado - Como nuevo</Text>
                <View style={styles.separator} />
                <Text style={styles.productPrice}>$15,000</Text>
              </View>

              <View  style={styles.card}>
              <View style={styles.productNameContainer}>
                <Text style={styles.productName}>Motocicleta</Text>
                <Image source={miniIcon} style={styles.productIcon} />
                </View>
                <View style={styles.imageContainer}>
                  <Image source={motorcycle} style={styles.productImage} resizeMode="cover" />
                </View>
                <Text style={styles.productBrand}>Italika 2023</Text>
                <Text style={styles.productStatus}>Usado - Como nuevo</Text>
                <View style={styles.separator} />
                <Text style={styles.productPrice}>$15,000</Text>
              </View>
            </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: "15%",
    backgroundColor: '#ff451b',
    zIndex: 0, 
    elevation: 1,
    marginBottom: 3
  },
  scrollView: {
    flex: 1,
    marginHorizontal: '1%',
  },
  scrollContent:{
    flexGrow: 1
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '7%',
    marginBottom: 9
  },
  imagesScroll: {
    height: '30%',
    width: "100%",
    borderRadius: 5,
    paddingTop: 2
  },
  image: {
    height: '100%',
    width: 390,
    marginRight: 10,
    borderRadius: 5
  },
  promoImage: {
    height: '100%',
    width: width - 10,
     
    borderRadius: 5
  },
   buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    height: "15%",
    paddingTop: 10
  },
  buttonWrapper: {
    alignItems: 'center',
    marginRight: 0,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff451b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  icon: {
    width: 27, 
    height: 27, 
  },
  buttonLabel: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: 11,
    fontWeight: "bold",
    color: '#000',
  },
  promoScroll: {
    paddingTop: 0,
    height: "15%",
    width: "100%",
    borderRadius: 5
  },
  products:{
    height:"40%",
    paddingTop: 10
  },
  productText:{
    fontWeight: 'bold',
    color: '#ff804a',
    fontSize: 18
  },
  separatorOrange: {
    height: 1,
    backgroundColor: '#ff804a',
    marginVertical: 5,
    width: "98%",
    justifyContent: "center",
    marginBottom: 8
  },
  card: {
    width: 145,
    height: '100%',
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d7d7d7',
    overflow: 'hidden',
    padding: 10,
    justifyContent: 'space-between',
  },
  productNameContainer: {
    flexDirection: 'row',
    alignItems: "center"
  },
  productName: {
    fontSize: 16,
    marginBottom: 3
  },
  productIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  imageContainer:{
    borderRadius: 5
  },
  productImage: {
    width: '100%',
    height: 80,
    borderRadius: 5
  },
  productBrand: {
    fontSize: 14,
    textAlign: 'left',
  },
  productStatus: {
    fontSize: 12,
    textAlign: 'left',
    color: '#888',
  },
  separator: {
    height: 2,
    backgroundColor: '#d7d7d7',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
