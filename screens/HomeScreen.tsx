import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native';
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

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [images, setImages] = useState([poster, promocion]);
  const [isLoading, setIsLoading] = useState(false);

  const renderItem = ({ item }: { item: any }) => (
    <Image
      source={item}
      style={styles.eventImage}
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            <View  style={styles.card}>
                <View style={styles.productNameContainer}>
                    <Text style={styles.productName}>Motocicleta</Text>
                    <Image source={miniIcon} style={styles.productIcon} />
                </View>
                <View style={styles.productImageContainer}>
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
                <View style={styles.productImageContainer}>
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
                <View style={styles.productImageContainer}>
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
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '7%',
    marginBottom: 9
  },
  scrollView: {
    flex: 1,
    marginHorizontal: '1%',
  },
  scrollContent:{
    flexGrow: 1
  },
  imagesScroll: {
    height: '30%',
    width: width,
    borderRadius: 5,
    paddingTop: 2,
    backgroundColor: 'pink'
  },
  eventImage: {
    height: '100%',
    width: width * 0.90,
    marginRight: width * 0.05,
    borderRadius: 5
  },
   buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    height: "13%",
    paddingTop: 10,
    //backgroundColor: 'green'
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    width: 45,
    height: 45,
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
    fontSize: 10,
    fontWeight: "bold",
    color: '#000',
  },
  promoScroll: {
    paddingTop: 0,
    height: "15%",
    width: width,
    borderRadius: 5
  },
  promoImage: {
    height: '100%',
    width: width * 0.98,
    borderRadius: 5
  },
  products:{
    height:"42%",
    paddingTop: 10,
  },
  productText:{
    fontWeight: 'bold',
    color: '#ff804a',
    fontSize: 18,
  },
  separatorOrange: {
    height: 1,
    backgroundColor: '#ff804a',
    marginVertical: 5,
    width: width * 0.98,
    justifyContent: "center",
    marginBottom: 8
  },
  card: {
    width: width * 0.33,
    height: '100%',
    marginRight: width * 0.02,
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
    alignItems: "center",
  },
  productName: {
    fontSize: 14,
    marginBottom: 2
  },
  productIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  productImageContainer:{
    borderRadius: 5,
    height: "50%"
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  productBrand: {
    fontSize: 12,
    textAlign: 'left',
  },
  productStatus: {
    fontSize: 10,
    textAlign: 'left',
    color: '#888',
  },
  separator: {
    height: 2,
    backgroundColor: '#d7d7d7',
    marginVertical: 1,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
