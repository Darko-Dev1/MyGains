let darkTheme = localStorage
const Body = document.querySelector("body")
const navBar = document.querySelector("#nav_bar")
const idImg = document.querySelector("#logo")
let take_aside = document.querySelector("aside")

navBar.style.backgroundColor = darkTheme.getItem("theme")
take_aside.style.backgroundColor = `${darkTheme.getItem("theme")}`
take_aside.style.color = `${darkTheme.getItem("themeAtr")}`
Body.style.backgroundColor = `${darkTheme.getItem("theme")}`
Body.style.color = `${darkTheme.getItem("themeAtr")}`
Body.style.fill = `${darkTheme.getItem("themeAtr")}`
idImg.setAttribute("src", `${darkTheme.getItem("themeLogo")}`)
take_aside.querySelectorAll("button").forEach(e => {
    e.style.color = `${darkTheme.getItem("themeAtr")}`
    e.style.fill = `${darkTheme.getItem("themeAtr")}`
})

// aside code

let active_aside = 0
document.getElementById("burger_mehnu").addEventListener("click", (e) => {
    if (active_aside === 1 || e.target.getAttribute("d") !== "M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z") {
        take_aside.style.left = "100%"
        active_aside = 0
        Body.style.overflow = "auto"
        // take_body.style.overflow = "hidden"

    } else if (e.target.getAttribute("id") === "change_to_X" || e.target.getAttribute("id") === "change_to_w" && active_aside === 0) {
        console.log(e.target.getAttribute("id"))
        if (window.innerWidth > 720) {
            take_aside.style.left = "70%"
        } else {
            take_aside.style.left = "0%"
        }

        // takee.style.overflow = "hidden"
        active_aside = 1
        Body.style.overflow = "hidden"
        // take_body.style.overflow = "hidden"
    }
    else {
        take_aside.style.left = "100%"
        active_aside = 0
        Body.style.overflow = "hidden"
    }


})

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
    idImg.setAttribute("src", `${darkTheme.getItem("themeLogo")}`)
    document.querySelector("body").style.backgroundColor = `${darkTheme.getItem("theme")}`
    document.querySelector("aside").style.fill = `red`
    document.querySelector("body").style.color = `${darkTheme.getItem("themeAtr")}`
    document.querySelector("#nav_bar").style.backgroundColor = `${darkTheme.getItem("theme")}`
    document.querySelector("#nav_bar").style.fill = `${darkTheme.getItem("themeAtr")}`
    document.querySelector("aside").style.backgroundColor = `${darkTheme.getItem("theme")}`
    document.querySelector("aside").querySelectorAll("button").forEach(e => {
        e.style.color = `${darkTheme.getItem("themeAtr")}`
        e.style.fill = `${darkTheme.getItem("themeAtr")}`
    })
    setTimeout(() => {
        document.querySelector("#exercises").querySelectorAll("#exercise").forEach((e) => {
            console.log(e)
            e.style.border = `${darkTheme.getItem("themeAtr")} solid 1px`
            e.children[3].style.color = `${darkTheme.getItem("themeAtr")} `
        })
    }, 800)

})



