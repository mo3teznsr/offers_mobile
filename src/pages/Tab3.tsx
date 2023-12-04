import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { informationCircle, logOut, person } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Divider, Drawer } from '@mui/material';


const Tab3: React.FC = () => {
  const [showLanguage,setShowLanguage]=useState(false)
  const changeLanguage=(lang:string)=>{
   
    localStorage.setItem('language',lang)
    setShowLanguage(false)
    window.location.reload()
  }
  const {t}=useTranslation()
  const lang=localStorage.getItem('language')||"en"
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div className='main-container'>
        <IonItem lines='none'>
        <svg xmlns="http://www.w3.org/2000/svg" slot="start" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>
          <IonLabel>{t("My Account")}</IonLabel>
        </IonItem>
        <IonItem lines='none'>
          <IonIcon icon={informationCircle} slot='start' mode='ios' />
          <IonLabel>{t("Terms and conditions")}</IonLabel>
        </IonItem>
        
        <IonItem lines='none'>
          <IonIcon icon={informationCircle} slot='start' mode='ios' />
          <IonLabel>{t("About us")}</IonLabel>
        </IonItem>
        <IonItem onClick={()=>setShowLanguage(true)} lines='none'>
        <svg xmlns="http://www.w3.org/2000/svg" slot="start" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
  <path d="M3.6 9h16.8" />
  <path d="M3.6 15h16.8" />
  <path d="M11.5 3a17 17 0 0 0 0 18" />
  <path d="M12.5 3a17 17 0 0 1 0 18" />
</svg>
          <IonLabel>{t("Language")}</IonLabel>
        </IonItem>
        <IonItem lines='none' onClick={()=>{
            localStorage.removeItem('token')
            window.location.reload()
          }}>
          <IonIcon icon={logOut} slot='start'  mode='ios' />
          <IonLabel>{t("logout")}</IonLabel>
        </IonItem>

        </div>

        <Drawer
       dir={lang=="ar"?"rtl":"ltr"}
       style={{direction:lang=="ar"?"rtl":"ltr"}}
      anchor="bottom"
      open={showLanguage}
      onClose={()=>setShowLanguage( false)}
    >
    
     <div className='p-2'
      style={{direction:lang=="ar"?"rtl":"ltr"}}
      dir={lang=="ar"?"rtl":"ltr"} >
     <strong className='text-center'>{t("Language")} </strong>
     <Divider className='my-1' />
    
     <IonItem onClick={()=>changeLanguage('ar')}>
      <IonAvatar slot='start'>
        <img src="/assets/images/uae.webp" />
        
      </IonAvatar>
      <IonLabel>العربية</IonLabel>
     </IonItem>
     <IonItem onClick={()=>changeLanguage('en')}>
      <IonAvatar slot='start'>
        <img src="/assets/images/usa.png" />
        
      </IonAvatar>
      <IonLabel>English</IonLabel>
     </IonItem>

     </div>
    </Drawer>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
