import moment from "moment"

import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { BASE_URL } from "../util/cinfig";



const AdCard=({product}:any)=>{


    return <div>
<div  className="ad-container"
     
        ><div 
      
        />
         <Swiper
     
     modules={[ Pagination, Scrollbar, A11y,Autoplay]}
     loop
     slidesPerView={1}
     
     pagination={{ clickable: true }}
   >
    {product.images?.length>0?product.images.map((item:any)=> <SwiperSlide key={item.id}>
     <img src={BASE_URL+"/images/"+item.image}
     style={{width:"100%",height:"230px",borderRadius:"10px"}}
       />
    </SwiperSlide>):<img src="assets/images/404.jpg"  style={{width:"100%",height:"230px"}} />}
     
   </Swiper>
   <div style={{padding:"10px",borderRadius:"10px",display:"flex",justifyContent:"space-between"}}>
   
    <span>{product.title}</span>
    <span>{moment(product.created_at).fromNow()}</span>
    
   </div>
    </div>
    </div>
}


export default AdCard