function requestSong() {
    const songs = [
        "Can't Hold Us Macklemore",
        "GTA 2 Rarin",
        "Assumptions Sam Gellaitry",
        "Levitating Dua Lipa",
        "Loyal Odesza",
        "How Long Charlie Puth",
        "Hyperspace Sam I"
    ]
    return songs[Math.floor(Math.random() * songs.length)];
}

export { requestSong };