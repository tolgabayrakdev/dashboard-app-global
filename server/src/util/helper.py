import hashlib
import jwt
import os
import time


class Helper:
    @staticmethod
    def generate_hash_password(password: str):
        return hashlib.sha256(password.encode()).hexdigest()

    @staticmethod
    def check_password(password: str, hashed_password: str):
        generated_hash = hashlib.sha256(password.encode()).hexdigest()
        return hashed_password == generated_hash

    @staticmethod
    def generate_access_token(payload):
        return jwt.encode(
            {"some": payload, "exp": int(time.time() + 1200)},
            "dsdfsfsdfsdfdss",
            algorithm="HS256",
        )

    @staticmethod
    def generate_refresh_token(payload):
        return jwt.encode(
            {"some": payload}, "fsdfsdfsdfsdfsdfds", algorithm="HS256"
        )

    @staticmethod
    def decode_token(access_token):
        try:
            decode_token = jwt.decode(
                access_token, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"]
            )
            print("Decoded token: ", decode_token)

            return decode_token.get("some")
        except:
            return None
