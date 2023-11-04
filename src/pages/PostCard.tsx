import React from "react";
import Tag from "./Tag";

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
