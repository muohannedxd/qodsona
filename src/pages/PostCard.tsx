import React from "react";
import Tag from "./tag";
import { Button} from "@/components/ui/button"

const PostCard = ({ postType, description, tags }) => {

    const addLocation = () => {}

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
                    {/* <a href="#" className="btn btn-primary" style={{ backgroundColor: 'black', marginBottom: '1px' }} onClick={addLocation}>
                        Add location
                    </a> */}
                    <Button onClick={addLocation} className="bg-slate-900 mr-1">Add location</Button>
                    <Button className="bg-slate-900">call</Button>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
