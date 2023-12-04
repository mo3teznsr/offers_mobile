import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonNote, IonPage, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from "@ionic/react"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"





export const LoginComponent =()=>{
    const [countries,setCountries]=useState([])
    const [error,setError]=useState(false)
    const [country,setCountry]=useState<any>({})
    const [isOpenCountry,setIsOpenCountry]=useState(false)
    const [loading,setLoading]=useState(false)
    const [loginResult,setLoginResult]=useState({country_id:1})
    const [user,setUser]=useState<any>({country_id:1})
    const [confirm, setConfirm] = useState(null);
    const [register,setRegister] = useState({country_id:1})
    const [show,setShow] = useState('login')
    const [errors,setErrors] = useState({})


const Login=()=>{
  
}

const { t, i18n } = useTranslation();
const [showPasswords,setShowPasswords] = useState(false)

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
    
        <img src="assets/images/offers.png" style={{margin:"25px auto",display:"block",borderRadius:"250px"}}  />
      
        {/* <IonSegment value={show} >
        <IonSegmentButton onClick={()=>setShow('login')} value="login">
          <IonLabel>{t("login")}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton onClick={()=>setShow('register')} value="register">
          <IonLabel>{t("register")} </IonLabel>
        </IonSegmentButton>
      </IonSegment> */}
        
{show==="login"?<div>
<IonLabel>{t("Mobile")} </IonLabel>

<TextField
        id="input-with-icon-textfield"
        placeholder={t("Mobile")}
        value={user.mobile} onChange={(e)=>setUser({...user,mobile:e.target.value})}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
         
            <IonSelect interface="action-sheet" value={user.country_id}  onIonChange={(e)=>setUser({...user,country_id:e.target.value})} >
                {countries.map((item:any)=><IonSelectOption key={item.id} value={item.id}>+{item.mobile_code}</IonSelectOption>)}

            </IonSelect>
            
            </InputAdornment>
          ),
        }}
        variant="outlined" fullWidth margin="dense"
      />
       
      
     
            <IonLabel position="floating">{t("Password")}</IonLabel>
            <TextField
        id="input-with-icon-textfield"
        placeholder={t("Password")}
        type={showPasswords?"text":"password"}
        onChange={e=>setUser({...user,password:e.target.value})}
        value={user.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
  <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
  <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
</svg>
            </InputAdornment>
          ),
          endAdornment:<InputAdornment position="end">
            <IconButton onClick={()=>setShowPasswords(!showPasswords)}>
                {!showPasswords?<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-closed" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
  <path d="M3 15l2.5 -3.8" />
  <path d="M21 14.976l-2.492 -3.776" />
  <path d="M9 17l.5 -4" />
  <path d="M15 17l-.5 -4" />
</svg>:<svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
</svg>}
            </IconButton>
          </InputAdornment>
        }}
        variant="outlined" fullWidth margin="dense"
      />
        

       {error&& <IonItem color="danger" style={{marginTop:15}} lines="none">
            <IonLabel>{t("Wrong credentials")}</IonLabel>
        </IonItem>}

    
         <button 
         onClick={()=>{
          setError(false)
            axios.post('/api/login',user).then(res=>{
              localStorage.setItem('token',res.data);
              window.location.replace('/tabs/home')
            }).catch(e=>{
              console.log(e)
              setError(true)
            })
      }}
          className="btn btn-danger my-2 w-100">
        {t("Login")}
        </button>

        <a href="/register" className="btn btn-outline-danger w-100">
        {t("SignUp")}
        </a>


        </div>:<div>
        <IonItem>
                <IonLabel position="stacked">{"name"} </IonLabel>
                <IonInput className={errors.name?"ion-invalid":""} value={register.name} 
               
                onIonChange={e=>setRegister({...register,name:e.target.value})}
                  />
                 
            </IonItem>
            {errors.name&& <IonNote color="danger">{errors.name[0]}</IonNote>}

            <IonItem>
                <IonLabel position="stacked">{"email"} </IonLabel>
                <IonInput className={errors.email?"ion-invalid":""} value={register.email} 
                
                onIonChange={e=>setRegister({...register,email:e.target.value})}
                  />
                   
            </IonItem>
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
            </div>}

    </div></IonContent></IonPage>
}