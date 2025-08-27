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
document.getElementById("logOutBtn").style.color = `${darkTheme.getItem("themeAtr")} `
document.getElementById("createFolder").style.color = `${darkTheme.getItem("themeAtr")} `
document.getElementById("createFolder").style.fill = `${darkTheme.getItem("themeAtr")} `
document.getElementById("FolderCreateTab").style.backgroundColor = darkTheme.getItem("theme")
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

document.getElementById("createFolder").addEventListener("click", () => {
    document.getElementById("FolderCreateTab").style.display = "flex"
    document.querySelector("body").style.overflowY = "none"
})

// Function to display folders
function getUserFolders() {
  const username = localStorage.getItem("loginInfo");
  if (!username) return [];

  const key = `folders_${username}`;
  const raw = localStorage.getItem(key);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);

    // Accept both shapes: [] or { folders: [] }
    const arr = Array.isArray(parsed)
      ? parsed
      : (parsed && Array.isArray(parsed.folders) ? parsed.folders : []);

    // Migrate to the clean [] shape for future reads
    localStorage.setItem(key, JSON.stringify(arr));
    return arr;
  } catch (e) {
    console.warn("Invalid folders JSON in localStorage. Resetting.", e);
    localStorage.removeItem(key);
    return [];
  }
}

// Save folders for the current user
function setUserFolders(folders) {
    console.log(folders)
    const username = localStorage.getItem("loginInfo");
    if (!username) return;
    localStorage.setItem(`folders_${username}`, JSON.stringify(folders));
}

// Display folders
function displayFolders() {
  const folders = getUserFolders(); // always an array now
  const container = document.querySelector("#foldersContainer");
  container.innerHTML = "";

  const header = document.createElement("p");
  header.textContent = "Here are your folders:";
  header.id = "foldersHeader";
  header.style.color = "#aaa";
  header.style.textAlign = "center";
  container.appendChild(header);

  folders.forEach((folder, index) => {
    const div = document.createElement("div");
    div.classList.add("folder");
    div.setAttribute("id", folder.name);
    div.dataset.index = index;

    const exercisesSafe = Array.isArray(folder.exercises) ? folder.exercises : [];

    div.innerHTML = `
      <span class="folder-name">${folder.name}</span>
      <span class="delete-btn" style="float:right; cursor:pointer;">
        <svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
        </svg>
      </span>
      <div class="exercises">
        ${exercisesSafe.map(ex => `<div class="exercise-item">${ex}</div>`).join("")}
      </div>
    `;

    div.addEventListener("click", e => {
      if (!e.target.closest(".delete-btn") && !e.target.closest("#exercise")) {
        div.classList.toggle("expanded");
      }
    });

    div.querySelector(".delete-btn").addEventListener("click", () => {
      const updated = getUserFolders(); // re-read to be safe
      updated.splice(index, 1);
      setUserFolders(updated);
      displayFolders();
      // If you keep the delete loop below, guard selectors to avoid errors
      const exWrap = div.querySelector(".exercises");
      if (exWrap) {
        exWrap.querySelectorAll("#exercise").forEach(el => {
          const h3 = el.querySelector("h3");
          if (h3) delteFunc(h3.textContent);
        });
      }
    });

    container.appendChild(div);
  });
}

// Event listener to create a new folder
document.querySelector("#submitBTNfolder").addEventListener("click", () => {
  const folderInput = document.querySelector("#foldername");
  const folderName = folderInput.value.trim();
  if (!folderName) return;

  let folders = getUserFolders(); // guaranteed array
  if (folders.length >= 5) {
    alert("You can only create a maximum of 5 folders.");
    return;
  }
  if (!folders.some(f => f.name === folderName)) {
    folders.push({ name: folderName, exercises: [] });
    setUserFolders(folders);
    displayFolders(); // refresh UI after add
  } else {
    alert("Folder name already exists.");
  }
  folderInput.value = "";
});

// Initialize folder display
// displayFolders();

