import uvicorn
from fastapi import FastAPI

app = FastAPI()

#Ortschaftsname;PLZ;Zusatzziffer;Gemeindename;BFS-Nr;Kantonskürzel;E;N;Sprache

d = {}
file = open("PLZO_CSV_LV95.csv", encoding="utf-8")
next(file)
for line in file:
    daten = line.strip().split(";")
    ort = daten[0]
    plz = daten[1]
    zusatzziffer = daten[2]
    zip = daten[3]
    bfsnr = daten[4]
    kanton = daten[5]
    east = daten[6]
    north = daten[7]
    sprache = daten[8]
    d[zip] = {"Ort": ort, "PLZ": plz, "Zusatzziffer": zusatzziffer, "Gemeinde": zip, "BFS Nr": bfsnr, "Kanton": kanton, "Ost": east, "Nord": north, "Sprache": sprache}

file.close()

@app.get("/gemeinde")
async def gemeinde(gemeinde: str):
    if gemeinde in d:
        return d[gemeinde]
    #for element in d:
        #if gemeinde in d:
            #return d[gemeinde]

    return {"ERROR": "PLZ NOT FOUND"}


uvicorn.run(app, host="127.0.0.1", port=8000)