<<<<<<< HEAD
import Tag from "./tag";

const PostCard = () => {

    return (

        <div className="card" style={{ margin: '20px' }}>
          <div className="card-body">
            <h3 className="card-title">Special title treatment</h3>
            <div className="row">
        <div className="col d-flex align-items-center">
        <p>Tags:</p>
      </div>
      <div className="col d-flex align-items-center">
        <Tag value="hello" />
        <Tag value="hello" />
        <Tag value="dsgsdhsdh" />
      </div>
            </div>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            
            <div className="text-right"> {/* Add a class to align content to the right */}
              <a href="#" className="btn btn-primary" style={{ backgroundColor: 'black',marginBottom:'1px' }}>Add location</a>
              <a href="#" className="btn btn-primary" style={{ backgroundColor: 'black', marginLeft: '10px' }}>call</a>
            </div>
          </div>
        </div>

  );
  }

export default PostCard;
=======
import React from "react";
import Tag from "./tag";

const PostCard = ({ postType, description, tags }) => {
    return (
        <div className="card" style={{ margin: '20px' }}>
            <div className="card-body">
                {/* Use title prop */}
                <h3 className="card-title">{postType || 'Special title treatment'}</h3>
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <p>Tags:</p>
                    </div>
                    <div className="col d-flex align-items-center">
                        {/* Map through tags prop */}
                        {tags && tags.map((tagValue, index) => (
                            <Tag key={index} value={tagValue} />
                        ))}
                    </div>
                </div>
                {/* Use description prop */}
                <p className="card-text">{description || 'this is the desc'}</p>
                
                <div className="text-right">
                    <a href="#" className="btn btn-primary" style={{ backgroundColor: 'black', marginBottom: '1px' }}>Add location</a>
                    <a href="#" className="btn btn-primary" style={{ backgroundColor: 'black', marginLeft: '10px' }}>call</a>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
>>>>>>> 87c988a30b21dd44ce6d2c2431b18bf6a5569a1f
