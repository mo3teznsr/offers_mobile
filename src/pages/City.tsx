import { IonBackButton, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory, useParams } from "react-router"
import { BASE_URL } from "../util/cinfig"
import { IconButton } from "@mui/material"
import Search from "./Search"
import AdDetails from "./banner/AdDetails"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"




const City=()=>{
   
   
    const [category,setCategory]=useState({})
    const [city,setCity]=useState<any>({})
    const [isPend,setOpen]=useState(false)
    const [categories,setCategories]=useState([])
    const [categories1,setCategories1]=useState([])
    const {t,i18n}=useTranslation()
    const lang=localStorage.getItem('language')||"en"
    const [showProduct,setShowProduct]=useState(false)
    const [ad,setAd]=useState(false)
    const {id}=useParams()

    const history=useHistory()
    useIonViewDidEnter(()=>{
      
        
    })
    useEffect(()=>{
      axios.get('/api/city/details/'+id).then(res=>{
        setCity(res.data)
      })
        axios.get("/api/ads-group?city_id="+id).then(res=>{
            setCategories1(res.data)
        })
      //  axios.get(`/api/city/details/${city.id}`).then(res=>setCity(res.data))
        axios.get(`/api/city/categories/${id}`).then(res=>setCategories(res.data.filter(item=>item.ads>0)))
    },[])
    if(!city.id)
    {
      return <Loading />
    }
    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IconButton slot="start" onClick={()=>{
                   // console.log("Start")
                   history.goBack()
                }}>
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
           
            <IonTitle>{i18n.language=="ar"?city.name_ar:city.name_en}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" >
        <div style={{display:"flex",gap:10}}>
        <img src="assets/images/logo.png" style={{width:"100%"}} />
        
        </div>
           {categories.length>0&& <h3>{t("Categories")}</h3>}
           {city?.id&&categories.length===0&&<div className="w-100 text-center">
                <img src="assets/images/empty.png" 
              style={{display:"block",margin:"1rem auto",height:"250px"}} />
              <span>{t("Sorry there are no results")} </span>
              </div>}
            <div style={{display:"grid",
            gridTemplateColumns:" repeat(2, 1fr) ",gap:10,
            
            }}>
              
            {categories.filter(item=>item.categoryId==0).map(item=><a 
            key={item.id}
            style={{textDecoration:"none"}}
            onClick={()=>history.push("/list?category_id="+item.id+"&city_id="+city.id)}><div
            style={{borderRadius:"10px",textAlign:"center"}}
            
            key={item.id} onClick={()=>{
                setCategory(item)
               setOpen(true)
            }}>
                <img src={item.image?BASE_URL+'/images/'+item.image:"assets/images/404.jpg"}
                 style={{width:"100%",height:"180px",borderRadius:"10px",objectFit:"cover",display:"block",margin:"0 auto"}} />
                <span style={{
                    display:"block",
                    textAlign:"center",
                    
                    padding:"5px"

                    }}
                    >{item['name_'+lang]} ({item.ads})</span>
                  
            </div></a>)}
            </div>
            {/* {   categories1.map(category=> category.products.length>0&& <>
        <div className='d-flex' style={{justifyContent:"space-between",alignItems:"center"}}>
        <strong>{category['name_'+lang]}</strong>
        <a href={"/list?category_id="+category.id+"&city_id="+city.id}
        className='text-danger' style={{textDecoration:"none"}}>{t("See more")}</a>
        </div>
       
        <div style={{overflowX:"auto",whiteSpace:"nowrap",height:"360px"}}
        >
        {category.products.map(item=> <div 
         className='shadow'
        onClick={()=>{
          setAd(item)
          setShowProduct(true)
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

          </div>
          </>)} */}

        

           
        </IonContent>
    </IonPage>
   
}


export default City