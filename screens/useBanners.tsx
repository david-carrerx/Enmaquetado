import { db } from "../config/firebase";
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const fetchMainBanners = (setImages: (images: string[]) => void) => {
    const q = query(collection(db, 'banners'), where('mainBanner', '==', true));
    return onSnapshot(q, (querySnapshot) => {
      const imageUrls: string[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.url) {
          imageUrls.push(data.url);
        }
      });
      setImages(imageUrls);
    });
  };
  
  export const fetchPromoBanners = (setPromoImages: (promoImages: string[]) => void) => {
    const q = query(collection(db, 'banners'), where('secondaryBanner', '==', true));
    return onSnapshot(q, (querySnapshot) => {
      const imageUrls: string[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.url) {
          imageUrls.push(data.url);
        }
      });
      setPromoImages(imageUrls);
    });
  };