document.getElementById("closeTab").addEventListener("click", () => {
    document.getElementById("FolderCreateTab").style.display = "none"
    document.querySelector("body").style.overflowY = "auto"
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
    document.getElementById("FolderCreateTab").style.backgroundColor = darkTheme.getItem("theme")
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
            e.style.border = `${darkTheme.getItem("themeAtr")} solid 1px`
            e.children[3].style.color = `${darkTheme.getItem("themeAtr")} `

        })
        document.querySelectorAll(".saveNoteBTN").forEach((e) => {
            e.style.color = `${darkTheme.getItem("themeAtr")} `
        })
    }, 800)
    document.getElementById("logOutBtn").style.color = `${darkTheme.getItem("themeAtr")} `
    document.getElementById("createFolder").style.color = `${darkTheme.getItem("themeAtr")} `
    document.getElementById("createFolder").style.fill = `${darkTheme.getItem("themeAtr")} `
})

const DisplySaved = async () => {
    try {
        if (localStorage.getItem("loginInfo")) {
            const finduserFromDb = async () => {
                const res = await axios.get("/api/user")
                const userFound = res.data.filter((e) => {
                    return e.userName === localStorage.getItem("loginInfo")
                })
                localStorage.setItem("accountID", userFound[0].id)
            }
            await finduserFromDb()
        }

        // Ensure folder exists in localStorage and DOM
        function ensureFolderExists(folderName) {
            if (!folderName) return;
            let folders = getUserFolders();
            if (!folders.some(f => f.name === folderName)) {
                folders.push({ name: folderName, exercises: [] });
                setUserFolders(folders);
                displayFolders(); // re-render UI to include new folder
            }
        }

        // Main function to display exercises
        const ExercisesFetch = async (currentsavedEx, currentFolderName) => {
            try {
                // Auto-create missing folder
                ensureFolderExists(currentFolderName);

                const res = await axios.get("/vezbi.json");
                const displayThese = res.data.vezbi.filter(e => e.vezbam === currentsavedEx);
                if (!displayThese.length) return;

                const displayThes = displayThese[0];

                // Main container
                let create_banner = document.createElement("div");
                create_banner.setAttribute("id", "exercise");
                create_banner.style.width = "95%";
                create_banner.style.margin = "2%";
                create_banner.style.border = `${darkTheme.getItem("themeAtr")} solid 1px`;
                create_banner.style.padding = "2%";
                create_banner.style.position = "relative";
                create_banner.style.display = "flex";

                // Exercise title
                let create_text_field = document.createElement("h3");
                create_text_field.style.textAlign = "center";
                create_text_field.innerText = displayThes["vezbam"];
                create_banner.appendChild(create_text_field);

                // Row: image + info
                const rowDiv = document.createElement("div");
                rowDiv.style.display = "flex";
                rowDiv.style.marginTop = "1%";
                const create_img_banner = document.createElement("img");
                create_img_banner.setAttribute("src", displayThes["gif"]);
                create_img_banner.style.width = "40%";
                create_img_banner.style.height = "100%";
                create_img_banner.style.marginRight = "4%";

                let create_h6 = document.createElement("h6");
                create_h6.innerText = `Difficulty: ${displayThes["nivo_tesko"]}\nWith Weights: ${displayThes["so_teg"]}\nMuscle Group: ${displayThes["muskul"]}`;
                create_h6.style.fontSize = "13px";
                create_h6.style.whiteSpace = "pre-line";
                create_h6.style.flex = "1";
                create_h6.style.textAlign = "left";
                create_h6.style.height = "80px";

                rowDiv.appendChild(create_img_banner);
                rowDiv.appendChild(create_h6);
                create_banner.appendChild(rowDiv);

                // Trash button
                const addButton = document.createElement("button");
                addButton.setAttribute("id", "addBTNexercise");
                addButton.style.position = "absolute";
                addButton.style.right = "-15%";
                addButton.innerHTML = `<svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 448 512" height="5px" width="5px" xmlns="http://www.w3.org/2000/svg"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>`;
                addButton.addEventListener("click", () => {
                    delteFunc(displayThes["vezbam"]);
                    create_banner.style.display = "none";
                });
                create_banner.appendChild(addButton);

                // Notes
                const contianerArea = document.createElement("div");
                contianerArea.style.width = "100%";
                contianerArea.style.display = "flex";
                contianerArea.style.justifyContent = "space-between";
                contianerArea.style.marginTop = "2%";

                let settings = document.createElement("textarea");
                settings.setAttribute("class", "textareaNote");
                settings.setAttribute("placeholder", "Note");
                settings.style.backgroundColor = "transparent";
                settings.style.maxHeight = "100%";
                settings.style.color = `${darkTheme.getItem("themeAtr")}`;

                const accountID = parseInt(localStorage.getItem("accountID"));
                axios.get(`/api/user/${accountID}`)
                    .then(res => {
                        const found = res.data.exercisesNotes.find(e => e.name === displayThes["vezbam"]);
                        settings.value = (found && found.note !== "no note written") ? found.note : "";
                    }).catch(err => console.error("Put failed", err));

                const noteSave = document.createElement("button");
                noteSave.innerHTML = "Save Note";
                noteSave.setAttribute("class", "saveNoteBTN");
                noteSave.style.color = `${darkTheme.getItem("themeAtr")}`;
                noteSave.addEventListener("click", e => {
                    axios.put(`/api/user/${accountID}`, {
                        userName: localStorage.getItem("loginInfo"),
                        Exercise: { name: displayThes["vezbam"], note: settings.value }
                    }).then(res => console.log("Added:", res))
                      .catch(err => console.error("Put failed", err));
                });

                contianerArea.appendChild(settings);
                contianerArea.appendChild(noteSave);
                create_banner.appendChild(contianerArea);

                // Append to folder
                const folder = document.getElementById(currentFolderName);
                if (folder) {
                    const exercises = folder.querySelector(".exercises");
                    if (exercises) exercises.appendChild(create_banner);
                }

            } catch (err) {
                console.error("json not fetched", err);
            }
        };

        // Fetch saved exercises and display
        setTimeout(async () => {
            const res = await axios.get(`api/user/${parseInt(localStorage.getItem("accountID"))}`);
            document.querySelector("#exercises").innerHTML = "";
            res.data.exercisesNotes.forEach((e) => {
                ensureFolderExists(e.folderName); // auto-create missing folder
                ExercisesFetch(e.name, e.folderName);
            });
        }, 500);

        document.querySelector("#exercises").innerHTML = "loading...";

    } catch {
        document.getElementById("activity").innerHTML = `No saves...`;
    }
};

