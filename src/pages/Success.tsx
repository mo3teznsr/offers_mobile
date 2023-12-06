import { IonContent, IonPage } from "@ionic/react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router"



const Success=()=>{

    const {t}=useTranslation()
    const history=useHistory()
    return <IonPage>
        <IonContent>
            <div style={{width:"100%",height:"100vh",flexDirection:"column"
            ,display:"flex",justifyContent:"center",
            alignItems:"center"}}>
                <img src="assets/images/success.png" />

                <p className="my-2">{t("Thank you for adding offer, Good luck")}</p>
                <button 
                onClick={()=>history.push("/tabs/home")}
                className="btn btn-danger"
                 >{t("Go to Home")}</button>
            </div>
        </IonContent>
    </IonPage>
}


export default Success