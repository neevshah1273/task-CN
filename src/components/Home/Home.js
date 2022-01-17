import axios from 'axios';
import React,{ useState,useEffect } from "react";
import Cards from "../Cards/Cards.js";
import Navbar1 from "../Navbar/NavBar1";
import Navbar2 from "../Navbar/NavBar2";

const Home = () => {

    const API = axios.create({baseURL:'https://api.codingninjas.com/api/v3'});
    const [tag, settag] = useState([]);
    

    const catogory = [ 'ALL_EVENTS','CODING_EVENT', 'WEBINAR', 'BOOTCAMP_EVENT', 'WORKSHOP'];

    const [selectedcatogory, setselectedcatogory] = useState('ALL_EVENTS');

    const subcatogory = ['Upcoming', 'Archived' ,'All Time Favorites'];

    const [selectedsubcatogory, setselectedsubcatogory] = useState('Upcoming');

    const tag_list = [];

    const [offset, setoffset] = useState(0);

    const [selectedtag, setselectedtag] = useState([]);

    const [events, setevents] = useState([]);
    
    useEffect(()=>{
        gettag();
        getevents();
    },[]);
    

    const gettag = () =>{
        API.get('/event_tags')
        .then((res)=>{settag(res.data.data.tags);})
        .catch((err)=>console.log(err.message));
    }

    const getevents = () =>{
        
        //var string = 

        API.get('/events',
        {params:
            {event_category : selectedcatogory,
            event_sub_category : selectedsubcatogory,
            tag_list : selectedtag.toString(),
            offset : offset
        }}).then((res)=>setevents(res.data.data.events)).catch((err)=>console.log(err.message)).finally(()=>console.log(events))



        
    }

    const handlechange = (e) =>{
        
        if(e.target.style.backgroundColor==='white'){
            e.target.style.backgroundColor='green';
            setselectedtag(selectedtag.concat([e.target.value]))
        }
        else{
            e.target.style.backgroundColor='white';
            setselectedtag(selectedtag.filter(function(stag){
                return stag!==e.target.value;
            }))
        }
        getevents();
        console.log(selectedtag);
    }



    return(
        <div>
            <div>
                
                <Navbar1/>
                <Navbar2/>

                <div className="tags">
                    {tag.map((it)=>
                        <button value={it} onClick={handlechange} style={{backgroundColor:'white'}}>{it}</button>
                    )}
                </div>

                {events.map((eve)=>
                    <Cards eve={eve}/>
                )}
                
                
            </div>
            {/* <Navbar1/>
            <Navbar2/> */}
        </div>
    )
}

export default Home;