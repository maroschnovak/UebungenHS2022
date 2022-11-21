#---Imports-------------------------------------------------------------------------------
import uvicorn
import sqlalchemy
import databases
from fastapi import FastAPI, Depends, status, Form, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException

#---Datenbank-----------------------------------------------------------------------------
database = databases.Database('sqlite:///nachrichten.db')
engine = sqlalchemy.create_engine('sqlite:///nachrichten.db', 
    connect_args={"check_same_thread": False})
metadata = sqlalchemy.MetaData()

notes = sqlalchemy.Table (
    "notes", metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String)
)

metadata.create_all(engine)

templates = Jinja2Templates(directory="templates/")

#---Login-Accounts------------------------------------------------------------------------
app = FastAPI()

manager = LoginManager("jhfgisw74hndj2", token_url="/auth/login", use_cookie=True)
manager.cookie_name = "ch.fhnw.testapp_hehe123"

DB = {"martin": {"name": "Martin",
                "passwort": "hello"
                },
    "matus": {"name": "Matus",
                "passwort": "hello"
                }
    }

#---Login---------------------------------------------------------------------------------
@manager.user_loader()
def load_user(username: str):
    user = DB.get(username)
    return user

@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)

    resp2 = RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)

    if not user:
        return resp2
    if user['passwort'] != password:
        return resp2

    access_token = manager.create_access_token(
        data = {"sub": username}
    )

    resp = RedirectResponse(url="/new", status_code=status.HTTP_302_FOUND)
    manager.set_cookie(resp, access_token)

    return resp

@app.get("/login")
def login():
    file = open("templates/login.html", encoding="utf-8")
    data=file.read()
    file.close()
    return HTMLResponse(content=data)

#---Nachrichten-erstellen-und-aufrufen----------------------------------------------------
@app.on_event("startup")
async def startup():
    print("Verbinde Datenbank")
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    print("Beende die Verbindung")
    await database.disconnect()

@app.get("/users/{user}")
async def read_notes(user: str):
    query = notes.select().where(notes.c.user == user)
    return await database.fetch_all(query)

@app.get("/new")
async def create_note(request: Request, user=Depends(manager)):
    return templates.TemplateResponse('new.html', context={'request': request})

@app.post("/new")
async def post_note(titel=Form(), text=Form(), user=Depends(manager)):
    query = notes.insert().values(title=titel, text=text, user=user["name"])
    send = await database.execute(query)
    resp = resp = RedirectResponse(url="/new", status_code=status.HTTP_302_FOUND)
    return resp

#---Webservice-starten--------------------------------------------------------------------
uvicorn.run(app, host="127.0.0.1", port=8000)