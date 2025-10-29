
// =========================
// ===== PWA INSTALL =======
// =========================
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

let deferredPrompt = null;
const installBtn = document.getElementById("install-btn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "";
});

installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    installBtn.style.display = "none";
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
});

window.addEventListener("appinstalled", () => {
    installBtn.style.display = "none";
});

// This is temporary until we have a backend
// to provide a song and search query

const song = "Cant hold us maclemore";

// take txt and convert it into URL Friendly:
// encodeURIComponent("Hello World")

const searchQuery =
    "https://itunes.apple.com/search?term=" + encodeURIComponent(song);

let searchResult;

fetch(searchQuery)
    .then((response) => response.json())
    .then((json) => {
        if (json && Array.isArray(json.results)) {
            json.results = json.results.filter((item) => item.kind === "song");
        }

        searchResult = json;
        console.log(searchResult);

        if (searchResult.results && searchResult.results.length > 0) {
            const first = searchResult.results[0];
            const artworkUrl = first.artworkUrl100.replace("100x100", "5000x5000");
            const mainImg = document.querySelector("img");
            mainImg.src = artworkUrl;
            mainImg.alt = first.trackName + " by " + first.artistName;

            const titleElem = document.querySelector(".title");
            const artistElem = document.querySelector(".artist");
            if (titleElem) {
                titleElem.textContent = first.trackName;
            }
            if (artistElem) {
                artistElem.textContent = first.artistName;
            }

            // Insert bold E if song is explicit
            const explicitDiv = document.querySelector(".explicitcy");
            if (explicitDiv) {
                // Remove any previous explicit marker
                explicitDiv.querySelectorAll(".explicit-marker").forEach(el => el.remove());
                if (first.trackExplicitness && first.trackExplicitness === "explicit") {
                    const boldE = document.createElement("b");
                    boldE.className = "explicit-marker";
                    boldE.textContent = "E";
                    explicitDiv.insertBefore(boldE, explicitDiv.firstChild);
                }
            }

            // === Update the details class according to prompt ===
            // Format: 
            // Genre: [Genre Name]
            //
            // Release: [Date in format: Month Day, Year]
            const detailsElem = document.querySelector(".details");
            if (detailsElem) {
                let genre = first.primaryGenreName || "";
                let releaseDateStr = "";
                if (first.releaseDate) {
                    const dateObj = new Date(first.releaseDate);
                    // e.g.: August 16, 2011
                    const month = dateObj.toLocaleString("en-US", { month: "long" });
                    const day = dateObj.getDate();
                    const year = dateObj.getFullYear();
                    releaseDateStr = `${month} ${day}, ${year}`;
                }
                detailsElem.innerHTML = `
                    Genre: ${genre}<br>
                    Release: ${releaseDateStr}
                `;
            }
        } else {
            console.warn("No song results found.");
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
