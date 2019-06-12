BEGIN;

    INSERT INTO users (first_name, last_name, email UNIQUE, password, avatar, business_type, website, org_name, address, city, country, postal_code, facebook, instagram, twitter)
        VALUES ("Ahmed", "Abdellatif", "ahmedisam9922@gmail.com", "$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW", NULL, "Charity", "https://www.google.com", "Ahmed Co.", "Omar Al-Mukhtar St.", "Gaza", "Palestine", "79702", "https://www.facebook.com", "https://www.instagram.com", "https://www.twitter.com"), 
        ("Amin", "Al-Akhsam", "aminking@gmail.com", "$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW", NULL, "Community organisation", "https://www.google.com", "Amin Co.", "Omar Al-Mukhtar St.", "Gaza", "Palestine", "79702", "https://www.facebook.com", "https://www.instagram.com", "https://www.twitter.com"),
        ("Abdallah", "Ammar", "abdallah@gmail.com", "$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW", NULL, "Education", "https://www.google.com", "Abd Co.", "Omar Al-Mukhtar St.", "Gaza", "Palestine", "79702", "https://www.facebook.com", "https://www.instagram.com", "https://www.twitter.com");

    INSERT INTO events (title, description, category, event_datetime, venue, website, cost, image, focus_key, meta, alt_text, is_draft, publisher_id, publish_datetime)
        VALUES ("The main Event", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the  printing and typesetting industry. Lorem  Ipsum has been the industrys standard dummy  text ever since the 1500s, when an unknown  printer took a galley of type and scrambled  it to make a type specimen book. Lorem Ipsum is simply dummy text of the  printing and typesetting industry. Lorem  Ipsum has been the industrys standard dummy  text ever since the 1500s, when an unknown  printer took a galley of type and scrambled  it to make a type specimen book.", 1, "11/6/ 2019 - 04.30 p.m", "Abed al Aziz Venue",  "www.gaza-sky-geeks.com", "15", "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress& cs=tinysrgb&dpr=1&w=500", "Lorem", "Lorem  Ipsum is simply dummy text of the printing  and typesetting industry.", "alt text", false, 2, "11/4/2019 - 02.23 p.m");

    INSERT INTO news_tags (secondary_tag, news_id)
        VALUES (1, 1), (2, 1), (3, 1); 

    INSERT INTO event_topic (event_id, topic_id) 
        VALUES (1, 1), (1, 2), (1, 3), (1, 4);

    INSERT INTO news (primary_tag, description, image, focus_key, alt_text, meta, publisher_id, publish_datetime, title, is_draft)
        VALUES (2, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the  printing and typesetting industry.", "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress& cs=tinysrgb&dpr=1&w=500", "Lorem", "ALT TEXT", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.", 3, "11/6/ 2019 - 04.30 p.m", "News Title", false);

COMMIT;
