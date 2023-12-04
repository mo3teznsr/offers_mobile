import { IonApp, IonContent, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Route, useHistory } from "react-router";
import AdDetails from "./banner/Details";
import Tab1 from "./Tab1";
import { BannerCreate } from "./banner/Create";
import Tab2 from "./Tab2";
import { LoginComponent } from "./auth/Login";
import { AdCreate } from "./ads/Create";
import { Register } from "./auth/Register";

import Tab3 from "./Tab3";
import { home, menu, person } from "ionicons/icons";
import Favorite from "./Favorite";
import I18n from "../i18n"
import { useTranslation } from "react-i18next";

const token=localStorage.getItem('token');


const Tabs= ()=>{ 
  const history=useHistory()
  const {t}=useTranslation()
    return <IonApp>
        <IonContent>
        <IonTabs>
<IonRouterOutlet>

<Route exact path="/details/:id" component={AdDetails} >
    </Route>
  <Route   path="/tabs/home" component={Tab1}>
    
  </Route>
  

  <Route exact path="/tabs/tab2">
  {token?<Tab2 />: <LoginComponent />}
  </Route>
  <Route exact path="/add">
   {token?<AdCreate />: <LoginComponent />}
  </Route>

  <Route exact path="/tabs/favorite">
  {token? <Favorite />:<LoginComponent />}
  </Route>
  
  <Route path="/tabs/tab3">
   {token? <Tab3 />:<LoginComponent />}
  </Route>
 
</IonRouterOutlet>
<IonTabBar slot="bottom">
  <IonTabButton tab="home" href="/tabs/home">
  <svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105" />
  <path d="M16 15c-2.21 1.333 -5.792 1.333 -8 0" />
</svg>
{t("Home")}
  </IonTabButton>
  <IonTabButton tab="tab2" href="/tabs/tab2">
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tags" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l6.116 6.116a2.025 2.025 0 0 0 2.864 0l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-6.117 -6.116a2.025 2.025 0 0 0 -1.431 -.593z" />
  <path d="M17.573 18.407l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-7.117 -7.116" />
  <path d="M6 9h-.01" />
</svg>
{t("My Ads")}
  </IonTabButton>
  <IonTabButton  tab="create-add" onClick={()=>history.push(token?"/banner/create":"/login")} >
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-camera-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5" />
  <path d="M16 19h6" />
  <path d="M19 16v6" />
  <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
</svg>
{t("Create")}
   
  </IonTabButton>
  <IonTabButton tab="favorite" href="/tabs/favorite">
  <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
</svg>
{t("Favorite")}
  </IonTabButton>
 
  <IonTabButton tab="tab3" href="/tabs/tab3">
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>
{t("Account")}
  </IonTabButton>
</IonTabBar>
</IonTabs>
</IonContent>
</IonApp>
}
export default Tabs