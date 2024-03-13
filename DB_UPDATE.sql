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

CREATE TABLE colleges (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    country_id INT,
    state_id INT,
    city_id INT,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    type ENUM('college','university','board') DEFAULT 'college',
    status ENUM('Draft', 'Published') DEFAULT 'Published',
    home_view_status ENUM('top_college', 'default') DEFAULT 'default',
    college_type ENUM('Public','Deemed','Private','Government','Autonomous') DEFAULT NULL,
    genders_accepted ENUM('Male','Female','Co-Ed') DEFAULT NULL,
    campus_size_type ENUM('Acres', 'Cent') DEFAULT NULL,
    listing_order BIGINT DEFAULT 99999,
    established VARCHAR(150) DEFAULT NULL,
    meta_title VARCHAR(150) DEFAULT NULL,
    meta_description VARCHAR(200) DEFAULT NULL,
    meta_keyword VARCHAR(300) DEFAULT NULL,
    campus_size VARCHAR(150) DEFAULT NULL,
    address VARCHAR(150) DEFAULT NULL,
    map VARCHAR(200) DEFAULT NULL,
    icon VARCHAR(150) DEFAULT NULL,
    logo VARCHAR(150) DEFAULT NULL,
    video_url VARCHAR(150) DEFAULT NULL,
    avg_rating FLOAT DEFAULT NULL,
    about LONGTEXT DEFAULT NULL,
    scholarship LONGTEXT DEFAULT NULL,
    exam_data LONGTEXT DEFAULT NULL,
    why_choose LONGTEXT DEFAULT NULL,
    career_opportunities LONGTEXT DEFAULT NULL,
    placements LONGTEXT DEFAULT NULL,
    undergraduate LONGTEXT DEFAULT NULL,
    postgraduate LONGTEXT DEFAULT NULL,
    doctorate LONGTEXT DEFAULT NULL,
    diploma LONGTEXT DEFAULT NULL,
    admissions LONGTEXT DEFAULT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);





CREATE TABLE college_streams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stream_id INT,
    college_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (stream_id) REFERENCES streams(id),
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `amenities` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `amenities_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amenities_slug` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amenities_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `amenities_amenities_slug_unique` (`amenities_slug`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;