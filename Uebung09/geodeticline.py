#---Imports---------------------------------------------------------------------------
import uvicorn
from fastapi import FastAPI, Response
import pyproj

#---App-------------------------------------------------------------------------------
app = FastAPI()

#-------------------------------------------------------------------------------------
g = pyproj.Geod(ellps="WGS84")

#---@---------------------------------------------------------------------------------
@app.get("/geodetic/")
async def geodeticline(slng: float, slat: float, elng: float, elat: float):
    line = g.npts(slng, slat, elng, elat, 30)
    geojson = f"""{{"type": "Feature","geometry": {{"type": "MultiPoint","coordinates": {line}}},"properties": {{"about": "Geodätische Linie"}}}}"""
    return Response(content=geojson)

#---Run-------------------------------------------------------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002, root_path="/geodetic")