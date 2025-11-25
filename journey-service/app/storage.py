"""
In-memory storage for SignRoad backend.
Data will be lost on server restart - this is a proof of concept.
"""
from typing import Dict, List, Optional
from datetime import datetime
import uuid

# In-memory storage dictionaries
users: Dict[str, dict] = {}
day_contents: Dict[int, dict] = {}
sign_logs: Dict[str, dict] = {}
journal_entries: Dict[str, dict] = {}
audio_tracks: Dict[str, dict] = {}
cosmetic_items: Dict[str, dict] = {}

# Helper functions
def generate_id() -> str:
    return str(uuid.uuid4())

def get_user_by_email(email: str) -> Optional[dict]:
    for user in users.values():
        if user['email'] == email:
            return user
    return None

def get_user_by_id(user_id: str) -> Optional[dict]:
    return users.get(user_id)

def create_user(user_data: dict) -> dict:
    user_id = generate_id()
    user = {
        'id': user_id,
        'created_at': datetime.utcnow(),
        'current_day': 1,
        'completed_days': [],
        'streak': 0,
        'lantern_health': 100,
        'sparks': 0,
        'settings': {},
        'owned_cosmetics': [],
        'equipped_cosmetics': {},
        **user_data
    }
    users[user_id] = user
    return user

def update_user(user_id: str, updates: dict) -> Optional[dict]:
    if user_id in users:
        users[user_id].update(updates)
        return users[user_id]
    return None

def get_all_users() -> List[dict]:
    return list(users.values())

# Day Content functions
def create_day_content(content_data: dict) -> dict:
    content_id = generate_id()
    day_number = content_data['day_number']
    content = {
        'id': content_id,
        **content_data
    }
    day_contents[day_number] = content
    return content

def get_day_content(day_number: int) -> Optional[dict]:
    return day_contents.get(day_number)

def get_all_day_contents() -> List[dict]:
    return list(day_contents.values())

def update_day_content(day_number: int, updates: dict) -> Optional[dict]:
    if day_number in day_contents:
        day_contents[day_number].update(updates)
        return day_contents[day_number]
    return None

def delete_day_content(day_number: int) -> bool:
    if day_number in day_contents:
        del day_contents[day_number]
        return True
    return False

# Sign Log functions
def create_sign_log(log_data: dict) -> dict:
    log_id = generate_id()
    log = {
        'id': log_id,
        'logged_at': datetime.utcnow(),
        **log_data
    }
    sign_logs[log_id] = log
    return log

def get_user_sign_logs(user_id: str) -> List[dict]:
    return [log for log in sign_logs.values() if log['user_id'] == user_id]

def get_all_sign_logs() -> List[dict]:
    return list(sign_logs.values())

# Journal Entry functions
def create_journal_entry(entry_data: dict) -> dict:
    entry_id = generate_id()
    entry = {
        'id': entry_id,
        'created_at': datetime.utcnow(),
        **entry_data
    }
    journal_entries[entry_id] = entry
    return entry

def get_user_journal_entries(user_id: str) -> List[dict]:
    return [entry for entry in journal_entries.values() if entry['user_id'] == user_id]

def update_journal_entry(entry_id: str, content: str) -> Optional[dict]:
    if entry_id in journal_entries:
        journal_entries[entry_id]['content'] = content
        return journal_entries[entry_id]
    return None

def delete_journal_entry(entry_id: str) -> bool:
    if entry_id in journal_entries:
        del journal_entries[entry_id]
        return True
    return False

def get_all_journal_entries() -> List[dict]:
    return list(journal_entries.values())

# Audio Track functions
def create_audio_track(track_data: dict) -> dict:
    track_id = generate_id()
    track = {
        'id': track_id,
        **track_data
    }
    audio_tracks[track_id] = track
    return track

def get_audio_track(track_id: str) -> Optional[dict]:
    return audio_tracks.get(track_id)

def get_all_audio_tracks() -> List[dict]:
    return list(audio_tracks.values())

def update_audio_track(track_id: str, updates: dict) -> Optional[dict]:
    if track_id in audio_tracks:
        audio_tracks[track_id].update(updates)
        return audio_tracks[track_id]
    return None

def delete_audio_track(track_id: str) -> bool:
    if track_id in audio_tracks:
        del audio_tracks[track_id]
        return True
    return False

# Cosmetic Item functions
def create_cosmetic_item(item_data: dict) -> dict:
    item_id = generate_id()
    item = {
        'id': item_id,
        **item_data
    }
    cosmetic_items[item_id] = item
    return item

def get_cosmetic_item(item_id: str) -> Optional[dict]:
    return cosmetic_items.get(item_id)

def get_all_cosmetic_items() -> List[dict]:
    return list(cosmetic_items.values())

def update_cosmetic_item(item_id: str, updates: dict) -> Optional[dict]:
    if item_id in cosmetic_items:
        cosmetic_items[item_id].update(updates)
        return cosmetic_items[item_id]
    return None

def delete_cosmetic_item(item_id: str) -> bool:
    if item_id in cosmetic_items:
        del cosmetic_items[item_id]
        return True
    return False

# Initialize with default users from environment variables
def initialize_default_data():
    """Initialize default users from environment variables (if provided)"""
    import bcrypt
    import os
    
    # Only create default users if environment variables are set
    # This allows for optional initialization in development
    admin_email = os.getenv("DEFAULT_ADMIN_EMAIL")
    admin_password_hash = os.getenv("DEFAULT_ADMIN_PASSWORD_HASH")
    
    if admin_email and admin_password_hash:
        # Check if admin already exists
        existing_admin = get_user_by_email(admin_email)
        if not existing_admin:
            # Create admin user from environment
            admin_user = create_user({
                'email': admin_email,
                'password_hash': admin_password_hash,
                'name': 'Admin User',
                'is_admin': True,
                'subscription_tier': 'master'
            })
            print(f"✓ Created admin user: {admin_email}")
        else:
            print(f"✓ Admin user already exists: {admin_email}")
    else:
        print("⚠️  No default admin configured. Use scripts/create_admin.py to create one.")
    
    # Create test user only in development
    test_email = os.getenv("DEFAULT_TEST_EMAIL")
    test_password_hash = os.getenv("DEFAULT_TEST_PASSWORD_HASH")
    
    if test_email and test_password_hash:
        existing_test = get_user_by_email(test_email)
        if not existing_test:
            test_user = create_user({
                'email': test_email,
                'password_hash': test_password_hash,
                'name': 'Test User',
                'is_admin': False,
                'subscription_tier': 'wanderer'
            })
            print(f"✓ Created test user: {test_email}")
        else:
            print(f"✓ Test user already exists: {test_email}")
