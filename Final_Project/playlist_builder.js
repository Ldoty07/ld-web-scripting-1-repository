const songInput = document.querySelector("#songInput");
const artistInput = document.querySelector("#artistInput");
const genreSelect = document.querySelector("#genreSelect");
const addBtn = document.querySelector("#addBtn");
const statusMsg = document.querySelector("#statusMsg");
const songList = document.querySelector("#songList");
const listTotal = document.querySelector("#listTotal");
const genreFilter = document.querySelector("#genreFilter");
const filterBtn = document.querySelector("#filterBtn");
const clearBtn = document.querySelector("#clearBtn");
let songs = loadSongs();
let songFilter = "All";

function loadSongs() {
    const saved = localStorage.getItem("songs");

    if (!saved) return [];
    try {
        return JSON.parse(saved);
    } catch {
        return [];
    }
}

function saveSongs() {
    localStorage.setItem("songs", JSON.stringify(songs));
}

function addSong() {
    statusMsg.textContent = "";

    const songText = songInput.value.trim();
    const artistText = artistInput.value.trim();

    if (!songText) {
        statusMsg.textContent = "Error. Please enter a song name.";
        songInput.value = "";
        return;
    }

    if (!artistText) {
        statusMsg.textContent = "Error. Please enter an artist.";
        artistInput.value = "";
        return;
    }

    const genreValue = genreSelect.value;

    const newSong = {
        song: songText,
        genre: genreValue,
        artist: artistText,
    }

    songs.push(newSong);
    songInput.value = "";
    artistInput.value = "";

    saveSongs();
    renderSongs();
}

function filterSongs() {
    return songs.filter(song => songFilter === "All" || song.genre === songFilter);
}

function renderSongs() {
    songList.innerHTML = "";
    const filteredSongs = filterSongs();
    console.log(filteredSongs);

    filteredSongs.forEach((song, index) => {
        console.log(song);
        const li = document.createElement("li");
        li.style.whiteSpace = "pre";
        li.textContent = `${song.song} by ${song.artist}    |    ${song.genre}`;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("btn");
        delBtn.id = ("delBtn");

        delBtn.addEventListener("click", () => {
            songs.splice(index, 1);
            saveSongs();
            renderSongs();
        });

        li.appendChild(delBtn);
        songList.appendChild(li);
    });

    listTotal.textContent = `Playlist length: ${songs.length}`;
}

function clearSongs() {
    songs = [];
    saveSongs();
    renderSongs();
}

addBtn.addEventListener("click", addSong);

filterBtn.addEventListener("click", () => {
    songFilter = genreFilter.value;
    renderSongs();
});

clearBtn.addEventListener("click", clearSongs);

renderSongs();