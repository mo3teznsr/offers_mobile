import { IonApp, IonContent, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Route } from "react-router";
import AdDetails from "./banner/Details";
import Tab1 from "./Tab1";
import { BannerCreate } from "./banner/Create";
import Tab2 from "./Tab2";
import { LoginComponent } from "./auth/Login";
import { AdCreate } from "./ads/Create";
import { Register } from "./auth/Register";
import Tab3 from "./Tab3";
import { home, menu, person } from "ionicons/icons";

const token=localStorage.getItem('token');


const Tabs= ()=>{ 
    return <IonApp>
        <IonContent>
        <IonTabs>
<IonRouterOutlet>

<Route exact path="/details/:id" component={AdDetails} >
    </Route>
  <Route exact  path="/tabs/tab1">
    <Tab1 />
  </Route>

  <Route exact path="/tabs/tab2">
  {token?<Tab2 />: <LoginComponent />}
  </Route>
  <Route exact path="/add">
   {token?<AdCreate />: <LoginComponent />}
  </Route>
  
  <Route path="/tabs/tab3">
   {token? <Tab3 />:<LoginComponent />}
  </Route>
 
</IonRouterOutlet>
<IonTabBar slot="bottom">
  <IonTabButton tab="tab1" href="/tabs/tab1">
    <IonIcon aria-hidden="true" icon={home} />
    
  </IonTabButton>
  <IonTabButton tab="tab2" href="/tabs/tab2">
    <IonIcon aria-hidden="true" icon={person} />
   
  </IonTabButton>
 
  <IonTabButton tab="tab3" href="/tabs/tab3">
    <IonIcon aria-hidden="true" icon={menu} />
   
  </IonTabButton>
</IonTabBar>
</IonTabs>
</IonContent>
</IonApp>
}
export default Tabs