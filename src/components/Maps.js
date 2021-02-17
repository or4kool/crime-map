import React, { useState, useEffect, useRef } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react"
import Search from "./Search";
import Firebase from 'firebase'


/**
 * 
 * @param {*} props 
 * Maps functional component
 * show intereactive maps to user and keeps count of selected crime zones
 */

const Maps = props => {

    const [markers, setMarkers] = useState([])
    const [activeMarker, setActiveMarker] = useState({})
    const [selectedPlace, setSelectedPlace] = useState({})
    const [crimeCount, setCrimeCount] = useState(0)
    const [showPopup, setShowPopup] = useState(true)
    const mapper = useRef()

    // GET ALL MARKER FROM FIREBASE DB
    useEffect(() => {
        Firebase.database().ref("/").on('value', async result => {
            let allMarkers = []
            for (const marker in result.val()) {
                allMarkers.push(result.val()[marker].crimeLocation)
            }

            // UPDATE MARKER STATE
            setMarkers(allMarkers)
        })

    }, [])


    // CHECK USER LOGIN
    useEffect(() => {

        // const user = JSON.parse(localStorage.getItem("user"))

    }, [])


    // HANDLE MARKER CLICK
    const markerPopupHandler = (props, marker, e) => {

        const db = `savedCrime-${props.position.lat}-${props.position.lng}`.split(".").join("")

        // GET CRIME REPORT FROM FIREBASE 
        Firebase.database().ref(db).on('value', async result => {
            setCrimeCount(result.val().crimeLocation.reportNumber)
        })


        setActiveMarker(marker)
        setSelectedPlace(props)
        setShowPopup(true)
    }

    // CLOSE MARKER
    const closePopup = () => {
        setShowPopup(false)
        setActiveMarker(null)
    }

    // GET CRIME REPORTT FROM FIREBASE 
    const getFirebaseCrime = ref => {
        let report = "";
        Firebase.database().ref(ref).on('value', async result => {
            report = result.val()?.crimeLocation
        })

        return report
    }

    // ICON COLOR
    const processMarkerColor = (crimeCount) => {

        let icon = ""
        let crimeCounter = parseInt(crimeCount)

        if (crimeCounter < 5) {
            icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        }
        else if (crimeCounter > 5 && crimeCounter < 20) {
            icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        }
        else {
            icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }

        return icon
    }


    // GET SELECTED CRIME THE LAT & LNG
    const getCrimeGeolocation = async latLng => {

        // GET CURRENT USER FROM LOCALSTORE
        const db = `savedCrime-${latLng.lat}-${latLng.lng}`.split(".").join("")

        // GET CRIME REPORT FROM FIREBASE 
        const counter = getFirebaseCrime(db)?.reportNumber || 0

        // PUSH TO FIREBASE
        Firebase.database().ref(db).set({
            crimeLocation: { latitude: latLng.lat, longitude: latLng.lng, reportNumber: counter + 1 }
        })

        // REPOSITION MAP
        const maps = props.google.maps
        let center = new maps.LatLng(latLng.lat, latLng.lng)
        mapper.current.map.panTo(center)
    }


    return (
        <div>
            <Search getCrimeGeolocation={getCrimeGeolocation} />

            <Map
                google={props.google}
                zoom={11}
                initialCenter={{ lat: 40.7128, lng: -74.0060 }}
                ref={mapper}
            >
                {markers.map((marker, idx) => <Marker
                    key={idx} id={idx}
                    onClick={markerPopupHandler}
                    position={{ lat: marker?.latitude, lng: marker?.longitude }}

                    icon={{ url: `${processMarkerColor(marker?.reportNumber)}` }}

                />)}

                <InfoWindow marker={activeMarker} visible={showPopup} onClose={closePopup}>
                    <div><h4>Number of crime in the area: {crimeCount}</h4></div>
                </InfoWindow>
            </Map>
        </div>
    )

}


export default GoogleApiWrapper({
    apiKey: "AIzaSyCjsSv7UH1_pta6PYwO4_awClMnY3w_90w"
})(Maps)