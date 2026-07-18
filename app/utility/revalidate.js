const axios = require("axios");

exports.revalidatePage = async (tag) => {
  try {

    const url = `${process.env.NEXTJS_SITE_URL}${process.env.NEXTJS_REVALIDATE_ENDPOINT}`;

    await axios.post(url, {
      tag: tag,
      secret: process.env.NEXTJS_REVALIDATE_SECRET
    });

    console.log("Revalidated tag:======================================================================================             ", tag);

  } catch (error) {
    console.error("Revalidation failed:", error.message);
  }
};