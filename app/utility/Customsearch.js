const db = require("../models");
const Op = db.Sequelize.Op;


module.exports = {

    customseacrh: function (text, columnname) 
    {
        try {
            var column = columnname ? columnname : 'id';

            var result = [];

            var final = [];
            var str_array = column.split(",");
            let i = "";
            for (i = 0; i < str_array.length; i++) {
                var a = str_array[i];
                // console.log(a);
                const myArray2 = a.split(".");

                if (typeof myArray2[1] !== "undefined") {
                    var table1 = myArray2[0];
                    var column1 = myArray2[1];
                    str_array[i] = '$' + table1 + '.' + column1 + '$';
                }
                final.push({

                    [str_array[i]]:
                    {
                        [Op.like]: `%${text}%`
                    }
                });

            };


            var data = {

                [Op.or]: final
            }



            var condition = text ? data : null;



            return condition;

        }
        catch (error) {
            return res.status(400).send({
              message: 'enter searchtext and searchfrom',
              errors: error,
              status: 0
            });
          }
    }
}
