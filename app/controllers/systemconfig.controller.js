exports.findAllcoursetype = async (req, res) => {


    let course_type = ['PG', 'UG', 'Diploma', 'Certification Course', 'PhD', 'Super Speciality', 'Mphil', 'Integrated Courses'];
    if (course_type !== null) {
        res.status(200).send({
            status: 1,
            message: "success",
            data: course_type
        });

    } else {
        res.status(500).send({
            status: 0,
            message: "Some error occurred while retrieving course_type."
        });
    }
};

exports.findAlltype = async (req, res) => {


    let type= ['College', 'University', 'Board'];
    if (type!== null) {
        res.status(200).send({
            status: 1,
            message: "success",
            data: type
        });

    } else {
        res.status(500).send({
            status: 0,
            message: "Some error occurred while retrieving type"
        });
    }
};

exports.findAllcollegetype = async (req, res) => {


    let college_type = ['Public', 'Deemed', 'Private', 'Autonomous', 'Government'];
    if (college_type!== null) {
        res.status(200).send({
            status: 1,
            message: "success",
            data: college_type
        });

    } else {
        res.status(500).send({
            status: 0,
            message: "Some error occurred while retrieving college_type"
        });
    }
};
exports.findAllgender_accepted = async (req, res) => {


    let gender_accepted  = ['Male', 'Female', 'Co-Ed'];
    if (gender_accepted !== null) {
        res.status(200).send({
            status: 1,
            message: "success",
            data: gender_accepted 
        });

    } else {
        res.status(500).send({
            status: 0,
            message: "Some error occurred while retrieving gender_accepted "
        });
    }
};
exports.findAllsize_type= async (req, res) => {


    let size_type  = ['Acres', 'Cent'];
    if (size_type !== null) {
        res.status(200).send({
            status: 1,
            message: "success",
            data: size_type 
        });

    } else {
        res.status(500).send({
            status: 0,
            message: "Some error occurred while retrieving size_type "
        });
    }
};
exports.findAllhome_view_status= async (req, res) => {


    let home_view_status  = ['top_college','default'];
    if (home_view_status !== null) {
        res.status(200).send({
            status: 1,
            message: "success",
            data: home_view_status
        });

    } else {
        res.status(500).send({
            status: 0,
            message: "Some error occurred while retrieving home_view_status "
        });
    }
};