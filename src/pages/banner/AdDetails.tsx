import { IonAvatar, IonChip, IonContent, IonFabButton, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import { Navigation,Zoom, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import { Loader } from "@googlemaps/js-api-loader"
import { Swiper, SwiperSlide } from 'swiper/react';
import { BASE_URL } from "../../util/cinfig";
import axios from "axios";
import { IconButton } from "@mui/material";
import { useHistory, useParams } from "react-router";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { heart } from "ionicons/icons";
import Loading from "../../components/Loading";
import { Share } from '@capacitor/share';





const AdDetails=()=>{
const [product,setProduct]=useState({})
const history=useHistory()
const {id}=useParams()
const [isLiked,setLiked]=useState(false)
   // const [product,setProduct]=useState({})
const [ads,setAds]=useState([])
const share=async()=>{
  await Share.share({
    title: product.title,
   
    url: 'https://offers.banga.sd/ad/'+product.id,
    dialogTitle: 'Share',
  });
}
const toggle=()=>{
  setLiked(!isLiked)
 
  axios.post('/api/favorite',{id})
}
    useEffect(()=>{
      axios.get("/api/ads/"+id).then(res=>{
        setProduct(res.data)

      })
      axios.get("/api/favorite/"+id).then(res=>{
        setLiked(res.data==1)
      })
     
       
        // axios.get('/api/ads/'+id).then(res=>{
        //     setProduct(res.data)
        // })
    
      
    },[])

    const lang=localStorage.getItem('language')||"en"

const {t,i18n}=useTranslation()
if(!product?.id)
{
  return <Loading />
}
    return <IonPage>
      <IonHeader>
        <IonToolbar>
        <IconButton slot="start"
                onClick={()=>history.goBack()}
                >

{lang=="en"?<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l14 0" />
  <path d="M5 12l6 6" />
  <path d="M5 12l6 -6" />
</svg>:<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l14 0" />
  <path d="M15 16l4 -4" />
  <path d="M15 8l4 4" />
</svg>}
                </IconButton>
                <IonTitle >{lang==="ar"?product.title:product.title_en}</IonTitle>
          
        </IonToolbar>
      </IonHeader>
        <IonContent>
          
            <div style={{position:"relative",padding:".5rem",}}>
            <div style={{display:"flex",gap:10}}>
        <img src="assets/images/logo.png" style={{width:"100%"}} />
        
        </div>
        {product?.video&&<div>
          <div style={{ width: '100%', height: 'auto' }}>
          
      <iframe
        title="YouTube Video"
        width="100%"
       style={{height:"30dvh"}}
        src={product.video}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
          </div>}
               

                <IconButton
                onClick={toggle}
                 style={{position:"absolute",right:"10px",bottom:"10px",zIndex:3}}>
                  <IonIcon icon={heart} color={isLiked?"primary":"dark"} />
                </IconButton>
            <Swiper
            pagination={{
              type: 'fraction',
            }}
     style={{direction:"ltr"}}
     modules={[ Pagination, Scrollbar, A11y,Autoplay,Zoom]}
     loop
     autoplay
     
     
   >
    {product?.images?.length>0?product?.images?.map(item=> <SwiperSlide key={item.id}>
     <img src={BASE_URL+"/images/"+item.image}
     style={{width:"100%",height:"350px"}}
       />
    </SwiperSlide>):<img src="assets/images/404.jpg"  style={{width:"100%",height:"230px"}} />}
     
   </Swiper>
            </div>
            {product.id&&<div className="px-2" 
            style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
               
               {/* <IonChip >{product.category['name_'+lang]} </IonChip> */}
                </div>}
                 {product?.id&& <div style={{display:"flex"}} >
                   {product.facebook&& <IonFabButton size="small" color="light" target="_blank" href={product.facebook}>
                   <img src="assets/images/facebook.png" alt="whatsapp" 
                          style={{width:"25px",height:"25px",objectFit:"contain"}} />
                    </IonFabButton>}

                    {product.instagram&&<IonFabButton size="small" color="light" target="_blank" href={product.instagram}>
                    <img src="assets/images/instagram.png" alt="whatsapp" 
                          style={{width:"25px",height:"25px",objectFit:"contain"}} />
                    </IonFabButton>}

                    {product.tiktok&&<IonFabButton size="small" color="light" target="_blank" href={product.tiktok}>
                    <img src="assets/images/tiktok.webp" alt="whatsapp" 
                          style={{width:"25px",height:"25px",objectFit:"contain"}} />
                    </IonFabButton>}

                   {product.snapchat&& <IonFabButton size="small" color="light" target="_blank" href={product.snapchat}>
                   <img src="assets/images/snapchat.png" alt="whatsapp" 
                          style={{width:"25px",height:"25px",objectFit:"contain"}} />
                    </IonFabButton>}
                   
                    <IonFabButton size="small" color="light" target="_blank" href={"https://wa.me/971"+(Number(product.whatsapp))}>
                          <img src="assets/images/whatsapp.png" alt="whatsapp" 
                          style={{width:"25px",height:"25px",objectFit:"contain"}} />
           
                        </IonFabButton>
                     {product.location&& <IonFabButton size="small" color="light" target="_blank" href={product.location}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
</svg>
              </IonFabButton>}
              
              {product.website&&<IonFabButton size="small" color="light" onClick={()=>{
                window.open(product.website.startsWith('http')?product.website:"http://"+product.website)
                
              
              }} >
               
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

</svg></IonFabButton>}
                       
                       
                </div>}

                
                <div className="px-2">

                <button style={{display:"flex",justifyContent:"center",alignItems:"center"}}
                className="btn btn-danger w-100"
                target="_blank" onClick={()=>window.open("tel:+971"+(Number(product.mobile)))}>
                  {`0${(Number(product.mobile)).toString().slice(0,-2)}xx`}
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>
                        </button>
                        <button className="btn btn-danger mt-2 w-100" onClick={share} >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-share " width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M8.7 10.7l6.6 -3.4" />
  <path d="M8.7 13.3l6.6 3.4" />
</svg> {t("Sahre")} 
                        </button>
                   <div>
                    <h4>{t("Notes")}</h4>
                    <p className="my-1">{product[`note_${i18n.language}`]}</p>
                   </div>
                <table className="table" style={{marginTop:"10px",borderRadius:"10px",padding:"10px"}}>
                    <tbody>
                      <tr>
                        <th>{t("Discount Type")}</th>
                        <td>{product.discount_type}</td>
                      </tr>
                      <tr>
                        <th>{t("Discount value/ percentage")}</th>
                        <td>{product.discount_amount}</td>
                      </tr>
                    <tr>
                        <th>{t("Offer Start Date")}</th>
                        <td>{product.offer_start_at}</td>
                    </tr>
                    <tr>
                        <th>{t("Offer End Date")}</th>
                        <td>{product.offer_end_at}</td>
                    </tr>
                    <tr>
                      <th>{t("Category")}</th>
                      <td>
                      {product.category['name_'+lang]}
                      </td>
                    </tr>
                    <tr>
                      <th>{t("City")}</th>
                      <td>
                      {product.city['name_'+lang]}
                      </td>
                    </tr>

                    </tbody>
                </table>
               
                </div>
               {/* <div className="px-2"
               style={{display:"flex",
               justifyContent:"space-between",
               alignItems:"center",
               }}>
                <span>{t("Similar offers")}</span>
                <a className="text-danger" 
                style={{textDecoration:"none"}}>
                  {t("See more")}
                </a>
               </div>
               <div style={{overflowX:"auto",whiteSpace:"nowrap",height:"360px"}}
        >
               {ads.filter(item=>item.id!=product.id).map(item=> <div 
         className='shadow'
        onClick={()=>{
          setAd(item)
         
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
</div> */}
               {/* <IonToolbar>
            <div slot="start" style={{display:"flex",flexDirection:"row",
            width:"45px",height:"45px",borderRadius:"75px",marginInlineStart:"5px",marginInlineEnd:"5px",
            justifyContent:"center",alignItems:"center",background:"#eee"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>
            </div>
            <div>
             <span className="mx-3">{product.title}</span> 
            
                
            </div>
            <div slot="end">
            
                    </div>
          </IonToolbar> */}
        </IonContent>
        

    </IonPage>
}


export default AdDetails