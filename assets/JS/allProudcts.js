const getProducts = async (page) => {
    const skip = (parseInt(page) - 1) * 20;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`);
    return data;

};


const displayProducts = async (page = 1) => {

    const loader = document.querySelector('.loader-container')
    loader.classList.add('active');

    try {
        const data = await getProducts(page);
        const numberOfPages = Math.ceil(data.total / 20);

        const result = data.products.map((product) => {
            return `
            <div class="product">
                <img  id ="details-${product.id}" src='${product.thumbnail}' alt="${product.description} " class="images">
                <a href="proudctDetails.html?id=${product.id}">Details</a>
            </div>
             `;
        }).join(' ');
        document.querySelector(".products .row").innerHTML = result;

        let pagenationLinks = ``;
        if (page == 1) {
            pagenationLinks = `<li class="page-item"><button class="page-link" disabled>&laquo;</button></li>`;

        }

        else {
            pagenationLinks = `<li class="page-item"><button onclick=displayProducts('${parseInt(page) - 1}') class="page-link">&laquo;</button></li>`;
        }


        for (let i = 1; i <= numberOfPages; i++) {
            pagenationLinks += `<li class="page-item ${i == page ? 'active' : ''}"><button onclick=displayProducts('${i}') class="page-link">${i}</button></li>`;
        }

        if (page == numberOfPages) {
            pagenationLinks += `<li class="page-item"><button class="page-link" disabled>&raquo;</button></li>`;
        }
        else {
            pagenationLinks += `<li class="page-item"><button onclick=displayProducts('${parseInt(page) + 1}') class="page-link">&raquo;</button></li>`;
        }

        document.querySelector(".pagination").innerHTML = pagenationLinks;
        modal();

    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = `<p>Loading...</p>`;
    }
    {
        loader.classList.remove('active');
    }

};
displayProducts();


function modal() {

    const rightArrow = document.querySelector(".rightarrow");
    const leftArrow = document.querySelector(".leftarrow");
    const close = document.querySelector(".close-page");
    const images = Array.from(document.querySelectorAll(".images"));
    const modal = document.querySelector(".my-modal");
    let currentIndex = 0;
    images.forEach(function (img) {

        img.addEventListener("click", function (e) {
            modal.classList.remove("d-none");
            modal.querySelector("img").setAttribute("src", e.target.src);
            currentImg = e.target;
            currentIndex = images.indexOf(currentImg);

        });
        
       
    });

    rightArrow.addEventListener("click", function () {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src", src);

    });
    leftArrow.addEventListener("click", function () {
        currentIndex--;
        if (currentIndex <= 0) {
            currentIndex = images.length;
        }
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src", src);

        
    
    });

    close.addEventListener("click", function () {
        modal.classList.add("d-none");
    });


}
