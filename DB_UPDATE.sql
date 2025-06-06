CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES (NULL, 'Admin', 'admin@mail.com', '$2a$08$9lB5CiZcHebxpCLOVKarF.7VglpRlr/hG6y2QPsqfnfaiYAcltm0q', current_timestamp(), current_timestamp());

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    provider_name VARCHAR(50),
    provider_id VARCHAR(100),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE states (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    country_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL
);

CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    state_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL
);

ALTER TABLE cities
ADD COLUMN city_type ENUM('main', 'default') DEFAULT 'default';

CREATE TABLE levels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE recognition_and_approvals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recognition_approval_name VARCHAR(150) NOT NULL,
    recognition_approval_slug VARCHAR(150) DEFAULT NULL,
    recognition_approval_full_name VARCHAR(150) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE amenities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amenities_name VARCHAR(150) NOT NULL,
    amenities_slug VARCHAR(150) DEFAULT NULL,
    amenities_logo VARCHAR(150) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE banners (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) DEFAULT NULL,
  link VARCHAR(200) DEFAULT NULL,
  image VARCHAR(150) DEFAULT NULL,
  description VARCHAR(300) DEFAULT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  promo_banner ENUM('Draft', 'All_Exams_page', 'All_News_page', 'All_Scholarship_page', 'Nri_page', 'Study_Abroad_page', 'All_college_page', 'All_university_page', 'All_school_page', 'Services_Page') DEFAULT 'Draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE pages (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  url VARCHAR(150) DEFAULT NULL,
  top_description LONGTEXT DEFAULT NULL,
  bottom_description LONGTEXT DEFAULT NULL,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keyword VARCHAR(200) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE school_boards (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE schools (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  country_id INT,
  state_id INT,
  city_id INT,
  school_board_id INT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  home_view_status ENUM('top_school', 'default') DEFAULT 'default',
  school_type ENUM('Public', 'Deemed', 'Private', 'Government', 'Autonomous') DEFAULT 'Private',
  listing_order BIGINT DEFAULT 99999,
  established VARCHAR(150) DEFAULT NULL,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keyword VARCHAR(300) DEFAULT NULL,
  address VARCHAR(150) DEFAULT NULL,
  map VARCHAR(200) DEFAULT NULL,
  icon VARCHAR(150) DEFAULT NULL,
  banner_image VARCHAR(150) DEFAULT NULL,
  video_url VARCHAR(150) DEFAULT NULL,
  avg_rating FLOAT DEFAULT NULL,
  info LONGTEXT DEFAULT NULL,
  admissions_process LONGTEXT DEFAULT NULL,
  extracurriculars LONGTEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES countries(id),
  FOREIGN KEY (state_id) REFERENCES states(id),
  FOREIGN KEY (city_id) REFERENCES cities(id),
  FOREIGN KEY (school_board_id) REFERENCES school_boards(id)
);
CREATE TABLE school_levels (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  level_id INT,
  school_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (level_id) REFERENCES levels(id),
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);
CREATE TABLE school_amenities (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  amenitie_id INT,
  school_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (amenitie_id) REFERENCES amenities(id),
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);
CREATE TABLE school_galleries (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  school_id INT,
  image VARCHAR(200) NOT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);
CREATE TABLE school_faqs (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  school_id INT,
  questions LONGTEXT DEFAULT NULL,
  answers LONGTEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);


CREATE TABLE streams (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  h1_title VARCHAR(150) NOT NULL,
  logo VARCHAR(150) DEFAULT NULL,
  description LONGTEXT DEFAULT NULL,
  top_college LONGTEXT DEFAULT NULL,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keyword VARCHAR(200) DEFAULT NULL,
  listing_order BIGINT DEFAULT 99999,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE stream_faqs (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  stream_id INT,
  questions LONGTEXT DEFAULT NULL,
  answers LONGTEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE CASCADE
);

CREATE TABLE sub_streams (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  stream_id INT,
  sub_stream_name VARCHAR(150) NOT NULL,
  sub_stream_slug VARCHAR(150) NOT NULL,
  sub_stream_description VARCHAR(200) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(id)
);

CREATE TABLE general_courses (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  stream_id INT,
  sub_streams_id INT,
  course_type ENUM('UG', 'PG', 'Diploma', 'Doctorate', 'Default') DEFAULT 'Default',
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  short_name VARCHAR(300) DEFAULT NULL,
  duration VARCHAR(300) DEFAULT NULL,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keywords VARCHAR(200) DEFAULT NULL,
  description LONGTEXT DEFAULT NULL,
  syllabus LONGTEXT DEFAULT NULL,
  admissions LONGTEXT DEFAULT NULL,
  career_opportunities LONGTEXT DEFAULT NULL,
  top_college LONGTEXT DEFAULT NULL,
  logo VARCHAR(150) DEFAULT NULL,
  is_trending TINYINT(1) NOT NULL DEFAULT 0,
  is_top_rank TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(id),
  FOREIGN KEY (sub_streams_id) REFERENCES sub_streams(id)
);
CREATE TABLE general_course_faqs (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  general_course_id INT,
  questions LONGTEXT DEFAULT NULL,
  answers LONGTEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (general_course_id) REFERENCES general_courses(id)  ON DELETE CASCADE
);

CREATE TABLE colleges (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  country_id INT,
  state_id INT,
  city_id INT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  type ENUM('college', 'university', 'board') DEFAULT 'college',
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  home_view_status ENUM('top_college', 'default') DEFAULT 'default',
  college_type ENUM('Public', 'Deemed', 'Private', 'Government', 'Autonomous') DEFAULT NULL,
  listing_order BIGINT DEFAULT 99999,
  established VARCHAR(150) DEFAULT NULL,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keyword VARCHAR(300) DEFAULT NULL,
  address VARCHAR(150) DEFAULT NULL,
  map VARCHAR(200) DEFAULT NULL,
  icon VARCHAR(150) DEFAULT NULL,
  logo VARCHAR(150) DEFAULT NULL,
  banner_image VARCHAR(150) DEFAULT NULL,
  video_url VARCHAR(150) DEFAULT NULL,
  avg_rating FLOAT DEFAULT NULL,
  info LONGTEXT DEFAULT NULL,
  admissions LONGTEXT DEFAULT NULL,
  placements LONGTEXT DEFAULT NULL,
  rankings LONGTEXT DEFAULT NULL,
  scholarship LONGTEXT DEFAULT NULL,
  hostel LONGTEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES countries(id),
  FOREIGN KEY (state_id) REFERENCES states(id),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);
CREATE TABLE college_streams (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  stream_id INT,
  college_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(id),
  FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);
CREATE TABLE college_amenities (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  amenitie_id INT,
  college_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (amenitie_id) REFERENCES amenities(id),
  FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);
CREATE TABLE college_recognitions (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  recognition_id INT,
  college_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (recognition_id) REFERENCES recognition_and_approvals(id),
  FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);
CREATE TABLE college_faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_id INT,
  questions LONGTEXT,
  answers LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);
CREATE TABLE college_galleries (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  college_id INT,
  image VARCHAR(200) NOT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);


CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  college_id INT,
  general_course_id INT,
  course_type ENUM('UG', 'PG', 'Diploma', 'Doctorate', 'Default') DEFAULT 'Default',
  slug VARCHAR(150) NOT NULL,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keywords VARCHAR(200) DEFAULT NULL,
  course_details LONGTEXT DEFAULT NULL,
  eligibility LONGTEXT DEFAULT NULL,
  fee_structure LONGTEXT DEFAULT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (college_id) REFERENCES colleges(id),
  FOREIGN KEY (general_course_id) REFERENCES general_courses(id)
);

