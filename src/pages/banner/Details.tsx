import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react"
import { useState } from "react";
import { Navigation,Zoom, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import { Loader } from "@googlemaps/js-api-loader"
import { Swiper, SwiperSlide } from 'swiper/react';
import { BASE_URL } from "../../util/cinfig";
import axios from "axios";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router";
import moment from "moment";
import { useTranslation } from "react-i18next";





const AdDetails=({product,close})=>{

var map 
var marker
   // const [product,setProduct]=useState({})


    useIonViewWillEnter(()=>{
        const id=window.location.pathname.replace("/details/","");
        // axios.get('/api/ads/'+id).then(res=>{
        //     setProduct(res.data)
        // })
        const loader = new Loader({
            apiKey: "AIzaSyBLBPyA77WBsP-cuSSLtr0gEGu_Gc6Piv8",
            version: "weekly",
           
          });
        loader.load().then(async (google) => {

            const { Map } = await google.maps.importLibrary("maps");
          
            map = new Map(document.getElementById("map"), {
              center: { lat: product.lat, lng: product.lng },
              zoom: 9,
              mapTypeId:"terrain",
            });
            marker=new google.maps.Marker({
                position: { lat: product.lat, lng: product.lng },
                map,
                title: product.title,
              });
             
             
            
          });
      
    })


const history=useHistory()
const {t,i18n}=useTranslation()
    return <IonPage>
        <IonContent>
            <div style={{position:"relative"}}>
                <IconButton
                onClick={()=>close()}
                 style={{position:"absolute",left:"10px",top:"10px",zIndex:3}}>

<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l14 0" />
  <path d="M5 12l6 6" />
  <path d="M5 12l6 -6" />
</svg>
                </IconButton>
            <Swiper
     
     modules={[ Pagination, Scrollbar, A11y,Autoplay,Zoom]}
     loop
     slidesPerView={1}
     
     pagination={{ clickable: true }}
   >
    {product.images?.length>0?product?.images?.map(item=> <SwiperSlide key={item.id}>
     <img src={BASE_URL+"/images/"+item.image}
     style={{width:"100%",height:"430px"}}
       />
    </SwiperSlide>):<img src="assets/images/404.jpg"  style={{width:"100%",height:"230px"}} />}
     
   </Swiper>
            </div>
            {product.id&&<div className="px-2">
                {moment(product?.created_at).fromNow()}
                <h3 className="my-1 font-bold">{product?.title} </h3>

                </div>}
                <div className="px-2">
                    <div>
                        <IconButton href={"https://wa.me/971"+product.mobile}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
</svg>
                        </IconButton>
                        <IconButton href={"tel:971"+product.mobile}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>
                        </IconButton>
                    </div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>{t("Starts at")}</th>
                        <td>{product.start_at}</td>
                    </tr>
                    <tr>
                        <th>{t("Ends at")}</th>
                        <td>{product.end_at}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="text-center">
                   {product.facebook&& <IconButton href={product.facebook}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
</svg>
                    </IconButton>}

                    {product.instagram&&<IconButton href={product.instagram}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M16.5 7.5l0 .01" />
</svg>
                    </IconButton>}

                    {product.toktok&&<IconButton href={product.tiktok}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-tiktok" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
</svg>
                    </IconButton>}

                   {product.snapchat&& <IconButton href={product.snapchat}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-snapchat" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118" />
</svg>
                    </IconButton>}
                </div>
                </div>
               


                <div id="map" style={{width:"100%",height:"300px"}}></div>
            
        </IonContent>

    </IonPage>
}


export default AdDetails