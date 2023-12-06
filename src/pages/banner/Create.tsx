import { IonBackButton, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { Checkbox, IconButton, InputAdornment, MenuItem, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { BASE_URL } from "../../util/cinfig"
import { useHistory } from "react-router"
import { closeCircleOutline, trash, trashOutline } from "ionicons/icons"
import { Loader } from "@googlemaps/js-api-loader"
import { DatePicker } from "@mui/x-date-pickers"
import moment from "moment"
import dayjs from "dayjs"



export const BannerCreate=()=>{
const [categories, setCategories]=useState([])
const [countries, setCountries]=useState([])
const [user,setUser]=useState({})
const [cities, setCities]=useState([])
const [areas, setAreas]=useState([])
const [banner,setBanner]=useState({country_id:1,mobile:"", lat: 24.2041721, lng: 55.272619})
const {t,i18n}=useTranslation()
const imgRef=useRef(null)
const mainRef=useRef(null)
const history=useHistory()
const [images,setImages]=useState([])
const lang=localStorage.getItem('language')||"en"
var map
var marker
useEffect(()=>{

  

     
    
      
    axios.get("/api/city").then(res=>setCities(res.data))
    axios.get("/api/area").then(res=>setAreas(res.data))
    axios.get("/api/user").then(res=>{
        setUser(res.data)
        setBanner({
            ...banner,
            country_id:res.data.country_id,
            mobile:res.data.mobile,
            whatsapp:res.data.mobile
        })
    })
    axios.get("/api/country").then(res=>setCountries(res.data))
    axios.get('/api/category').then(res=>setCategories(res.data.filter(item=>item.categoryId==0)))
},[])

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IconButton slot="start" onClick={()=>history.goBack()}>
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
                <IonTitle>{t("Ad create")}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <input type="file" multiple style={{display:"none"}} accept="image/*" ref={imgRef} onChange={e=>{
                const file = e.target.files
                if(file?.length>0)
                { 
                  const data=new FormData()
                 for (const key of Object.keys(file)) {
                   data.append('images[]', file[key]);
               }
               
               
                axios.post('/api/uploads',data).then(res=>{
                   setImages([...images,...res.data])
                })
              }
            }} />

<input type="file" style={{display:"none"}} ref={mainRef} onChange={e=>{
                const file = e.target.files[0]
                const data=new FormData()
                data.append('image',file)
                axios.post('/api/upload',data).then(res=>{
                    setBanner({...banner,main:res.data})
                })
            }} />

<IonLabel position="floating">{t("Emirate")}</IonLabel>
        
        <TextField
  id="outlined-select-currency"
  select
  fullWidth
  variant="outlined"
  defaultValue={banner.city_id}
  onChange={e=>setBanner({...banner,city_id:e.target.value})}

>
  {cities.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option['name_'+lang]}
    </MenuItem>
  ))}
</TextField>

<IonLabel>{t("Company name")}</IonLabel>

        <TextField 
          value={banner.title}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trademark" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4.5 9h5m-2.5 0v6" />
  <path d="M13 15v-6l3 4l3 -4v6" />
</svg>
              </InputAdornment>
            )}}

          onChange={e=>setBanner({...banner,title:e.target.value})}
          variant="outlined" fullWidth margin="dense"
           />

          
                <IonLabel position="floating">{t("Category")}</IonLabel>
        
                <TextField
          id="outlined-select-currency"
          select
          fullWidth
          variant="outlined"
          defaultValue={banner.country_id}
          onChange={e=>setBanner({...banner,category_id:e.target.value})}
        
        >
          {categories.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option['name_'+lang]}
            </MenuItem>
          ))}
        </TextField>

        <IonLabel>{t("Mobile")}</IonLabel>
        <TextField 
          onChange={e=>setBanner({...banner,mobile:e.target.value})} 
          value={banner.mobile}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IonSelect value={banner.country_id}>
                    {countries.map(item=><IonSelectOption 
                    key={item.id} value={item.id}>+{item.mobile_code}</IonSelectOption>)}
                </IonSelect>
              </InputAdornment>
            )}}

         type="number"
          variant="outlined" fullWidth margin="dense"
           />

