import axios from "axios";

export default async function factCheckClaim(_claim) {
  try {
    const response = await axios.get(
      "https://nli.wmflabs.org/fact_checking_model/",
      {
        headers: {
          accept: "application/json",
        },
        params: {
          claim: _claim,
        },
      }
    );

    return response.data.results[0];
  } catch (error) {
    console.error(error);
  }
}
