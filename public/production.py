from google.cloud import logging

from .base import *  # noqa
from .base import REST_AUTH, env

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env("DJANGO_SECRET_KEY")
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS")
# This is being used to override the django reset password domain link
FRONTEND_DOMAIN = env("FRONTEND_DOMAIN")
CORS_ALLOWED_ORIGINS = [
    FRONTEND_DOMAIN,
    "https://login.microsoftonline.com",
    "https://bcs-v2.burwood.io",
    "https://cloudbilling.burwood.com",
    "https://api.bcs-v2.burwood.io",
]
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = [FRONTEND_DOMAIN]

# DATABASES
# ------------------------------------------------------------------------------
DATABASES = {
    "default": env.db("DATABASE_URL"),
    "alloy": env.db("CONSUMPTION_DATABASE_URL"),
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True  # noqa F405
DATABASES["default"]["CONN_MAX_AGE"] = env.int("CONN_MAX_AGE", default=60)  # noqa F405]

# CACHES
# ------------------------------------------------------------------------------
if not env.bool("DISABLE_CACHE"):
    # Use database caching for distributed environments
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.db.DatabaseCache",
            "LOCATION": "django_cache",
            "TIMEOUT": None,  # Cache entries never expire by default
            "OPTIONS": {
                "MAX_ENTRIES": 1000,  # Maximum number of entries in the cache
                "CULL_FREQUENCY": 2,  # Fraction of entries to cull when max is reached (1/CULL_FREQUENCY)
            },
        }
    }


# SECURITY
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#secure-proxy-ssl-header
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
# https://docs.djangoproject.com/en/dev/ref/settings/#secure-ssl-redirect
SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)
# https://docs.djangoproject.com/en/dev/ref/settings/#session-cookie-secure
SESSION_COOKIE_SECURE = True
# https://docs.djangoproject.com/en/dev/ref/settings/#csrf-cookie-secure
CSRF_COOKIE_SECURE = True
# https://docs.djangoproject.com/en/dev/topics/security/#ssl-https
# https://docs.djangoproject.com/en/dev/ref/settings/#secure-hsts-seconds
# TODO: set this to 60 seconds first and then to 518400 once you prove the former works
SECURE_HSTS_SECONDS = 60
# https://docs.djangoproject.com/en/dev/ref/settings/#secure-hsts-include-subdomains
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool(
    "DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True
)
# https://docs.djangoproject.com/en/dev/ref/settings/#secure-hsts-preload
SECURE_HSTS_PRELOAD = env.bool("DJANGO_SECURE_HSTS_PRELOAD", default=True)
# https://docs.djangoproject.com/en/dev/ref/middleware/#x-content-type-options-nosniff
SECURE_CONTENT_TYPE_NOSNIFF = env.bool(
    "DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", default=True
)

# STORAGES
# ------------------------------------------------------------------------------
# https://django-storages.readthedocs.io/en/latest/#installation
INSTALLED_APPS += ["storages"]  # noqa F405
GS_BUCKET_NAME = env("DJANGO_GCP_STORAGE_BUCKET_NAME")
GS_DEFAULT_ACL = "publicRead"
# STATIC
# ------------------------
STATICFILES_STORAGE = (
    "burwood_cloudbilling_portal_backend.utils.storages.StaticRootGoogleCloudStorage"
)
COLLECTFAST_STRATEGY = "collectfast.strategies.gcloud.GoogleCloudStrategy"
STATIC_URL = f"https://storage.googleapis.com/{GS_BUCKET_NAME}/static/"  # noqa F405
# MEDIA
# ------------------------------------------------------------------------------
DEFAULT_FILE_STORAGE = (
    "burwood_cloudbilling_portal_backend.utils.storages.MediaRootGoogleCloudStorage"
)
MEDIA_URL = f"https://storage.googleapis.com/{GS_BUCKET_NAME}/media/"  # noqa F405

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#default-from-email
DEFAULT_FROM_EMAIL = env(
    "DJANGO_DEFAULT_FROM_EMAIL",
    default="Burwood Cloud Services <portalsupport@burwood.com>",
)
# https://docs.djangoproject.com/en/dev/ref/settings/#server-email
SERVER_EMAIL = env("DJANGO_SERVER_EMAIL", default=DEFAULT_FROM_EMAIL)
# https://docs.djangoproject.com/en/dev/ref/settings/#email-subject-prefix
EMAIL_SUBJECT_PREFIX = env(
    "DJANGO_EMAIL_SUBJECT_PREFIX",
    default="[Burwood CloudBilling Portal Backend]",
)

