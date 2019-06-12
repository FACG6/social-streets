BEGIN;

    DROP TABLE IF EXISTS users, events, news_tags, topics,event_topic, event_categories, primary_tags, secondary_tags, news CASCADE;

    CREATE TABLE users (id SERIAL PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email UNIQUE TEXT NOT NULL, password TEXT NOT NULL, avatar TEXT, business_type TEXT NOT NULL, website TEXT NOT NULL, org_name TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL, country TEXT NOT NULL, postal_code TEXT NOT NULL, facebook TEXT NOT NULL, instagram TEXT NOT NULL, twitter TEXT NOT NULL);

    CREATE TABLE events (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, category INTEGER NOT NULL REFERENCES event_categories(id), event_datetime DATETIME NOT NULL, venue TEXT NOT NULL, website TEXT NOT NULL, cost TEXT NOT NULL, image TEXT NOT NULL, focus_key TEXT NOT NULL, meta TEXT NOT NULL, alt_text TEXT NOT NULL, is_draft BOOLEAN NOT NULL, publisher_id INTEGER NOT NULL REFERENCES users(id), publish_datetime DATETIME NOT NULL);

    CREATE TABLE news_tags (secondary_tag INTEGER NOT NULL REFERENCES secondary_tags(id), news_id INTEGER NOT NULL REFERENCES news(id));

    CREATE TABLE topics (id SERIAL PRIMARY KEY, topic TEXT NOT NULL);

    CREATE TABLE event_topic (event_id INTEGER NOT NULL REFERENCES events(id), topic_id INTEGER NOT NULL REFERENCES topics(id));

    CREATE TABLE primary_tags (id SERIAL PRIMARY KEY, tag TEXT NOT NULL);

    CREATE TABLE secondary_tags(id SERIAL PRIMARY KEY, tag TEXT NOT NULL);

    CREATE TABLE event_categories (id SERIAL PRIMARY KEY, category TEXT NOT NULL);

    CREATE TABLE news (id SERIAL PRIMARY KEY, primary_tag INTEGER NOT NULL REFERENCES primary_tags(id), description TEXT NOT NULL, image TEXT NOT NULL, focus_key TEXT NOT NULL, alt_text TEXT NOT NULL, meta TEXT NOT NULL, publisher_id INTEGER NOT NULL REFERENCES users(id), publish_datetime DATETIME, title TEXT NOT NULL, is_draft BOOLEAN NOT NULL);

COMMIT;
