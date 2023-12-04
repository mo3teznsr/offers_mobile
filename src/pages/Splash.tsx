import { IonContent, IonPage } from "@ionic/react";
import { useEffect } from "react";



const Splash=()=>{
useEffect(()=>{
    setTimeout(()=>{
        window.location.replace('/tabs/home')
    },5000)
})
return <IonPage>
    <IonContent >
       
        <div style={{width:"100%",height:"100vh",
        display:"flex",flexDirection:"column",justifyContent:"center",
        alignItems:"center"
        ,background:"#B80007"}}>

            <img src="assets/images/splash.gif" />
        </div>

    </IonContent>
</IonPage>}


export default Splash