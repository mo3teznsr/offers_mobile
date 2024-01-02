import { IonContent, IonModal, IonPage } from "@ionic/react"
import axios from "axios"
import { useEffect, useState } from "react"
import AdCard from "../components/AdCard"
import AdDetails from "./banner/AdDetails"
import { useHistory } from "react-router"





const Favorite=()=>{
    const [ads,setAds]=useState([])
    const [ad,setAd]=useState<any>({})
    const [showProduct,setShowProduct]=useState(false)
    const history=useHistory()
const getFavorites=()=>{
axios.get("/api/favorite").then(res=>{
    setAds(res.data)
})
}

useEffect(()=>{
    getFavorites()
},[])

    return <IonPage>
        <IonContent className="ion-padding">
            {ads.map(item=><div key={item.id}
            onClick={()=>{
               history.push("/ad/"+item.ad.id)
            }} 
            ><AdCard product={item.ad} key={item.id} /></div>)}

            <IonModal isOpen={showProduct}>
            <AdDetails product={ad} setAd={setAd} close={()=>{
                history.push("/ad/"+item.id)
                }} />
          </IonModal>
        </IonContent>
    </IonPage>
}


export default Favorite