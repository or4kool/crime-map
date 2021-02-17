import React, { useState } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';



const Search = props => {

    const [address, setAddress] = useState("")

    const handleChange = address => {
        setAddress(address);
    };

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => props.getCrimeGeolocation(latLng))
            .catch(error => console.error('Error', error));
    };

    const textInputStyle = {
        width: "300px",
        height: "30px",
        borderRadius: "5px",
        border: "1px solid rgb(249 168 168)",
        background: "#ffd0d0",
        fontSize: "20px",
        outlineColor: "rgb(249 168 168)",
        padding: "10px"
    }

    const parentStyle = {
        position: "absolute",
        zIndex: "99999",
        top: "200px",
        left: "10px"
    }

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div style={parentStyle}>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Crime Places ...',
                            className: 'location-search-input',
                        })}
                        style={textInputStyle}
                    />
                    <div className="autocomplete-dropdown-container" style={{ borderRadius: "5px", overflow: "scroll" }}>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, idx) => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer', padding: "10px 5px" }
                                : { backgroundColor: '#ffffff', cursor: 'pointer', padding: "10px 5px" };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                    key={idx}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )

}


export default Search