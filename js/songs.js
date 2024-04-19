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

    // Replace 'YOUR_API_KEY' with your actual Last.fm API key
    const apiKey = '3da40bf1e588d1a88f31e2e090f6e5b4';

    // Fetch top tracks from Last.fm API
    fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`)
        .then(response => response.json())
        .then(data => {
            // Extract top tracks from the response
            const topTracks = data.tracks.track;

            // Iterate through the top tracks and create song items
            topTracks.forEach(track => {
                const songItem = document.createElement('div');
                songItem.classList.add('song-item');

                const img = document.createElement('img');
                img.src = track.image[2]['#text']; // Large image
                img.alt = track.name;
                songItem.appendChild(img);            

                const title = document.createElement('h3');
                title.textContent = track.name;
                songItem.appendChild(title);

                const likeBtn = document.createElement('button');
                likeBtn.textContent = 'Like';
                likeBtn.classList.add('like-btn');
                songItem.appendChild(likeBtn);

                carousel.appendChild(songItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
