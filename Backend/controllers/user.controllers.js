const db = require("../db/index.js");
const { errorHandler } = require("../utils/errorHandler");

const changeEnrollment = async (req, res) => {
  try {
    const { email, enrollment } = req.body;
    if (!email) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Email Parameter Missing"));
    }
    const exist = await db("users").where({
      email,
    });
    if (!exist) {
      return res
        .status(400)
        .send(errorHandler(400, "Not found", "Provided Email Does Not Exists"));
    }

    let branch = enrollment.slice(4, 6).toUpperCase();
    let batch = enrollment.slice(6, 8);

    let data = {
      enrollment,
      branch,
      batch,
    }
    let insertion = await db("users").update(data).where({
      email,
    });
    if(insertion){
        return res.status(200).send({
            response: {
              data: insertion,
              title: "Enrollment Updated",
              message: "Provided Enrollment Updated",
              status: 200,
            },
          });

    }
  } catch (error) {
    console.log("Error in changing enrollment", "---------------->", error);
    return res
      .status(500)
      .json(
        errorHandler(
          500,
          "Internal Server Error",
          "Error in changing enrollment. Please try again later."
        )
      );
  }
};

module.exports = {
    changeEnrollment
}
