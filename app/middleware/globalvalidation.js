const { body, validationResult } = require("express-validator");

const db = require("../models");
const countries = db.countries;
const state = db.state;
const city = db.city;
const Amenities = db.amenities;
const schoolboards = db.schoolboards;
const school = db.school;
const stream = db.stream;
const substream = db.sub_stream;
const pages = db.page;
const banner = db.banner;

const accreditation = db.accreditation;



const area = db.area;


const enquiry = db.enquiry;
const management = db.management;
const generalcourse = db.generalcourse;
const author = db.author;
const categories = db.categories;
const blog = db.blog;
const review = db.review;
const Op = db.Sequelize.Op;
const affilition = db.affilition;
const recognition = db.recognition;
const CollegeAndUniversity = db.CollegeAndUniversity;
const companies = db.companies;
const schooltype = db.schooltype;
const schoollevel = db.schoollevel;

const polytechnic = db.polytechnic;
const polytechnictype = db.polytechnictype;
const user = db.user;
const reviewtokens = db.resettokens;
const groups = db.groups;
const testimonial = db.testimonial;
const videotestimonial = db.videotestimonial;
const team = db.team;
const studentform = db.studentform;
const jobvaccancies = db.jobvaccancies;
const redirecturl = db.redirecturl;
const promopage = db.promopage;
const newsandevents = db.newsandevents;

const upcoming_courses = db.upcoming_courses;
const eligibilities = db.eligibilities;
const salary = db.salary;
const fee = db.fees;
const gallery = db.gallery;
const job = db.job;
const abouts = db.abouts;
const services = db.services;
const exam = db.exam;
const scholarships = db.scholarships;
const abroadcountries = db.abroadcountries;
const abroad_universities = db.abroad_universities;
const youtubevideos = db.youtubevideos;


Validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 0,
      message: "failure",
      errors: errors.array(),
    });
  }
  next();
};

function checkField(fieldName, maxLength, model, requireUnique = false) {
  let validationChain = [];

  // Check if field exists and its length
  validationChain.push(
    body(fieldName)
      .exists({ checkFalsy: true })
      .withMessage(`${fieldName} is required`)
      .isLength({ max: maxLength })
      .withMessage(`${fieldName} should be less than ${maxLength} characters`)
  );

  // If uniqueness check is required, add custom validation
  if (requireUnique) {
    validationChain.push(
      body(fieldName)
        .custom((value) => {
          return model
            .findOne({
              where: {
                [fieldName]: value,
              },
            })
            .then((result) => {
              if (result) {
                return Promise.reject(`${fieldName} already in use`);
              } else {
                return true;
              }
            });
        })
    );
  }

  return validationChain;
}
function checkField_update(fieldName, maxLength, model, requireUnique = false, id) {
  let validationChain = [];

  // Check if field exists and its length
  validationChain.push(
    body(fieldName)
      .exists({ checkFalsy: true })
      .withMessage(`${fieldName} is required`)
      .isLength({ max: maxLength })
      .withMessage(`${fieldName} should be less than ${maxLength} characters`)
  );

  // If uniqueness check is required, add custom validation
  if (requireUnique) {
    validationChain.push(
      body(fieldName)
        .custom((value) => {
          console.log(value);
          return model
            .findOne({
              where: {
                [fieldName]: {
                  [Op.eq]: value,
                },
                id: {
                  [Op.not]: [id],
                },
              },

            })
            .then((result) => {
              if (result) {
                return Promise.reject(`${fieldName} already in use`);
              } else {
                return true;
              }
            });
        })
    );
  }

  return validationChain;
}
const validateIdRequired_id = (modelName, fieldName) => [
  body(fieldName)
    .exists({ checkFalsy: true })
    .withMessage(`${fieldName} is required`)
    .custom(async (value) => {
      const modelData = await modelName.findByPk(value);
      if (!modelData) {
        throw new Error(`${fieldName} does not exist`);
      }
    }),
];



const Test = [
  body("userName")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string"),
];

const countrySchema = [
  checkField('name', 150, countries, true),
];

const countriesUpdateSchema = [
  ...validateIdRequired_id(countries, "id"),
  checkField_update('name', 150, countries, true, "id"),

];

const stateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("state name is required")
    .isLength({ max: 150 })
    .withMessage("state name should be less than 150 character"),
  ...validateIdRequired_id(countries, "country_id"),

];

const updatestateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("state name is required")
    .isLength({ max: 150 })
    .withMessage("state name should be less than 150 character"),

  ...validateIdRequired_id(state, "id"),
  ...validateIdRequired_id(countries, "id"),


];

const citySchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("city name is required")
    .isLength({ max: 150 })
    .withMessage("city name should be less than 150 character"),

  body("state_id")
    .exists({ checkFalsy: true })
    .withMessage("state id  is required")
];

const cityUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("city name is required")
    .isLength({ max: 150 })
    .withMessage("city name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return city
        .findOne({
          where: {
            id: value,
          },
        })
        .then((city) => {
          if (city) {
            return true;
          } else {
            return Promise.reject("city Does not exist");
          }
        });
    }),

  body("state_id")
    .exists({ checkFalsy: true })
    .withMessage(`state id is required`)
    .custom(async (value) => {
      const cities = await city.findByPk(value);
      if (!cities) {
        throw new Error(`state id does not exist`);
      }
    }),
];

const AmenitiesSchema = [
  body("amenities_name")
    .exists({ checkFalsy: true })
    .withMessage("Amenties name is required")
    .isLength({ max: 150 })
    .withMessage("Amenties name should be less than 150 character"),

  body("amenities_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return Amenities.findOne({
        where: {
          amenities_slug: value,
        },
      }).then((Amenities) => {
        if (Amenities) {
          return Promise.reject("Slug already in use");
        } else {
          // Indicates the success of this synchronous custom validator
          return true;
        }
      });
    }),
];
const AmenitiesSchemaUpdate = [
  body("amenities_name")
    .exists({ checkFalsy: true })
    .withMessage("Amenities name is required")
    .isLength({ max: 150 })
    .withMessage("Amenities name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return Amenities.findOne({
        where: {
          id: value,
        },
      }).then((Amenities) => {
        if (Amenities) {
          return true;
        } else {
          // Indicates the success of this synchronous custom validator
          return Promise.reject("Stream Does not exist");
        }
      });
    }),

  body("amenities_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return Amenities.findOne({
        where: {
          amenities_slug: {
            [Op.eq]: value,
          },
          id: {
            [Op.not]: [req.body.id],
          },
        },
      }).then((Amenities) => {
        if (Amenities) {
          return Promise.reject("Slug already in use");
        } else {
          // Indicates the success of this synchronous custom validator
          return true;
        }
      });
    }),
];

const schoolboardSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .isLength({ max: 150 })
    .withMessage("title  name should be less than 150 character"),
  // body("status").exists({ checkFalsy: true }).withMessage("status is required"),

  // body("area_id")
  //   .exists({ checkFalsy: true })
  //   .withMessage("area Id is required")
  //   .custom((value) => {
  //     return area
  //       .findOne({
  //         where: {
  //           id: value,
  //         },
  //       })
  //       .then((area) => {
  //         if (area) {
  //           return true;
  //         } else {
  //           // Indicates the success of this synchronous custom validator
  //           return Promise.reject("area Id Not exist");
  //         }
  //       });
  //   }),

  // body("city_id")
  //   .exists({ checkFalsy: true })
  //   .withMessage("city Id is required")
  //   .custom((value) => {
  //     return city
  //       .findOne({
  //         where: {
  //           id: value,
  //         },
  //       })
  //       .then((city) => {
  //         if (city) {
  //           return true;
  //         } else {
  //           // Indicates the success of this synchronous custom validator
  //           return Promise.reject("city Id Not exist");
  //         }
  //       });
  //   }),
  // body("slug")
  //   .exists({ checkFalsy: true })
  //   .withMessage("Slug is required")
  //   .isLength({ max: 150 })
  //   .withMessage("Slug should be less than 150 character")
  //   .custom((value) => {
  //     return schoolboards
  //       .findOne({
  //         where: {
  //           slug: value,
  //         },
  //       })
  //       .then((schoolboards) => {
  //         if (schoolboards) {
  //           return Promise.reject("Slug already in use");
  //         } else {
  //           // Indicates the success of this synchronous custom validator
  //           return true;
  //         }
  //       });
  //   }),
];

const schoolboardUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .isLength({ max: 150 })
    .withMessage("title  name should be less than 150 character"),
  // body("status").exists({ checkFalsy: true }).withMessage("status is required"),

  // body("area_id")
  //   .exists({ checkFalsy: true })
  //   .withMessage("area Id is required")
  //   .custom((value) => {
  //     return area
  //       .findOne({
  //         where: {
  //           id: value,
  //         },
  //       })
  //       .then((area) => {
  //         if (area) {
  //           return true;
  //         } else {
  //           // Indicates the success of this synchronous custom validator
  //           return Promise.reject("area Id Not exist");
  //         }
  //       });
  //   }),

  // body("city_id")
  //   .exists({ checkFalsy: true })
  //   .withMessage("city Id is required")
  //   .custom((value) => {
  //     return city
  //       .findOne({
  //         where: {
  //           id: value,
  //         },
  //       })
  //       .then((city) => {
  //         if (city) {
  //           return true;
  //         } else {
  //           // Indicates the success of this synchronous custom validator
  //           return Promise.reject("city Id Not exist");
  //         }
  //       });
  //   }),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return schoolboards
        .findOne({
          where: {
            id: value,
          },
        })
        .then((schoolboards) => {
          if (schoolboards) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("schoolboards Does not exist");
          }
        });
    }),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("slug is required")
    .isLength({ max: 150 })
    .withMessage("slug should be less than 150 character")
    .custom((value, { req }) => {
      return schoolboards
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((schoolboards) => {
          if (schoolboards) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const schoolSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("School  name is required")
    .isLength({ max: 150 })
    .withMessage("School  name should be less than 150 character"),

    checkField('name', 150, school, true),

    body("school_board_id")
    .exists({ checkFalsy: true })
    .withMessage("school board id  is required"),

  body("country_id")
    .exists({ checkFalsy: true })
    .withMessage("country id  is required"),
  
    body("state_id")
    .exists({ checkFalsy: true })
    .withMessage("state id  is required"),

    body("city_id")
    .exists({ checkFalsy: true })
    .withMessage("city id  is required")


];

const schoolUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("School  name is required")
    .isLength({ max: 150 })
    .withMessage("School  name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return school
        .findOne({
          where: {
            id: value,
          },
        })
        .then((school) => {
          if (school) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("school Does not exist");
          }
        });
    }),

  
];

const StreamSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Stream name is required")
    .isLength({ max: 150 })
    .withMessage("Stream name should be less than 150 character"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return stream
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((stream) => {
          if (stream) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  // body("listing_order")
  // .exists({ checkFalsy: true })
  // .withMessage("listing_order is required")
  // .isLength({ max: 150 })
  // .withMessage("listing_order should be less than 150 character")
  // .custom((value, { req }) => {
  //   if (value == null || value == "" || value == "null") {
  //     return true;
  //   }

  //   return stream
  //     .findOne({
  //       where: {
  //         listing_order: value,
  //       },
  //     })
  //     .then((stream) => {
  //       if (stream) {
  //         console.log("21");
  //         return Promise.reject("listing_order already in use");
  //       } else {
  //         // Indicates the success of this synchronous custom validator
  //         return true;
  //       }
  //     });
  // }),

  // body("home_view_status")
  //   .exists({ checkFalsy: true })
  //   .withMessage("home view status is required"),

  // body("promo_banner_status")
  //   .exists({ checkFalsy: true })
  //   .withMessage("promo_banner_status  is required"),
];

const StreamSchemaUpdate = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Stream name is required")
    .isLength({ max: 150 })
    .withMessage("Stream name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return stream
        .findOne({
          where: {
            id: value,
          },
        })
        .then((stream) => {
          if (stream) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Stream Does not exist");
          }
        });
    }),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return stream
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((stream) => {
          if (stream) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  //   body("listing_order").custom((value, { req }) => {
  //     if (value == null || value == "" || value == "null") {
  //       return true;
  //     }
  //     return stream
  //       .findOne({
  //         where: {
  //           listing_order: {
  //             [Op.eq]: value,
  //           },
  //           id: {
  //             [Op.not]: [req.body.id],
  //           },
  //         },
  //       })
  //       .then((stream) => {
  //         if (stream) {
  //           return Promise.reject("listing_order already in use");
  //         } else {
  //           // Indicates the success of this synchronous custom validator
  //           return true;
  //         }
  //       });
  //   }),
  //   body("home_view_status")
  //     .exists({ checkFalsy: true })
  //     .withMessage("home view status is required"),
  //   body("promo_banner_status")
  //     .exists({ checkFalsy: true })
  //     .withMessage("promo_banner_status  is required"),
];

const SubStreamSchema = [
  body("sub_stream_name")
    .exists({ checkFalsy: true })
    .withMessage("Sub Stream name is required")
    .isLength({ max: 150 })
    .withMessage("Sub Stream name should be less than 150 character"),

  body("sub_stream_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return substream
        .findOne({
          where: {
            sub_stream_slug: value,
          },
        })
        .then((substream) => {
          if (substream) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("stream_id")
    .exists({ checkFalsy: true })
    .withMessage("Stream Id is required")
    .custom((value) => {
      return stream
        .findOne({
          where: {
            id: value,
          },
        })
        .then((stream) => {
          if (stream) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Stream Id Not exist");
          }
        });
    }),
];

const SubStreamSchemaUpdate = [
  body("sub_stream_name")
    .exists({ checkFalsy: true })
    .withMessage("Sub Stream name is required")
    .isLength({ max: 150 })
    .withMessage("Stream name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return substream
        .findOne({
          where: {
            id: value,
          },
        })
        .then((substream) => {
          if (substream) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Sub Stream Does not exist");
          }
        });
    }),

  body("sub_stream_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return substream
        .findOne({
          where: {
            sub_stream_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((substream) => {
          if (substream) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("stream_id")
    .exists({ checkFalsy: true })
    .withMessage("Stream Id is required")
    .custom((value) => {
      return stream
        .findOne({
          where: {
            id: value,
          },
        })
        .then((stream) => {
          if (stream) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Stream Id Not exist");
          }
        });
    }),
];

const AccreditationsSchema = [
  body("accreditation_name")
    .exists({ checkFalsy: true })
    .withMessage("Accreditations name is required")
    .isLength({ max: 150 })
    .withMessage("Accreditations name should be less than 150 character"),

  body("keywords")
    .exists({ checkFalsy: true })
    .withMessage("keywords name is required")
    .isLength({ max: 150 })
    .withMessage("keywords name should be less than 150 character"),

  body("accreditation_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return accreditation
        .findOne({
          where: {
            accreditation_slug: value,
          },
        })
        .then((accreditation) => {
          if (accreditation) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];






const AccreditationsSchemaUpdate = [
  body("accreditation_name")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  body("keywords")
    .exists({ checkFalsy: true })
    .withMessage("keywords name is required")
    .isLength({ max: 150 })
    .withMessage("keywords name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return accreditation
        .findOne({
          where: {
            id: value,
          },
        })
        .then((accreditation) => {
          if (accreditation) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Stream Does not exist");
          }
        });
    }),
  body("accreditation_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return accreditation
        .findOne({
          where: {
            accreditation_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((accreditation) => {
          if (accreditation) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];









const PageSchema = [
  body("url")
    .exists({ checkFalsy: true })
    .withMessage("url is required")
    .isURL()
    .withMessage("Invalid URL")
    .custom((value) => {
      return pages
        .findOne({
          where: {
            url: value,
          },
        })
        .then((pages) => {
          if (pages) {
            return Promise.reject("URL already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  // body("meta_title").exists({ checkFalsy: true }).withMessage("meta title is required"),

  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("Meta Title is required")
    .isLength({ max: 200 })
    .withMessage("Meta Title should be less than 200 character"),
  body("meta_keyword")
    .exists({ checkFalsy: true })
    .withMessage("Meta keyword is required")
    .isLength({ max: 200 })
    .withMessage("Meta keyword should be less than 200 character"),

  body("meta_description")
    .optional({ nullable: true })
    .isLength({ max: 200 })
    .withMessage("Meta Description should be less than 200 character"),
];

const PageUpdateSchema = [
  body("url")
    .exists({ checkFalsy: true })
    .withMessage("url is required")
    .isURL()
    .withMessage("Invalid URL")
    .custom((value, { req }) => {
      return pages
        .findOne({
          where: {
            url: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((pages) => {
          if (pages) {
            return Promise.reject("URL already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  // body("title").exists({ checkFalsy: true }).withMessage("title is required"),

  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("Meta Title is required")
    .isLength({ max: 200 })
    .withMessage("Meta Title should be less than 200 character"),
  body("meta_keyword")
    .exists({ checkFalsy: true })
    .withMessage("meta keyword is required")
    .isLength({ max: 200 })
    .withMessage("Meta keyword should be less than 200 character"),

  body("meta_description")
    .optional({ nullable: true })
    .isLength({ max: 200 })
    .withMessage("Meta Description should be less than 200 character"),
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return pages
        .findOne({
          where: {
            id: value,
          },
        })
        .then((pages) => {
          if (pages) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Page Does not exist");
          }
        });
    }),
];



const areaSchema = [
  body("area_name")
    .exists({ checkFalsy: true })
    .withMessage("area name is required")
    .isLength({ max: 150 })
    .withMessage("area name should be less than 150 character"),

  body("area_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return area
        .findOne({
          where: {
            area_slug: value,
          },
        })
        .then((area) => {
          if (area) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];
const abroaduniversitiesSchema = [
  body("university_name")
    .exists({ checkFalsy: true })
    .withMessage("university name is required")
    .isLength({ max: 150 })
    .withMessage("university should be less than 150 character"),

  body("country_id")
    .exists({ checkFalsy: true })
    .withMessage("country Id is required")
    .custom((value) => {
      return abroadcountries
        .findOne({
          where: {
            id: value,
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("country Id Not exist");
          }
        });
    }),
];

const abroaduniversitiesUpdateSchema = [
  body("university_name")
    .exists({ checkFalsy: true })
    .withMessage("universite name is required")
    .isLength({ max: 150 })
    .withMessage("university name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return abroad_universities
        .findOne({
          where: {
            id: value,
          },
        })
        .then((abroad_universities) => {
          if (abroad_universities) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("university Does not exist");
          }
        });
    }),
  body("country_id")
    .exists({ checkFalsy: true })
    .withMessage("country Id is required")
    .custom((value) => {
      return abroadcountries
        .findOne({
          where: {
            id: value,
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("country Id Not exist");
          }
        });
    }),
];



const areaUpdateSchema = [
  body("area_name")
    .exists({ checkFalsy: true })
    .withMessage("area name is required")
    .isLength({ max: 150 })
    .withMessage("area name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return area
        .findOne({
          where: {
            id: value,
          },
        })
        .then((area) => {
          if (area) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Stream Does not exist");
          }
        });
    }),

  body("area_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return area
        .findOne({
          where: {
            area_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((area) => {
          if (area) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const bannerUpdateSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("title is required")
    .isLength({ max: 150 })
    .withMessage("title should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return banner
        .findOne({
          where: {
            id: value,
          },
        })
        .then((banner) => {
          if (banner) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("banner id Does not exist");
          }
        });
    }),

  body("link")
    .exists({ checkFalsy: true })
    .withMessage("link is required")
    .isLength({ max: 150 })
    .withMessage("link should be less than 150 character"),
];

const bannerSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("title is required")
    .isLength({ max: 150 })
    .withMessage("title should be less than 150 character"),

  body("status")
    .exists({ checkFalsy: true })
    .withMessage("status is required")
    .isLength({ max: 150 })
    .withMessage("status should be less than 150 character"),

  body("link")
    .exists({ checkFalsy: true })
    .withMessage("link is required")
    .isLength({ max: 150 })
    .withMessage("link should be less than 150 character"),
];

const managementUpdateSchema = [
  body("management_name")
    .exists({ checkFalsy: true })
    .withMessage("management_nameis required")
    .isLength({ max: 150 })
    .withMessage("management_name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return management
        .findOne({
          where: {
            id: value,
          },
        })
        .then((management) => {
          if (management) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("management Does not exist");
          }
        });
    }),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return management
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((management) => {
          if (management) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const managementSchema = [
  body("management_name")
    .exists({ checkFalsy: true })
    .withMessage("management_name is  required")
    .isLength({ max: 150 })
    .withMessage("title should be less than 150 character"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return management
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((management) => {
          if (management) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const enquiryUpdateSchema = [
  body("id").exists({ checkFalsy: true }).withMessage("id name is required"),

  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .isLength({ max: 150 })
    .withMessage("name should be less than 150 character"),

  body("mobile_verified")
    .exists({ checkFalsy: true })
    .withMessage(
      "mobile_verified either 0 for not verified, 1 for verified, 2 for block is required"
    )
    .isLength({ max: 150 })
    .withMessage("mobile_verified  should be less than 150 character"),

  body("current_url")
    .exists({ checkFalsy: true })
    .withMessage("url is required")
    .isLength({ max: 150 })
    .withMessage("url should be less than 150 character"),

  body("email").exists({ checkFalsy: true }).withMessage("email is required"),

  body("contact")
    .exists({ checkFalsy: true })
    .withMessage("contact is required"),

  body("gender").exists({ checkFalsy: true }).withMessage("gender is required"),

  body("current_qualification")
    .exists({ checkFalsy: true })
    .withMessage("current_qualification is required"),

  body("course_in_mind")
    .exists({ checkFalsy: true })
    .withMessage("course_in_mind is required"),
];

const enquirySchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is  required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),

  body("current_url")
    .exists({ checkFalsy: true })
    .withMessage("url is required")
    .isLength({ max: 300 })
    .withMessage("url should be less than 300 character"),

  body("email").exists({ checkFalsy: true }).withMessage("Email is required"),

  body("contact")
    .exists({ checkFalsy: true })
    .withMessage("Phone Number is required"),

  // body("gender").exists({ checkFalsy: true }).withMessage("gender is required"),

  // body("current_qualification")
  //   .exists({ checkFalsy: true })
  //   .withMessage("current_qualification is required"),

  // body("course_in_mind")
  //   .exists({ checkFalsy: true })
  //   .withMessage("course_in_mind is required"),
];

const GeneralcoursesSchema = [
  body("course_stream_name")
    .exists({ checkFalsy: true })
    .withMessage("course Stream name is required")
    .isLength({ max: 150 })
    .withMessage("course Stream name should be less than 150 character"),

  body("course_stream_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return generalcourse
        .findOne({
          where: {
            course_stream_slug: value,
          },
        })
        .then((generalcourse) => {
          if (generalcourse) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("stream_id")
    .exists({ checkFalsy: true })
    .withMessage("Stream Id is required")
    .custom((value) => {
      return stream
        .findOne({
          where: {
            id: value,
          },
        })
        .then((stream) => {
          if (stream) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Stream Id Not exist");
          }
        });
    }),
  body("promo_banner_status")
    .exists({ checkFalsy: true })
    .withMessage("promo_banner_status  is required"),
];
const GeneralcoursesSchemaupdate = [
  body("course_stream_name")
    .exists({ checkFalsy: true })
    .withMessage("course Stream name is required")
    .isLength({ max: 150 })
    .withMessage("course name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return generalcourse
        .findOne({
          where: {
            id: value,
          },
        })
        .then((generalcourse) => {
          if (generalcourse) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("generalcourse Does not exist");
          }
        });
    }),

  body("course_stream_slug")
    .exists({ checkFalsy: true })
    .withMessage("course is required")
    .isLength({ max: 150 })
    .withMessage("course should be less than 150 character")
    .custom((value, { req }) => {
      return generalcourse
        .findOne({
          where: {
            course_stream_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((generalcourse) => {
          if (generalcourse) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("stream_id")
    .exists({ checkFalsy: true })
    .withMessage("Stream Id is required")
    .custom((value) => {
      return stream
        .findOne({
          where: {
            id: value,
          },
        })
        .then((stream) => {
          if (stream) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Stream Id Not exist");
          }
        });
    }),
  body("promo_banner_status")
    .exists({ checkFalsy: true })
    .withMessage("promo_banner_status  is required"),
];
const authorSchema = [
  body("author_name")
    .exists({ checkFalsy: true })
    .withMessage("author name name is required")
    .isLength({ max: 150 })
    .withMessage("author name should be less than 150 character"),
];

const authorUpdateSchema = [
  body("author_name")
    .exists({ checkFalsy: true })
    .withMessage("author name name is required")
    .isLength({ max: 150 })
    .withMessage("author name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return author
        .findOne({
          where: {
            id: value,
          },
        })
        .then((author) => {
          if (author) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Author Does not exist");
          }
        });
    }),
];

const abroadcountriesSchema = [
  body("country_name")
    .exists({ checkFalsy: true })
    .withMessage("country name is required")
    .isLength({ max: 150 })

    .withMessage("country name should be less than 150 character")
    .custom((value) => {
      return abroadcountries
        .findOne({
          where: {
            country_name: value,
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return Promise.reject("Country name already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const abroadcountriesUpdateSchema = [
  body("country_name")
    .exists({ checkFalsy: true })
    .withMessage("Country  name is required")
    .isLength({ max: 150 })
    .withMessage("Country name should be less than 150 character")
    .custom((value, { req }) => {
      return abroadcountries
        .findOne({
          where: {
            country_name: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return Promise.reject("country  name already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return abroadcountries
        .findOne({
          where: {
            id: value,
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Countries Does not exist");
          }
        });
    }),
];

const categoriesSchema = [
  body("category_name")
    .exists({ checkFalsy: true })
    .withMessage("category name is required")
    .isLength({ max: 150 })

    .withMessage("category name should be less than 150 character")
    .custom((value) => {
      return categories
        .findOne({
          where: {
            category_name: value,
          },
        })
        .then((categories) => {
          if (categories) {
            return Promise.reject("category name already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const categoriesUpdateSchema = [
  body("category_name")
    .exists({ checkFalsy: true })
    .withMessage("category  name is required")
    .isLength({ max: 150 })
    .withMessage("category name should be less than 150 character")
    .custom((value, { req }) => {
      return categories
        .findOne({
          where: {
            category_name: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((categories) => {
          if (categories) {
            return Promise.reject("category  name already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return categories
        .findOne({
          where: {
            id: value,
          },
        })
        .then((categories) => {
          if (categories) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("category Does not exist");
          }
        });
    }),
];

const blogSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("title Stream name is required")
    .isLength({ max: 150 })
    .withMessage("title  name should be less than 150 character"),

  body("body")
    .exists({ checkFalsy: true })
    .withMessage("body name is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("slug name is required")
    .isLength({ max: 150 })
    .withMessage("slug name should be less than 150 character")
    .custom((value) => {
      return blog
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((blog) => {
          if (blog) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("author_id")
    .exists({ checkFalsy: true })
    .withMessage("Author Id is required")
    .custom((value) => {
      return author
        .findOne({
          where: {
            id: value,
          },
        })
        .then((author) => {
          if (author) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Author Id Not exist");
          }
        });
    }),
  body("category_id")
    .exists({ checkFalsy: true })
    .withMessage("category Id is required")
    .custom((value) => {
      return categories
        .findOne({
          where: {
            id: value,
          },
        })
        .then((categories) => {
          if (categories) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("category Id Not exist");
          }
        });
    }),
  body("group_id")
    .exists({ checkFalsy: true })
    .withMessage("Group  Id is required")
    .custom((value) => {
      return groups
        .findOne({
          where: {
            id: value,
          },
        })
        .then((groups) => {
          if (groups) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Groups Id Not exist");
          }
        });
    }),
  body("promo_banner_status")
    .exists({ checkFalsy: true })
    .withMessage("promo_banner_status  is required"),
];
const blogUpdateSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("title Stream name is required")
    .isLength({ max: 150 })
    .withMessage("title  name should be less than 150 character"),

  body("body")
    .exists({ checkFalsy: true })
    .withMessage("body name is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("slug name is required")
    .isLength({ max: 150 })
    .withMessage("slug name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return blog
        .findOne({
          where: {
            id: value,
          },
        })
        .then((blog) => {
          if (blog) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("blog Does not exist");
          }
        });
    }),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("slug is required")
    .isLength({ max: 150 })
    .withMessage("slug should be less than 150 character")
    .custom((value, { req }) => {
      return blog
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((blog) => {
          if (blog) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("author_id")
    .exists({ checkFalsy: true })
    .withMessage("Author Id is required")
    .custom((value) => {
      return author
        .findOne({
          where: {
            id: value,
          },
        })
        .then((author) => {
          if (author) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Author Id Not exist");
          }
        });
    }),
  body("category_id")
    .exists({ checkFalsy: true })
    .withMessage("category Id is required")
    .custom((value) => {
      return categories
        .findOne({
          where: {
            id: value,
          },
        })
        .then((categories) => {
          if (categories) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("category Id Not exist");
          }
        });
    }),
  body("group_id")
    .exists({ checkFalsy: true })
    .withMessage("Group  Id is required")
    .custom((value) => {
      return groups
        .findOne({
          where: {
            id: value,
          },
        })
        .then((groups) => {
          if (groups) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Groups Id Not exist");
          }
        });
    }),
  body("promo_banner_status")
    .exists({ checkFalsy: true })
    .withMessage("promo_banner_status  is required"),
];

const scholarshipSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Scholarship  name is required")
    .isLength({ max: 150 })
    .withMessage("Scholarship  name should be less than 150 character"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("slug name is required")
    .isLength({ max: 150 })
    .withMessage("slug name should be less than 150 character")
    .custom((value) => {
      return scholarships
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((scholarships) => {
          if (scholarships) {
            return Promise.reject("Slug already in use");
          } else {
            return true;
          }
        });
    }),
];
const scholarshipUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Scholarship  name is required")
    .isLength({ max: 150 })
    .withMessage("Scholarship  name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return scholarships
        .findOne({
          where: {
            id: value,
          },
        })
        .then((scholarships) => {
          if (scholarships) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("scholarship Does not exist");
          }
        });
    }),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("slug is required")
    .isLength({ max: 150 })
    .withMessage("slug should be less than 150 character")
    .custom((value, { req }) => {
      return scholarships
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((scholarships) => {
          if (scholarships) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];


const polytechnicSchema = [
  body("polytechnic_name")
    .exists({ checkFalsy: true })
    .withMessage("polytechnic  name is required")
    .isLength({ max: 150 })
    .withMessage("polytechnic  name should be less than 150 character"),
  // body("genders_accepted")
  //   .exists({ checkFalsy: true })
  //   .withMessage("genders accepted is required"),
  body("polytechnic_slug")
    .exists({ checkFalsy: true })
    .withMessage("slug name is required")
    .isLength({ max: 150 })
    .withMessage("slug name should be less than 150 character")
    .custom((value) => {
      return polytechnic
        .findOne({
          where: {
            polytechnic_slug: value,
          },
        })
        .then((polytechnic) => {
          if (polytechnic) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("area_id")
    .exists({ checkFalsy: true })
    .withMessage("area Id is required")
    .custom((value) => {
      return area
        .findOne({
          where: {
            id: value,
          },
        })
        .then((area) => {
          if (area) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("area Id Not exist");
          }
        });
    }),

  body("city_id")
    .exists({ checkFalsy: true })
    .withMessage("city Id is required")
    .custom((value) => {
      return city
        .findOne({
          where: {
            id: value,
          },
        })
        .then((city) => {
          if (city) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("city Id Not exist");
          }
        });
    }),
  body("polytechnic_type_id")
    .exists({ checkFalsy: true })
    .withMessage("Polytechnic type is required")
    .custom((value) => {
      return polytechnictype
        .findOne({
          where: {
            id: value,
          },
        })
        .then((polytechnictype) => {
          if (polytechnictype) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Polytechnic type Not exist");
          }
        });
    }),
];
const polytechnicUpdateSchema = [
  body("polytechnic_name")
    .exists({ checkFalsy: true })
    .withMessage("polytechnic  name is required")
    .isLength({ max: 150 })
    .withMessage("polytechnic  name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return polytechnic
        .findOne({
          where: {
            id: value,
          },
        })
        .then((polytechnic) => {
          if (polytechnic) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("polytechnic Does not exist");
          }
        });
    }),

  body("polytechnic_slug")
    .exists({ checkFalsy: true })
    .withMessage("slug is required")
    .isLength({ max: 150 })
    .withMessage("slug should be less than 150 character")
    .custom((value, { req }) => {
      return polytechnic
        .findOne({
          where: {
            polytechnic_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((polytechnic) => {
          if (polytechnic) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("area_id")
    .exists({ checkFalsy: true })
    .withMessage("area Id is required")
    .custom((value) => {
      return area
        .findOne({
          where: {
            id: value,
          },
        })
        .then((area) => {
          if (area) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("area Id Not exist");
          }
        });
    }),

  body("city_id")
    .exists({ checkFalsy: true })
    .withMessage("city Id is required")
    .custom((value) => {
      return city
        .findOne({
          where: {
            id: value,
          },
        })
        .then((city) => {
          if (city) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("city Id Not exist");
          }
        });
    }),
  body("polytechnic_type_id")
    .exists({ checkFalsy: true })
    .withMessage("polytechnic type is required")
    .custom((value) => {
      return polytechnictype
        .findOne({
          where: {
            id: value,
          },
        })
        .then((polytechnictype) => {
          if (polytechnictype) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("School type  Not exist");
          }
        });
    }),
];

const reviewSchema = [
  body("userrating")
    .exists({ checkFalsy: true })
    .withMessage("userrating is required")
    .isFloat({ min: 0, max: 5 })
    .withMessage("userrating in between 0 to 5"),

  body("content")
    .exists({ checkFalsy: true })
    .withMessage("review  name is required"),

  body("type").exists({ checkFalsy: true }).withMessage("type  is required"),

  body("is_approved")
    .exists({ checkFalsy: true })
    .withMessage("is_approved  is required"),

  body("user_id")
    .exists({ checkFalsy: true })
    .withMessage("User Id is required")
    .custom((value) => {
      return user
        .findOne({
          where: {
            id: value,
          },
        })
        .then((user) => {
          if (user) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("User Id Not exist");
          }
        });
    }),

  body("item_id")
    .exists({ checkFalsy: true })
    .withMessage("CollegeAndUniversity Id is required")
    .custom((value) => {
      return CollegeAndUniversity.findOne({
        where: {
          id: value,
        },
      }).then((CollegeAndUniversity) => {
        if (CollegeAndUniversity) {
          return true;
        } else {
          // Indicates the success of this synchronous custom validator
          return Promise.reject("CollegeAndUniversity Id Not exist");
        }
      });
    }),
];
const reviewUpdateSchema = [
  // body("userrating")
  //   .exists({ checkFalsy: true })
  //   .withMessage("userrating is required")
  //   .isFloat({ min: 0, max: 5 })
  //   .withMessage("userrating in between 0 to 5"),

  // body("content")
  //   .exists({ checkFalsy: true })
  //   .withMessage("content  is required"),

  // body("type").exists({ checkFalsy: true }).withMessage("type  is required"),

  // body("is_approved")
  //   .exists({ checkFalsy: true })
  //   .withMessage("is_approved  is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return review
        .findOne({
          where: {
            id: value,
          },
        })
        .then((review) => {
          if (review) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("review Does not exist");
          }
        });
    }),

  // body("user_id")
  //   .exists({ checkFalsy: true })
  //   .withMessage("User Id is required")
  //   .custom((value) => {
  //     return user
  //       .findOne({
  //         where: {
  //           id: value,
  //         },
  //       })
  //       .then((user) => {
  //         if (user) {
  //           return true;
  //         } else {
  //           // Indicates the success of this synchronous custom validator
  //           return Promise.reject("User Id Not exist");
  //         }
  //       });
  //   }),

  // body("item_id")
  //   .exists({ checkFalsy: true })
  //   .withMessage("item Id is required")
  //   .custom((value) => {
  //     return CollegeAndUniversity.findOne({
  //       where: {
  //         id: value,
  //       },
  //     }).then((CollegeAndUniversity) => {
  //       if (CollegeAndUniversity) {
  //         return true;
  //       } else {
  //         // Indicates the success of this synchronous custom validator
  //         return Promise.reject("CollegeAndUniversity Id Not exist");
  //       }
  //     });
  //   }),
];

const reviewchangestatusSchema = [
  // body("id")
  // .exists({ checkFalsy: true })
  // .withMessage("ID  is required"),

  body("is_approved")
    .exists({ checkFalsy: true })
    .withMessage("is_approved  is required"),

  body("ids")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return review
        .count({
          where: {
            id: JSON.parse(value),
          },
        })
        .then((count) => {
          if (count != JSON.parse(value).length) {
            return Promise.reject("id not exists type Not exist");
          }
          return true;
        });
    }),
];

const affilitionSchema = [
  body("other_affiliations_name")
    .exists({ checkFalsy: true })
    .withMessage("affilation name is required")
    .isLength({ max: 150 })
    .withMessage("affilationname should be less than 150 character"),

  body("other_affiliations_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return affilition
        .findOne({
          where: {
            other_affiliations_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((affilition) => {
          if (affilition) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const recognitionSchema = [
  body("recognition_approval_name")
    .exists({ checkFalsy: true })
    .withMessage(" name is required")
    .isLength({ max: 150 })
    .withMessage("name should be less than 150 character"),

  body("recognition_approval_full_name")
    .exists({ checkFalsy: true })
    .withMessage("full name is required"),

  body("recognition_approval_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return recognition
        .findOne({
          where: {
            recognition_approval_slug: value,
          },
        })
        .then((recognition) => {
          if (recognition) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("keywords")
    .exists({ checkFalsy: true })
    .withMessage("Keywors is required")
    .isLength({ max: 150 })
    .withMessage("keywords should be less than 150 character"),
];

const affilitionUpdateSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return affilition
        .findOne({
          where: {
            id: value,
          },
        })
        .then((affilition) => {
          if (affilition) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("affilition Does not exist");
          }
        });
    }),

  body("other_affiliations_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return affilition
        .findOne({
          where: {
            other_affiliations_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((affilition) => {
          if (affilition) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const recognitionUpdateSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return recognition
        .findOne({
          where: {
            id: value,
          },
        })
        .then((recognition) => {
          if (recognition) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("recognition Does not exist");
          }
        });
    }),

  body("recognition_approval_full_name")
    .exists({ checkFalsy: true })
    .withMessage("full name is required"),

  body("recognition_approval_name")
    .exists({ checkFalsy: true })
    .withMessage("name is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  body("recognition_approval_slug")
    .exists({ checkFalsy: true })
    .withMessage("slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return recognition
        .findOne({
          where: {
            recognition_approval_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((recognition) => {
          if (recognition) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("keywords")
    .exists({ checkFalsy: true })
    .withMessage("keywords is required")
    .isLength({ max: 150 })
    .withMessage("keywords should be less than 150 character"),
];

const CollegeAndUniversitySchema = [
  body("established")
    .exists({ checkFalsy: false })
    .isLength({ max: 150 })
    .withMessage("established should be less than 150 character"),

  body("type").exists({ checkFalsy: true }).withMessage(" type is required"),

  body("name").exists({ checkFalsy: true }).withMessage(" name is required"),

  body("city_id").exists({ checkFalsy: true }).withMessage(" city is required"),

  body("area_id").exists({ checkFalsy: true }).withMessage(" area is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return CollegeAndUniversity.findOne({
        where: {
          slug: value,
        },
      }).then((CollegeAndUniversity) => {
        if (CollegeAndUniversity) {
          return Promise.reject("Slug already in use");
        } else {
          // Indicates the success of this synchronous custom validator
          return true;
        }
      });
    }),

  body("listing_order")
    .exists({ checkFalsy: true })
    .withMessage("listing_orderis required")
    .isLength({ max: 150 })
    .withMessage("listing_order should be less than 150 character")
    .custom((value, { req }) => {
      return CollegeAndUniversity.findOne({
        where: {
          listing_order: value,
          type: [req.body.type],
        },
      }).then((CollegeAndUniversity) => {
        if (CollegeAndUniversity) {
          return Promise.reject("listing_order already in use");
        } else {
          // Indicates the success of this synchronous custom validator
          return true;
        }
      });
    }),

  body("keywords")
    .exists({ checkFalsy: false })
    .isLength({ max: 512 })
    .withMessage("keyword should be less than 512 character"),

  body("meta_title")
    .exists({ checkFalsy: false })
    .isLength({ max: 200 })
    .withMessage("meta title should be less than 200 character"),

  body("meta_description")
    .exists({ checkFalsy: false })
    .isLength({ max: 200 })
    .withMessage("meta description should be less than 200 character"),

  body("meta_keyword")
    .exists({ checkFalsy: false })
    .isLength({ max: 300 })
    .withMessage("meta keyword should be less than 300 character"),

  body("facts")
    .exists({ checkFalsy: false })
    .isLength({ max: 150 })
    .withMessage("mfacts should be less than 150 character"),

  body("college_type")
    .exists({ checkFalsy: true })
    .withMessage(" college type is required"),

  body("genders_accepted")
    .exists({ checkFalsy: true })
    .withMessage("genders accepted is required"),

  body("address")
    .exists({ checkFalsy: false })
    .isLength({ max: 200 })
    .withMessage("address should be less than 200 character"),

  body("home_view_status")
    .exists({ checkFalsy: true })
    .withMessage("home view status is required"),

  body("status").exists({ checkFalsy: true }).withMessage("status is required"),
];

const CollegeAndUniversityUpdateSchema = [
  body("established")
    .exists({ checkFalsy: false })
    .isLength({ max: 150 })
    .withMessage("established should be less than 150 character"),

  body("type").exists({ checkFalsy: true }).withMessage(" type is required"),

  body("name").exists({ checkFalsy: true }).withMessage(" name is required"),

  body("city_id").exists({ checkFalsy: true }).withMessage(" city is required"),

  body("area_id").exists({ checkFalsy: true }).withMessage(" area is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return CollegeAndUniversity.findOne({
        where: {
          slug: {
            [Op.eq]: value,
          },
          id: {
            [Op.not]: [req.body.id],
          },
        },
      }).then((CollegeAndUniversity) => {
        if (CollegeAndUniversity) {
          return Promise.reject("Slug already in use");
        } else {
          // Indicates the success of this synchronous custom validator
          return true;
        }
      });
    }),
  body("listing_order")
    .exists({ checkFalsy: true })
    .withMessage("listing_order is required")
    .isLength({ max: 150 })
    .withMessage("listing_order should be less than 150 character")
    .custom((value, { req }) => {
      return CollegeAndUniversity.findOne({
        where: {
          listing_order: {
            [Op.eq]: value,
          },
          id: {
            [Op.not]: [req.body.id],
          },
          type: {
            [Op.eq]: [req.body.type],
          },
        },
      }).then((CollegeAndUniversity) => {
        if (CollegeAndUniversity) {
          return Promise.reject("listing_order already in use");
        } else {
          // Indicates the success of this synchronous custom validator
          return true;
        }
      });
    }),

  body("keywords")
    .exists({ checkFalsy: false })
    .isLength({ max: 512 })
    .withMessage("keyword should be less than 512 character"),

  body("meta_title")
    .exists({ checkFalsy: false })
    .isLength({ max: 200 })
    .withMessage("meta title should be less than 200 character"),

  body("meta_description")
    .exists({ checkFalsy: false })
    .isLength({ max: 200 })
    .withMessage("meta description should be less than 200 character"),

  body("meta_keyword")
    .exists({ checkFalsy: false })
    .isLength({ max: 300 })
    .withMessage("meta keyword should be less than 300 character"),

  body("facts")
    .exists({ checkFalsy: false })
    .isLength({ max: 150 })
    .withMessage("mfacts should be less than 150 character"),

  body("college_type")
    .exists({ checkFalsy: true })
    .withMessage(" college type is required"),

  body("genders_accepted")
    .exists({ checkFalsy: true })
    .withMessage(" genders accepted is required"),

  body("address")
    .exists({ checkFalsy: false })
    .isLength({ max: 200 })
    .withMessage("address should be less than 200 character"),

  body("home_view_status")
    .exists({ checkFalsy: true })
    .withMessage("home view status is required"),

  body("status").exists({ checkFalsy: true }).withMessage("status is required"),
];

const CompanyUpdateSchema = [
  body("id").exists({ checkFalsy: true }).withMessage("id is required"),
  body("companies_name")
    .exists({ checkFalsy: true })
    .withMessage("companies_name is required")
    .isLength({ max: 150 })
    .withMessage("companies_name should be less than 150 character"),

  body("companies_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return companies
        .findOne({
          where: {
            companies_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((companies) => {
          if (companies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const CompanySchema = [
  body("companies_name")
    .exists({ checkFalsy: true })
    .withMessage("companies_name is required")
    .isLength({ max: 150 })
    .withMessage("companies_name should be less than 150 character"),

  body("companies_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return companies
        .findOne({
          where: {
            companies_slug: value,
          },
        })
        .then((companies) => {
          if (companies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];
const upcoming_coursesSchema = [
  body("course_name")
    .exists({ checkFalsy: true })
    .withMessage("course_name is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return upcoming_courses
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((upcoming_courses) => {
          if (upcoming_courses) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];
const upcoming_coursesUpdateSchema = [
  body("course_name")
    .exists({ checkFalsy: true })
    .withMessage("course_name is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return upcoming_courses
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((upcoming_courses) => {
          if (upcoming_courses) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const coursesSchema = [
  body("college_id")
    .exists({ checkFalsy: true })
    .withMessage("college_id is required"),

  body("medium_id")
    .exists({ checkFalsy: true })
    .withMessage("medium_id is required"),

  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("course_id is required"),

  body("course_mode")
    .exists({ checkFalsy: true })
    .withMessage("course_mode is required"),

  body("course_details_structure")
    .exists({ checkFalsy: true })
    .withMessage("course_details_structure is required"),
];
const coursesUpdateSchema = [
  body("id").exists({ checkFalsy: true }).withMessage("id is required"),

  body("college_id")
    .exists({ checkFalsy: true })
    .withMessage("college_id is required"),

  body("medium_id")
    .exists({ checkFalsy: true })
    .withMessage("medium_id is required"),

  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("course_id is required"),

  body("course_mode")
    .exists({ checkFalsy: true })
    .withMessage("course_mode is required"),

  body("course_details_structure")
    .exists({ checkFalsy: true })
    .withMessage("course_details_structureis required"),
];

const eligibilitySchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];
const eligibilityUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];

const salarySchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];
const salaryUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];

const feeSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),

  body("type").exists({ checkFalsy: true }).withMessage("type is required"),

  body("title").exists({ checkFalsy: true }).withMessage("title is required"),

  body("note").exists({ checkFalsy: true }).withMessage("note is required"),

  body("total_amount")
    .exists({ checkFalsy: true })
    .withMessage("total amount is required"),
];
const feeUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),

  body("type").exists({ checkFalsy: true }).withMessage("type is required"),

  body("title").exists({ checkFalsy: true }).withMessage("title is required"),

  body("note").exists({ checkFalsy: true }).withMessage("note is required"),

  body("total_amount")
    .exists({ checkFalsy: true })
    .withMessage("total amount is required"),
];

const gallerySchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];
const galleryUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];

const jobSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];
const jobUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return companies
        .findOne({
          where: {
            companies_slug: value,
          },
        })
        .then((companies) => {
          if (companies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const userSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Name must be at least 20 characters."),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter valid email address."),

  body("mobile").notEmpty().withMessage("mobile cannot be empty."),

  body("password").isLength({
    min: 6,
  }),

  body("confirmpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
];
const userforgotpassword = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .custom((value) => {
      return user
        .findOne({
          where: {
            email: value,
          },
        })
        .then((user) => {
          if (user) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Email Does not exist");
          }
        });
    }),
];

const userforgotpasswordnew = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .custom((value) => {
      return reviewtokens
        .findOne({
          where: {
            email: value,
          },
        })
        .then((reviewtokens) => {
          if (reviewtokens) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Email Does not exist");
          }
        });
    }),
  body("token")
    .exists({ checkFalsy: true })
    .withMessage("token is required")
    .custom((value) => {
      return reviewtokens
        .findOne({
          where: {
            token: value,
          },
        })
        .then((reviewtokens) => {
          if (reviewtokens) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("token Does not exist");
          }
        });
    }),
  body("password").isLength({
    min: 6,
  }),

  body("confirmpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
];

const groupsSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage(" title is required")
    .isLength({ max: 150 })
    .withMessage("title should be less than 150 character"),

  body("group")
    .exists({ checkFalsy: true })
    .withMessage("group name is required")
    .isLength({ max: 150 })
    .withMessage("group should be less than 150 character"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return groups
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((groups) => {
          if (groups) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage(" meta_title is required"),
];
const groupsUpdateSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage(" title is required")
    .isLength({ max: 150 })
    .withMessage("title should be less than 150 character"),

  body("group")
    .exists({ checkFalsy: true })
    .withMessage("group name is required")
    .isLength({ max: 150 })
    .withMessage("group should be less than 150 character"),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return groups
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((groups) => {
          if (groups) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return groups
        .findOne({
          where: {
            id: value,
          },
        })
        .then((groups) => {
          if (groups) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Group Does not exist");
          }
        });
    }),
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage(" meta_title is required"),
];

const TestimonialSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("description is required"),
  body("tag").exists({ checkFalsy: true }).withMessage("tag is required"),
];

const TestimonialUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("description is required"),
  body("tag").exists({ checkFalsy: true }).withMessage("tag is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return testimonial
        .findOne({
          where: {
            id: value,
          },
        })
        .then((testimonial) => {
          if (testimonial) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("testimonial Does not exist");
          }
        });
    }),
];
const YoutubeVideoSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),

  body("embed_id")
    .exists({ checkFalsy: true })
    .withMessage("video Id is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
];
const YoutubeVideoSchemaupdate = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),

  body("embed_id")
    .exists({ checkFalsy: true })
    .withMessage("video Id is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return youtubevideos
        .findOne({
          where: {
            id: value,
          },
        })
        .then((youtubevideos) => {
          if (youtubevideos) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("youtubevideos Does not exist");
          }
        });
    }),
];
const VideoTestimonialSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("tag").exists({ checkFalsy: true }).withMessage("tag is required"),
  body("video_url")
    .exists({ checkFalsy: true })
    .withMessage("video_url is required"),
];

const VideoTestimonialUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("tag").exists({ checkFalsy: true }).withMessage("tag is required"),
  body("video_url")
    .exists({ checkFalsy: true })
    .withMessage("photo is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return videotestimonial
        .findOne({
          where: {
            id: value,
          },
        })
        .then((videotestimonial) => {
          if (videotestimonial) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("videotestimonial Does not exist");
          }
        });
    }),
];
const TeamSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("designation")
    .exists({ checkFalsy: true })
    .withMessage("tag is required"),
  body("type").exists({ checkFalsy: true }).withMessage("type is required"),
];

const TeamUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("designation")
    .exists({ checkFalsy: true })
    .withMessage("tag is required"),
  body("type").exists({ checkFalsy: true }).withMessage("type is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return team
        .findOne({
          where: {
            id: value,
          },
        })
        .then((team) => {
          if (team) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("team Does not exist");
          }
        });
    }),
];
const StudentformSchema = [
  body("place")
    .exists({ checkFalsy: true })
    .withMessage(" place is required")
    .isLength({ max: 150 })
    .withMessage("place should be less than 150 character"),

  body("language")
    .exists({ checkFalsy: true })
    .withMessage("language name is required")
    .isLength({ max: 150 })
    .withMessage("language should be less than 150 character"),
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage(" meta_title is required"),
  body("meta_description")
    .exists({ checkFalsy: true })
    .withMessage(" meta_description is required"),
  body("page_title")
    .exists({ checkFalsy: true })
    .withMessage(" page_title is required"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage(" description is required"),
  body("order").exists({ checkFalsy: true }).withMessage(" order is required"),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage(" status is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return studentform
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((studentform) => {
          if (studentform) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const StudentformSchemaUpdate = [
  body("place")
    .exists({ checkFalsy: true })
    .withMessage(" place is required")
    .isLength({ max: 150 })
    .withMessage("place should be less than 150 character"),

  body("language")
    .exists({ checkFalsy: true })
    .withMessage("language name is required")
    .isLength({ max: 150 })
    .withMessage("language should be less than 150 character"),
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage(" meta_title is required"),
  body("meta_description")
    .exists({ checkFalsy: true })
    .withMessage(" meta_description is required"),
  body("page_title")
    .exists({ checkFalsy: true })
    .withMessage(" page_title is required"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage(" description is required"),
  body("order").exists({ checkFalsy: true }).withMessage(" order is required"),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage(" status is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return studentform
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((studentform) => {
          if (studentform) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return studentform
        .findOne({
          where: {
            id: value,
          },
        })
        .then((studentform) => {
          if (studentform) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("studentform Does not exist");
          }
        });
    }),
];
const JobvacanciesSchema = [
  body("position")
    .exists({ checkFalsy: true })
    .withMessage(" position is required")
    .isLength({ max: 150 })
    .withMessage("position should be less than 150 character"),

  body("experience")
    .exists({ checkFalsy: true })
    .withMessage("experience name is required")
    .isLength({ max: 150 })
    .withMessage("experience should be less than 150 character"),
  body("no_of_vacancy")
    .exists({ checkFalsy: true })
    .withMessage(" no_of_vacancy is required"),
  body("location")
    .exists({ checkFalsy: true })
    .withMessage(" location is required"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage(" description is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return jobvaccancies
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((jobvaccancies) => {
          if (jobvaccancies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const JobvacanciesSchemaUpdate = [
  body("position")
    .exists({ checkFalsy: true })
    .withMessage(" position is required")
    .isLength({ max: 150 })
    .withMessage("position should be less than 150 character"),

  body("experience")
    .exists({ checkFalsy: true })
    .withMessage("experience name is required")
    .isLength({ max: 150 })
    .withMessage("experience should be less than 150 character"),
  body("no_of_vacancy")
    .exists({ checkFalsy: true })
    .withMessage(" no_of_vacancy is required"),
  body("location")
    .exists({ checkFalsy: true })
    .withMessage(" location is required"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage(" description is required"),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return jobvaccancies
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((jobvaccancies) => {
          if (jobvaccancies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return jobvaccancies
        .findOne({
          where: {
            id: value,
          },
        })
        .then((jobvaccancies) => {
          if (jobvaccancies) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("job Does not exist");
          }
        });
    }),
];
const RedirecturlSchema = [
  body("old_url")
    .exists({ checkFalsy: true })
    .withMessage(" old_url is required")
    .custom((value) => {
      let firstChar = value.charAt(0);
      if (firstChar === "/") {
        return true;
        // First character is a slash
      } else {
        return Promise.reject(
          "Enter valid URL must be contail first char / like: /dfewerfrew"
        );
      }
    }),

  body("new_url")
    .exists({ checkFalsy: true })
    .withMessage("new_url name is required")
    .custom((value) => {
      let firstChar = value.charAt(0);
      if (firstChar === "/") {
        return true;
        // First character is a slash
      } else {
        return Promise.reject(
          "Enter valid URL must be contail first char / like: /defgrefijf"
        );
      }
    }),

  body("status_code")
    .exists({ checkFalsy: true })
    .withMessage(" status_code is required"),
];

const RedirecturlSchemaUpdate = [
  body("old_url")
    .exists({ checkFalsy: true })
    .withMessage(" old_url is required")
    .custom((value) => {
      let firstChar = value.charAt(0);
      if (firstChar === "/") {
        return true;
        // First character is a slash
      } else {
        return Promise.reject(
          "Enter valid URL must be contail first char / like: /dfewerfrew"
        );
      }
    }),

  body("new_url")
    .exists({ checkFalsy: true })
    .withMessage("new_url name is required")
    .custom((value) => {
      let firstChar = value.charAt(0);
      if (firstChar === "/") {
        return true;
        // First character is a slash
      } else {
        return Promise.reject(
          "Enter valid URL must be contail first char / like: /defgrefijf"
        );
      }
    }),

  body("status_code")
    .exists({ checkFalsy: true })
    .withMessage(" status_code is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return redirecturl
        .findOne({
          where: {
            id: value,
          },
        })
        .then((redirecturl) => {
          if (redirecturl) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("redirecturl Does not exist");
          }
        });
    }),
];
const PromopageSchema = [
  body("title").exists({ checkFalsy: true }).withMessage(" title is required"),

  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("meta_title name is required"),

  body("url").exists({ checkFalsy: true }).withMessage(" url is required"),
];

const PromopageSchemaUpdate = [
  body("title").exists({ checkFalsy: true }).withMessage(" title is required"),

  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("meta_title name is required"),

  body("url").exists({ checkFalsy: true }).withMessage(" url is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return promopage
        .findOne({
          where: {
            id: value,
          },
        })
        .then((promopage) => {
          if (promopage) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("promopage Does not exist");
          }
        });
    }),
];

const newsandeventsSchema = [
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("meta_title is required"),

  body("meta_description")
    .exists({ checkFalsy: true })
    .withMessage("meta_description is required"),

  body("meta_keyword")
    .exists({ checkFalsy: true })
    .withMessage("meta_keyword is required"),

  body("title").exists({ checkFalsy: true }).withMessage("title is required"),

  body("body").exists({ checkFalsy: true }).withMessage("news is required"),

  body("status").exists({ checkFalsy: true }).withMessage("status is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return newsandevents
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((newsandevents) => {
          if (newsandevents) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];
const newsandeventsUpdateSchema = [
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("meta_title is required"),

  body("meta_description")
    .exists({ checkFalsy: true })
    .withMessage("meta_description is required"),

  body("meta_keyword")
    .exists({ checkFalsy: true })
    .withMessage("meta_keyword is required"),

  body("title").exists({ checkFalsy: true }).withMessage("title is required"),

  body("body").exists({ checkFalsy: true }).withMessage("news is required"),

  body("status").exists({ checkFalsy: true }).withMessage("status is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return newsandevents
        .findOne({
          where: {
            id: value,
          },
        })
        .then((newsandevents) => {
          if (newsandevents) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("newsandevents Does not exist");
          }
        });
    }),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return newsandevents
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((newsandevents) => {
          if (newsandevents) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const examSchema = [
  body("exam_title")
    .exists({ checkFalsy: true })
    .withMessage("Exam title is required"),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return exam
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((newsandevents) => {
          if (newsandevents) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("Meta_title is required"),

  body("meta_description")
    .exists({ checkFalsy: true })
    .withMessage("Meta_description is required"),

  body("meta_keyword")
    .exists({ checkFalsy: true })
    .withMessage("Meta_keyword is required"),

  body("exam_description")
    .exists({ checkFalsy: true })
    .withMessage("Exam_description is required"),
  body("eligibility_criteria")
    .exists({ checkFalsy: true })
    .withMessage("Eligibility_criteria is required"),
  body("status").exists({ checkFalsy: true }).withMessage("Status is required"),

  body("listing_order").custom((value, { req }) => {
    if (value == null || value == "" || value == "null") {
      return true;
    }
    return exam
      .findOne({
        where: {
          listing_order: value,
        },
      })
      .then((exam) => {
        if (exam) {
          return Promise.reject("listing_order already in use");
        } else {
          // Indicates the success of this synchronous custom validator
          return true;
        }
      });
  }),

  body("home_view_status")
    .exists({ checkFalsy: true })
    .withMessage("home view status is required"),
  body("promo_banner_status")
    .exists({ checkFalsy: true })
    .withMessage("promo_banner_status  is required"),
];

const examUpdateSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return exam
        .findOne({
          where: {
            id: value,
          },
        })
        .then((exam) => {
          if (exam) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("exam Does not exist");
          }
        });
    }),
  body("exam_title")
    .exists({ checkFalsy: true })
    .withMessage("Exam title is required"),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return exam
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((exam) => {
          if (exam) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("Meta_title is required"),

  body("meta_description")
    .exists({ checkFalsy: true })
    .withMessage("Meta_description is required"),

  body("meta_keyword")
    .exists({ checkFalsy: true })
    .withMessage("Meta_keyword is required"),

  body("exam_description")
    .exists({ checkFalsy: true })
    .withMessage("Exam_description is required"),
  body("eligibility_criteria")
    .exists({ checkFalsy: true })
    .withMessage("Eligibility_criteria is required"),
  body("status").exists({ checkFalsy: true }).withMessage("Status is required"),

  body("listing_order").custom((value, { req }) => {
    if (value == null || value == "" || value == "null") {
      return true;
    }
    return exam
      .findOne({
        where: {
          listing_order: {
            [Op.eq]: value,
          },
          id: {
            [Op.not]: [req.body.id],
          },
        },
      })
      .then((stream) => {
        if (stream) {
          return Promise.reject("listing_order already in use");
        } else {
          // Indicates the success of this synchronous custom validator
          return true;
        }
      });
  }),
  body("home_view_status")
    .exists({ checkFalsy: true })
    .withMessage("home view status is required"),
  body("promo_banner_status")
    .exists({ checkFalsy: true })
    .withMessage("promo_banner_status  is required"),
];

const adminpasswordSchema = [
  body("password").isLength({
    min: 6,
  }),

  body("passwordconfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
];




const globalvalidation = {
  Validate: Validate,
  Test: Test,
  countrySchema: countrySchema,
  countriesUpdateSchema: countriesUpdateSchema,
  citySchema: citySchema,
  cityUpdateSchema: cityUpdateSchema,
  stateSchema: stateSchema,
  updatestateSchema: updatestateSchema,
  AmenitiesSchema: AmenitiesSchema,
  AmenitiesSchemaUpdate: AmenitiesSchemaUpdate,
  schoolSchema: schoolSchema,
  schoolUpdateSchema: schoolUpdateSchema,
  schoolboardSchema: schoolboardSchema,
  schoolboardUpdateSchema: schoolboardUpdateSchema,
  bannerSchema: bannerSchema,
  bannerUpdateSchema: bannerUpdateSchema,
  PageSchema: PageSchema,
  PageUpdateSchema: PageUpdateSchema,
  StreamSchema: StreamSchema,
  StreamSchemaUpdate: StreamSchemaUpdate,
  SubStreamSchema: SubStreamSchema,
  SubStreamSchemaUpdate: SubStreamSchemaUpdate,





  AccreditationsSchema: AccreditationsSchema,
  AccreditationsSchemaUpdate: AccreditationsSchemaUpdate,
  areaSchema: areaSchema,
  areaUpdateSchema: areaUpdateSchema,
  schoolSchema: schoolSchema,
  schoolUpdateSchema: schoolUpdateSchema,
  managementSchema: managementSchema,
  managementUpdateSchema: managementUpdateSchema,
  enquirySchema: enquirySchema,
  enquiryUpdateSchema: enquiryUpdateSchema,
  GeneralcoursesSchema: GeneralcoursesSchema,
  GeneralcoursesSchemaupdate: GeneralcoursesSchemaupdate,
  recognitionSchema: recognitionSchema,
  affilitionUpdateSchema: affilitionUpdateSchema,
  affilitionSchema: affilitionSchema,
  recognitionUpdateSchema: recognitionUpdateSchema,
  CollegeAndUniversitySchema: CollegeAndUniversitySchema,
  CollegeAndUniversityUpdateSchema: CollegeAndUniversityUpdateSchema,
  CompanySchema: CompanySchema,
  CompanyUpdateSchema: CompanyUpdateSchema,
  bannerUpdateSchema: bannerUpdateSchema,
  managementSchema: managementSchema,
  managementUpdateSchema: managementUpdateSchema,
  enquiryUpdateSchema: enquiryUpdateSchema,
  GeneralcoursesSchema: GeneralcoursesSchema,
  GeneralcoursesSchemaupdate: GeneralcoursesSchemaupdate,
  authorSchema: authorSchema,
  authorUpdateSchema: authorUpdateSchema,
  categoriesSchema: categoriesSchema,
  categoriesUpdateSchema: categoriesUpdateSchema,
  blogSchema: blogSchema,
  blogUpdateSchema: blogUpdateSchema,

  polytechnicSchema: polytechnicSchema,
  polytechnicUpdateSchema: polytechnicUpdateSchema,
  reviewSchema: reviewSchema,
  reviewUpdateSchema: reviewUpdateSchema,
  reviewchangestatusSchema: reviewchangestatusSchema,
  upcoming_coursesUpdateSchema: upcoming_coursesUpdateSchema,
  upcoming_coursesSchema: upcoming_coursesSchema,
  coursesUpdateSchema: coursesUpdateSchema,
  coursesSchema: coursesSchema,
  eligibilityUpdateSchema: eligibilityUpdateSchema,
  eligibilitySchema: eligibilitySchema,
  salaryUpdateSchema: salaryUpdateSchema,
  salarySchema: salarySchema,
  feeUpdateSchema: feeUpdateSchema,
  feeSchema: feeSchema,
  galleryUpdateSchema: galleryUpdateSchema,
  gallerySchema: gallerySchema,
  jobUpdateSchema: jobUpdateSchema,
  jobSchema: jobSchema,
  userSchema: userSchema,
  userforgotpassword: userforgotpassword,
  userforgotpasswordnew: userforgotpasswordnew,
  groupsUpdateSchema: groupsUpdateSchema,
  groupsSchema: groupsSchema,
  TestimonialSchema: TestimonialSchema,
  TestimonialUpdateSchema: TestimonialUpdateSchema,
  VideoTestimonialSchema: VideoTestimonialSchema,
  VideoTestimonialUpdateSchema: VideoTestimonialUpdateSchema,
  TeamSchema: TeamSchema,
  TeamUpdateSchema: TeamUpdateSchema,
  StudentformSchema: StudentformSchema,
  StudentformSchemaUpdate: StudentformSchemaUpdate,
  JobvacanciesSchema: JobvacanciesSchema,
  JobvacanciesSchemaUpdate: JobvacanciesSchemaUpdate,
  RedirecturlSchema: RedirecturlSchema,
  RedirecturlSchemaUpdate: RedirecturlSchemaUpdate,
  PromopageSchema: PromopageSchema,
  PromopageSchemaUpdate: PromopageSchemaUpdate,
  newsandeventsSchema: newsandeventsSchema,
  newsandeventsUpdateSchema: newsandeventsUpdateSchema,

  examSchema: examSchema,
  examUpdateSchema: examUpdateSchema,
  adminpasswordSchema: adminpasswordSchema,
  scholarshipSchema: scholarshipSchema,
  scholarshipUpdateSchema: scholarshipUpdateSchema,
  abroadcountriesUpdateSchema: abroadcountriesUpdateSchema,
  abroadcountriesSchema: abroadcountriesSchema,
  abroaduniversitiesUpdateSchema: abroaduniversitiesUpdateSchema,
  abroaduniversitiesSchema: abroaduniversitiesSchema,
  YoutubeVideoSchemaupdate: YoutubeVideoSchemaupdate,
  YoutubeVideoSchema: YoutubeVideoSchema,

};

module.exports = globalvalidation;
