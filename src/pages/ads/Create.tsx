import { IonButton, IonCheckbox, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonNote, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle } from "@ionic/react"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { BASE_URL } from "../../util/cinfig"
import { checkmarkCircle, chevronBack, closeCircle, closeCircleOutline, images, trashBin } from "ionicons/icons"
import { Camera, CameraResultType } from '@capacitor/camera';
import { Checkbox } from "@mui/material"




export const AdCreate=()=>{

    console.log("Create")
    const [step,setStep]=useState(1)
    const [cities,setCities]=useState([])
    const [is6Submitted,set6Submitted]=useState(false)
    const [is7Submitted,set7Submitted]=useState(false)
    const [areas,setAreas]=useState([])
    const [categories,setCategories]=useState([])
    const [ad,setAd]=useState<any>({images:[]})
    const [name,setName]=useState('')
    const [customFields,setCustomFields]=useState([])
    const [lookups,setLookups]=useState([])
    const [errors,setErrors]=useState([]);
    const [countries,setCountries]=useState([])
    const [profile,setProfile]=useState({})
    const [is4Submitted,setIs4Submitted]=useState(false)
    const [isOpenCountry,setIsOpenCountry]=useState(false)
    const imgRef=useRef()
    const getCustomFields=(id:string)=>{
    
       
    axios.get('/api/custom-field/'+id).then(res=>{
      //  console.log(res.data,'customFields')
        setCustomFields(res.data)
    })
    }
    

    const addCreate=()=>{
        axios.post('/api/products/create',{...ad,customFields}).then(res=>{
           next()
        }).catch(e=>{
            console.log(e.response?.data)
        })
    }

  
    
    useEffect(()=>{
        axios.get('/api/country').then(res=>{
            setCountries(res.data)
        })
        axios.get('/api/city/1').then(res=>{
            setCities(res.data)
        });
        axios.get('/api/area').then(res=>{
            setAreas(res.data)
        });
        axios.get('/api/user').then(res=>{

            console.log(res.data)
            setProfile(res.data)
            setAd({...ad,country_id:res.data.country_id,mobile:res.data.mobile})
        });
    
        axios.get('/api/lookup-item').then(res=>{
            console.log(res.data)
            setLookups(res.data)
        });
        axios.get("/api/category").then(res=>{
            setCategories(res.data)
        }).catch(err=>{
    
        })
    },[])

    const next=()=>{
        setStep(step+1)
    }
    const back=()=>{
        setStep(step>1?step-1:1)
    }

    return <IonPage><IonContent> <div  className="ion-padding">
        <div style={{height:40}}></div>
<input type="file" accept="image/*" style={{display:"none"}} ref={imgRef} onChange={(e)=>{
 
 const file=e.target.files[0]
 if(file)
 {
   const data=new FormData()
   data.append('image', file)
   
     axios.post('/api/upload',data).then(res=>{
        const images=ad.images
        images.push(res.data)
        setAd({...ad,Images:[...images],...(!ad.image&&{image:res.data})})
     })
   //  setAd(oldAd=>({...oldAd,Images:[...images,...imgs]}))
     
 }

}}  />
<div style={{display:"flex",gap:5,marginBottom:"1rem"}}>
    <IonIcon icon={chevronBack} onClick={back} style={{width:"100%"}} />
    {[1,2,3,4,5,6,7].map((item)=><div style={{width:"100%",height:20,borderRadius:5,background:step>=item?"#ef4444": "#eee"}}></div>)}
</div>
        {step==1&& <div style={{display:"grid",gridTemplateColumns:" repeat(3, 1fr) ",gap:10}} >
            {categories.filter(item=>item.categoryId==0).map(item=><div key={item.id} onClick={()=>{
                setAd({...ad,category_id:item.id})
                getCustomFields(item.id)
                next()
            }}>
                <img src={item.image?BASE_URL+'/images/'+item.image:"assets/images/404.jpg"} style={{width:100,height:100,borderRadius:100,objectFit:"cover"}} />
                <span style={{display:"block",textAlign:"center"}}>{item.name_en}</span>
            </div>)}
        </div>}

{step==2&& <div style={{display:"grid",gridTemplateColumns:" repeat(3, 1fr) ",gap:10}} >
            {categories.filter(item=>item.categoryId==ad.category_id).map(item=><div key={item.id} onClick={()=>{
                setAd({...ad,subcategory_id:item.id})
                next()
            }}>
                <img src={item.image?BASE_URL+'/images/'+item.image:"assets/images/404.jpg"} style={{width:100,height:100,borderRadius:100,objectFit:"cover"}} />
                <span style={{display:"block",textAlign:"center"}}>{item.name_en}</span>
            </div>)}
        </div>}

        {step==3&& <div style={{display:"grid",gridTemplateColumns:" repeat(3, 1fr) ",gap:10}} >
            {categories.filter(item=>item.categoryId==ad.subcategory_id).map(item=><div key={item.id} onClick={()=>{
                setAd({...ad,subsubcategory_id:item.id})
                next()
            }}>
                <img src={item.image?BASE_URL+'/images/'+item.image:"assets/images/404.jpg"} style={{width:100,height:100,borderRadius:100,objectFit:"cover"}} />
                <span style={{display:"block",textAlign:"center"}}>{item.name_en}</span>
            </div>)}
        </div>}

        {step==4&&<div>
            {customFields.map(item=><div key={item.id}><IonItem  >
                <IonLabel position="stacked">{item.name_en}</IonLabel>
                {item.lookup_id?<IonSelect value={item.value} onIonChange={(e)=>{
                   const fields= customFields.map((field:any)=>{
                        return {...field, ...(field.id===item.id&&{value:e.target.value})}
                    })
                    setCustomFields(fields)
                }}>
                    {lookups.filter(lookup=>lookup.lookup_id==item.lookup_id).map(lookup=><IonSelectOption
                    key={lookup.id}
                    value={lookup.id}
                    >{lookup.name_en}</IonSelectOption>)}
                </IonSelect>:<IonInput value={item.value}
                onIonChange={(e)=>{
                    const fields= customFields.map((field:any)=>{
                         return {...field, ...(field.id===item.id&&{value:e.target.value})}
                     })
                     setCustomFields(fields)
                 }} 
                ></IonInput>}
                
            </IonItem>
            {is4Submitted&&!item.value&&<IonNote color="danger">required</IonNote>}
            </div>)}
            <IonItem  >
      <IonCheckbox value={ad.isPriceHidden} onIonChange={(e)=>setAd({...ad,isPriceHidden:e.target.value})} slot="start"></IonCheckbox>
      <IonLabel>Price is hidden</IonLabel>
    </IonItem>
            <IonItem>
                <IonLabel position="stacked">Price</IonLabel>
                <IonInput value={ad.price} onIonChange={(e)=>setAd({...ad,price:e.target.value})}></IonInput>
            </IonItem>
            <IonItem  >
      <IonCheckbox value={ad.isPriceNegotiable} onIonChange={(e)=>setAd({...ad,isPriceNegotiable:e.target.value})} slot="start"></IonCheckbox>
      <IonLabel>Price is negotiable</IonLabel>
    </IonItem>

    <IonButton onClick={()=>{
       let isError=false;
       setIs4Submitted(true)
       for(let i=0;i<customFields.length;i++)
       {
            if(!customFields[i].value)
            {
                isError=true;
            }
       }

       if(!isError)
       {
        next()
       }

    }} style={{marginTop:10,width:"100%"}} color="danger" >next</IonButton>
            
            </div>}

            {step==5&&<div>

                

                <IonButton style={{width:"100%"}} onClick={()=>{
                imgRef.current?.click()
  

  
                }} color={"light"} >
                    Add images <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 8h.01" />
  <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
  <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
  <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54" />
  <path d="M16 19h6" />
  <path d="M19 16v6" />
</svg>
                    </IonButton>
                    <IonNote>You can add 12 photos</IonNote>

                    <div style={{display:"grid",gridTemplateColumns:"auto auto",gap:10}} >
                        {ad.images.map((img,index)=><div key={img} style={{position:"relative"}}>
                            
                                <IonIcon icon={closeCircleOutline} size="large" color="primary"  style={{position:"absolute",top:5,left:5}} onClick={()=>{
                                const list=ad.images
                                list.splice(index,1)
                                setAd({...ad,images:[...list]})
                            }} />
                          
                            <img src={BASE_URL+'/images/'+img} style={{width:"100%",height:250,objectFit:"cover",borderRadius:10}} />
                            <IonItem>
                                <Checkbox onClick={()=>setAd({...ad,image:img})} checked={ad.image==img}></Checkbox>
                                <IonLabel>main image</IonLabel>
                            </IonItem>
                        </div>)}
                       
                        </div>
                        <IonButton color={"danger"} onClick={()=>next()} style={{width:"100%"}} >next</IonButton>

                </div>}

                {step==6&&<div>
                    <IonTitle>Ad Information</IonTitle>

                    <IonItem>
                        <IonLabel position="floating">Ad Title</IonLabel>
                        <IonInput required fill="outline" value={ad.title} 
                        onIonChange={(e)=>setAd({...ad,title:e.target.value})}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Ad description</IonLabel>
                        <IonTextarea fill="outline" value={ad.description} 
                        onIonChange={(e)=>setAd({...ad,description:e.target.value})}
                        ></IonTextarea>
                    </IonItem>

                    <IonButton color={"danger"} onClick={()=>next()} disabled={!ad.title} style={{width:"100%"}} >next</IonButton>
                    
                    </div>}

                {step==7&&<div>
                    <IonTitle>Personal Information</IonTitle>

                    <IonNote style={{marginTop:25}}>Phone number</IonNote>
                    <div style={{display:"flex"}}>
                        <IonItem>
                            <IonSelect value={ad.country_id} 
                            onIonChange={(e)=>setAd({...ad,country_id:e.target.value})}>
                                {countries.map(item=><IonSelectOption value={item.id}>+{item.mobile_code}</IonSelectOption>)}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonInput value={ad.mobile} onIonChange={(e)=>setAd({...ad,mobile:e.target.value})}></IonInput>
                        </IonItem>
                        </div>
                        <IonItem>
                            <IonLabel>City</IonLabel>
                            <IonSelect value={ad.city_id} 
                            onIonChange={(e)=>setAd({...ad,city_id:e.target.value})}>
                                {cities.map(item=><IonSelectOption value={item.id}>{item.name_en}</IonSelectOption>)}
                            </IonSelect>
                        </IonItem>

                        <IonItem>
                            <IonLabel>Area</IonLabel>
                            <IonSelect value={ad.area_id} 
                            onIonChange={(e)=>setAd({...ad,area_id:e.target.value})}>
                                {areas.filter(item=>item.city_id==ad.city_id).map(item=><IonSelectOption value={item.id}>{item.name_en}</IonSelectOption>)}
                            </IonSelect>
                        </IonItem>

                        <IonButton color={"danger"} disabled={!ad.city_id||!ad.area_id} onClick={addCreate} style={{width:"100%"}} >save</IonButton>

                    </div>}

                    {step==8&&<div style={{display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center",justifyItems:"center",paddingTop:100,paddingBottom:100,width:"100%"}}>
                        <IonIcon icon={checkmarkCircle} color="success" style={{width:300,height:300,display:"block",margin:"auto"}} />
                        </div>}

    </div></IonContent></IonPage>
}