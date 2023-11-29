import { IonNote, IonTitle } from "@ionic/react"
import moment from "moment"
import { BASE_URL } from "../util/cinfig"






export const Product=({product}:any)=>{



    return <div className="shadow" style={{
        display:"flex",
    flexDirection:"column",gap:10,marginTop:10,borderRadius:".5rem"}}>
        <img src={product.image?BASE_URL+'/images/'+product.image:"assets/images/404.jpg"} 
        style={{width:"100%",height:200,borderRadius:".5rem",objectFit:"cover"}}
        />
        <div style={{
            paddingTop:".1rem",
            paddingBottom:".35rem",
            paddingLeft:".5rem",
            paddingRight:".5rem",
            display:"flex",
            flexDirection:"column"}} >
            <span style={{margin:0}}>{moment(product.created_at).fromNow()} </span>
            <h4 style={{margin:0}}>{product.title} </h4>

            
        </div>
    </div>
}