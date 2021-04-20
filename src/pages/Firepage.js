import React from 'react';
import fire from "../Fire";

function FirePage(){

    const [albums, setAlbums] = React.useState([]);
    const [submit, setSubmit] = React.useState();
    const [form, setForm] = React.useState({
        title:"",
        artist:"",
        year:""
    })

    const db = fire.firestore();

    React.useEffect(()=>{
        let newItems=[];

        db.collection("albums").get().then(function(snapshot){
            snapshot.forEach(function(doc){

                const obj =doc.data();

                let item = {
                    id: doc.id,
                    title:obj.title,
                    artist: obj.artist,
                    year: obj.year
                }

                newItems.push(item);

            })
            setAlbums(newItems)
        });
    }, [db, submit]);

    const handleChange = prop => event =>{
        setForm({
            ...form,
            [prop]:event.target.value
        })
    }

    const handleSubmit= ()=>{
        db.collection("albums").add(form).then(() =>{
            setForm({
                title: "",
                artist:"",
                year:""
            });

            setSubmit(!submit)
        });
    }
    const handleDelete =(id)=>{
        db.collection("albums").doc(id).delete().then(()=>{
            setSubmit(!submit);
        })
    }

    const albumEles= albums.map((alb, idx)=>
        <div key={idx} onClick={()=>handleDelete(alb.id)}>
            <h1>{alb.title}</h1>
            <h3>{alb.artist}</h3>
            <h3>{alb.year}</h3>
        </div>
    );

    return(
        <div>
            <h1>Fire Page</h1>
            {albumEles}
            <input type="text" placeholder={"Title..."} onChange={handleChange("title")}/>
            <input type="text" placeholder={"Artist..."} onChange={handleChange("artist")}/>
            <input type="text" placeholder={"Year..."} onChange={handleChange("year")}/>
            <h1>{form.title} {form.artist} {form.year}</h1>
            <button onClick={handleSubmit}>Submit</button>
        </div>

    )
}
export default FirePage;

