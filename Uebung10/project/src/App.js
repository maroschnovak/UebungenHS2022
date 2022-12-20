//---Uebung-10-----------------------------------------------------------------------------------------------------------

//---Imports-------------------------------------------------------------------------------------------------------------
import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

//---App-----------------------------------------------------------------------------------------------------------------
function App() {

//---Konstanten----------------------------------------------------------------------------------------------------------
    const [lats, setLatitudeStart] = useState(47.5349);
    const [lngs, setLongitudeStart] = useState(7.6417);
    const [late, setLatitudeEnd] = useState(8.9738);
    const [lnge, setLongitudeEnd] = useState(-79.5068);
    const [points, setPoints] = useState(100);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

//---Effekt--------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const L = require("leaflet");
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
        }, []);

//---Download------------------------------------------------------------------------------------------------------------
    function do_download() {
        var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${lats}&startlng=${lngs}&endlat=${late}&endlng=${lnge}&pts=${points}`;

        setLoading(true);
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

//---Return--------------------------------------------------------------------------------------------------------------
    function go_back() {
        var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${lats}&startlng=${lngs}&endlat=${late}&endlng=${lnge}&pts=${points}`;

        setLoading(true);
        axios
            .get(url)
            .then((response) => {
                setData(null);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

//---HTML-Ausgabe--------------------------------------------------------------------------------------------------------
    return (
        <>
            <h1>Geodetic Line</h1>

            {!data && <>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Startkoordinate Breite" variant="outlined" defaultValue={lats} 
                            onChange={ (event) => {setLatitudeStart(event.target.value)} }/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Startkoordinate Länge" variant="outlined" defaultValue={lngs}
                            onChange={ (event) => {setLongitudeStart(event.target.value)} }/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Endkoordinate Breite" variant="outlined" defaultValue={late}
                            onChange={ (event) => {setLatitudeEnd(event.target.value)} }/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Endkoordinate Länge" variant="outlined" defaultValue={lnge}
                            onChange={ (event) => {setLongitudeEnd(event.target.value)} }/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Anzahl Punkte" variant="outlined" defaultValue={points}
                            onChange={ (event) => {setPoints(event.target.value)} }/>
                </Grid>
                </Grid>
                <br/>
                <Button variant="contained" onClick={() => { do_download() }}>
                    Convert
                </Button>
            </>
            }

            {loading && 
            <>
            <div>API Aufruf, bitte warten!</div><br/>
            </>
            }

            {error && 
            <>
            <div>ERROR API Aufruf fehlgeschlagen</div>{console.log(error)}<br/>
            </>
            }

            {data &&
            <>
            <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true}
                style={{ height: "600px", width: "100%" }} >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                    
            <GeoJSON data={data} style={{ weight: 8, opacity: '30%', color: 'green'}}/>
            </MapContainer>
            <br/>
            <Button variant="contained" onClick={() => { go_back() }}>
                New Path
            </Button>
            </>
            }
        </>
    );
}

//---Export--------------------------------------------------------------------------------------------------------------
export default App;