# ADMIN
# ------------------------------------------------------------------------------
# Django Admin URL regex.
ADMIN_URL = env("DJANGO_ADMIN_URL")

# Override cookie domain settings for Cloud Run
SESSION_COOKIE_DOMAIN = None  # Use the host domain instead of .burwood.io
SESSION_COOKIE_SAMESITE = "Lax"  # Use Lax instead of None for better compatibility
JWT_AUTH_COOKIE_DOMAIN = None  # Use the host domain instead of .burwood.io

# Override JWT cookie settings in REST_AUTH
REST_AUTH = {
    **REST_AUTH,  # Include base settings
    "JWT_AUTH_COOKIE_DOMAIN": None,  # Use the host domain instead of .burwood.io
    "JWT_AUTH_SAMESITE": "Lax",  # Use Lax instead of None for better compatibility
}

# Fix CSRF cookie settings for better compatibility
CSRF_COOKIE_DOMAIN = None  # Use the host domain
CSRF_COOKIE_SAMESITE = "Lax"  # Use Lax instead of None

# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
# https://anymail.readthedocs.io/en/stable/installation/#anymail-settings-reference
# https://anymail.readthedocs.io/en/stable/esps/sendgrid/
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Collectfast
# ------------------------------------------------------------------------------
# https://github.com/antonagestam/collectfast#installation
INSTALLED_APPS = ["collectfast"] + INSTALLED_APPS  # noqa F405

# LOGGING
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#logging
# See https://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.

# StackDriver setup
client = logging.Client()
# Connects the logger to the root logging handler; by default
# this captures all logs at INFO level and higher
client.setup_logging()

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s "
            "%(process)d %(thread)d %(message)s"
        },
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
        "stackdriver": {
            "class": "google.cloud.logging.handlers.CloudLoggingHandler",
            "client": client,
        },
    },
    "root": {"level": "INFO", "handlers": ["console", "stackdriver"]},
    "loggers": {
        "django.db.backends": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        "sentry_sdk": {"level": "ERROR", "handlers": ["console"], "propagate": False},
        "django.security.DisallowedHost": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        "": {
            "handlers": ["stackdriver"],
            "level": "INFO",
        },
    },
}

# Sentry
# ------------------------------------------------------------------------------
# SENTRY_DSN = env("SENTRY_DSN")
# SENTRY_LOG_LEVEL = env.int("DJANGO_SENTRY_LOG_LEVEL", logging.INFO)

# sentry_logging = LoggingIntegration(
#     level=SENTRY_LOG_LEVEL,  # Capture info and above as breadcrumbs
#     event_level=logging.ERROR,  # Send errors as events
# )
# integrations = [sentry_logging, DjangoIntegration(), RedisIntegration()]
# sentry_sdk.init(
#     dsn=SENTRY_DSN,
#     integrations=integrations,
#     environment=env("SENTRY_ENVIRONMENT", default="production"),
#     traces_sample_rate=env.float("SENTRY_TRACES_SAMPLE_RATE", default=0.0),
# )

# Your stuff...
# ------------------------------------------------------------------------------

OVERRIDE_EMAIL_RECIPIENTS = False
BURWOOD_DEVELOPMENT_TO_EMAIL = ["dpalencia@burwood.com"]

EMAIL_BACKEND = "api_services.mailer.mailing_backend.PubSubEmailBackend"
ACCOUNT_ADAPTER = "api_core.authentication.adapters.CustomAccountAdapter"

