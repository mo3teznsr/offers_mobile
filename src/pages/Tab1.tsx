import { IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonLabel, IonModal, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { close, notifications, search } from 'ionicons/icons';
import { BASE_URL } from '../util/cinfig';
import { MyAds } from './account/ads';
import { useTranslation } from 'react-i18next';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../components/Product';
import { AdsView } from '../components/Ads';
import { IconButton } from '@mui/material';
import { ProductDetails } from './ads/Details';
import { useHistory } from 'react-router';
import AdDetails from './banner/Details';
import City from './City';

const Tab1: React.FC = (user) => {
const [ads,setAds]=useState([])
const [comments,setComments]=useState([])
const [categories,setCategories]=useState([])
const [banners,setBanners]=useState([])
const [filters,setFilter]=useState({category:""})
const [showBanner,setShowBanner]=useState(false)
const [banner,setBanner]=useState({})
const [product,setProduct]=useState({})
const [cities,setCities]=useState([])
const [showProduct,setShowProduct]=useState(false)
const [city,setCity]=useState({})
const [showCity,setShowCity]=useState(false)


const [show,setShow]=useState('ads')
useEffect(()=>{
  axios.get('/api/city').then(res=>{
    setCities(res.data)
  })
  axios.get("/api/ads").then(res=>{
    setAds(res.data)
  })
  axios.get('/api/home').then(res=>{
setBanners(res.data.banners)
//setAds(res.data.products)
  })
  axios.get("/api/category").then(res=>{
    setCategories(res.data)
}).catch(err=>{

})
},[])
const [ad,setAd]=useState({})
const slideOpts = {
  initialSlide: 1,
  speed: 400,
};
const history=useHistory()
const {t,i18n}=useTranslation()
const productDetails=(item)=>{
  setProduct(item)
  setShowProduct(true)
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <img src="assets/images/logo.png" style={{height:40}} />
          <IonButtons slot='end'>
            
              <IonIcon icon={search} style={{fontSize:24}}  />
              <IonIcon icon={notifications}  style={{fontSize:24}}  />
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent  className='ion-padding'>


<h3>{t("Emirates")} </h3>
        <div style={{overflowX:"auto",whiteSpace:"nowrap",height:"160px"}}
        >
          {cities.map(item=><div 
          onClick={()=>{
            setCity(item)
            setShowCity(true)
          }}
          style={{display:"inline-block",marginInlineEnd:"10px",borderRadius:"10px"}}
          className='shadow' 
           key={item.id}>
            <img src={BASE_URL+"/images/"+item.image} 
            style={{width:"100%",height:"120px",borderRadius:"10px"}}
             />
             <div style={{width:"100%",textAlign:"center",paddingBottom:"5px"}}>
              <span style={{textAlign:"center",marginBottom:"5px"}}>{i18n.language=='ar'?item.name_ar:item.name_en}</span>
             </div>
          </div>)}
        </div>
        <h3>{t("Ads")}</h3>
        <div style={{overflowX:"auto",whiteSpace:"nowrap",height:"360px"}}
        >
        {ads.map(item=> <div className='shadow'
        onClick={()=>{
          setAd(item)
          setShowProduct(true)
        }}
        style={{display:"inline-block",
        width:"300px",marginInlineEnd:"10px",position:"relative"}}
        key={item.id}>
          <div style={{display:"block"}}>
         
      <img src={BASE_URL+"/images/"+item.images[0].image}
     style={{width:"300px",height:"330px",borderRadius:"10px"}}
       />
 <div style={{background:"#4442",position:"absolute",top:0,left:0,height:"330px",zIndex:2,width:"100%",borderRadius:"15px"}}>


<div style={{position:"relative",height:"330px"}}>

  <div style={{position:"absolute",bottom:"15px",color:"#fff",left:"10px",zIndex:4}}>
<h2 style={{fontWeight:"bold"}}>{item.title} </h2>
    </div>

  </div>
  </div>
     
   
</div>

         </div>)}

          </div>

          <IonModal isOpen={showProduct}>
            <AdDetails product={ad} close={()=>setShowProduct(false)} />
          </IonModal>

          <IonModal isOpen={showCity}>
            <City city={city} close={()=>setShowCity(false)} />
          </IonModal>

          {/* <IonModal isOpen={showProduct}>
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IconButton onClick={()=>setShowProduct(false)}>
                  <IonIcon icon={close} />
                </IconButton>
              </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
            <ProductDetails product={product} />
            </IonContent>
            </IonPage>
          </IonModal> */}

         <IonModal isOpen={showBanner}>
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IconButton onClick={()=>setShowBanner(false)}>
                  <IonIcon icon={close} />
                </IconButton>
              </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
            <img src={BASE_URL+"/images/"+banner.main} 
      style={{width:"100%",height:"630px",objectFit:"cover",marginBottom:".5rem"}}
        />
        <div style={{display:"flex",justifyContent:"center"}}>
               <IconButton href={`tel:0${banner.mobile}`}>
               <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
 <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
 <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>
               </IconButton>
               <IconButton href={`https://wa.me/971${banner.mobile}`}>
               <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
 <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
 <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
 <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
</svg>
               </IconButton>
           </div>
            </IonContent>
          </IonPage>
         </IonModal>

       
      
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
