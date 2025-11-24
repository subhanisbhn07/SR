#!/usr/bin/env python3
"""
Generate test user credentials for development

This script generates bcrypt hashes for test users.
Use the output to set environment variables for development.

Usage:
    python scripts/generate_test_credentials.py
"""

import bcrypt


def generate_credentials():
    """Generate test user credentials"""
    print("=" * 60)
    print("SignRoad Test Credentials Generator")
    print("=" * 60)
    print()
    
    # Test user credentials
    test_email = "test@signroad.com"
    test_password = "test123"
    test_hash = bcrypt.hashpw(test_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    print("Test User Credentials:")
    print(f"  Email: {test_email}")
    print(f"  Password: {test_password}")
    print()
    print("Add to .env file:")
    print(f"DEFAULT_TEST_EMAIL={test_email}")
    print(f"DEFAULT_TEST_PASSWORD_HASH={test_hash}")
    print()
    print("=" * 60)
    print()
    
    # Admin user credentials (for development only)
    admin_email = "admin@signroad.com"
    admin_password = "Admin123!@#Dev"  # Strong password for development
    admin_hash = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    print("Admin User Credentials (Development Only):")
    print(f"  Email: {admin_email}")
    print(f"  Password: {admin_password}")
    print()
    print("Add to .env file:")
    print(f"DEFAULT_ADMIN_EMAIL={admin_email}")
    print(f"DEFAULT_ADMIN_PASSWORD_HASH={admin_hash}")
    print()
    print("⚠️  WARNING: Do NOT use these credentials in production!")
    print("⚠️  Use scripts/create_admin.py to create a secure admin user.")
    print()
    print("=" * 60)


if __name__ == "__main__":
    generate_credentials()
