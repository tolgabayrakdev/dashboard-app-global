from fastapi import FastAPI
from controller.auth_controller import auth_router
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from model import Base

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)


app.include_router(auth_router, prefix="/api/v1/auth")
