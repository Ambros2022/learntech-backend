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
  status_code ENUM('301', '307', '503') DEFAULT '301',
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