INSERT INTO
  `levels` (`id`, `name`, `created_at`, `updated_at`)
VALUES
  (1, 'Pre-Primary', NULL, NULL);
INSERT INTO
  `levels` (`id`, `name`, `created_at`, `updated_at`)
VALUES
  (2, 'Primary', NULL, NULL);
INSERT INTO
  `levels` (`id`, `name`, `created_at`, `updated_at`)
VALUES
  (3, 'Secondary', NULL, NULL);
INSERT INTO
  `levels` (`id`, `name`, `created_at`, `updated_at`)
VALUES
  (4, 'Higher Secondary', NULL, NULL);



CREATE TABLE `learntechweb`.`resettokens` (`id` INT(11) NOT NULL AUTO_INCREMENT , `user_id` INT(11) NOT NULL , `email` VARCHAR(256) NULL DEFAULT NULL , `token` VARCHAR(256) NULL DEFAULT NULL , `expiration` INT(11) NULL DEFAULT NULL , `used` INT(11) NOT NULL DEFAULT '0' ,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE = InnoDB;



CREATE TABLE abroadpages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country_id INT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  info LONGTEXT,
  backgroundimage VARCHAR(150),
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keyword VARCHAR(300) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES countries(id)
);

CREATE TABLE abroadpage_faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  abroad_page_id INT,
  questions LONGTEXT,
  answers LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (abroad_page_id) REFERENCES abroadpages(id) ON DELETE CASCADE
  
);

