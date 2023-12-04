import { IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import { IconButton } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router"
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { BASE_URL } from "../../util/cinfig";
import moment from "moment";
import { location } from "ionicons/icons";




export const ProductDetails=({product})=>{







    return  <>{product?   <div>
        <Swiper
     
     modules={[ Pagination, Scrollbar, A11y,Autoplay]}
     loop
     slidesPerView={1}
     
     pagination={{ clickable: true }}
     onSwiper={(swiper) => console.log(swiper)}
     onSlideChange={() => console.log('slide change')}
   >
    {product.images?.length>0?product.images.map(item=> <SwiperSlide key={item.id}>
     <img src={BASE_URL+"/images/"+item.image}
     style={{width:"100%",height:"230px"}}
       />
    </SwiperSlide>):<img src="assets/images/404.jpg"  style={{width:"100%",height:"230px"}} />}
     
   </Swiper>

   <div style={{padding:".5rem"}}>
        <div 
        style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
            <h3>{product.title}</h3>
            <span>{moment(product.created_at).fromNow()} </span>
            </div>

            <span>{Intl.NumberFormat().format(product.price)} AED</span>

            
       

        </div>
        {product&&
           
           <div style={{display:"flex",justifyContent:"center"}}>
               <IconButton href={`tel:0${product?.mobile}`}>
               <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
 <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
 <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>
               </IconButton>
               <IconButton href={`https://wa.me/971${product?.mobile}`}>
               <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-whatsapp" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
 <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
 <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
 <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
</svg>
               </IconButton>
           </div>
           }

        <IonItem>
                <IonIcon icon={location} />
                <IonTitle>
                    {product.city.name_en} : {product.area.name_en}
                </IonTitle>
            </IonItem>
            <table className="table">
                {product.fields.map(item=><tr>
                    <th>{item.field?.name_en}</th>
                    <td>{item.value}</td>
                </tr>)}
            </table>
            <h4>Other details</h4>
            <span>{product.description}</span>
      
    </div>

   </div>:<div style={{textAlign:"center",paddingTop:500}}>
    <IonSpinner />
    </div>}

   </>
   
      
}