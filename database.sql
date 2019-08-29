CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT false
);

CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "category" VARCHAR (100) NOT NULL,
    "hide_cat" BOOLEAN DEFAULT false
);

CREATE TABLE "images" (
    "id" SERIAL PRIMARY KEY,
    "img_link" VARCHAR (100) NOT NULL,
    "story_id" INT REFERENCES "stories",
    "featured_img" BOOLEAN DEFAULT false
);

CREATE TABLE "stories" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100) NOT NULL,
	"location" VARCHAR (300) NOT NULL,
	"title" VARCHAR (200) NOT NULL,
	"aquatic_therapist" VARCHAR (100),
	"message" VARCHAR (5000) NOT NULL,
	"email" VARCHAR (200),
	"post_date" DATE NOT NULL,
	"category_id" INT REFERENCES "categories",
	"flagged" BOOLEAN DEFAULT false	
);