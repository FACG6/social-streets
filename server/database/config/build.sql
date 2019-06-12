BEGIN;

    DROP TABLE IF EXISTS user, event, news_tag, topic, event_topic, event_category, primary_tag, secondary_tag, news CASCADE;

    CREATE TABLE user (id SERIAL PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email UNIQUE TEXT NOT NULL, password TEXT NOT NULL, avatar TEXT, business_type TEXT NOT NULL, website TEXT NOT NULL, organisation_name TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL, country TEXT NOT NULL, postal_code TEXT NOT NULL, facebook TEXT, instagram TEXT, twitter TEXT);

    CREATE TABLE event (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, category INTEGER REFERENCES event_category(id), event_datetime DATETIME NOT NULL, venue TEXT NOT NULL, website TEXT NOT NULL, cost TEXT NOT NULL, image TEXT NOT NULL, focus_key TEXT NOT NULL, meta TEXT NOT NULL, alt_text TEXT NOT NULL, is_draft BOOLEAN NOT NULL, publisher_id INTEGER REFERENCES user(id), publish_datetime DATETIME NOT NULL);

    CREATE TABLE news_tag (secondary_tag INTEGER REFERENCES secondary_tag(id), news_id INTEGER REFERENCES news(id));

    CREATE TABLE topic (id SERIAL PRIMARY KEY, topic TEXT NOT NULL);

    CREATE TABLE event_topic (event_id INTEGER REFERENCES event(id), topic_id INTEGER REFERENCES topic(id));

    CREATE TABLE primary_tag (id SERIAL PRIMARY KEY, tag TEXT NOT NULL);

    CREATE TABLE secondary_tag(id SERIAL PRIMARY KEY, tag TEXT NOT NULL);

    CREATE TABLE event_category (id SERIAL PRIMARY KEY, category TEXT NOT NULL);

    CREATE TABLE news (id SERIAL PRIMARY KEY, primary_tag INTEGER REFERENCES primary_tag(id), description TEXT NOT NULL, image TEXT, focus_key TEXT NOT NULL, alt_text TEXT NOT NULL, meta TEXT NOT NULL, publisher_id INTEGER REFERENCES user(id), publish_datetime DATETIME, title TEXT NOT NULL, is_draft BOOLEAN NOT NULL);

COMMIT;
