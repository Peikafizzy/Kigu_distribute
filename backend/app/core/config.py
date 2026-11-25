class Settings:
    APP_NAME = "Kigu API"
    API_VERSION = "v1"
    DEBUG = True

    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]


settings = Settings()