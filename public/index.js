fetch("/vezbi.json")
.then(response => response.json())
.then(data => {

    let takee = document.getElementById("exercises")
    for (each of data["vezbi"]) {

        let create_banner = document.createElement("div")
        let create_img_banner = document.createElement("img")
        let create_a_tag = document.createElement("a")
        create_a_tag.setAttribute("href", each["gif"])
        let take_gifs = each["gif"]
        let take_name = each["vezbam"]
        let take_muskul = each["muskul"]
        create_img_banner.setAttribute("src", take_gifs)
        let create_text_field = document.createElement("h3")
        create_text_field.innerText = take_name
        create_a_tag.appendChild(create_img_banner)
        create_banner.appendChild(create_a_tag)
        create_banner.appendChild(create_text_field)

        takee.appendChild(create_banner)
        let take_search_input = document.getElementById("search_input")
        let take_excercises = document.querySelector("#exercises")
        take_search_input.addEventListener("input", (e) => {
            let take_search_results = document.getElementById("search_results")

            if (take_search_input.value === take_name || take_search_input.value.toLowerCase() === take_name.toLowerCase() || take_search_input.value.toUpperCase() === take_name.toUpperCase()) 
            {
                console.log(take_name)
                console.log(take_muskul)
                let num = []
                let ex = 0
                for (e of data["vezbi"]) {
                    ex++
                    if (e["muskul"].toString() === take_muskul) {
                        num.push(ex)
                    } else {
                        for (a of e["muskul"]) {
                            if (a === take_muskul[0]) {
                                num.push(ex)

                            } else {
                                console.log("not pushing")

                            }

                    }
                    console.log(ex)
                    console.log(e)

                    }
                }
                let create_new_text_field = document.createElement("h3")
                create_new_text_field.innerText = take_name
                take_search_results.appendChild(create_new_text_field)
                console.log(num)
                let create_div = document.createElement("div")
                create_div.innerHTML = "similar exercises..."
                create_div.style.paddingTop = "5%"
                take_search_results.appendChild(create_div)
                for (n of num) {
                    console.log(data["vezbi"][n]["vezbam"])

                    let create_text_field = document.createElement("h3")
                    create_text_field.innerText = data["vezbi"][n]["vezbam"]
                    
                    take_search_results.appendChild(create_text_field)
                    

                }
                



            }else  if (take_search_input.value !== ""){

                take_search_results.style.height = "100%"
                take_search_results.style.padding = "5%"

            } else {
                take_search_results.style.height = "0%"
                take_search_results.style.padding = "0%"
                take_search_results.innerHTML = ""


            }
        
        })
    }

})


let creat_nav_dom = document.getElementById("nav_bar") 
let take_search = document.getElementById("two")
let takes = 0

let create_search_bar = document.createElement("input")
create_search_bar.setAttribute("id", "search_input")
create_search_bar.setAttribute("placeholder", "search an exercise...")
creat_nav_dom.appendChild(create_search_bar)


let changeX = document.getElementById("change_to_X")
creat_nav_dom.addEventListener("click", (e) => {
    let take_search_results = document.getElementById("search_results")
    let take_search_input = document.getElementById("search_input")
    let take_id = e.target
    console.log(take_id.getAttribute("id"))

    if (take_id.getAttribute("id") === "search" || take_id.getAttribute("id") === "one" || take_id.getAttribute("id") === "two" || take_id.getAttribute("id") === "search_input") {

        take_search_input.value = ""
        create_search_bar.style.width = "65%"
        create_search_bar.style.height = "70%"
        create_search_bar.style.backgroundColor = "white"
        let deleting = changeX.getAttribute("d")
        deleting.remove
        changeX.setAttribute("d", "M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z")

    } else {

        take_search_results.style.height = "0%"
        take_search_results.style.padding = "0%"
        take_search_results.innerHTML = ""
        create_search_bar.style.width = "0%"
        create_search_bar.style.height = "0%"
        create_search_bar.style.backgroundColor = "transparent"
        let deleting = changeX.getAttribute("d")
        deleting.remove
        changeX.setAttribute("d", "M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z")
        deleting.remove


    }


})

let take_filter_section = document.getElementById("dropDownFilter")
let filter_active = 0
function filterWorkOut() {

    if (filter_active === 0) {
        take_filter_section.style.height = "100px"
        filter_active++

    } else {

        take_filter_section.style.height = "0px"
        filter_active--

    }


}


