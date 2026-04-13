FROM php:8.3-cli-alpine

# Install required extensions and system dependencies
RUN apk add --no-cache \
    mysql-client \
    curl \
    git \
    unzip \
    composer \
    sqlite

# Build dependencies required for compiling bundled PHP extensions
RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    libxml2-dev

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    xml \
    bcmath

# Remove build dependencies to keep image size smaller
RUN apk del .build-deps

# Set working directory
WORKDIR /app

# Copy Laravel app files
COPY . /app/

# Install Composer dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Create .env from example if it doesn't exist
RUN test -f .env || cp .env.example .env

# Set permissions
RUN chown -R 1000:1000 /app

# Expose port (Render uses PORT env var)
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8000}/api/health || exit 1

# Start Laravel development server
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
