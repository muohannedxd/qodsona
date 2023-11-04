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