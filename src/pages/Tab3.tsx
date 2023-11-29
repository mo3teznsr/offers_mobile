import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { informationCircle, logOut, person } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

const Tab3: React.FC = () => {
  const {t}=useTranslation()
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonItem>
          <IonIcon icon={person} slot='start' mode='ios' />
          <IonLabel>{t("My Account")}</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon icon={informationCircle} slot='start' mode='ios' />
          <IonLabel>{t("Terms and conditions")}</IonLabel>
        </IonItem>
        
        <IonItem>
          <IonIcon icon={informationCircle} slot='start' mode='ios' />
          <IonLabel>{t("About us")}</IonLabel>
        </IonItem>
        <IonItem onClick={()=>{
            localStorage.removeItem('token')
            window.location.reload()
          }}>
          <IonIcon icon={logOut} slot='start'  mode='ios' />
          <IonLabel>{t("logout")}</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