<IonLabel>{t("Whatsapp")}</IonLabel>
        <TextField 
          onChange={e=>setBanner({...banner,whatsapp:e.target.value})} 
          value={banner.whatsapp}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IonSelect value={banner.country_id}>
                    {countries.map(item=><IonSelectOption 
                    key={item.id} value={item.id}>+{item.mobile_code}</IonSelectOption>)}
                </IonSelect>
              </InputAdornment>
            )}}

         type="number"
          variant="outlined" fullWidth margin="dense"
           />
          

        <IonLabel>{t("Offer Start Date")}</IonLabel>
        <DatePicker 
         onChange={offer_start_at=>setBanner({...banner,offer_start_at:offer_start_at.$d})}
         value={dayjs(banner.offer_start_at)} className="w-100 mb-2" />

          <IonLabel>{t("Offer End Date")}</IonLabel>
          <DatePicker 
         onChange={offer_end_at=>setBanner({...banner,offer_end_at:offer_end_at.$d})}
         value={dayjs(banner.offer_end_at)} className="w-100 mb-2" />
      

<IonLabel>{t("Adz publish date starts one")}</IonLabel>
<DatePicker 
         onChange={ad_start_at=>setBanner({...banner,ad_start_at:ad_start_at.$d})}
         value={dayjs(banner.ad_start_at)} className="w-100 mb-2" />
       
          <IonLabel>{t("Adz publish date ends on")}</IonLabel>
          <DatePicker 
         onChange={ad_end_at=>setBanner({...banner,ad_end_at:ad_end_at.$d})}
         value={dayjs(banner.ad_end_at)} className="w-100 mb-2" />

          <h3>{t("Socail media links")}</h3>

  
          <TextField 
          value={banner.facebook}
          margin="dense"
          onChange={e=>setBanner({...banner,facebook:e.target.value})}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
            <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
</svg>
              </InputAdornment>
            ),
          }}
          variant="outlined" fullWidth />


          <TextField 
          value={banner.snapchat}
          onChange={e=>setBanner({...banner,snapchat:e.target.value})}
          variant="outlined" fullWidth
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-snapchat" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118" />
</svg>
              </InputAdornment>
            ),
          }}
          
          />


          <TextField 
          value={banner.instagram}
          onChange={e=>setBanner({...banner,instagram:e.target.value})}
          variant="outlined" fullWidth
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M16.5 7.5l0 .01" />
</svg>
              </InputAdornment>
            ),
          }}
          />


          <TextField 
          margin="dense"
           InputProps={{
            startAdornment: (
              <InputAdornment position="start">
           <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
</svg>
              </InputAdornment>
            ),
          }}
          value={banner.tiktok}
          onChange={e=>setBanner({...banner,tiktok:e.target.value})}
          variant="outlined" fullWidth />


<IonLabel>{t("Location")}</IonLabel>
          <TextField 
          value={banner.location}
          className="mb-2"
          onChange={e=>setBanner({...banner,location:e.target.value})}
          variant="outlined" fullWidth />
          
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<h3>{t("Images")}</h3>
{images.length<=10&& <button 
onClick={()=>imgRef.current?.click()}
className="btn btn-outline-danger " style={{borderRadius:15}}>{t("Add Image")} </button>}
</div>
  <strong className="text-danger my-1 text-bold">{t("You can add up to 10 images")}</strong>      
          
         

             <div className="row" >
                        {images.map((img,index)=><div key={img} className="col-4 mb-2" style={{position:"relative",}}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                         onClick={()=>{
                          const list=images
                          list.splice(index,1)
                          setImages([...list])
                      }}
                         style={{position:"absolute",top:5,right:15}}

                         width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
  <path d="M16 5l3 3" />
</svg>
                                {/* <IonIcon icon={trashOutline} size="large" color="primary"  onClick={()=>{
                                const list=images
                                list.splice(index,1)
                                setImages([...list])
                            }} /> */}
                          
                            <img src={BASE_URL+'/images/'+img}
                             style={{width:"100%",height:100,objectFit:"cover",borderRadius:10,border:"1px #999 solid"}} />
                           
                        </div>)}
                       
                        </div>
                     
                      


<IonButton style={{width:"100%"}}
onClick={()=>axios.post("/api/ads",{...banner
  ,offer_start_at:moment(banner.offer_start_at).format("YYYY-MM-DD")
  ,offer_end_at:moment(banner.offer_end_at).format("YYYY-MM-DD")
  ,ad_start_at:moment(banner.ad_start_at).format("YYYY-MM-DD")
  ,ad_end_at:moment(banner.ad_end_at).format("YYYY-MM-DD")
  ,images}).then(res=>{
    window.location.replace('/success')
   // history.push('/tab2');
}).catch(e=>{

})}
disabled={!(banner.city_id&&banner.category_id&&banner.mobile&&banner.offer_end_at&&banner.offer_start_at&&images.length>0)}
>{t("Save")} </IonButton>

        </IonContent>
    </IonPage>
}