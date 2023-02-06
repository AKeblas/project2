
const main = document.querySelector(".main")
const main2 = document.querySelector(".main2")


let photos = 0
let itemId = 0

function getProduct () {
    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {

            data.products.map(product => {
                main.innerHTML += `
                     <div class="box">
                         <img class="photo2" src="${product.thumbnail}" alt="">
                         <h3>${product.title}</h3>
                         <h3>Price: ${product.price} $</h3>
                         <button id="${product.id}">Check</button>
            </div>
            `


                const btn = document.querySelectorAll("button")
                btn.forEach((el)=>{
                    el.onclick=(event)=>{
                        main.innerHTML = ""
                        itemId = event.target.id
                        getSlider()

                    }
                })

            })


        })
}
getProduct()



function getSlider() {
    fetch("https://dummyjson.com/products/" + itemId)
        .then(res => res.json())
        .then(user => {
            console.log(user)
            main2.innerHTML = `
                     <div class="d-flex flex2 border">
                         <div class="flex1 arrow left">
                             <img src="https://cdn-icons-png.flaticon.com/512/60/60775.png" alt="">
                         </div>
                        <div class="flex2 foto">
                             <img class="photo" src="${user.images[0]}" alt="">
                         </div>
                         <div class="flex1 arrow right">
                             <img src="https://cdn-icons-png.flaticon.com/512/60/60758.png" alt="">
                         </div>
                     </div>
                    <div class="flex1 info">
                        <h1>${user.title}</h1>
                        <h4>${user.description}</h4>
                        <h2>Price: ${user.price} $</h2>
                        <h4>
                            <i class="fas fa-star star"></i>
                            <i class="fas fa-star star"></i>
                            <i class="fas fa-star star"></i>
                            <i class="fas fa-star star"></i>
                            <i class="fas fa-star star"></i>
                        </h4>
                        <button>Go back</button>
                    </div>

                    `


            const photo = document.querySelector(".photo")
            const right = document.querySelector(".right")
            const left = document.querySelector(".left")
            const backBtn = document.querySelector("button")
            const stars = document.querySelectorAll(".star")
            const photoArr = user.images
            const starsCount = Math.round(user.rating)

            function showStar (){
                stars[0].style.color = "#ffcc00"
                stars[1].style.color = "#ffcc00"
                stars[2].style.color = "#ffcc00"
                stars[3].style.color = "#ffcc00"
                stars[4].style.color = "#ffcc00"
            }

            if (starsCount === 1){
                showStar ()
                stars[1].style.color = "transparent"
                stars[2].style.color = "transparent"
                stars[3].style.color = "transparent"
                stars[4].style.color = "transparent"
            }
            if (starsCount === 2){
                showStar ()
                stars[2].style.color = "transparent"
                stars[3].style.color = "transparent"
                stars[4].style.color = "transparent"
            }
            if (starsCount === 3){
                showStar ()
                stars[3].style.color = "transparent"
                stars[4].style.color = "transparent"
            }
            if (starsCount === 4){
                showStar ()
                stars[4].style.color = "transparent"
            }
            if (starsCount === 5){
                showStar ()
            }



            right.onclick = () => {
                photos++
                if (photos<=photoArr.length-1){
                    photo.src = `${photoArr[photos]}`
                } else {
                    photos = 0
                    photo.src = `${photoArr[photos]}`
                }
                console.log(photos)

            }

            left.onclick = () => {
                photos--
                if (photos < 0){
                    photos = photoArr.length-1
                }
                if (photos <= photoArr.length-1){
                    photo.src = `${photoArr[photos]}`
                }
                console.log(photos)
            }

            backBtn.onclick=()=>{
                main2.innerHTML = ""
                getProduct ()
            }
        })


}



