const getCategory = async () => {

    const { data } = await axios.get('https://dummyjson.com/products/category-list');
    return data;

};
const displayCategory = async () => {
    const loader = document.querySelector('.loader-container')
    loader.classList.add('active');
    try {
        const Categories = await getCategory();
        const result = Categories.map((category) => {
            return `
        <div class="category">
            <h2>${category}</h2>
            <a href="categoryDetails.html?category=${category}">Details</a>
        </div>
        `;
        }).join('');
        document.querySelector(".categories .row").innerHTML = result;
    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = `<p>Loading...</p>`;
    }
    {
        loader.classList.remove('active');
    }

};
displayCategory();

window.onscroll = function () {
    const categories = document.querySelector('.categories');
    const nav = document.querySelector('.header');
    if (window.scrollY > categories.offsetTop) {
        nav.classList.add('scroll-nav');
    }
    else {
        nav.classList.remove('scroll-nav');
    }

}
const countdown = () => {
    const countDownDate = new Date("2025-03-01T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
    document.querySelector("#minutes").textContent = minutes;
    document.querySelector("#seconds").textContent = seconds;
}


setInterval(() => { countdown() }, 1000);



