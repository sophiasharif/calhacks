import axios from "axios";



export default async function getHumeJob(text)
 {
    const form = new FormData();
    form.append('json', '{}');
    form.append('file', text)
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'X-Hume-Api-Key': 'uv4vj0SovnVnyNpNERG9ZX21fGAKcYEBYZDCTs0SAzkc3vIn'
      }
    };
    
    options.body = form;
    
    // fetch('https://api.hume.ai/v0/batch/jobs', options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .then(response=> getSentimentPrediction(JSON.parse(response).job_id) )
    //   .catch(err => console.error(err));

    fetch('https://api.hume.ai/v0/batch/jobs', options)
    .then((res) => res.json())
    .then((data) => {
      console.log("request went through");
      console.log("data is", data);
      getSentimentPrediction(data.job_id)
    });
}

export  async function getSentimentPrediction(job_id)
{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json; charset=utf-8',
          'X-Hume-Api-Key': 'uv4vj0SovnVnyNpNERG9ZX21fGAKcYEBYZDCTs0SAzkc3vIn'
        }
      };
      const text1 = 'https://api.hume.ai/v0/batch/jobs/'
      const text2='/predictions'
      const my_url= text1.concat(job_id)
      console.log(job_id)
      const my_url1= my_url.concat(text2)
      let status;

    fetch('https://api.hume.ai/v0/batch/jobs', options)
    .then((res) => res.json())
    .then((data) => {
      console.log("request went through");
      console.log("data is", data);
      if(data.message == "Job is in progress.")
      {
        getSentimentPrediction(data.job_id)

      }
     
    });

    
      
      
        

      
      
    
    
     
}


/*
export default async function getSentimentHume(text) 
{
    const api_key = import.meta.env.VITE_HUME_KEY;
    //https://api.hume.ai/v0/batch/jobs
    try {
        const response = await axios.get(
            "https://api.hume.ai/v0/batch/jobs"
          ,
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
    
    client = HumeBatchClient(api_key)
    config = LanguageConfig()
    input_text = [text]
    job = client.submit_job(input_text, [config])
    print(job)
    print("Running...")

    details = job.await_complete()
    job.download_predictions("predictions.json")
    print("Predictions downloaded to predictions.json")

}*/