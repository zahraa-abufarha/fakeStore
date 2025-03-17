const getProductsDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
    return data;

};
const displayProductsDetails = async () => {
    const data = await getProductsDetails();
    const loader = document.querySelector('.loader-container')
    loader.classList.add('active');
    
    try {
        
        const result = `
        <div class="img" >
            <img src='${data.thumbnail}' alt="${data.description}">
        </div>
        <div class="details">
            <h2>${data.title}</h2>
            <span class="price"> Price: ${data.price}</span>
            <p class="description">${data.description}</p>
        </div>
        `;


        document.querySelector(".proudct-details .row").innerHTML = result;
    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = `<p>Loading...</p>`;
    }
    {
        loader.classList.remove('active');
    }
}
displayProductsDetails();