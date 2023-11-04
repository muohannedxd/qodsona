import React from "react";
import Tag from "./tag";

const PostCard = ({ postType, description, tags, imageURLs }) => {
    const defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/qodsona-cf756.appspot.com/o/images%2FBeep%20Beep%20-%20Avatar(1).pngk_YS5JIKeNJWPpCjv4qLR?alt=media&token=326cb83d-cde1-407a-8269-7ad9f0200904';

    return (
        <div className="card" style={{ margin: '20px', minWidth: '250px', minHeight: '350px'}}>
            <div className="card-body d-flex flex-column" style={{ flexGrow: 1 }}>
                <h3 className="card-title">{postType || 'Post Type'}</h3>
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <p>Tags:</p>
                    </div>
                    <div className="col d-flex align-items-center">
                        {tags && tags.map((tagValue, index) => (
                            <Tag key={index} value={tagValue} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-1" style={{ marginTop: '20px' }}>
                    {imageURLs && imageURLs.length > 0 ? (
                        imageURLs.map((url, index) => (
                            <div key={index} className="overflow-hidden max-h-[20rem] max-w-[20rem] rounded-[8px] object-cover">
                                <img src={url} className="max-h-full w-auto" alt={`Image ${index + 1}`} />
                            </div>
                        ))
                    ) : (
                        <div className="overflow-hidden max-h-[20rem] max-w-[20rem] rounded-[8px] object-cover">
                            <img src={defaultImageUrl} className="max-h-full w-auto" alt="Default Image" />
                        </div>
                    )}
                </div>

                <p className="card-text">{description || 'No description provided.'}</p>
            </div>
            <div className="text-right" style={{ marginBottom: '10px' }}>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: 'black', marginRight: '10px', marginBottom: '10px' }}>Add location</a>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: 'black', marginRight: '10px', marginBottom: '10px' }}>Call</a>
            </div>
        </div>
    );
}

export default PostCard;
