import { IonContent, IonHeader, IonPage, IonTabBar, IonTitle, IonToolbar } from "@ionic/react"
import { IconButton } from "@mui/material"
import { useTranslation } from "react-i18next"
import { LoginComponent } from "./auth/Login"
import { useHistory } from "react-router"



const LoginPage=()=>{

const {t,i18n}=useTranslation()
const lang=localStorage.getItem('language')||"en"
const history=useHistory()
    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IconButton onClick={()=>history.goBack()} slot="start">
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
                <IonTitle>{t("Login")} </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <LoginComponent />
        </IonContent>

    </IonPage>
}


export default LoginPage