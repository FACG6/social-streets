BEGIN;

    INSERT INTO event_category (category) 
        VALUES ('Events and Festivals'),
               ('Nightlife'),
               ('Exhibitions'),
               ('Courses and workshops'),
               ('Walks and talks'); 

    INSERT INTO topic (topic) 
        VALUES ('Family and Children'),
               ('Food and drink'),
               ('Arts'),
               ('Heritage and Culture'),
               ('Sport and Hobbies'),
               ('Community Development');

    INSERT INTO primary_tag (tag) 
        VALUES ('Consultations'),
               ('Petitions'),
               ('Surveys'),
               ('Volunteering'),
               ('Research');

    INSERT INTO secondary_tag (tag) 
        VALUES ('Health'),
               ('Safety'),
               ('Planning'),
               ('Education');

    INSERT INTO tip (tip_title, tip_description) 
        VALUES ('Titel Event',),
               ('Description Event'),
               ('Titel Public Service'),
               ('Description Public Service');

COMMIT;
