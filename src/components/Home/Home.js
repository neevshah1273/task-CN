import axios from 'axios';
import React,{ useState,useEffect } from "react";
import Cards from "../Cards/Cards.js";
import {Navbar,Nav,Container} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';

const Home = () => {

    const API = axios.create({baseURL:'https://api.codingninjas.com/api/v3'});
    const [tag, settag] = useState([]);
    
    const [tp, settp] = useState(0);

    const catogory = [ 'ALL_EVENTS','CODING_EVENT', 'WEBINAR', 'BOOTCAMP_EVENT', 'WORKSHOP'];

    const [selectedcatogory, setselectedcatogory] = useState('ALL_EVENTS');

    const [cp,setcp] = useState(1);

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
        }}).then((res)=>{setevents(res.data.data.events);settp(res.data.data.page_count)}).catch((err)=>console.log(err.message)).finally(()=>{console.log(events)})



        
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
        //getevents();
        //console.log(selectedtag);
    }

    useEffect(()=>{
        getevents();
    },[selectedtag]);


    const handlecat = (e) => {
        setselectedcatogory(e.target.value);
        //getevents();
    }

    useEffect(()=>{
        getevents();
    },[selectedcatogory]);

    const handlesubcat = (e) => {
        setselectedsubcatogory(e.target.value);
        //getevents();
    }

    useEffect(()=>{
        getevents();
    },[selectedsubcatogory]);

    const handleoffset = () =>{
        if(cp<tp){
            setoffset(cp*20);
        }
    }

    useEffect(()=>{
        getevents();
    },[offset]);

    
    var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
};



    return(
        <div>
            <div>
                
                <Navbar bg="dark" variant="dark" className='text-white'>
                    {catogory.map((cat)=>
                        <div className='px-3'>
                        <button className="rounded px-2" style={{backgroundColor: bgColors.Yellow}}  value={cat} onClick={handlecat}>{cat}</button>

                        </div>
                    )}
                </Navbar>
                <Navbar bg="primary" variant="dark" className='text-white'>
                    
                    {subcatogory.map((cat)=>
                        <div className='px-5'>
                        <button className="rounded px-2" value={cat} onClick={handlesubcat}>{cat}</button>

                        </div>
                    )}
                </Navbar>
                
                <div className="container pt-2 pb-2">
                    <div className="row">
                        <div className="col-9">
                            <Grid container>
                            {events.map((eve)=>
                                <Grid className="pt-3" item xs={6}><Cards eve={eve}/></Grid>
                                
                            )}
                            </Grid>

                        </div>
                        <div className="col-3">
                            
                            <div className="tags row">
                                {tag.map((it)=>
                                    <button className="rounded-pill pb-1 pt-1" value={it} onClick={handlechange} style={{backgroundColor:'white'}}>{it}</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center'>
                    <input type="number" value={cp} max={tp} onChange={e => setcp(e.target.value)}></input>
                    of {tp}
                    <button onClick={handleoffset}> Go</button>
                </div>

                
                
            </div>
            {/* <Navbar1/>
            <Navbar2/> */}
        </div>
    )
}

export default Home;