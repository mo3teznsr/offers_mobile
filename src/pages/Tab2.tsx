import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MyAds } from './account/ads';
import { MyBanners } from './account/banners';

const Tab2: React.FC = () => {
  const [user,setUser]=useState({})
  const [show,setShow] = useState('ads')
const {t}=useTranslation()
  return (
    <IonPage>

      <IonContent className='ion-padding' >
      {/* <IonSegment value={show}>
        <IonSegmentButton onClick={()=>setShow("ads")} value="ads">
          <IonLabel>{t("My Ads")}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton onClick={()=>setShow("banners")} value="banners">
          <IonLabel>{t("My Banners")}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton onClick={()=>setShow("comments")} value="comments">
          <IonLabel>{t("My Comments")}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton onClick={()=>setShow("favorites")} value="favorites">
          <IonLabel>{t("Favorites")}</IonLabel>
        </IonSegmentButton>
        
      </IonSegment> */}

     <MyBanners />
       
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
