from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def has_password(password: str):
    # Truncate to max 72 characters for bcrypt
    password = password[:72]
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # bcrypt limit safety
    plain_password = plain_password[:72]
    return pwd_context.verify(plain_password, hashed_password)

