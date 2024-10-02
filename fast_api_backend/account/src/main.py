from fastapi import Depends, FastAPI, HTTPException

from src.config.container import Container
from src.endpoints.welcome import welcome_router

def createApp() -> FastAPI:
    container = Container()
    app = FastAPI()
    app.container = container
    app.include_router(welcome_router)  
    
    return app

app = createApp()




