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
import I18n from './i18n';
import LoginPage from './pages/LoginPage';
import List from './pages/List';
import { ThemeProvider, createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { I18nextProvider } from 'react-i18next';
import { BannerUpdate } from './pages/banner/Update';
import Success from './pages/Success';
setupIonicReact();
axios.defaults.baseURL=BASE_URL
const token=localStorage.getItem('token');


axios.defaults.headers.common['Authorization']=token?"Bearer " + token:null


const App: React.FC = () => {
  const lang=localStorage.getItem('language')||"en"
  const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
     
    },
    shape:{
      borderRadius:15,
     
    },
    components:{
     
    }
  });

useEffect(()=>{
 I18n.changeLanguage(lang)
 I18n.dir(lang==="ar"?"rtl":"rtl")
  axios.get('/api/user').then(res=>{
  }).catch(e=>{
    localStorage.removeItem('token');
  })
},[])
  
  return (
    <I18nextProvider i18n={I18n}>
    <ThemeProvider theme={theme}>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
  <IonApp style={{direction:lang==="ar"?"rtl":"ltr"}}>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/banner/update/:id" component={BannerUpdate} ></Route>
        <Route exact path="/success" component={Success} />
      <Route exact path="/add"  >
      {token?<AdCreate /> : <LoginComponent/> }
        </Route>
      <Route exact path="/ad/:id" component={AdDetails} />
      <Route exact path="/">
            <Splash/>
          </Route>
          <Route path="/tabs" component={Tabs}>
            
          </Route>
          <Route exact path="/city/:id" component={City} >
            <City />
            </Route>
          <Route path="/list" component={List} ></Route>

          
          <Route path="/login" component={LoginPage}></Route>
          <Route exact path="/register">
    <Register />
  </Route>
          <Route exact path="/banner/create">
    <BannerCreate />
  </Route>
      </IonRouterOutlet>
    
    </IonReactRouter>
  </IonApp>
  </LocalizationProvider>
  </ThemeProvider>
</I18nextProvider>
);}

export default App;
