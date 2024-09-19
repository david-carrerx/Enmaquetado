import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
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
import evento1 from '../assets/evento1.jpg'
import evento2 from '../assets/evento2.jpg'

const { width } = Dimensions.get('window');
const viewedConfig = { itemVisiblePercentThreshold: 26 };

export default function HomeScreen() {
  const [images, setImages] = useState([poster, promocion, evento1, evento2]);
  const [promoImages, setPromoImages] = useState([promocion, evento1, evento2]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [visibleItemsPromo, setVisibleItemsPromo] = useState<number[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const flatListPromoRef = useRef<FlatList>(null); 

  useEffect(() => {
    const intervalImages = setInterval(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: (visibleItems[0] || 0) + 1,
          viewOffset: 0,
          viewPosition: 0.5,
          animated: true,
        });
      }
    }, 7000);

    return () => clearInterval(intervalImages);
  }, [visibleItems]);

  useEffect(() => {
    const intervalPromo = setInterval(() => {
      if (flatListPromoRef.current) {
        flatListPromoRef.current.scrollToIndex({
          index: (visibleItemsPromo[0] || 0) + 1,
          viewOffset: 0,
          viewPosition: 0.5,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(intervalPromo);
  }, [visibleItemsPromo]);
  
  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const isVisible = visibleItems.includes(index);
    return (
      <Image
        source={item}
        style={[
          styles.eventImage,
          { opacity: isVisible ? 1 : 0.5 } 
        ]}
        resizeMode='stretch'
      />
    );
  };

  const renderPromoItem = ({ item, index }: { item: any, index: number }) => {
    const isVisible = visibleItemsPromo.includes(index);
    return(
    <Image
      source={item}
      style={[
        styles.promoImage,
        { opacity: isVisible ? 1 : 0.1 }
        ]} 
      resizeMode="stretch"
    />
    );
  };

  const onViewedItemsChanged = useRef(({ viewableItems }: any) => {
    const visibleIndexes = viewableItems.map((item: any) => item.index);
    setVisibleItems(visibleIndexes);
  });

  const onViewedItemsChangedPromo = useRef(({ viewableItems }: any) => {
    const visibleIndexes = viewableItems.map((item: any) => item.index);
    setVisibleItemsPromo(visibleIndexes);
  });

  const renderFooter = () => {
    return (
      <View style={{ width: width * 0.90 + width * 0.03 }} /> 
    );
  };

  const renderFooterPromo = () => {
    return (
      <View style={{ width: width * 0.92 + width * 0.04 }} /> 
    );
  };

  const loadMoreItem = () => {
    if (isLoading) return;
    setIsLoading(true);
      setImages(prevImages => [
        ...prevImages,
        ...images
      ]);
      setIsLoading(false);
  };
  
  const loadMorePromoItems = () => {
    if (isLoading) return;
      setIsLoading(true);
      setPromoImages(prevImages => [
        ...prevImages,
        ...promoImages 
      ]);
      setIsLoading(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bikermarket</Text>
        <SearchBar />
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imagesScroll}>
            <FlatList
              ref={flatListRef}
              data={images}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              //ListFooterComponent={renderLoader}
              snapToInterval={width * 0.90 + width * 0.03}
              decelerationRate="fast"
              onEndReached={loadMoreItem}
              onEndReachedThreshold={1}
              //ListFooterComponent={isLoading ? renderLoader : null}
              ListFooterComponent={renderFooter}
              extraData={visibleItems}
              onViewableItemsChanged={onViewedItemsChanged.current}
              viewabilityConfig={viewedConfig}
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
            <FlatList
              ref={flatListPromoRef}
              data={promoImages}
              renderItem={renderPromoItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={width * 0.92 + width * 0.04}
              decelerationRate="fast"
              ListFooterComponent={renderFooterPromo}
              onEndReached={loadMorePromoItems} 
              onEndReachedThreshold={1}
              extraData={visibleItemsPromo}
              onViewableItemsChanged={onViewedItemsChangedPromo.current}
              viewabilityConfig={viewedConfig}
              >
            </FlatList>
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
    //backgroundColor: 'pink'
  },
  eventImage: {
    height: '100%',
    width: width * 0.90, 
    //width: "90%", 
    marginRight: width * 0.03,
    borderRadius: 5,
    backgroundColor: 'blue'
  },
   buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
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
    fontWeight: "300",
    color: '#212121',
    paddingTop: 1
  },
  promoScroll: {
    height: "15%",
    //padding: "1%",
    width: width,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
    //backgroundColor: 'pink'
  },
  promoImage: {
    height: '100%',
    width: width * 0.92,
    //marginLeft: width * 0.04,
    marginHorizontal: width * 0.04,
    borderRadius: 5
  },
  products:{
    height:"42%",
    paddingTop: 10,
  },
  productText:{
    fontWeight: 'bold',
    color: '#ff804a',
    fontSize: 16,
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
