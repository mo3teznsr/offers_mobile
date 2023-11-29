import { IonBackButton, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { BASE_URL } from "../../util/cinfig"
import { useHistory } from "react-router"
import { closeCircleOutline } from "ionicons/icons"
import { Loader } from "@googlemaps/js-api-loader"


export const BannerUpdate=({item,close})=>{
const [categories, setCategories]=useState([])
const [countries, setCountries]=useState([])
const [user,setUser]=useState({})
const [cities, setCities]=useState([])
const [areas, setAreas]=useState([])
const [banner,setBanner]=useState({...item})
const [images, setImages]=useState(item.images)
const {t}=useTranslation()
const imgRef=useRef(null)
const mainRef=useRef(null)
const history=useHistory()
var map 
var marker
useEffect(()=>{
    const loader = new Loader({
        apiKey: "AIzaSyBLBPyA77WBsP-cuSSLtr0gEGu_Gc6Piv8",
        version: "weekly",
       
      });
      //25.2041721,55.272619
      loader.load().then(async (google) => {
        const { Map } = await google.maps.importLibrary("maps");
      
        map = new Map(document.getElementById("map"), {
          center: { lat: banner.lat, lng: banner.lng },
          zoom: 9,
          mapTypeId:"terrain",
        });
        marker=new google.maps.Marker({
            position: { lat: banner.lat, lng: banner.lng },
            map,
            title: "Hello World!",
          });
         
          map.addListener("click", (e) => {
           setBanner({...banner,lat:e.latLng.lat(),lng:e.latLng.lng()})
           map.setCenter(e.latLng)
           marker.setPosition(e.latLng)
           
          });
        
      });
    axios.get("/api/city").then(res=>setCities(res.data))
    axios.get("/api/area").then(res=>setAreas(res.data))
    axios.get("/api/country").then(res=>setCountries(res.data))
    axios.get('/api/category').then(res=>setCategories(res.data.filter(item=>item.categoryId==0)))
},[])

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IconButton slot="start" onClick={()=>close()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l14 0" />
  <path d="M5 12l6 6" />
  <path d="M5 12l6 -6" />
</svg>
                </IconButton>
                <IonTitle>{t("Ad update")}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <input type="file" style={{display:"none"}} accept="image/*" ref={imgRef} onChange={e=>{
                const file = e.target.files[0]
                const data=new FormData()
                data.append('image',file)
                axios.post('/api/upload',data).then(res=>{
                    axios.post('/api/ad-image',{ad_id:item.id,image:res.data}).then(imgRes=>{
                        setImages([...images,imgRes.data])
                    })
                })
            }} />

<input type="file" style={{display:"none"}} ref={mainRef} onChange={e=>{
                const file = e.target.files[0]
                const data=new FormData()
                data.append('image',file)
                axios.post('/api/upload',data).then(res=>{
                    axios.post('/api/ad-image',{ad_id:item.id,image:res.data}).then(imgRes=>{
                        setImages([...images,imgRes.data])
                    })
                   // setBanner({...banner,main:res.data})
                })
            }} />

<IonLabel>{t("Title")}</IonLabel>
        <TextField 
          value={banner.title}
          

          onChange={e=>setBanner({...banner,title:e.target.value})}
          variant="outlined" fullWidth margin="dense" />

            <IonItem>

                <IonLabel position="stacked">{t("Emirate")}</IonLabel>
                <IonSelect value={banner.city_id} 
               onIonChange={e=>setBanner({...banner,city_id:e.target.value})}
                >
                    {cities.map(item=><IonSelectOption 
                    key={item.id} value={item.id}>{item.name_en}</IonSelectOption>)}
                </IonSelect>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">{t("Category")}</IonLabel>
                <IonSelect value={banner.category_id} 
                onIonChange={e=>setBanner({
                    ...banner,category_id:e.target.value})}>
                    {categories.map(item=><IonSelectOption 
                    key={item.id} value={item.id}>{item.name_en}</IonSelectOption>)}
                </IonSelect>
            </IonItem>
            <div style={{display:"flex",gap:10}}>
            <IonItem style={{minWidth:90}}>
                <IonSelect value={banner.country_id}>
                    {countries.map(item=><IonSelectOption 
                    key={item.id} value={item.id}>+{item.mobile_code}</IonSelectOption>)}
                </IonSelect>
            </IonItem>
            <IonItem style={{width:"100%"}}>
                <IonInput placeholder="5xxxxxxxxx" 
                onIonChange={e=>setBanner({...banner,mobile:e.target.value})} 
                value={banner.mobile}
                 />
            </IonItem>
            </div>

          
        

        <IonLabel>{t("Start Date")}</IonLabel>
        <TextField 
          value={banner.start_at}
          type="date"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
  <path d="M16 3v4" />
  <path d="M8 3v4" />
  <path d="M4 11h16" />
  <path d="M11 15h1" />
  <path d="M12 15v3" />
</svg>
              </InputAdornment>
            ),
          }}
          onChange={e=>setBanner({...banner,start_at:e.target.value})}
          variant="outlined" fullWidth />
          <IonLabel>{t("End Date")}</IonLabel>
        <TextField 
          value={banner.end_at}
          type="date"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
  <path d="M16 3v4" />
  <path d="M8 3v4" />
  <path d="M4 11h16" />
  <path d="M11 15h1" />
  <path d="M12 15v3" />
