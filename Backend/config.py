# Production Configuration for App

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Flask Configuration
class Config:
    """Base configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    DEBUG = os.environ.get('FLASK_DEBUG', 'False') == 'True'
    
    # CORS Configuration
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*').split(',')
    
    # Model paths
    MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')
    SPECIAL_MODEL_DIR = os.path.join(MODEL_DIR, 'special_crops')
    
    # API Configuration
    API_MAX_REQUESTS = int(os.environ.get('API_RATE_LIMIT', '100'))
    REQUEST_TIMEOUT = 120

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    JSON_SORT_KEYS = False

class TestingConfig(Config):
    """Testing configuration"""
    DEBUG = True
    TESTING = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False

# Select configuration based on environment
config_name = os.environ.get('FLASK_ENV', 'development')
configs = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig
}
config = configs.get(config_name, DevelopmentConfig)
