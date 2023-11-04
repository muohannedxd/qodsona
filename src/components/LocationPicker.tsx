import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import { Button } from "@/components/ui/button"
import { Icon } from "leaflet"
import { XCircle } from "lucide-react"
import { db } from "@/config/firebase"
import { doc, updateDoc } from "firebase/firestore"


const DraggableMarker = ({ center, setCenter }) => {
    const [draggable, setDraggable] = useState(false)
    // const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setCenter(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={center}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    )
}

const LocationPicker = ({ postId, closeMap }) => {

    const [center, setCenter] = useState([null, null]);

    const submitLocation = () => {

        const postRef = doc(db, "posts", postId)
        getDoc(postRef).then(
            docSnapShot => {
                if (docSnapShot.exists()) {
                    const data = docSnapShot.data()
                    data.comments.push(center)
                    console.log(data)
                    updateDoc(postRef, data).then(() => console.log("doc updated"))
                    .catch(error => console.log(error))
                }
            })

    }

    useEffect(() => navigator.geolocation.getCurrentPosition(function (position) {
        setCenter([position.coords.latitude, position.coords.longitude])
    }), []);

    return (center[0] !== null && center[1] !== null) ?

        <div className="fixed top-10 left-0 z-[999] h-[80%] w-full flex  justify-center align-center">
            <XCircle onClick={closeMap} />
            <div className="w-[80%] overflow-hidden">
                <MapContainer center={center} zoom={10}>
                    <DraggableMarker center={center} setCenter={setCenter} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </div>
            <Button onClick={submitLocation}>Submit</Button>
        </div>

        : <div>Loading...</div>


}

export default LocationPicker;