PUBSUB_PROJECT_NAME = "burwood-cloudbilling-portal-v2"
PUBSUB_TOPIC_NAME = "prod-mailer"
PUBSUB_SUBSCRIPTION_NAME = "prod-mailer-subscription"
GCP_SINGLE_PROJECT_INGEST_PUBSUB_TOPIC = "prod-single-project-ingest"
GCP_SINGLE_PROJECT_UPDATE_PUBSUB_TOPIC = "prod-single-project-update"
GCP_SINGLE_BILLING_ACCOUNT_PUBSUB_TOPIC = "prod-single-billing-account-ingest"
GCP_EXPIRING_BUDGETS_PUBSUB_TOPIC = "prod-expiring-budget-notifications"
GCP_PROJECT_THRESHOLD_ALERT_PUBSUB_TOPIC = "prod-project-threshold-alert-notifications"
GCP_BUDGET_ENFORCEMENT_PUBSUB_TOPIC = "prod-budget-enforcement-init"
GCP_SINGLE_GCP_PROJECT_BID_SYNC_PUBSUB_TOPIC = "prod-single-gcp-project-bid-sync"
GCP_ALLOYDB_BUDGET_DATA_SYNC_PUBSUB_TOPIC = "budget-consumption-sync"
GCP_ORGANIZATION_WEEKLY_SUMMARY_REPORT_INIT_PUBSUB_TOPIC = (
    "prod-organization-weekly-summary-report-init"
)
GCP_SINGLE_ORGANIZATION_WEEKLY_REPORT_PUBSUB_TOPIC = (
    "prod-single-organization-weekly-report"
)

# Dry run versions of weekly report topics
GCP_ORGANIZATION_WEEKLY_SUMMARY_REPORT_DRY_RUN_INIT_PUBSUB_TOPIC = (
    "prod-organization-weekly-summary-report-dry-run-init"
)
GCP_SINGLE_ORGANIZATION_WEEKLY_REPORT_DRY_RUN_PUBSUB_TOPIC = (
    "prod-single-organization-weekly-report-dry-run"
)
GCP_CLIENT_DATA_MIGRATION_PUBSUB_TOPIC = "client-data-sync"
INVOICING_SINGLE_ORGANIZATION_INIT_TOPIC = "prod-single-organization-invoice-topic"
INVOICE_SEND_PUBSUB_TOPIC = "prod-invoice-send-topic"
AWS_ACCOUNT_THRESHOLD_ALERT_PUBSUB_TOPIC = (
    "prod-aws-account-threshold-alert-notifications"
)
AWS_BUDGETS_PUBSUB_TOPIC = "prod-aws-budget-notifications"
AWS_SINGLE_ACCOUNT_PUBSUB_TOPIC = "prod-aws-single-account-sync"

PUBSUB_SA_EMAIL = env("PUBSUB_SA_EMAIL")
PUBSUB_SERVICE_URL = env("PUBSUB_SERVICE_URL")

USE_PUBSUB_EMULATOR = False
SERVICES_TESTING_MODE = False

LOCAL_DEVELOPMENT = False


# ------------------------------------------------------------------------------
# Google Cloud API Settings
# Default to False, but can be set to True in the environment to enable GCP API Calls

# Dangerous to enable, as it will enable updating real project billing in GCP
UPDATE_BILLING_ACCOUNTS_IN_GCP = True

# This setting should only be flipped to true in the production environment.
# It will enable the budget sync topic to be published to AlloyDB,
# which will sync the GCP consumption data for every BID in the database to the AlloyDB database.
PUBLISH_TO_ALLOYDB_BUDGET_SYNC_TOPIC = True


BURWOOD_CATCH_ALL_EMAIL = "dpalencia@burwood.com"

# Setting for storing csv files into GCP storage bucket
INVOICE_STAGING_BUCKET = "prod-burwood-billing-portal-invoices-staging"
INVOICE_ARCHIVE_BUCKET = "prod-burwood-invoiced-archive"

SERVICENOW_USERNAME = env("SERVICENOW_USERNAME")
SERVICENOW_PASSWORD = env("SERVICENOW_PASSWORD")
SERVICENOW_INSTANCE = "burwood"
# Try to use environment variable first, then fallback to default path
DATA_KEYFILE_PATH = env("DATA_KEYFILE_PATH", default="/code/keyfiles/keyfile_DATA.json")
