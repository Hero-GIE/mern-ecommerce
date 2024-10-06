// const { default: SummaryApi } = require("../common")

// const fetchCategoryWiseProduct = async(category)=>{
//     const response = await fetch(SummaryApi.categoryWiseProduct.url,{
//         method : SummaryApi.categoryWiseProduct.method,
//         headers : {
//             "content-type" : "application/json",         
//         },
//         body : JSON.stringify({
//             category : category
//         })
//     })

//     const dataResponse = await response.json()

//     return dataResponse
// }

// export default fetchCategoryWiseProduct


const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async (category) => {
    const token = localStorage.getItem('authToken'); // Example: how you get the token
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
      method: SummaryApi.categoryWiseProduct.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Ensure the token is sent
      },
      body: JSON.stringify({ category })
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText} (Status: ${response.status})`);
    }
  
    const dataResponse = await response.json();
    return dataResponse;
  };
  
  export default fetchCategoryWiseProduct