</svg>
              </InputAdornment>
            ),
          }}
          onChange={e=>setBanner({...banner,end_at:e.target.value})}
          variant="outlined" fullWidth />

<h3>{t("Socail media links")}</h3>

<IonLabel>{t("facebook")}</IonLabel>
  <TextField 
  value={banner.facebook}
  onChange={e=>setBanner({...banner,facebook:e.target.value})}
  variant="outlined" fullWidth />

<IonLabel>{t("Snapchat")}</IonLabel>
  <TextField 
  value={banner.snapchat}
  onChange={e=>setBanner({...banner,snapchat:e.target.value})}
  variant="outlined" fullWidth />

<IonLabel>{t("Instagram")}</IonLabel>
  <TextField 
  value={banner.instagram}
  onChange={e=>setBanner({...banner,instagram:e.target.value})}
  variant="outlined" fullWidth />

<IonLabel>{t("Tiktok")}</IonLabel>
  <TextField 
  value={banner.tiktok}
  onChange={e=>setBanner({...banner,tiktok:e.target.value})}
  variant="outlined" fullWidth />
          
<div style={{display:"flex",justifyContent:"space-between",padding:"0 10",alignItems:"center"}}>
<h3>{t("Images")}</h3>
<span>{images.length}/10</span>
</div>
           
            <div className="img-upload" onClick={()=>imgRef.current?.click()} >
                <span>{t('Image upload')}</span>

                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-photo-plus" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 8h.01" />
  <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
  <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
  <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54" />
  <path d="M16 19h6" />
  <path d="M19 16v6" />
</svg>

            </div>
           {images.length==0&& <img 
            
            src={"assets/images/404.jpg"} 
            style={{width:"100%",height:"220px",borderRadius:10,marginBottom:".5rem"}}
            />}

             <div style={{display:"grid",gridTemplateColumns:"auto auto",gap:10}} >
                        {images.map((img,index)=><div key={img.id} style={{position:"relative"}}>
                            
                                <IonIcon icon={closeCircleOutline} size="large" color="primary"  style={{position:"absolute",top:5,left:5}} onClick={()=>{
                               axios.delete('/api/ad-image/'+img.id)
                               const list=images
                                list.splice(index,1)
                                setImages([...list])
                            }} />
                          
                            <img src={BASE_URL+'/images/'+img.image} style={{width:"100%",height:250,objectFit:"cover",borderRadius:10}} />
                           
                        </div>)}
                       
                        </div>
                        <IonLabel className="mt-2">{t('Location')}</IonLabel>
                        <div id="map" style={{width:"100%",height:220,borderRadius:10,marginBottom:10}}></div>


<IonButton style={{width:"100%"}}
onClick={()=>axios.post("/api/ads",{...banner,images}).then(res=>{
    history.push('/tab2');
}).catch(e=>{

})}
disabled={!(banner.city_id&&banner.category_id&&banner.mobile&&banner.start_at&&banner.end_at)}
>{t("Save")} </IonButton>

        </IonContent>
    </IonPage>
}