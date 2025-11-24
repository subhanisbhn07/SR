"""SQLAlchemy models for SignRoad"""

from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False)
    subscription_tier = Column(String(50), default="wanderer")
    current_day = Column(Integer, default=1)
    completed_days = Column(JSON, default=list)
    streak = Column(Integer, default=0)
    lantern_health = Column(Integer, default=100)
    sparks = Column(Integer, default=0)
    settings = Column(JSON, default=dict)
    owned_cosmetics = Column(JSON, default=list)
    equipped_cosmetics = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    sign_logs = relationship("SignLog", back_populates="user", cascade="all, delete-orphan")
    journal_entries = relationship("JournalEntry", back_populates="user", cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "id": self.id, "email": self.email, "password_hash": self.password_hash,
            "name": self.name, "is_admin": self.is_admin, "subscription_tier": self.subscription_tier,
            "current_day": self.current_day, "completed_days": self.completed_days or [],
            "streak": self.streak, "lantern_health": self.lantern_health, "sparks": self.sparks,
            "settings": self.settings or {}, "owned_cosmetics": self.owned_cosmetics or [],
            "equipped_cosmetics": self.equipped_cosmetics or {}, "created_at": self.created_at,
        }

class DayContent(Base):
    __tablename__ = "day_contents"
    id = Column(String, primary_key=True, default=generate_uuid)
    day_number = Column(Integer, unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    theme = Column(String(255))
    meditation_script = Column(Text, nullable=False)
    sign_challenge = Column(String(255), nullable=False)
    sign_description = Column(Text, nullable=False)
    reflection_prompt = Column(Text)
    is_special_event = Column(Boolean, default=False)
    event_type = Column(String(50))
    is_premium = Column(Boolean, default=False)
    sparks_reward = Column(Integer, default=10)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class SignLog(Base):
    __tablename__ = "sign_logs"
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    day_number = Column(Integer, nullable=False)
    sign_name = Column(String(255), nullable=False)
    note = Column(Text)
    photo_url = Column(String(500))
    logged_at = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="sign_logs")

class JournalEntry(Base):
    __tablename__ = "journal_entries"
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    day_number = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    prompt = Column(Text)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    user = relationship("User", back_populates="journal_entries")

class AudioTrack(Base):
    __tablename__ = "audio_tracks"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    url = Column(String(500), nullable=False)
    category = Column(String(50), nullable=False)
    duration_seconds = Column(Integer)
    is_premium = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CosmeticItem(Base):
    __tablename__ = "cosmetic_items"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)
    spark_price = Column(Integer, nullable=False)
    description = Column(Text)
    image_url = Column(String(500))
    is_premium = Column(Boolean, default=False)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
