import { IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react"
import { IconButton } from "@mui/material"
import axios from "axios"
import { arrowBack } from "ionicons/icons"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { BASE_URL } from "../util/cinfig"
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import AdDetails from "./banner/Details"



const Search =({category,city,close})=>
{
    const [ads,setAds]=useState([])
    const [isOpen,setOpen]=useState(false)
    const [ad,setAd]=useState({})
    const getAds=()=>{
        if(category.id)
       { axios.get(`/api/ads?category_id=${category.id}&city_id=${city.id}`).then(res=>{
            setAds(res.data)
        })}
    }
useIonViewDidEnter(()=>{
   getAds()
})
const {t,i18n}=useTranslation()
return <IonPage>
    <IonHeader>
        <IonToolbar>
            <IconButton onClick={close} slot="start">
                <IonIcon icon={arrowBack}  />
            </IconButton>
            <IonTitle>{i18n.language==="ar"?category.name_ar:category.name_en} </IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">

    {ads?.map(item=> <div className='shadow rounded-lg'
        onClick={()=>{
            setAd(item)
            setOpen(true)
        }}
        style={{display:"inline-block",
        width:"100%",marginInlineEnd:"10px",position:"relative",borderRadius:"10px"}}
        key={item.id}>
          <div className="rounded-lg" style={{display:"block"}}>
         
          <Swiper
     
     modules={[ Pagination, Scrollbar, A11y,Autoplay]}
     loop
     slidesPerView={1}
     
     pagination={{ clickable: true }}
   >
    {item.images?.length>0?item.images.map(img=> <SwiperSlide key={img.id}>
     <img src={BASE_URL+"/images/"+img.image}
     style={{width:"100%",height:"330px",borderRadius:"10px"}}
       />
    </SwiperSlide>):<img src="assets/images/404.jpg"  style={{width:"100%",height:"230px"}} />}
     
   </Swiper>
 <div >


<div >

  <div className="px-2">
<h2 style={{fontWeight:"bold"}}>{item.title} </h2>
    </div>

  </div>
  </div>
     
   
</div>

         </div>)}
        <IonModal isOpen={isOpen} >
            <AdDetails product={ad} close={()=>setOpen(false)} />
        </IonModal>
    </IonContent>
</IonPage>
}


export default Search