import { IonBackButton, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory, useParams } from "react-router"
import { BASE_URL } from "../util/cinfig"
import { IconButton } from "@mui/material"
import Search from "./Search"




const City=({city,close})=>{
   
   
    const [category,setCategory]=useState({})
    const [isPend,setOpen]=useState(false)
    const [categories,setCategories]=useState([])
    const {t,i18n}=useTranslation()
    const history=useHistory()
    useIonViewDidEnter(()=>{
      
        
    })
    useEffect(()=>{
      
        axios.get(`/api/city/details/${city.id}`).then(res=>setCity(res.data))
        axios.get(`/api/city/categories/${city.id}`).then(res=>setCategories(res.data.filter(item=>item.ads>0)))
    },[city])

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IconButton slot="start" onClick={()=>{
                    console.log("Start")
                    close()
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l14 0" />
  <path d="M5 12l6 6" />
  <path d="M5 12l6 -6" />
</svg>
                </IconButton>
           
            <IonTitle>{i18n.language=="ar"?city.name_ar:city.name_en}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" >
            <h3>{t("Categories")}</h3>
            <div style={{display:"grid",
            gridTemplateColumns:" repeat(2, 1fr) ",gap:10,
            
            }}>
            {categories.filter(item=>item.categoryId==0).map(item=><div
            style={{borderRadius:"10px",}}
            className="shadow"
            key={item.id} onClick={()=>{
                setCategory(item)
               setOpen(true)
            }}>
                <img src={item.image?BASE_URL+'/images/'+item.image:"assets/images/404.jpg"} style={{width:"100%",height:150,borderRadius:10,objectFit:"cover"}} />
                <span style={{
                    display:"block",
                    textAlign:"center",
                    
                    padding:"5px"

                    }}
                    >{item.name_en}</span>
            </div>)}
            </div>
            <IonModal isOpen={isPend}>
<Search city={city} category={category} close={()=>setOpen(false)} />
</IonModal>
        </IonContent>
    </IonPage>
   
}


export default City