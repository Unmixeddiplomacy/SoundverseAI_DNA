import os
import dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

dotenv.load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is missing from environment")

# async engine for PostgreSQL (no SSL for local)
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    future=True,
    pool_recycle=1800,
)

# async_sessionmaker
async_session = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
)

async def get_db():
    async with async_session() as session:
        yield session
