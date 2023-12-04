import { IonButton, IonChip, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { Button, Drawer, IconButton, InputAdornment, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material"
import axios from "axios"
import { close } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import AdDetails from "./banner/Details"
import { BASE_URL } from "../util/cinfig"
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import  MiList from '@mui/material/List';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from "react-router"



const List=()=>{
    const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
    const [category,setCategory]=useState(params.category_id||"")
    const [city,setCity]=useState(params.city_id||"")
    const [categories,setCategories]=useState([])
    const [cities,setCities]=useState([])
    const lang=localStorage.getItem('language')||"en"
    const [ads,setAds]=useState([])
    const [showitem,setShowitem]=useState(false)
    const [isOpen,setOpen]=useState(false)
    const [ad,setAd]=useState({})
    const [showFilter,setShowFilter]=useState(false)
    const [showSort,setShowSort]=useState(false)
   

    const getAds=()=>{
        axios.get('/api/ads?city_id='+city+"&category_id="+category).then(res=>{
            setAds(res.data)
        })
    }

    useEffect(()=>{
        getAds()
    }
    ,[city,category])
    useEffect(()=>{
        getAds()
        axios.get("/api/home").then(res=>{
            setCities(res.data.cities)
            setCategories(res.data.categories)
        })
    },[])
    const {t}=useTranslation()
    const selectedCategory=categories.find(item=>item.id==category)
    const selectedCity=cities.find(item=>item.id==city)
    const history=useHistory()
    return <IonPage>
      
        <IonContent >
        <IonToolbar>
                <IconButton onClick={()=>window.history.back()} slot="start">
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
</svg>}       </IconButton>
                {/* <IonTitle>
                    {t("Search")}
                </IonTitle> */}
               <div className="px-2"> 
               <TextField fullWidth margin="dense"
               size="small"
               InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
  <path d="M21 21l-6 -6" />
</svg>
                  </InputAdornment>
                ),
               }}
                />
               </div>
              
            </IonToolbar>
            <div style={{display:"flex",alignItems:"center",borderBottom:"1px #eee solid",marginBottom:"8px",padding:"15px 0"}}>
                <div style={{display:"flex",flex:1,justifyContent:"center"}}>
                
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrows-sort mx-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 9l4 -4l4 4m-4 -4v14" />
  <path d="M21 15l-4 4l-4 -4m4 4v-14" />
</svg>
{t("Sort")}
               
                </div>
                <div onClick={()=>setShowFilter(true)} style={{display:"flex",flex:1,justifyContent:"center"}}>
                
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments-horizontal mx-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M4 6l8 0" />
  <path d="M16 6l4 0" />
  <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M4 12l2 0" />
  <path d="M10 12l10 0" />
  <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M4 18l11 0" />
  <path d="M19 18l1 0" />
</svg>
{t("Filter")}
               
                </div>
               

            </div>
        

            {(selectedCategory||selectedCity)&&<div
            style={{display:"flex",padding:"10px",height:"35px",alignItems:"center"}}>
               {(selectedCategory||selectedCity)&& <IconButton onClick={()=>{
                    setCity("")
                    setCategory("")
                }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 7l16 0" />
  <path d="M10 11l0 6" />
  <path d="M14 11l0 6" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>
                </IconButton>}
                {selectedCategory&& <IonChip onClick={()=>{
                    setCategory("")
                }} > <IonIcon className="mx-1" icon={close}></IonIcon> {selectedCategory['name_'+lang]}  </IonChip>}
                {selectedCity&& <IonChip
                 onClick={()=>{
                    setCity("")
                }}
                ><IonIcon className="mx-1"  icon={close}></IonIcon> {selectedCity['name_'+lang]}  </IonChip>}
            </div>}

            <div className="p-2">
            {ads?.map(item=> <div className='shadow rounded-lg mb-2'
        onClick={()=>{
          history.push("/ad/"+item.id)
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
     style={{width:"100%",height:"450px",borderRadius:"10px"}}
       />
    </SwiperSlide>):<img src="assets/images/404.jpg"  style={{width:"100%",height:"230px"}} />}
     
   </Swiper>
 <div >


<div >

  <div className="px-2" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{fontWeight:"bold"}}>{item.title} </span>

<div slot="end">

                   {item.facebook&& <IconButton target="_blank" href={item.facebook}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
</svg>
                    </IconButton>}

                    {item.instagram&&<IconButton target="_blank" href={item.instagram}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M16.5 7.5l0 .01" />
</svg>
                    </IconButton>}

                    {item.tiktok&&<IconButton target="_blank" href={item.tiktok}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-tiktok" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
</svg>
                    </IconButton>}

                   {item.snapchat&& <IconButton target="_blank" href={item.snapchat}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-snapchat" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118" />
</svg>
                    </IconButton>}
                
                        <IconButton target="_blank" href={"https://wa.me/971"+item.whatsapp}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
</svg>
                        </IconButton>
                        <IconButton target="_blank" href={"tel:971"+item.mobile}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>
                        </IconButton>
                    </div>
    </div>

  </div>
  </div>
     
   
</div>

         </div>)}

         </div>

         <Drawer dir={lang=="ar"?"rtl":"ltr"}
      anchor="bottom"
      open={showFilter}
      onClose={()=>setShowFilter(false)}
    >

        <div className="p-2">
            <strong>{t("Categories")}</strong><br/>
           
            {categories.map(item=><IonChip 
            key={item.id}
            onClick={()=>{
                setCategory(item.id)
                setShowFilter(false)
            }}
             color={item.id==category?"danger":"dark"}>{item['name_'+lang]}</IonChip>)}
             <br/>
             <strong>{t("Emirate")}</strong><br/>
           
           {cities.map(item=><IonChip
            key={item.id}
           onClick={()=>{
               setCity(item.id)
               setShowFilter(false)
           }}
            color={item.id==city?"danger":"dark"}>{item['name_'+lang]}</IonChip>)}
        </div>
      
    </Drawer>

      

        </IonContent>

    </IonPage>
}


export default List