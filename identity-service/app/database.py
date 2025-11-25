"""
Database configuration and session management for SignRoad backend.
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
import os

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("⚠️  DATABASE_URL not set. Using in-memory storage.")
    USE_DATABASE = False
    engine = None
    async_session_maker = None
else:
    USE_DATABASE = True
    engine = create_async_engine(DATABASE_URL, echo=False, pool_size=10, max_overflow=20, pool_pre_ping=True)
    async_session_maker = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    print("✓ Database configured")

Base = declarative_base()

async def get_db():
    if not USE_DATABASE:
        raise RuntimeError("Database not configured")
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

async def init_db():
    if not USE_DATABASE:
        return
    async with engine.begin() as conn:
        from app import db_models
        await conn.run_sync(Base.metadata.create_all)
    print("✓ Database initialized")

async def close_db():
    if USE_DATABASE and engine:
        await engine.dispose()
