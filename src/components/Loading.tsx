import { IonSpinner } from "@ionic/react"




const Loading=()=>{


    return <div style={{width:"100%",
    height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <IonSpinner color="primary" />
    </div>
}

export default Loading