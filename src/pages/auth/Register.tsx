import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption } from "@ionic/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"





export const Register =()=>{
    const [countries,setCountries]=useState([])
    const [error,setError]=useState(false)
    const [country,setCountry]=useState<any>({})
    const [isOpenCountry,setIsOpenCountry]=useState(false)
    const [loading,setLoading]=useState(false)
    const [loginResult,setLoginResult]=useState({})
    const [user,setUser]=useState<any>({country_id:1})
    const [confirm, setConfirm] = useState(null);
    const [register,setRegister] = useState({country_id:1})
    const [errors,setErrors] = useState({})

const Login=()=>{
  
}

const { t, i18n } = useTranslation();


useEffect(()=>{
    axios.get('/api/country').then(res=>{
        
        setCountries(res.data)
        let item=res.data.find((country:any) => country.id==1)
       // console.log('item',item,res.data)
       setUser({...user,country_id:item?.id})
        
    }).catch(e=>{
        console.log('Error countries',e.response)
    })
},[])

    return <IonPage><IonContent> <div className="ion-padding" style={{marginTop:"15px"}}>
      
        <img src="assets/images/logo.png" style={{marginTop:25}}  />
        

        <div>
        <IonLabel position="stacked">{"name"} </IonLabel>
       
                
                <IonInput  fill="outline"
                className={errors.name?"ion-invalid":""} value={register.name} 
               
                onIonChange={e=>setRegister({...register,name:e.target.value})}
                  />
                 
            
            {errors.name&& <IonNote color="danger">{errors.name[0]}</IonNote>}

           
                <IonLabel position="stacked">{"email"} </IonLabel>
                <IonInput fill="outline" className={errors.email?"ion-invalid":""} value={register.email} 
                
                onIonChange={e=>setRegister({...register,email:e.target.value})}
                  />
                   
           
            {errors.email&& <IonNote color="danger">{errors.email[0]}</IonNote>}
        <div style={{display:"flex"}}>
            
            
            <IonItem>
            <IonSelect interface="action-sheet" value={register.country_id}  onIonChange={(e)=>setRegister({...register,country_id:e.target.value})} >
                {countries.map((item:any)=><IonSelectOption key={item.id} value={item.id}>+{item.mobile_code}</IonSelectOption>)}

            </IonSelect>
            </IonItem>
           
            <IonItem style={{flex:1}} >
                <IonInput value={register.mobile} className={errors.mobile?"ion-invalid":""}
               
                 onIonChange={(e)=>setRegister({...register,mobile:e.target.value})}></IonInput>
                  
            </IonItem>
            
        </div>
        {errors.mobile&& <IonNote color="danger">{errors.mobile[0]}</IonNote>}
        <IonItem>
            <IonLabel position="floating">{t("Password")}</IonLabel>
            <IonInput value={register.password}  className={errors.password?"ion-invalid":""}
           
            onIonChange={(e)=>setRegister({...register,password:e.target.value})} type="password"></IonInput>
             
        </IonItem>
        {errors.password&& <IonNote color="danger">{errors.password[0]}</IonNote>}

     

        <IonButton color="danger"  onClick={()=>{
            setErrors({})
              axios.post('/api/register',register).then(res=>{
                localStorage.setItem('token',res.data);
                window.location.reload()
              }).catch(e=>{
                console.log(e.response?.data)
               if(e.response?.data)
                setErrors(e.response?.data.errors)
              })
        }} style={{width:"100%"}}>{t("Register")}</IonButton>
            </div>

       {error&& <IonItem color="danger" style={{marginTop:15}} lines="none">
            <IonLabel>Wrong credentials</IonLabel>
        </IonItem>}

        <IonButton color="danger"  onClick={()=>{
            setError(false)
              axios.post('/api/users/register',user).then(res=>{
                localStorage.setItem('token',res.data.token);
                window.location.reload()
              }).catch(e=>{
                console.log(e)
                setError(true)
              })
        }} style={{width:"100%"}}>{t("login")}</IonButton>

    </div></IonContent></IonPage>
}