const DisplySaved = async () => {

    console.log(parseInt(localStorage.getItem("accountID")))
    try {
        if (localStorage.getItem("loginInfo")) {
            const finduserFromDb = async () => {

                const res = await axios.get("/api/user")
                console.log(localStorage.getItem("loginInfo"))
                const userFound = res.data.filter((e) => {
                    console.log(e.userName, localStorage.getItem("loginInfo"))
                    return e.userName === localStorage.getItem("loginInfo")
                })
                console.log(userFound)
                localStorage.setItem("accountID", userFound[0].id)
                console.log(localStorage.getItem("accountID"))


            }
            await finduserFromDb()

        }

        const ExercisesFetch = async (currentsavedEx) => {
            try {

                const res = await axios.get("/vezbi.json")
                const displayThese = res.data.vezbi.filter((e) => {
                    return e.vezbam === currentsavedEx
                })
                const displayThes = displayThese[0]
                let create_banner = document.createElement("div")
                create_banner.setAttribute("id", "exercise")
                let create_img_banner = document.createElement("img")

                let take_gifs = displayThes["gif"]
                let take_name = displayThes["vezbam"]
                let take_muskul = displayThes["muskul"]
                create_img_banner.setAttribute("src", take_gifs)
                let create_text_field = document.createElement("h3")
                create_text_field.style.textAlign = "center"
                create_text_field.innerText = take_name
                create_text_field.style.padding = "3%"
                create_banner.appendChild(create_img_banner)
                let take_excercises = document.querySelector("#exercises")
                let create_h5 = document.createElement("h6")
                create_h5.innerText = `Difficulty: ${displayThes["nivo_tesko"]} \n With Weights: ${displayThes["so_teg"]} \n Muscle Group: ${displayThes["muskul"]} `
                create_banner.appendChild(create_h5)
                create_banner.appendChild(create_text_field)
                create_banner.setAttribute("value", take_muskul)
                let settings = document.createElement("textarea")
                settings.setAttribute("class", "textareaNote")
                settings.setAttribute("placeholder", "Note")
                settings.style.backgroundColor = "transparent"
                settings.style.width = "100%"
                settings.style.maxHeight = "25%"
                settings.style.color = `${darkTheme.getItem("themeAtr")}`
                create_banner.appendChild(settings)
                create_banner.style.width = "85%"
                take_excercises.appendChild(create_banner)

                create_banner.scrollIntoView({ behavior: "smooth", block: "center" });
                create_banner.children[0].style.width = "40%";
                create_banner.children[1].style.display = "inline-block";
                create_banner.children[0].style.marginRight = "4%"
                create_banner.children[1].style.fontSize = "13px";
                create_banner.children[1].style.width = "50%";
                create_banner.children[1].style.height = "100px";
                create_banner.children[1].style.textAlign = "left";
                create_banner.style.paddingBottom = "5%"


                if (window.innerWidth > 920) {
                    create_banner.style.height = "80vh";
                } else {
                    create_banner.style.height = "30vh";
                }

                create_banner.style.width = "85%";
                create_banner.style.margin = "2%"
                create_banner.querySelector("h3").style.width = "100%";
                create_banner.querySelector("h3").style.display = "block";
                create_banner.querySelector("h3").style.textAlign = "center";
                create_banner.children[3].style.display = "flex";
                create_banner.children[3].style.height = "30%";
                create_banner.children[3].style.padding = "2%";
                create_banner.style.border = `${darkTheme.getItem("themeAtr")} solid 1px`
            } catch {
                console.error("json not fetched")
            }
        }
        setTimeout(async () => {
            const res = await axios.get(`api/user/${parseInt(localStorage.getItem("accountID"))}`)
            console.log(parseInt(localStorage.getItem("accountID")))
            document.querySelector("#exercises").innerHTML = ""
            res.data.exercisesNotes.forEach((e) => {
                ExercisesFetch(e.name)
            })
        }, 500)
        document.querySelector("#exercises").innerHTML = "loading..."

    } catch {
        document.getElementById("activity").innerHTML = `No saves...`
    }
}


if (localStorage.getItem("loginInfo")) {
    document.getElementById("welcome").innerHTML = `Welcome, ${localStorage.getItem("loginInfo")}`
    document.getElementById("activity").innerHTML = ``
    document.getElementById("exercises").innerHTML = `No saves`
    document.getElementById("logOutBtn").style.display = "block"
    document.getElementById("logOutBtn").addEventListener("click", () => {
        localStorage.removeItem("loginInfo")
        window.location.href = "/account"
    })
    localStorage.setItem("savedOne", "0")
    DisplySaved()

} else {
    localStorage.setItem("savedOne", "10")
    document.getElementById("welcome").innerHTML = ``
    document.getElementById("logOutBtn").style.display = "none"
}