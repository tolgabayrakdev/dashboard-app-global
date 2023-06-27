from fastapi import APIRouter
from schema.user_schema import LoginUser, CreateUser
from service.auth_service import AuthService
from fastapi import Response
from fastapi import HTTPException

auth_router = APIRouter()


@auth_router.post("/login")
async def login(user: LoginUser, response: Response):
    result = AuthService.login(user.email, user.password)
    if result is None:
        raise HTTPException(status_code=400, detail="Username or password wrong!")
    response.set_cookie(key="access_token", value=result["access_token"], httponly=True)
    response.set_cookie(
        key="refresh_token", value=result["refresh_token"], httponly=True
    )
    return {"message": "Login is successful"}


@auth_router.post("/register")
async def register(user: CreateUser):
    if user is not None:
        try:
            AuthService.register(user)
            return {"message": "User created succesfull."}
        except:
            raise HTTPException(
                status_code=400, detail="Username or password already used!"
            )
    else:
        raise HTTPException(status_code=400, detail="Invalid format")
    
@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"messsage": "you are logged out."}