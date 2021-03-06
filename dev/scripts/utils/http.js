const apiKey = "PJkH4zdW92Rb3d981TZsvHKBUTbFJZrL";

// API call for trending GIFs
export const trendingAPIcall = (rating, paginate, limit) =>
    fetch(`http://api.giphy.com/v1/gifs/trending?rating=${rating}&offset=${paginate}&api_key=${apiKey}&limit=${limit}`)
    .then(response => response.json())


    // API call for searched GIFs
export const searchAPIcall = (keywords, rating, paginate, limit) =>
    fetch(`http://api.giphy.com/v1/gifs/search?q=${keywords}&rating=${rating}&offset=${paginate}&api_key=${apiKey}&limit=${limit}`)
    .then(response => response.json())