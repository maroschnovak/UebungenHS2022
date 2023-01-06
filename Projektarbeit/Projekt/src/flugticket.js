//---Imports-----------------------------------------------------------------------------------------------------------------------------------------------------------
import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
//import Paper from '@mui/material/Paper';
import Typography  from '@mui/material/Typography';
import AppBar  from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//import { border, padding } from '@mui/system';

//---App-&-Konstanten--------------------------------------------------------------------------------------------------------------------------------------------------
function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const [airps, setAirportStart] = useState(null);
    const [airpe, setAirportEnd] = useState(null);
    const [date, setdate] = useState("null");
    const [nrpersons, setNrPersons] = useState("1");

//---Styles------------------------------------------------------------------------------------------------------------------------------------------------------------
//    const styledef = {
//      backgroundColor: "#000000",
//      color: "white",
//      margin: 5,
//      padding: 5,
//    }

    const normalstyle = {
      margin: 20,
      border: 15,
      padding: 15,
    }

//---Effekte-----------------------------------------------------------------------------------------------------------------------------------------------------------
    useEffect (() => { const L = require("leaflet");
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      });
      }, [] )

//---Download----------------------------------------------------------------------------------------------------------------------------------------------------------      
      function do_search() {
        var url = `https://vm21.sourcelab.ch/flights?ad=${airps}&aa=${airpe}&date=${date}&person=${nrpersons}`;
    
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

//---Rückkehr----------------------------------------------------------------------------------------------------------------------------------------------------------
      function go_back() {
        var url = `https://vm21.sourcelab.ch/flights?ad=${airps}&aa=${airpe}&date=${date}&person=${nrpersons}`;

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

//---HTML-Ausgabe------------------------------------------------------------------------------------------------------------------------------------------------------
  return <>

    <AppBar position='static' class="titlebar">
      <Toolbar class="title">
        <Typography class="title">Flugsuche</Typography>
      </Toolbar>
    </AppBar>

  {!data && 
    <>
    <br/>
    <h2 align="center">Finden Sie die günstigsten Flugtickets aller Fluggesellschaften</h2>
    <Grid container>
      <Grid item  md={2} style={normalstyle}>
        <TextField label="Von" variant="filled" defaultValue={airps} onChange={ (event) => {setAirportStart(event.target.value)} }/>
      </Grid>
      <Grid item md={2} style={normalstyle}>
        <TextField label="Nach" variant="filled" defaultValue={airpe} onChange={ (event) => {setAirportEnd(event.target.value)} }/>
      </Grid>
      <Grid item md={2} style={normalstyle}>
        <TextField label="Anzahl Personen" variant="filled" defaultValue={nrpersons} onChange={ (event) => {setNrPersons(event.target.value)} }/>
      </Grid>
      <Grid item style={normalstyle}>
        <p>Datum (Deutsche Schreibweise):</p>
      </Grid>
      <Grid item md={2} style={normalstyle}>
        <TextField type="date" variant="filled" defaultValue={date} onChange={ (event) => {setdate(event.target.value)} }/>
      </Grid>
    </Grid>
    <br/>
    <Button align="center" variant="contained" onClick={() => { do_search() }}>Fluginformationen abrufen</Button>
    </>
  }

  {loading && 
    <>
      <div>Sucht nach Flügen, bitte warten Sie!</div><br/>
    </>
  }

  {error && 
    <>
      <div>Error: Keine Ergebnisse</div>{console.log(error)}<br/>
    </>
  }

  {data &&  
    <>
      <Button variant="contained" onClick={() => { go_back() }}>Zurück zur Hauptseite</Button>
    </>
  }
  </>
}

//---Export------------------------------------------------------------------------------------------------------------------------------------------------------------
export default App;