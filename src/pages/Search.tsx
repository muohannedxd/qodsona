import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PostCard from "./PostCard.jsx";
import { useState,useEffect } from "react";


export default function Search() {
  const [value, setValue] = useState('');
  useEffect(() =>{
    if(value.length >0){
      fetch('')
    }
  })
 

  return (
   
    <div className="row">
      <div className="form-outline">
  <input type="search" id="form1" className="form-control" placeholder="Search for post" aria-label="Search" 
  onChange={(event) => setValue(event.target.value)} value={value}
  />
</div>
      <div className="col-sm-6">
      <PostCard/>
      </div>
      <div className="col-sm-6">
      <PostCard/>
      </div>
      <div className="col-sm-6">
      <PostCard/>
      </div>
      <div className="col-sm-6">
      <PostCard/>
      </div>
      <div className="col-sm-6">
      <PostCard/>
      </div>
      <div className="col-sm-6">
      <PostCard/>
      </div>
      <div className="col-sm-6">
      <PostCard/>
      </div>
      <div className="col-sm-6">
      <PostCard/>
      </div>
      
    </div>

    
  );
}