CREATE TABLE exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stream_id INT,
  exam_title VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  upcoming_date VARCHAR(150),
  exam_short_name VARCHAR(150),
  cover_image VARCHAR(150),
  meta_title VARCHAR(150),
  meta_description VARCHAR(200),
  meta_keywords VARCHAR(200),
  overview LONGTEXT,
  exam_dates LONGTEXT,
  eligibility_criteria LONGTEXT,
  syllabus LONGTEXT,
  cutoff LONGTEXT,
  admit_card LONGTEXT,
  exam_centers LONGTEXT,
  results LONGTEXT,
  prepretion_tips LONGTEXT,
  counseling LONGTEXT,
  accept_colleges LONGTEXT,
  promo_banner VARCHAR(150),
  promo_banner_status ENUM('Draft', 'Published') DEFAULT 'Draft',
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(id)
);

CREATE TABLE exam_faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT,
  questions LONGTEXT,
  answers LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (exam_id) REFERENCES exams(id)  ON DELETE CASCADE
);

CREATE TABLE redirect_urls (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  old_url VARCHAR(255) NOT NULL,
  new_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE Accesstokens (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  token VARCHAR(255) NOT NULL,
  expires_at VARCHAR(255) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE data_back_ups (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    path VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    status TINYINT(4) NOT NULL DEFAULT 0 COMMENT '0: pending, 1: process, 2:completed, 3:cancelled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE landing_pages (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  link VARCHAR(200) NOT NULL,
  logo VARCHAR(150) DEFAULT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE news_categories (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE news_and_events (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  banner_image VARCHAR(150) DEFAULT NULL,
  pdf_file VARCHAR(150) DEFAULT NULL,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keywords VARCHAR(200) DEFAULT NULL,
  overview LONGTEXT DEFAULT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES news_categories(id)
);


CREATE TABLE blogs (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  banner_image VARCHAR(150) DEFAULT NULL,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keywords VARCHAR(200) DEFAULT NULL,
  overview LONGTEXT DEFAULT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (category_id) REFERENCES blog_categories(id)
);

CREATE TABLE scholar_levels (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE scholar_types (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE scholarships (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  level_id INT,
  type_id INT,
  country_id INT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  gender ENUM('male', 'female', 'others') DEFAULT NULL,
  amount VARCHAR(150) DEFAULT NULL,
  last_date VARCHAR(150) DEFAULT NULL,
  total_scholarships VARCHAR(150) DEFAULT NULL,
  is_eligible TINYINT(1) NOT NULL DEFAULT 0,
  logo VARCHAR(150) DEFAULT NULL,
  meta_title VARCHAR(150) DEFAULT NULL,
  meta_description VARCHAR(200) DEFAULT NULL,
  meta_keywords VARCHAR(200) DEFAULT NULL,
  overview LONGTEXT DEFAULT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (level_id) REFERENCES scholar_levels(id),
  FOREIGN KEY (type_id) REFERENCES scholar_types(id),
  FOREIGN KEY (country_id) REFERENCES countries(id)
);

CREATE TABLE all_job_locations (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE jobs_positions (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  job_description VARCHAR(150) DEFAULT NULL,
  exp_required VARCHAR(150) DEFAULT NULL,
  total_positions VARCHAR(150) DEFAULT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE job_locations (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  job_location_id INT,
  jobs_position_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (job_location_id) REFERENCES all_job_locations(id),
  FOREIGN KEY (jobs_position_id) REFERENCES jobs_positions(id) ON DELETE CASCADE
);



CREATE TABLE jobs_enquires (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  jobs_position_id INT,
  job_location_id INT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) DEFAULT NULL,
  phone VARCHAR(150) DEFAULT NULL,
  DOB VARCHAR(150) DEFAULT NULL,
  current_location VARCHAR(150) DEFAULT NULL,
  total_exp VARCHAR(150) DEFAULT NULL,
  resume VARCHAR(150) DEFAULT NULL,
  status ENUM('Draft', 'Published') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (jobs_position_id) REFERENCES jobs_positions(id),
  FOREIGN KEY (job_location_id) REFERENCES all_job_locations(id)
);


CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  userrating FLOAT NOT NULL,
  user_id INT DEFAULT NULL,
  content VARCHAR(255) NOT NULL,
  is_approved TINYINT DEFAULT 0,
  passing_year VARCHAR(255),
  review_type ENUM('school', 'college') DEFAULT 'college',
  college_id INT DEFAULT NULL,
  course_id INT DEFAULT NULL,
  course_type ENUM('UG', 'PG', 'Diploma', 'Doctorate', 'Default') DEFAULT 'Default',
  school_id INT DEFAULT NULL,
  school_board_id INT DEFAULT NULL,
  grade VARCHAR(255) DEFAULT NULL,
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  is_reported TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);





ALTER TABLE `school_boards`
ADD COLUMN `country_id` INT,
ADD COLUMN `state_id` INT,
ADD COLUMN `city_id` INT,
ADD COLUMN `gender` ENUM('male', 'female', 'Co-Ed') DEFAULT 'Co-Ed',
ADD COLUMN `board_type` ENUM('state', 'national', 'international', 'default') DEFAULT 'default',
ADD COLUMN `logo` VARCHAR(150) DEFAULT NULL,
ADD COLUMN `avg_rating` FLOAT DEFAULT NULL,
ADD COLUMN `listing_order` VARCHAR(50) DEFAULT '99999',
ADD COLUMN `established` VARCHAR(150) DEFAULT NULL,
ADD COLUMN `result_date` VARCHAR(150) DEFAULT NULL,
ADD COLUMN `info` LONGTEXT DEFAULT NULL,
ADD COLUMN `time_table` LONGTEXT DEFAULT NULL,
ADD COLUMN `reg_form` LONGTEXT DEFAULT NULL,
ADD COLUMN `syllabus` LONGTEXT DEFAULT NULL,
ADD COLUMN `results` LONGTEXT DEFAULT NULL,
ADD COLUMN `sample_paper` LONGTEXT DEFAULT NULL,
ADD FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`),
ADD FOREIGN KEY (`state_id`) REFERENCES `states`(`id`),
ADD FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`);


CREATE TABLE school_board_recognitions (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  recognition_id INT,
  school_board_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (recognition_id) REFERENCES recognition_and_approvals(id),
  FOREIGN KEY (school_board_id) REFERENCES school_boards(id) ON DELETE CASCADE
);

CREATE TABLE school_board_faqs (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  school_board_id INT,
  questions LONGTEXT DEFAULT NULL,
  answers LONGTEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_board_id) REFERENCES school_boards(id) ON DELETE CASCADE
);

CREATE TABLE video_testimonials (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  name VARCHAR(150) NOT NULL,
  designation VARCHAR(150) DEFAULT NULL,
  video_url VARCHAR(150) DEFAULT NULL,
  full_url VARCHAR(150) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE our_teams (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  designation VARCHAR(150) DEFAULT NULL,
  linked_in_link VARCHAR(150) DEFAULT NULL,
  image VARCHAR(150) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


ALTER TABLE `colleges` ADD `course_fees` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL AFTER `info`;

ALTER TABLE `colleges` CHANGE `map` `map` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE blogs ADD listing_order BIGINT(20) NULL DEFAULT '99999' AFTER status;

ALTER TABLE `review_replies` ADD `user_id` INT(11) NULL DEFAULT NULL AFTER `content`;

ALTER TABLE `banners` CHANGE `promo_banner` `promo_banner` ENUM('Draft','All_Exams_page','All_News_page','All_Scholarship_page','Nri_page','Study_Abroad_page','All_college_page','All_courses_page','All_university_page','All_school_page','Services_Page') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'Draft';
ALTER TABLE school_boards ADD address VARCHAR(150) NULL DEFAULT NULL AFTER sample_paper, ADD map LONGTEXT NULL DEFAULT NULL AFTER address;
ALTER TABLE abroadpages ADD status ENUM('Draft','Published') NULL DEFAULT 'Published' AFTER meta_keyword;

ALTER TABLE banners CHANGE promo_banner promo_banner ENUM('Draft','All_Exams_page','All_News_page','All_Scholarship_page','Nri_page','Study_Abroad_page','All_college_page','All_courses_page','All_university_page','All_school_page','Services_Page','All_about_page') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'Draft';

ALTER TABLE banners CHANGE promo_banner promo_banner ENUM('Draft','All_Exams_page','All_News_page','All_Scholarship_page','Nri_page','Study_Abroad_page','All_college_page','All_courses_page','All_university_page','All_school_page','Services_Page','All_about_page','All_our_teams','Home_news_page', 'Advertise_page') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'Draft';

ALTER TABLE exams ADD logo VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL AFTER status;

ALTER TABLE courses ADD course_short_name VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER status;

ALTER TABLE enquiries ADD bank_name VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL AFTER current_url, ADD city VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL AFTER bank_name;

CREATE TABLE blog_comments (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  blog_id INT DEFAULT NULL,
  content VARCHAR(255) NOT NULL,
  is_approved TINYINT DEFAULT 0,
  is_reported TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);


ALTER TABLE `abroadpages`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;



ALTER TABLE `blogs`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;

ALTER TABLE `colleges`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;

ALTER TABLE `courses`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;

ALTER TABLE `exams`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;


ALTER TABLE `general_courses`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;

ALTER TABLE `news_and_events`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;

ALTER TABLE `pages`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;

ALTER TABLE `scholarships`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;

ALTER TABLE `schools`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;
	
ALTER TABLE `streams`
MODIFY COLUMN `meta_description` VARCHAR(400) DEFAULT NULL;


CREATE TABLE genders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL
);
INSERT INTO genders (name) VALUES ('Male');
INSERT INTO genders (name) VALUES ('Female');
INSERT INTO genders (name) VALUES ('Others');

CREATE TABLE scholar_genders (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  gender_id INT,
  scholar_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (gender_id) REFERENCES genders(id),
  FOREIGN KEY (scholar_id) REFERENCES scholarships(id) ON DELETE CASCADE
);


CREATE TABLE blog_categories (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE blogs ADD COLUMN category_id INT, ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES blog_categories(id);

ALTER TABLE `genders` ADD `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `name`, ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `created_at`;


ALTER TABLE video_testimonials CHANGE designation designation VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE video_testimonials ADD type ENUM('Draft','About_us_page','Testimonial_page') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'Draft' AFTER full_url;
ALTER TABLE news_and_events ADD pdf_name VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER status;

CREATE TABLE organization_pages ( id INTEGER PRIMARY KEY AUTO_INCREMENT, title VARCHAR(150) NOT NULL, content VARCHAR(150) DEFAULT NULL, categories ENUM('Streams', 'Courses', 'Exams', 'Study_Abroad'), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );


CREATE TABLE organization_page_steps ( id INTEGER PRIMARY KEY AUTO_INCREMENT, organization_page_id INT, title VARCHAR(150) NOT NULL, description VARCHAR(150) DEFAULT NULL, icon VARCHAR(150) DEFAULT NULL, order_by VARCHAR(150) DEFAULT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (organization_page_id) REFERENCES organization_pages(id) );

ALTER TABLE school_boards 
ADD status ENUM('Draft', 'Published') DEFAULT 'Published';

ALTER TABLE `schools` CHANGE `map` `map` VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE `jobs_positions` CHANGE `job_description` `job_description` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE counsellor_teams ADD listing_order BIGINT(20) NULL DEFAULT '99999' AFTER image;
ALTER TABLE `states` ADD `is_top` TINYINT(1) NOT NULL DEFAULT '0' AFTER `country_id`;
ALTER TABLE `reviews` CHANGE `content` `content` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;


CREATE TABLE college_testimonials (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  video_id INT,
  college_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (video_id) REFERENCES video_testimonials(id) ON DELETE CASCADE,
  FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

CREATE TABLE stream_testimonials (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  video_id INT,
  stream_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (video_id) REFERENCES video_testimonials(id) ON DELETE CASCADE,
  FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE CASCADE
);

CREATE TABLE general_course_testimonials (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  video_id INT,
  general_course_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (video_id) REFERENCES video_testimonials(id) ON DELETE CASCADE,
  FOREIGN KEY (general_course_id) REFERENCES general_courses(id) ON DELETE CASCADE
);

ALTER TABLE `video_testimonials` CHANGE `designation` `designation` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE `video_testimonials` CHANGE `title` `title` VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;


ALTER TABLE landing_pages ADD listing_order BIGINT(20) NULL DEFAULT '99999' AFTER status;

ALTER TABLE news_and_events ADD listing_order BIGINT(20) NULL DEFAULT '99999' AFTER status;

ALTER TABLE `news_and_events` ADD `is_trending` TINYINT(1) NULL DEFAULT '0' AFTER `pdf_name`;

CREATE TABLE exam_streams (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  exam_id INT,
  stream_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE CASCADE
);

CREATE TABLE board_schools (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  school_id INT,
  school_board_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
  FOREIGN KEY (school_board_id) REFERENCES school_boards(id) ON DELETE CASCADE
);

 ALTER TABLE `board_schools`
    CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

 ALTER TABLE `exam_streams`
    CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `courses` ADD `title` VARCHAR(200) NULL DEFAULT NULL AFTER `course_short_name`;