import React from 'react';
import fire from "../Fire";

function CoolPerson(){

    const [show, setShow] = React.useState([]);
    const [error, setError] = React.useState([]);
    const [submit, setSubmit] = React.useState();
    const [form, setForm] = React.useState({
        train:"",
        type:"",
        color: ""
    })

    const db = fire.firestore();

    React.useEffect(()=>{
        let newItems=[];

        db.collection("show").get().then(function(snapshot){
            snapshot.forEach(function(doc){

                const obj =doc.data();

                let item = {
                    id: doc.id,
                    train: obj.train,
                    type: obj.type,
                    number: obj.number
                }

                newItems.push(item);

            })
            setShow(newItems)
        });

    }, [db, submit]);

    const handleChange = prop => event =>{
        setForm({
            ...form,
            [prop]:event.target.value
        })
    }

    const handleSubmit= ()=>{
        let errorInput = "";

        if(form.name.length <2){
            errorInput = "More than 2 characters needed";
            setError(errorInput);
        }
        else {
            db.collection("show").add(form).then(() => {
                setForm({
                    train: "",
                    type: "",
                    number: ""
                });
                setError("");
                setSubmit(!submit)
            });
        }
    }

    const handleDelete =(id)=>{
        db.collection("show").doc(id).delete().then(()=>{
            setSubmit(!submit);
        })
    }

    const showEles= show.map((obj, idx)=>
        <div key={idx}>
            <div><span style={{fontSize: obj.number}}>{obj.name}</span><button onClick={()=>handleDelete(obj.id)}> delete me </button></div>
            <div><span style={{fontSize: obj.number}}>{obj.type}</span></div>
            <div><span style={{fontSize: obj.number}}>{obj.number}</span></div>
        </div>
    );

    return(
        <div>
            <h1>Thomas the Train and Friends </h1>
            {showEles}
            <input type="text" placeholder={"Train..."} onChange={handleChange("train")}/>
            <input type="text" placeholder={"Type..."} onChange={handleChange("type")}/>
            <input type="text" placeholder={"Number..."} onChange={handleChange("number")}/>
            <h1>{error}</h1>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
export default CoolPerson;