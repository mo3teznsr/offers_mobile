import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle, ellipse, home, menu, person, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import 'swiper/css';
import axios from 'axios';
import { BASE_URL } from './util/cinfig';
import { AdCreate } from './pages/ads/Create';
import { LoginComponent } from './pages/auth/Login';
import { useEffect } from 'react';
import {I18n} from "./i18n"
import { Register } from './pages/auth/Register';
import { BannerCreate } from './pages/banner/Create';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import { ProductDetails } from './pages/ads/Details';
import City from './pages/City';
import AdDetails from './pages/banner/Details';
import Splash from './pages/Splash';
import Tabs from './pages/Tabs';

setupIonicReact();
axios.defaults.baseURL=BASE_URL
const token=localStorage.getItem('token');


axios.defaults.headers.common['Authorization']=token?"Bearer " + token:null


const App: React.FC = () => {
  
useEffect(()=>{
  axios.get('/api/user').then(res=>{
  }).catch(e=>{
    localStorage.removeItem('token');
  })
},[])
  
  return (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      <Route exact path="/add"  >
      {token?<AdCreate /> : <LoginComponent/> }
        </Route>
      <Route exact path="/ad/:id" component={ProductDetails} />
      <Route exact path="/">
            <Splash/>
          </Route>
          <Route path="/tabs" component={Tabs}>
            
          </Route>
          <Route exact path="/register">
    <Register />
  </Route>
          <Route exact path="/banner/create">
    <BannerCreate />
  </Route>
      </IonRouterOutlet>
    
    </IonReactRouter>
  </IonApp>
);}

export default App;
