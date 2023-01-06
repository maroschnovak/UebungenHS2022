import uvicorn
from fastapi import FastAPI

app = FastAPI()

d = {}

file = open("flights.csv", encoding="utf-8")
next(file)

for line in file:
    Daten = line.strip().split(";")
    id = Daten[0]
    ad = Daten[1]
    aa = Daten[2]
    date = Daten[3]
    td = Daten[4]
    ta = Daten[5]
    iata_code_d = Daten[6]
    iata_code_a = Daten[7]
    seats = Daten[8]
    seats_taken = Daten[9]
    seats_free = seats_taken - seats

    d[ad] = {"id": id, "ad": ad, "aa": aa, "date": date, "td": td, "ta": ta, "iata_c_d": iata_code_d, "iata_c_a": iata_code_a, 
            "seats": seats, "seats_taken": seats_taken, "seats_free": seats_free}

file.close()

@app.get("/flights")
async def flights(ad: str):
    if ad in d:
        return d[ad]
    else:
        return {"ERROR": "not found"}
    
if __name__ == "__main__":

    uvicorn.run(app, host="127.0.0.1", port=8003)