if (localStorage.getItem("loginInfo")) {
    document.getElementById("welcome").innerHTML = `Welcome, ${localStorage.getItem("loginInfo")}`
    document.getElementById("activity").innerHTML = ``
    document.getElementById("exercises").innerHTML = `No saves`
    document.getElementById("logOutBtn").style.display = "flex"
    document.getElementById("logOutBtn").addEventListener("click", () => {
        localStorage.removeItem("loginInfo")
        window.location.href = "/account"
    })
    localStorage.setItem("savedOne", "0")
    displayFolders(); 
    DisplySaved()
    

} else {
    localStorage.setItem("savedOne", "10")
    document.getElementById("welcome").innerHTML = ``
    document.getElementById("logOutBtn").style.display = "none"
}


const delteFunc = async (EXname) => {
    const exerciseName = EXname;
    const res = await axios.get(`/api/user/${parseInt(localStorage.getItem("accountID"))}`)
    const filtered = res.data.exercisesNotes.filter((e) => {
        return e.name === exerciseName
    })
    const encodedName = encodeURIComponent(exerciseName);
    if (filtered) {


        axios.delete(`/api/user/${parseInt(localStorage.getItem("accountID"))}/exercisesNotes?name=${encodedName}`)
            .then(res => {
                console.log("Deleted:", res);
            })
            .catch(err => {
                console.error("Delete failed", err);
                window.location.href = "/login";
            });
    }
}