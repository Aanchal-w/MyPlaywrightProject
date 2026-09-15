const post_product = {
    Items: [
     {
       cat: "phone",
       desc: "The Samsung Galaxy S6 is powered by 1.5GHz octa-core...",
       img: "imgs/galaxy_s6.jpg",
       price: 360.0,
       title: Date.now()+"samsung"
     },
      
      {
       cat: "phone",
       desc: "The Nokia Lumia 1520 is powered by 2.2GHz quad-core...",
       img: "imgs/Lumia_1520.jpg",
       price: 820.0,
       title: Date.now()+"nokia"
     },
    ]

};

const post_signup = {
    username: Date.now()+"qa",
    password: "Auto@1234"
}

module.exports = {
    post_product,
    post_signup
}