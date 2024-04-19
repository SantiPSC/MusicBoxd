document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carousel = document.querySelector('.carousel');

    // Add event listeners to buttons
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -400, // Adjust this value based on your song item width
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: 400, // Adjust this value based on your song item width
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');

    // Fetch top tracks from MusicBrainz API
    fetch('https://musicbrainz.org/ws/2/recording?query=*&fmt=json')
        .then(response => response.json())
        .then(data => {
            // Extract recordings from the response
            const recordings = data.recordings;

            // Iterate through the recordings and create song items
            recordings.forEach(recording => {
                // Wait 1 second before creating the next song item
                let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
                sleep(100);
                const songItem = document.createElement('div');
                songItem.classList.add('song-item');

                // Fetching artist information for the recording from MusicBrainz API
                fetch(`https://musicbrainz.org/ws/2/recording/${recording.id}?inc=artist-credits&fmt=json`)
                    .then(response => response.json())
                    .then(artistData => {
                        // Extracting artist information
                        const artistCredits = artistData['artist-credit'];
                        if (artistCredits && artistCredits.length > 0) {
                            const artist = artistCredits[0].artist.name;

                            // Fetching cover art for the artist from Cover Art Archive API
                            fetch(`https://coverartarchive.org/release-group/?artist=${encodeURIComponent(artist)}`)
                                .then(response => response.json())
                                .then(coverData => {
                                    // Extracting the image URL from the Cover Art Archive API response
                                    if (coverData && coverData.length > 0 && coverData[0].images && coverData[0].images.length > 0) {
                                        const imageUrl = coverData[0].images[0].image;
                                        console.log(imageUrl);

                                        // Creating and appending the image
                                        const img = document.createElement('img');
                                        img.src = imageUrl;
                                        img.alt = artist;
                                        songItem.appendChild(img);
                                    }
                                })
                                .catch(error => {
                                    console.error('Error fetching cover art data:', error);
                                });
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching artist data:', error);
                    });

                // Creating and appending other elements like title and like button
                const title = document.createElement('h3');
                title.textContent = recording.title;
                songItem.appendChild(title);

                const likeBtn = document.createElement('button');
                likeBtn.textContent = 'Like';
                likeBtn.classList.add('like-btn');
                songItem.appendChild(likeBtn);

                // Appending the song item to the carousel
                carousel.appendChild(songItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
