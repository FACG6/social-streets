BEGIN;

    INSERT INTO event_categories (category) 
        VALUES ("Events and Festivals"), ("Nightlife"), ("Exhibitions"), ("Courses and workshops"), ("Walks and talks"); 

    INSERT INTO topics (topic) 
        VALUES ("Family and Children"), ("Food and drink"), ("Arts"), ("Heritage and Culture"), ("Sport and Hobbies"), ("Community Development");

    INSERT INTO primary_tags (tag) 
        VALUES ("Consultations"), ("Petitions"),("Surveys"), ("Volunteering"), ("Research");

    INSERT INTO secondary_tags (tag) 
        VALUES ("Health"), ("Safety"),("Planning"), ("Education");

COMMIT;
