#!/usr/bin/env python3
"""
Create an admin user for SignRoad

This script creates an admin user with a secure password.
Run this once during initial setup or to create additional admin users.

Usage:
    python scripts/create_admin.py

The script will prompt for email and password interactively.
"""

import sys
import os
import getpass
import re

# Add parent directory to path to import app modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import bcrypt
from app.storage import create_user, get_user_by_email


def validate_email(email: str) -> tuple[bool, str]:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email):
        return False, "Invalid email format"
    return True, "Email is valid"


def validate_password(password: str) -> tuple[bool, str]:
    """Validate password strength"""
    if len(password) < 12:
        return False, "Password must be at least 12 characters"
    
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r"\d", password):
        return False, "Password must contain at least one number"
    
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must contain at least one special character"
    
    return True, "Password is valid"


def create_admin():
    """Interactive admin user creation"""
    print("=" * 60)
    print("SignRoad Admin User Creation")
    print("=" * 60)
    print()
    
    # Get email
    while True:
        email = input("Admin email: ").strip()
        valid, message = validate_email(email)
        if not valid:
            print(f"❌ {message}")
            continue
        
        # Check if user already exists
        existing_user = get_user_by_email(email)
        if existing_user:
            print(f"❌ User with email {email} already exists!")
            continue
        
        break
    
    # Get password
    while True:
        password = getpass.getpass("Admin password: ")
        valid, message = validate_password(password)
        if not valid:
            print(f"❌ {message}")
            print()
            print("Password requirements:")
            print("  - At least 12 characters")
            print("  - At least one uppercase letter")
            print("  - At least one lowercase letter")
            print("  - At least one number")
            print("  - At least one special character (!@#$%^&*(),.?\":{}|<>)")
            print()
            continue
        
        confirm = getpass.getpass("Confirm password: ")
        if password != confirm:
            print("❌ Passwords don't match!")
            continue
        
        break
    
    # Get name
    name = input("Admin name (optional, press Enter to skip): ").strip()
    if not name:
        name = "Admin User"
    
    print()
    print("Creating admin user...")
    
    # Hash password
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Create user
    try:
        admin_user = create_user({
            'email': email,
            'password_hash': password_hash,
            'name': name,
            'is_admin': True,
            'subscription_tier': 'master'
        })
        
        print()
        print("=" * 60)
        print("✅ Admin user created successfully!")
        print("=" * 60)
        print()
        print(f"Email: {email}")
        print(f"Name: {name}")
        print(f"User ID: {admin_user['id']}")
        print()
        print("You can now login with these credentials.")
        print()
        
        # Show environment variable format (for reference)
        print("To set as default admin in .env (optional):")
        print(f"DEFAULT_ADMIN_EMAIL={email}")
        print(f"DEFAULT_ADMIN_PASSWORD_HASH={password_hash}")
        print()
        
    except Exception as e:
        print()
        print("=" * 60)
        print("❌ Failed to create admin user")
        print("=" * 60)
        print()
        print(f"Error: {str(e)}")
        print()
        sys.exit(1)


if __name__ == "__main__":
    try:
        create_admin()
    except KeyboardInterrupt:
        print()
        print()
        print("❌ Admin creation cancelled")
        print()
        sys.exit(1)
