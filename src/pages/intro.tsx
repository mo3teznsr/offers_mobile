import { IonAvatar, IonContent, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup } from "@ionic/react";
import { Button, Radio } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import axios from "axios";
import { BASE_URL } from "../util/cinfig";
import { useHistory } from "react-router";

const Step1=({lang,setLang,cities,city,setCity,setStep}:any)=>{

    
const {t}=useTranslation()
const changeLang=(lang:string)=>{
    localStorage.setItem('language',lang);
    i18n.changeLanguage(lang)
    i18n.dir(lang==="ar"?"rtl":"rtl")
    setLang(lang)
}
useEffect(()=>{
    const lang=localStorage.getItem("language")??'en'
    changeLang(lang)
},[])
const history=useHistory()
    return <div style={{display:"flex",flexDirection:"column",padding:"1rem",gap:".5rem"}}>
        <img src="assets/images/logo.png" />
        <strong className="text-center">{t("WELCOME")}</strong>

        <strong style={{fontSize:14}}>{t("Please Select Your Languager")}</strong>
        <div style={{display:"flex",gap:10}}>
            
        <button  onClick={()=>changeLang("en")} className={lang==="en"?"btn btn-danger":"btn btn-outline-dark"} style={{borderRadius:"2rem"}}>
            <img src="assets/images/usa.png" alt="en" style={{width:30,height:30,borderRadius:30,border:"1px #eee solid"}} /> <span className="mx-1">English</span>
        </button>
        <button onClick={()=>changeLang("ar")} className={lang==="ar"?"btn btn-danger":"btn btn-outline-dark"} style={{borderRadius:"2rem"}} >
            <img src="assets/images/uae.webp" alt="en" style={{width:30,height:30,borderRadius:30,border:"1px #eee solid"}} /> <span className="mx-1">العربية</span>
        </button>
        </div>
        <strong style={{fontSize:14}}>{t("Please Select Your Emirate")}</strong>
       <div style={{flex:1,paddingBottom:"4rem"}}>
      
        {cities.map(item=><IonItem  
       key={item.id}
     > 
      <IonAvatar slot="start">
      <img src={BASE_URL+"/images/"+item.image}   />
      </IonAvatar>
         
          
          <IonLabel>
          {i18n.language=='ar'?item.name_ar:item.name_en}
          </IonLabel>
          <Radio value={item.id} checked={item.id==city}  onClick={()=>{
            setCity(item.id);
            localStorage.setItem('city', item.id);
          }} slot="end"></Radio>
         
        </IonItem>)}

       
        
        </div>
<div style={{position:"fixed",bottom:"0.5rem",zIndex:10,left:0,right:0,padding:10}}>
        {(city&&lang)&&<button onClick={()=>{
            history.replace("/tabs/home")
        }} className="btn btn-outline-dark  bg-white w-100" style={{borderRadius:"2rem",height:50}} disabled={!(city&&lang)}>
            {t("Continue")}
        </button>}
       
</div>

    </div>
}
const Step2=({step,setStep}:any)=>{
    const {t}=useTranslation()
    const history=useHistory()
    return <div style={{display:"flex",flexDirection:"column",gap:'10px',height:"100dvh"}}>
        <img src="assets/images/logo.png" style={{width:"100%"}} />
<div className="px-2" style={{flex:1}}>
<strong> {t("Before uploading your offer, please read these instructions carefully:")}</strong>
              <ol>
<li>{t("Do not post inappropriate pictures or indecent words.")}</li>
<li>{t("Do not publish incorrect information about prices and products, which exposes you to accountability and cancellation of the advertisement without further notice.")}</li>
<li>{t("Discounts or promotions must be for at least 5 products, services or items during the offer period.")}</li>
<li>{t("The period of offers ranges from 7 to 30 days.")}</li>
<li>{t("You must make sure to write down contact numbers, social media links, and location coordinates.")}</li>
<li>{t("The period for publishing the advertisement in the APP must be chosen correctly and it differs from the period for discounts.")}</li>
<li>{t("The discount period does not have to be the same as the period of publication of the advertisement.")}</li>
<li>{t("Choosing clear images, clear font, and the appropriate section in the APP will increase followers’ communication.")}</li>
</ol>

</div>
<div className="p-2">
{<button onClick={()=>{
  localStorage.setItem("oldUser","true")
  window.location.replace("/tabs/home")
}}className="btn btn-outline-dark mt-2 w-100" 
style={{borderRadius:"2rem",height:50}} >
            {t("Agree")}
        </button>}
</div>
       
    </div>
}



const RenderStep=({step,setStep,cities,lang,setLang,city,setCity}:any)=>{

    switch(step)
    {
        case 1:
            return <Step1  lang={lang} setLang={setLang} setStep={setStep} city={city} setCity={setCity} cities={cities}/>;
        case 2:
            return <Step2  step={step} setStep={setStep} />;
       

    }

}


const Intro =()=>{
const [step,setStep]=useState(1)
const [lang,setLang]=useState("")
const [city,setCity]=useState('')
const [cities,setCities]=useState([])

useEffect(()=>{
    axios.get("/api/city").then(res=>{setCities(res.data)})
},[])
return <IonPage dir={lang==="ar"?"rtl":"ltr"}>

<IonContent>

   

    {<RenderStep step={step} lang={lang} 
    setStep={setStep}
    setLang={setLang} city={city} 
    setCity={setCity} cities={cities} 
      />}

</IonContent>
</IonPage>}


export  default Intro