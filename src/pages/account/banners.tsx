import { IonButton, IonChip, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonModal, IonSearchbar, useIonViewWillEnter } from "@ionic/react"
import axios from "axios"
import { add, pulse, search } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Product } from "../../components/Product"
import { AdUpdate } from "../ads/Update"
import { Link, useHistory } from "react-router-dom"
import { BASE_URL } from "../../util/cinfig"
import { BannerUpdate } from "../banner/Update"
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import moment from "moment"




export const MyBanners=()=>{


    const [statuses,setStatus]=useState([])
    const [products,setProducts]=useState([])
    const [product,setProduct]=useState({})
    const [showModal,setModal]=useState(false)
    const [filters,setFilter]=useState({status_id:1,search:""})
    const {t,i18n}=useTranslation()
    const history=useHistory()

    const updateProduct=(item:any)=>{
        console.log("update")
        setProduct(item)
        setModal(true)
    }

    const getProducts=()=>{
        axios.get('api/ads/me').then(res=>{
           // console.log(res.data)
            setProducts(res.data)
        }).catch(e=>{
            console.log(e)
        })
    }
    useIonViewWillEnter(()=>{
        getProducts()
    })

useEffect(()=>{
    getProducts()
    axios.get("/api/status").then(res=>{
        setStatus(res.data)
    })
},[])

    return <div>

        <IonSearchbar value={filters.search} onKeyUp={e=>setFilter({...filters,search:e.target.value})}    mode="ios">
           
          
            
            
        </IonSearchbar>
        <IonFab horizontal="end" style={{position:"fixed"}}   vertical="bottom">
            <Link to="/banner/create"><IonFabButton><IonIcon icon={add} /></IonFabButton>
            </Link>
        </IonFab>
        {/* <div className="">
            
            {statuses.map((item)=><IonChip
            color={filters.status_id===item.id?"primary":""}
             key={item.id} onClick={()=>setFilter({...filters,status_id:item.id})}>{item['name_'+(i18n.language||'en')]}</IonChip>)}
        </div> */}
        {products.filter(item=>item.title?.toString().indexOf(filters.search)>-1).map((product)=><div
         
         className="ad-container"
         key={product.id}  onClick={()=>history.push("/banner/update/"+product.id)}
        ><div 
      
        />
         <Swiper
     
     modules={[ Pagination, Scrollbar, A11y,Autoplay]}
     loop
     slidesPerView={1}
     
     pagination={{
        type: 'fraction',
      }}
   >
    {product.images?.length>0?product.images.map(item=> <SwiperSlide key={item.id}>
     <img src={BASE_URL+"/images/"+item.image}
     style={{width:"100%",height:"230px",borderRadius:"10px"}}
       />
    </SwiperSlide>):<img src="assets/images/404.jpg"  style={{width:"100%",height:"230px"}} />}
     
   </Swiper>
   <div style={{padding:"10px",borderRadius:"10px",display:"flex",justifyContent:"space-between"}}>
   
    <span>{product.title}</span>
    <span>{moment(product.created_at).fromNow()}</span>
    
   </div>
       
        </div>)}

        

       
    </div>
}