let darkTheme = localStorage
const Body = document.querySelector("body")
const navBar = document.querySelector("#nav_bar")
const idImg = document.querySelector("#logo")
let take_aside = document.querySelector("aside")


navBar.style.backgroundColor = "transparent"
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

})


document.getElementById("loginBTN").addEventListener("click", () => {
    const RegUser = async () => {
        try {
            if (document.getElementById("nameRegg").value !== "" && document.getElementById("emailRegg").value !== "") {
                localStorage.setItem("loginInfo", document.getElementById("nameRegg").value)
                const res = await axios.post("/login", {
                    name: document.getElementById("nameRegg").value,
                    email: document.getElementById("emailRegg").value
                });
                if (res.data.redirect) {
                    window.location.href = res.data.redirect;
                }
            } else {
                document.querySelector("p").innerHTML = "Please fill out the form"
            }

        } catch (err) {
            localStorage.removeItem("loginInfo")
            window.location.href = err.response.data.redirect
            console.error("inccorect info")
        }
    }
    RegUser()
})
