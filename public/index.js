let muskulii = []
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
        create_banner.setAttribute("value", take_muskul)

        takee.appendChild(create_banner)
        let take_search_input = document.getElementById("search_input")
        let take_excercises = document.querySelector("#exercises")
        let take_body = document.querySelector("body")
        take_search_input.addEventListener("input", (e) => {
            let take_search_results = document.getElementById("search_results")
            let create_div = document.createElement("div");

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
                let h3h = take_name.toString()
                let create_h3h = document.createElement("h3")
                create_h3h.innerText = h3h
                let create_div_ex = document.createElement("div")

                let create_gif = document.createElement("img")
                let create_h6 = document.createElement("h6")
                let create_div_text = document.createElement("div") 

                create_div_text.setAttribute("id", "text_description")
                create_h6.innerText = each["muskul"]

                create_div_text.appendChild(create_h6)
                create_gif.setAttribute("src", take_gifs)
                
                
                create_div_ex.setAttribute("id", "first_result")
                create_div_ex.appendChild(create_gif)
                create_div_text.appendChild(create_h3h)

                take_search_results.appendChild(create_div_ex)
                create_div_ex.appendChild(create_div_text)
                create_div_text.appendChild(create_h6)
                console.log(num)

                create_div.innerHTML = "similar exercises..."
                create_div.style.paddingTop = "5%"
                take_search_results.appendChild(create_div)
                for (n of num) {
                    console.log(data["vezbi"][n]["vezbam"])

                    let create_text_field = document.createElement("h3")
                    create_text_field.innerText = data["vezbi"][n]["vezbam"]
                    take_search_results.appendChild(create_text_field)
                    

                }
                take_body.style.overflow = "hidden"
                



            }else  if (take_search_input.value !== "" ){

                take_search_results.style.height = "100%"
                take_search_results.style.padding = "5%"
                take_body.style.overflow = "hidden"



            } else {
                take_search_results.style.height = "0%"
                take_search_results.style.padding = "0%"
                take_search_results.innerHTML = ""
                take_body.style.overflow = "auto";





            }

        
        })
    }

})


let creat_nav_dom = document.getElementById("nav_bar") 
let take_search = document.getElementById("two")
let take_body = document.querySelector("body")
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



        create_search_bar.style.width = "65%"
        create_search_bar.style.height = "70%"
        create_search_bar.style.backgroundColor = "white"
        let deleting = changeX.getAttribute("d")
        deleting.remove
        changeX.setAttribute("d", "M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z")

    } else {

        take_search_results.style.height = "0%"
        take_search_input.value = ""
        take_search_results.style.padding = "0%"
        take_search_results.innerHTML = ""
        create_search_bar.style.width = "0%"
        create_search_bar.style.height = "0%"
        create_search_bar.style.backgroundColor = "transparent"
        let deleting = changeX.getAttribute("d")
        deleting.remove
        changeX.setAttribute("d", "M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z")
        deleting.remove
        take_body.style.overflow = "auto";


    }


})

let take_filter_section = document.getElementById("dropDownFilter")
let filter_active = 0
let filter_woerk = document.querySelectorAll(".filtermuscle")
function filterWorkOut() {

    if (filter_active === 0) {
        take_filter_section.style.height = "100px"
        filter_active++

    } else {

        take_filter_section.style.height = "0px"
        filter_active = 0
      

    }
    console.log(filter_active)


}



let takee = document.getElementById("exercises")
take_filter_section.addEventListener("click", (e) => {

    let take_filter = e.target
    console.log(take_filter_section)
    let ime_na_muskul = take_filter.getAttribute("class")


    if (take_filter.getAttribute("value") === "inactive") {

        take_filter.setAttribute("value", "active")
        take_filter.innerHTML += `<svg id="close" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 422c-44.3 0-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90s86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422m0-362C141.1 60 48 153.1 48 268s93.1 208 208 208 208-93.1 208-208S370.9 60 256 60z"></path><path d="M360 181.1L330.9 152 256 226.9 181.1 152 152 181.1l74.9 74.9-74.9 74.9 29.1 29.1 74.9-74.9 74.9 74.9 29.1-29.1-74.9-74.9z"></path></svg>`
        take_filter.style.backgroundColor = "rgb(165, 165, 165)"

        muskulii.push(ime_na_muskul)

        for (ess of takee.children) {

            if (muskulii.includes(ess.getAttribute("value"))) {
                console.log(muskulii.includes(ess.getAttribute("value")))
                ess.style.display = "block"

            } else {
                for (a of ess.getAttribute("value").split(",")) {
                    if (muskulii.includes(a)) {
                        ess.style.display = "block"
                        break
                    } else {
                        ess.style.display = "none"
                    }
                }

            }
            console.log(ess.getAttribute("value").split(",") + " muskli lista e tuka: " + muskulii)

        }

    } else if(take_filter.getAttribute("value") === "active") {
        
        const index = muskulii.indexOf(ime_na_muskul);
        if (index !== -1) {
            muskulii.splice(index, 1);
        }
        console.log(muskulii)
        console.log(take_filter)
        console.log(ime_na_muskul)
        
        console.log("tuka e lista za muskuli: " + muskulii)
        take_filter.style.backgroundColor = "white"
        take_filter.innerHTML = ime_na_muskul
        filter_active--

        take_filter.setAttribute("value", "inactive")

        if (muskulii.length === 0) {
            for (ess of takee.children) {

                ess.style.display = "block"
            }
        } else {
            for (ess of takee.children) {


                if (muskulii.includes(ess.getAttribute("value"))) {
                    ess.style.display = "block"
    
                } else {
                    ess.style.display = "none"
                }
            }
        }
        console.log(muskulii)
    } else {

        console.log(muskulii)
    }
})

    


