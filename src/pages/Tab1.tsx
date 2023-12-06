import { IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonPage, IonSegment, IonSegmentButton, IonSpinner, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
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
  axios.get("/api/ads-group").then(res=>{
    setCategories(res.data)
}).catch(err=>{

})
},[])
const consent=localStorage.getItem("consent")
const [showConsent,setShowConsent]=useState(consent?false:true)
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
const token=localStorage.getItem('token');
const lang=localStorage.getItem('language')||"en"
if(cities.length==0)
{
  return <div style={{width:"100%",
  height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <IonSpinner color="primary" />
  </div>
}
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <img src="assets/images/logo.png" style={{height:40}} />
          <IonButtons slot='end'>
            
              <IonIcon icon={search} style={{fontSize:24}}  />
              <IonIcon icon={notifications}  style={{fontSize:24}}  />
            </IonButtons>
        </IonToolbar>
      </IonHeader> */}
      <IonContent  className='ion-padding'>

        <button
        onClick={()=>history.push(token?"/banner/create":"/login")}
         className='btn btn-danger w-100'>
          {t("Add a new offer")}
        </button>


        {/* <div style={{overflowX:"auto",whiteSpace:"nowrap"}}
        >
          {cities.map(item=><div 
          onClick={()=>{
            setCity(item)
            setShowCity(true)
          }}
          style={{display:"inline-block",marginInlineEnd:"10px",borderRadius:"10px"}}
          
           key={item.id}>
            <img src={BASE_URL+"/images/"+item.image} 
            style={{width:"70px",height:"70px",borderRadius:"70px",display:"block",
            margin:"0 auto"
          }}
             />
             <div style={{width:"100%",textAlign:"center",paddingBottom:"5px"}}>
              <span style={{textAlign:"center",marginBottom:"5px"}}>{i18n.language=='ar'?item.name_ar:item.name_en}</span>
             </div>
          </div>)}
        </div> */}
        <span>{t("We require your emirates to find the best nearby deals")} </span>
        {cities.map(item=><IonItem onClick={()=>{
           history.push("/city/"+item.id)
        }}>
          <IonThumbnail slot='start'>
            <img src={BASE_URL+"/images/"+item.image}  />
          </IonThumbnail>
          <IonLabel>
          {i18n.language=='ar'?item.name_ar:item.name_en}
          </IonLabel>
        </IonItem>)}

        {/* {cities.map(item=><div 
        key={item.id}
          onClick={()=>{
           // setCity(item)
            //setShowCity(true)
            history.push("/city/"+item.id)
          }}
          style={{display:"block",borderRadius:"10px",position:"relative",marginBottom:"10px"}}
          
           key={item.id}>
            <img src={BASE_URL+"/images/"+item.image} 
            style={{width:"100%",height:"270px",borderRadius:"15px",display:"block",
            margin:"0 auto"
          }}
             />
             <div style={{width:"100%",height:"270px",position:"absolute",
             borderRadius:"15px",
             background:"#0002",zIndex:2,top:0
             ,textAlign:"center",paddingBottom:"5px"}}>
              <div style={{height:"200px"}}></div>
              <span style={{textAlign:"center",marginBottom:"5px",color:"#fff",
            fontSize:"35px",fontWeight:"600"
            }}>{i18n.language=='ar'?item.name_ar:item.name_en}</span>
             </div>
          </div>)} */}
{/* {   categories.map(category=> category.products.length>0&& <>
        <div className='d-flex' style={{justifyContent:"space-between",alignItems:"center"}}>
        <strong>{category['name_'+lang]}</strong>
        <a className='text-danger'
        href={"/list?category_id="+category.id}
         style={{textDecoration:"none"}}>{t("See more")}</a>
        </div>
       
        <div style={{overflowX:"auto",whiteSpace:"nowrap",height:"360px"}}
        >
        {category.products.map(item=> <div 
         className='shadow'
        onClick={()=>{
          setAd(item)
          setShowProduct(true)
        }}
        style={{display:"inline-block",
        marginInlineEnd:"10px",position:"relative",borderRadius:"10px"}}
        key={item.id}>
          <div style={{display:"block",borderRadius:"5px",}}>
         
      <img src={BASE_URL+"/images/"+item.images[0].image}
     style={{width:"115px",height:"150px",borderRadius:"10px"}}
       />

     
   
</div>
<span className='p-1' style={{overflow:"clip"}}>{item.title} </span>
         </div>)}

          </div>
          </>)} */}
          <IonModal isOpen={showConsent}>
            <IonPage>
              <IonContent className='ion-padding'>
                <strong   className='text-center d-block w-100'>أهلا بكم</strong>
                <p style={{textAlign:"right"}} className='my-1'>
                أول تطبيق يضم الخصومات و العروض المميزة في منصة واحدة بأقسام مختلفة ومن مختلف الإمارات. حاليا التطبيق متاح مجانا للشركات و المحلات المعلنة. 
                </p>
                <strong className='text-center d-block'>
                WELCOME
                </strong>
                <p className='my-1 text-right'>
                The first mobile APP that contains only offers and discounts , from different categories around the UAE. It is free APP at the present for all companies and shops.
                </p>

                <hr/>
                <div className='text-right' dir="rtl">
                  <strong >
                  قبل إدخال الإعلان على المعلن قراءة هذه التعليمات 

                  </strong>
                  <ul>
                    <li>
                    عدم نشر صور غير لائقة أو كلمات خادشة للحياء.
                    </li>
                    <li>
                    عدم نشر معلومات غير صحيحة للأسعار و المنتجات مما يعرضه للمساءلة و إلغاء الإعلان دون سابق إنذار.
                    </li>
                    <li>
                    يجب إدراج خصومات او تنزيلات لخمسة منتجات أو خدمات أو مواد على الأقل خلال فترة العرض.
                    </li>
                    <li>
                    فترة العرص من سبعة أيام إلى ثلاثين يوما.
                    </li>
                    <li>
                    يجب التأكد من كتابة أرقام التواصل و روابط السوشل ميديا وإحداثيات الموقع.
                    </li>
                    <li>
                    يجب اختيار فترة نشر الإعلان في التطبيق بشكل صحيح و فترة الخصومات.
                    </li>
                    <li>
                    ليس بالضرورة أن تكون فترة الخصومات هي نفسها فترة نشر الإعلان.
                    </li>
                    <li>
                    اختيار الصور الواضحة و الخط الواضح و القسم المناسب في الإعلان سيزيد من تواصل المتابعين.
                    </li>
                  </ul>
                </div>
               <div dir='ltr'>
              <strong> Before uploading your offer, please read these instructions carefully:</strong>
              <ul>
<li>Do not post inappropriate pictures or indecent words.</li>
<li>Do not publish incorrect information about prices and products, which exposes you to accountability and cancellation of the advertisement without further notice.</li>
<li>Discounts or promotions must be for at least 5 products, services or items during the offer period.</li>
<li>The period of offers ranges from 7 to 30 days.</li>
<li>You must make sure to write down contact numbers, social media links, and location coordinates.</li>
<li>The period for publishing the advertisement in the APP must be chosen correctly and it differs from the period for discounts.</li>
<li>The discount period does not have to be the same as the period of publication of the advertisement.</li>
<li>Choosing clear images, clear font, and the appropriate section in the APP will increase followers’ communication.</li>
</ul>
<button className='btn btn-danger w-100' onClick={()=>{
  localStorage.setItem("consent",true)
  setShowConsent(false)
}}>
  Agree / موافق
</button>
               </div>
              </IonContent>
            </IonPage>

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
               <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
 <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
 <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>
               </IconButton>
               <IconButton href={`https://wa.me/971${banner.mobile}`}>
               <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
