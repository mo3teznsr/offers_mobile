import { IonButton, IonChip, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonModal, IonSearchbar } from "@ionic/react"
import axios from "axios"
import { add, pulse, search } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Product } from "../../components/Product"
import { AdUpdate } from "../ads/Update"
import { Link } from "react-router-dom"




export const MyAds=()=>{


    const [statuses,setStatus]=useState([])
    const [products,setProducts]=useState([])
    const [product,setProduct]=useState({})
    const [showModal,setModal]=useState(false)
    const [filters,setFilter]=useState({status_id:1,search:""})
    const {t,i18n}=useTranslation()

    const updateProduct=(item:any)=>{
        console.log("update")
        setProduct(item)
        setModal(true)
    }

    const getProducts=()=>{
        axios.get('api/products/me').then(res=>{
            setProducts(res.data)
        })
    }

useEffect(()=>{
    getProducts()
    axios.get("/api/status").then(res=>{
        setStatus(res.data)
    })
},[])

    return <div>

        <IonSearchbar value={filters.search} onKeyUp={e=>setFilter({...filters,search:e.target.value})}    mode="ios">
           
          
            
            
        </IonSearchbar>
        <IonFab horizontal="end" slot="fixed" style={{position:"fixed"}}  vertical="bottom">
           <Link to="/add"><IonFabButton><IonIcon icon={add} /></IonFabButton></Link> 
        </IonFab>
        <div className="">
            
            {statuses.map((item)=><IonChip
            color={filters.status_id===item.id?"primary":""}
             key={item.id} onClick={()=>setFilter({...filters,status_id:item.id})}>{item['name_'+(i18n.language||'en')]}</IonChip>)}
        </div>
        {products.filter(item=>item.title.indexOf(filters.search)>-1&&item.status_id===filters.status_id).map((product)=><div key={product.id}  onClick={()=>updateProduct(product)}
        ><Product 
        
        product={product} /></div>)}

        

        <IonModal isOpen={showModal}>
            <AdUpdate product={product} close={()=>{
                setModal(false)
                getProducts()
                }}  />

        </IonModal>
    </div>
}