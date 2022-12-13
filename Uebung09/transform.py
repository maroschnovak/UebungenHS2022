#---Imports---------------------------------------------------------------------------
import uvicorn
from fastapi import FastAPI, Response
from pyproj import Transformer

#---App-------------------------------------------------------------------------------
app = FastAPI()

#---Transformer-----------------------------------------------------------------------
transformer_wgs84tolv95 = Transformer.from_crs("epsg:4326", "epsg:2056")
transformer_lv95towgs84 = Transformer.from_crs("epsg:2056", "epsg:4326")

#---@---------------------------------------------------------------------------------
@app.get("/transform/lv95wgs84")
async def transformation(lng: float, lat: float):
    new = transformer_lv95towgs84.transform(lng, lat)
    geojson = f"""{{"type": "Feature","geometry": {{"type": "Point","coordinates": {new}}}}}"""
    return Response(content=geojson)

@app.get("/transform/wgs84lv95")
async def transformation(lng: float, lat: float):
    new = transformer_wgs84tolv95.transform(lng, lat)
    geojson = f"""{{"type": "Feature","geometry": {{"type": "Point","coordinates": {new}}}}}"""
    return Response(content=geojson)

#---Run-------------------------------------------------------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001, root_path="/transform")