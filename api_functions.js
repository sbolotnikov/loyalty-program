export const videoSearch =async  (link) =>{
   try {
    const data = await fetch( 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q='+link+'&key='+process.env.REACT_APP_FIREBASE_APIKEY ,
    {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    const res= await data.json()
    return res.items;
}
catch (error) {
    if (error) {
      return error
    }
  }
  }