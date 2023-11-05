import Tag from "./tag";
import LocationPicker from "@/components/LocationPicker";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { nanoid } from "nanoid";

const PostCard = ({ postType, description, tags, imageURLs, comments, postId }) => {

    const [showMap, setShowMap] = useState(false)
    const [postComments, setComments] = useState(comments)
    const addLocation = () => setShowMap(true)
    const closeMap = () => setShowMap(false)


    return (
        <>
            <div className="card" style={{ margin: '20px', minWidth: '250px', minHeight: '350px' }}>
                <div className="card-body">
                    {/* Use title prop */}
                    {/* <h3 className="card-title">{postType || 'Special title treatment'}</h3> */}
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
                    <div className="grid grid-cols-4 gap-1" style={{ marginTop: '20px' }}>
                        {imageURLs && imageURLs.length > 0 && (
                            imageURLs.map((url, index) => (
                                <div key={index} className="overflow-hidden max-h-[20rem] max-w-[20rem] rounded-[8px] object-cover">
                                    <img src={url} className="max-h-full w-auto" alt={`Image ${index + 1}`} />
                                </div>
                            ))
                        )}
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
                    <div className="my-2 max-h-5rem overflow-auto">
                        {
                            postComments &&
                            postComments.map((comment: any) => <div key={nanoid()}
                                className="p-2 bg-gray-100 rounded-md my-1">{JSON.stringify(comment)}</div>)
                        }
                    </div>
                </div>
            </div>
            {
                showMap &&
                <LocationPicker postId={postId} closeMap={closeMap} setComments={setComments} />
            }
        </>);
}

export default PostCard;
