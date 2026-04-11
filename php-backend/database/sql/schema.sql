-- Core schema for frontend-compatible API + admin backend.

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') NOT NULL DEFAULT 'viewer',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE blog_posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    body MEDIUMTEXT NULL,
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    author_id BIGINT UNSIGNED NOT NULL,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT fk_blog_posts_author FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE blog_submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    summary TEXT NOT NULL,
    submitted_by_ip VARCHAR(45) NULL,
    user_agent VARCHAR(255) NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    approved_post_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_blog_submissions_approved_post FOREIGN KEY (approved_post_id) REFERENCES blog_posts(id)
);

CREATE TABLE gallery_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(160) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(220) NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_published TINYINT(1) NOT NULL DEFAULT 1,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT fk_gallery_items_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE contact_messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL,
    message TEXT NOT NULL,
    source_page VARCHAR(120) NULL,
    status ENUM('new', 'read', 'replied', 'spam') NOT NULL DEFAULT 'new',
    ticket_code VARCHAR(60) NOT NULL UNIQUE,
    submitted_by_ip VARCHAR(45) NULL,
    user_agent VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

CREATE TABLE audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    actor_user_id BIGINT UNSIGNED NULL,
    action VARCHAR(120) NOT NULL,
    entity_type VARCHAR(120) NOT NULL,
    entity_id BIGINT UNSIGNED NULL,
    metadata_json JSON NULL,
    created_at TIMESTAMP NULL,
    CONSTRAINT fk_audit_actor FOREIGN KEY (actor_user_id) REFERENCES users(id)
);

CREATE INDEX idx_blog_posts_status_pub ON blog_posts (status, published_at DESC);
CREATE INDEX idx_gallery_items_pub_sort ON gallery_items (is_published, sort_order);
CREATE INDEX idx_contact_messages_status_created ON contact_messages (status, created_at DESC);
CREATE INDEX idx_blog_submissions_status_created ON blog_submissions (status, created_at DESC);
