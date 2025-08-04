let muskulii = []
const darkTheme = localStorage

fetch("/vezbi.json")
    .then(response => response.json())
    .then(data => {

        let takee = document.getElementById("exercises")
        let ara = []
        data["vezbi"].map((vezbi) => {
            ara.push(vezbi["vezbam"])
        })
        console.log(ara)
        for (each of data["vezbi"]) {

            let create_banner = document.createElement("div")
            create_banner.setAttribute("id", "exercise")
            let create_img_banner = document.createElement("img")

            let take_gifs = each["gif"]
            let take_name = each["vezbam"]
            let take_muskul = each["muskul"]
            create_img_banner.setAttribute("src", take_gifs)
            let create_text_field = document.createElement("h3")
            create_text_field.innerText = take_name

            create_banner.appendChild(create_img_banner)

            let create_h5 = document.createElement("h6")
            create_h5.innerText = `Difficulty: ${each["nivo_tesko"]} \n With Weights: ${each["so_teg"]} \n Muscle Group: ${each["muskul"]} `
            create_banner.appendChild(create_h5)
            create_banner.appendChild(create_text_field)
            create_banner.setAttribute("value", take_muskul)
            let settings = document.createElement("div")
            settings.setAttribute("id", "settings_set")
            create_banner.appendChild(settings)
            takee.appendChild(create_banner)
            let take_search_input = document.getElementById("search_input")
            let take_excercises = document.querySelector("#exercises")
            take_search_input.addEventListener("input", (e) => {
                const query = take_search_input.value.trim().toLowerCase();
                const take_search_results = document.getElementById("search_results");
                take_search_results.innerHTML = "";
                if (query === "") {
                    take_search_results.style.height = "0%";
                    take_search_results.style.padding = "0%";
                    take_body.style.overflow = "auto";
                    return;
                }

                take_search_results.style.padding = "8%";
                take_search_results.style.overflow = "auto";
                take_search_results.style.height = "100%";

                take_body.style.overflow = "none";
                if (query === take_name.toLowerCase()) {
                    const matchHeader = document.createElement("h3");
                    matchHeader.innerText = take_name;

                    const gif = document.createElement("img");
                    gif.setAttribute("src", take_gifs);

                    const descDiv = document.createElement("div");
                    descDiv.setAttribute("id", "text_description");

                    const muskulText = document.createElement("h6");
                    muskulText.innerText = take_muskul;

                    const mainResultDiv = document.createElement("div");
                    mainResultDiv.setAttribute("id", "first_resultttttt");
                    descDiv.appendChild(matchHeader);
                    descDiv.appendChild(muskulText);
                    mainResultDiv.appendChild(gif);
                    mainResultDiv.appendChild(descDiv);
                    take_search_results.appendChild(mainResultDiv);

                    const similarDiv = document.createElement("div");
                    similarDiv.innerText = "similar exercises...";
                    similarDiv.style.paddingTop = "5%";
                    take_search_results.appendChild(similarDiv);

                    let count = 0;
                    for (let e of data["vezbi"]) {
                        const muskulArr = Array.isArray(e.muskul) ? e.muskul : [e.muskul];
                        if (muskulArr.includes(take_muskul)) {
                            count++;
                            const similarText = document.createElement("h3");
                            similarText.innerText = e.vezbam;
                            take_search_results.appendChild(similarText);
                        }
                    }
                    return;
                }

                const shownExercises = new Set();
                const newTerms = new Set();

                ara.forEach(term => {
                    if (term.toLowerCase().includes(query)) {
                        newTerms.add(term.toLowerCase());
                    }
                });

                const matchingExercises = [];

                data["vezbi"].forEach(e => {
                    const exerciseName = e.vezbam.toLowerCase();
                    if (exerciseName.includes(query)) {
                        matchingExercises.push(e);
                    }
                });

                matchingExercises.sort((a, b) => a.vezbam.localeCompare(b.vezbam));
                matchingExercises.forEach(e => {
                    const exerciseName = e.vezbam.toLowerCase();

                    if (!shownExercises.has(exerciseName)) {
                        shownExercises.add(exerciseName);

                        const muskul = e.muskul;
                        const gif = e.gif;

                        const resultDiv = document.createElement("div");
                        resultDiv.classList.add("search_result");

                        const img = document.createElement("img");
                        img.setAttribute("src", gif);

                        const textDiv = document.createElement("div");
                        textDiv.setAttribute("id", "text_description");

                        const h3 = document.createElement("h3");
                        h3.innerText = e.vezbam;

                        const h6 = document.createElement("h6");
                        h6.innerText = Array.isArray(muskul) ? muskul.join(", ") : muskul;

                        textDiv.appendChild(h3);
                        textDiv.appendChild(h6);
                        resultDiv.appendChild(img);
                        resultDiv.appendChild(textDiv);
                        take_search_results.appendChild(resultDiv);
                    }
                });
            });
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

let active_aside = 0
let changeX = document.getElementById("change_to_X")
creat_nav_dom.addEventListener("click", (e) => {
    let take_search_results = document.getElementById("search_results")
    let take_search_input = document.getElementById("search_input")
    let take_id = e.target
    console.log(take_id.getAttribute("id"))

    if (take_id.getAttribute("id") === "search" || take_id.getAttribute("id") === "one" || take_id.getAttribute("id") === "two" || take_id.getAttribute("id") === "search_input") {
        create_search_bar.style.width = "65%"
        create_search_bar.style.height = "70%"
        let deleting = changeX.getAttribute("d")
        take_search_input.style.display = "block";
        active_aside = 2
        deleting.remove
        changeX.setAttribute("d", "M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z")

    } else {

        take_search_results.style.height = "0%"
        take_search_input.style.display = "none";
        take_search_input.value = ""
        take_search_results.style.padding = "0%"
        take_search_results.innerHTML = ""
        create_search_bar.style.width = "0%"
        create_search_bar.style.height = "0%"
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
        take_filter_section.style.height = "200px"
        filter_active++

    } else {

        take_filter_section.style.height = "0px"
        filter_active = 0
    }
}

let takee = document.getElementById("exercises")
take_filter_section.addEventListener("click", (e) => {

    let take_filter = e.target
    console.log(take_filter_section)
    let ime_na_muskul = take_filter.getAttribute("class")


    if (take_filter.getAttribute("value") === "inactive") {

        take_filter.style.backgroundColor = `gray`
        take_filter.setAttribute("value", "active")
        take_filter.innerHTML += `<svg id="close" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 422c-44.3 0-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90s86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422m0-362C141.1 60 48 153.1 48 268s93.1 208 208 208 208-93.1 208-208S370.9 60 256 60z"></path><path d="M360 181.1L330.9 152 256 226.9 181.1 152 152 181.1l74.9 74.9-74.9 74.9 29.1 29.1 74.9-74.9 74.9 74.9 29.1-29.1-74.9-74.9z"></path></svg>`
        muskulii.push(ime_na_muskul)
        for (ess of takee.children) {

            if (muskulii.includes(ess.getAttribute("value"))) {
                ess.style.display = "flex"
            } else {
                for (a of ess.getAttribute("value").split(",")) {
                    if (muskulii.includes(a)) {
                        ess.style.display = "flex"
                        break
                    } else {
                        ess.style.display = "none"
                    }
                    console.log(a)
                }
            }

        }

    } else if (take_filter.getAttribute("value") === "active") {

        take_filter.style.backgroundColor = "transparent"
        const index = muskulii.indexOf(ime_na_muskul);
        if (index !== -1) {
            muskulii.splice(index, 1);
        }
        console.log(muskulii)
        console.log(take_filter)
        console.log(ime_na_muskul)

        console.log("tuka e lista za muskuli: " + muskulii)
        take_filter.innerHTML = ime_na_muskul
        filter_active--

        take_filter.setAttribute("value", "inactive")

        if (muskulii.length === 0) {
            for (ess of takee.children) {

                ess.style.display = "flex"
            }

        } else {
            for (ess of takee.children) {
                console.log(ess)
                if (muskulii.includes(ess.getAttribute("value"))) {
                    ess.style.display = "flex"
                } else {
                    for (a of ess.getAttribute("value").split(",")) {
                        if (muskulii.includes(a)) {
                            ess.style.display = "flex"
                            break
                        } else {
                            ess.style.display = "none"
                        }
                        console.log(a)
                    }
                }
            }
        }
        console.log(muskulii)
    } else {

        console.log(muskulii)
    }
})

let take_aside = document.querySelector("aside")

document.getElementById("burger_mehnu").addEventListener("click", (e) => {
    console.log(e.target.getAttribute("id"))
    if (active_aside === 1 || e.target.getAttribute("d") !== "M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z") {
        take_aside.style.left = "100%"
        active_aside = 0
        take_body.style.overflow = "auto"
        // take_body.style.overflow = "hidden"

    } else if (e.target.getAttribute("id") === "change_to_X" || e.target.getAttribute("id") === "change_to_w" && active_aside === 0) {
        console.log(e.target.getAttribute("id"))
        console.log("heheh")
        console.log(active_aside)
        if (window.innerWidth > 720) {
            take_aside.style.left = "70%"
        } else {
            take_aside.style.left = "0%"
        }
        console.log(take_aside)
        // takee.style.overflow = "hidden"
        active_aside = 1
        take_body.style.overflow = "hidden"
        // take_body.style.overflow = "hidden"
    }
    else {
        take_aside.style.left = "100%"
        active_aside = 0
        take_body.style.overflow = "hidden"
    }


})

/*
    activeDiv.children[0] = slika
    activeDiv.children[1] = desc ili ti h6
    activeDiv.children[2] = h3 ili ime na vezbata
    activeDiv.children[3] = kontejnerot za settings

*/

let active_ex = 0;
const addButton = document.createElement("button");
addButton.setAttribute("id", "addBTNexercise");
let prevActive = null;

document.getElementById("exercises").addEventListener("click", (e) => {
    const clickedDiv = e.target.closest("div");

    if (!clickedDiv || clickedDiv.getAttribute("id") !== "exercise") return;

    // CASE 1: Clicked the currently active div => collapse it
    if (prevActive === clickedDiv) {
        collapse(prevActive);
        active_ex = 0;
        prevActive = null;
        return;
    }

    // CASE 2: Clicked a different div while one is active => collapse old, expand new
    if (prevActive) collapse(prevActive);

    expand(clickedDiv);
    prevActive = clickedDiv;
    active_ex = 1;
    console.log(active_ex)

});

function collapse(div) {
    div.children[0].style.width = "100%";
    div.querySelector("h3").style.width = "100%";
    div.querySelector("h3").style.textAlign = "center";
    div.children[1].style.fontSize = "0px";
    div.children[1].style.height = "0px";

    if (window.innerWidth > 920) {
        div.style.width = "25%";
        div.style.height = "60vh";
    } else {
        div.style.width = "40%";
        div.style.height = "30vh";
    }

    div.children[3].style.display = "none";
    div.children[3].style.borderRadius = "5px";

    const existingBtn = document.querySelector("#addBTNexercise");
    if (existingBtn) existingBtn.remove();

    div.style.marginBottom = "1%";
}

function expand(div) {
    div.scrollIntoView({ behavior: "smooth", block: "center" });
    div.children[0].style.width = "40%";
    div.children[1].style.display = "inline-block";
    div.children[1].style.fontSize = "13px";
    div.children[1].style.width = "50%";
    div.children[1].style.height = "100px";
    div.children[1].style.textAlign = "left";

    if (window.innerWidth > 920) {
        div.style.height = "80vh";
    } else {
        div.style.height = "30vh";
    }

    div.style.width = "85%";
    div.querySelector("h3").style.width = "100%";
    div.querySelector("h3").style.display = "block";
    div.querySelector("h3").style.textAlign = "left";

    div.children[3].style.display = "flex";
    div.children[3].style.height = "30%";
    div.children[3].style.padding = "2%";

    addButton.innerHTML = `Add exercise <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.125 48 48 141.125 48 256s93.125 208 208 208 208-93.125 208-208S370.875 48 256 48zm107 229h-86v86h-42v-86h-86v-42h86v-86h42v86h86v42z"></path></svg>`;
    div.children[3].appendChild(addButton);
    document.querySelector("#addBTNexercise").style.fill = darkTheme.getItem("themeAtr")
    document.querySelector("#addBTNexercise").style.border = `${darkTheme.getItem("themeAtr")} 1px solid`
    document.querySelector("#addBTNexercise").style.color = darkTheme.getItem("themeAtr")


}





const headerSection = document.querySelector("header")
headerSection.querySelector("img").setAttribute("src", `${darkTheme.getItem("themeLogo")}`)
document.querySelector("body").style.backgroundColor = `${darkTheme.getItem("theme")}`
document.querySelector("aside").style.backgroundColor = `${darkTheme.getItem("theme")}`
document.querySelector("body").style.color = `${darkTheme.getItem("themeAtr")}`
document.querySelector("#search_results").style.backgroundColor = `${darkTheme.getItem("theme")}`
document.querySelector("#nav_bar").style.backgroundColor = `${darkTheme.getItem("theme")}`
document.querySelector("#nav_bar").style.fill = `${darkTheme.getItem("themeAtr")}`
document.querySelector("#search_input").style.color = `${darkTheme.getItem("themeAtr")}`
document.querySelector("aside").querySelectorAll("button").forEach(e => {
    e.style.color = `${darkTheme.getItem("themeAtr")}`
    e.style.fill = `${darkTheme.getItem("themeAtr")}`
})
document.querySelector("#search_input").style.backgroundColor = `${darkTheme.getItem("theme")}`
setTimeout(() => {
    takee.querySelectorAll("#exercise").forEach((e) => {
        e.style.border = `${darkTheme.getItem("themeAtr")} solid 1px`
    })
}, 800)

const BtnDarkMode = document.querySelector("#darkmode")
BtnDarkMode.addEventListener("click", () => {
    if (darkTheme.getItem("theme") === "white") {
        darkTheme.setItem("theme", "black")
        darkTheme.setItem("themeAtr", "white")
        darkTheme.setItem("themeLogo", "/Screenshot 2025-01-21 233337.png")
    } else if (darkTheme.getItem("theme") === "black") {
        darkTheme.setItem("theme", "white")
        darkTheme.setItem("themeAtr", "black")
        darkTheme.setItem("themeLogo", "/Screenshot 2025-01-21 232505.png")
    } else {
        darkTheme.setItem("theme", "black")
        darkTheme.setItem("themeAtr", "white")
        darkTheme.setItem("themeLogo", "/Screenshot 2025-01-21 233337.png")
    }
    headerSection.querySelector("img").setAttribute("src", `${darkTheme.getItem("themeLogo")}`)
    document.querySelector("body").style.backgroundColor = `${darkTheme.getItem("theme")}`
    document.querySelector("aside").style.fill = `red`
    document.querySelector("body").style.color = `${darkTheme.getItem("themeAtr")}`
    document.querySelector("#nav_bar").style.backgroundColor = `${darkTheme.getItem("theme")}`
    document.querySelector("#nav_bar").style.fill = `${darkTheme.getItem("themeAtr")}`
    document.querySelector("#search_input").style.color = `${darkTheme.getItem("themeAtr")}`
    document.querySelector("aside").style.backgroundColor = `${darkTheme.getItem("theme")}`
    document.querySelector("#search_results").style.backgroundColor = `${darkTheme.getItem("theme")}`
    document.querySelector("aside").querySelectorAll("button").forEach(e => {
        e.style.color = `${darkTheme.getItem("themeAtr")}`
        e.style.fill = `${darkTheme.getItem("themeAtr")}`
    })
    document.querySelector("#search_input").style.backgroundColor = `${darkTheme.getItem("theme")}`
    takee.querySelectorAll("#exercise").forEach((e) => {
        e.style.border = `${darkTheme.getItem("themeAtr")} solid 0.5px`
    })

})


