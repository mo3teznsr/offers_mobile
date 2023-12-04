import { IonNote, IonTitle } from "@ionic/react"
import moment from "moment"
import { BASE_URL } from "../util/cinfig"
import { IconButton } from "@mui/material"
import { useHistory } from "react-router"






export const AdsView=({product,productDetails}:any)=>{



    return <div className="shadow" style={{
        position:"relative",
        display:"flex",
    flexDirection:"column",gap:10,marginTop:10,borderRadius:".5rem"}}>
        <IconButton style={{position:"absolute",top:".5rem",left:".5rem"}} >
        <svg xmlns="http://www.w3.org/2000/svg" 
       
        width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
</svg>
        </IconButton>
        <img 
        onClick={()=>{
            console.log('show')
            productDetails(product)}}
        src={product.image?BASE_URL+'/images/'+product.image:"assets/images/404.jpg"} 
        style={{width:"100%",height:200,borderRadius:".5rem",objectFit:"cover"}}
        />
        <div style={{
            paddingTop:".1rem",
            paddingBottom:".35rem",
            paddingLeft:".5rem",
            paddingRight:".5rem",
            display:"flex",
            flexDirection:"column"}} >
            <span  onClick={()=>productDetails(product)} style={{margin:0}}>{moment(product.created_at).fromNow()} </span>
            <h4  onClick={()=>productDetails(product)} style={{margin:0}}>{product.title} </h4>

            <div style={{display:"flex",justifyContent:"center"}}>
                <IconButton href={`tel:0${product.user.mobile}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>
                </IconButton>
                <IconButton href={`https://wa.me/971${product.user.mobile}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
</svg>
                </IconButton>
            </div>
        </div>
    </div>
}