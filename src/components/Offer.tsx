
import { useHistory } from "react-router";
import { BASE_URL } from "../util/cinfig"
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IonFab, IonFabButton } from "@ionic/react";


const Offer=({item}:any)=>{


    const history=useHistory()
    const {t}=useTranslation()
    const lang=localStorage.getItem('language')||"en"
    return <div>
        <div className='shadow bg-white rounded-lg mb-2'
        
        style={{display:"inline-block",zIndex:-2,
        width:"100%",marginInlineEnd:"10px",position:"relative",borderRadius:"10px"}}
        key={item.id}>
            
          <div className="rounded-lg" style={{display:"block",background:"#fff0"}}>
         
          <Swiper 
     pagination={{
      type: 'fraction',
    }} noSwiping={true} noSwipingClass="swiper-no-swiping"
     modules={[ Navigation,Pagination, A11y,Autoplay]} 
     loop
     autoplay
     style={{direction:"ltr",zIndex:-1}}
     
   >
    {item.images?.length>0?item.images.map(img=> <SwiperSlide key={img.id}>
     <img src={BASE_URL+"/images/"+img.image} onClick={()=>{
          history.push("/ad/"+item.id)
        }}
     style={{width:"100%",height:"350px",borderRadius:"10px"}}
       />
    </SwiperSlide>):<img src="assets/images/404.jpg"  style={{width:"100%",height:"230px"}} />}
     
   </Swiper>

   
 <div >
 <div onClick={()=>{
          history.push("/ad/"+item.id)
        }} style={{left:"3px",top:"5px",display:"flex",flexDirection:"column",position:"absolute",zIndex:10}}>

{item.facebook&& <IonFabButton size="small" color="light" target="_blank" href={item.facebook}>
<img src="assets/images/facebook.png" alt="whatsapp" 
       style={{width:"25px",height:"25px",objectFit:"contain"}} />
 </IonFabButton>}

 {item.instagram&&<IonFabButton size="small" color="light"  target="_blank" href={item.instagram}>
 <img src="assets/images/instagram.png" alt="whatsapp" 
       style={{width:"25px",height:"25px",objectFit:"contain"}} />
 </IonFabButton>}

 {item.tiktok&&<IonFabButton size="small" color="light"  target="_blank" href={item.tiktok}>
 <img src="assets/images/tiktok.webp" alt="whatsapp" 
       style={{width:"25px",height:"25px",objectFit:"contain"}} />
 </IonFabButton>}

{item.snapchat&& <IonFabButton size="small" color="light"  target="_blank" href={item.snapchat}>
<img src="assets/images/snapchat.png" alt="whatsapp" 
       style={{width:"25px",height:"25px",objectFit:"contain"}} />
 </IonFabButton>}

     <IonFabButton size="small" color="light"  target="_blank" href={"https://wa.me/971"+item.whatsapp}>
     <img src="assets/images/whatsapp.png" alt="whatsapp" 
       style={{width:"25px",height:"25px",objectFit:"contain"}} />
     </IonFabButton>
     {item.website&& <IonFabButton size="small" color="light"  
      onClick={()=>{
       window.open(item.website.startsWith('http')?item.website:"http://"+item.website)
     }}
     >
     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-snapchat" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">

<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4" />
<path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4" />
<path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
<path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4" />
<path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4" />
<path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4" />
<path d="M2 10l1 4l1.5 -4l1.5 4l1 -4" />
<path d="M17 10l1 4l1.5 -4l1.5 4l1 -4" />
<path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4" />

</svg>
 </IonFabButton>}
  
     <IonFabButton size="small" color="light"  target="_blank" href={"tel:971"+item.mobile}>
     <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>
     </IonFabButton>
 </div>

<div >

  <div className="px-2" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{fontWeight:"bold"}}>{lang==="ar"? item.title:item.title_en} </span>

<span>
 {item.discount_amount} 

</span>
    </div>
    <div className="p-2" >
<button className="btn btn-danger w-100">{t("Offer Details")}</button>
      </div>

  </div>
  </div>
     
   
</div>

         </div>
    </div>
}


export default Offer