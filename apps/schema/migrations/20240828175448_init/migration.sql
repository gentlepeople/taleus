CREATE SCHEMA IF NOT EXISTS public;

-- CREATE TRIGGER
CREATE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE users (
    user_id VARCHAR NOT NULL,
    nickname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    profile_image_url VARCHAR NOT NULL,
    gender VARCHAR NOT NULL,
    birthday TIMESTAMP NOT NULL,
    oauth_provider_type VARCHAR NOT NULL,
    oauth_provider_id VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ NULL,
    PRIMARY KEY (user_id)
);

CREATE INDEX index_user_oauth_provider_id ON users(oauth_provider_id);

CREATE TRIGGER user_set_updated_at
BEFORE UPDATE ON users FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();

CREATE TABLE _data_migrations (
    version TEXT NOT NULL,
    name TEXT NOT NULL,
    started_at TIMESTAMP(3) NOT NULL,
    finished_at TIMESTAMP(3) NOT NULL,
    PRIMARY KEY (version)
);
