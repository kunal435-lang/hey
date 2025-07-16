console.log("Let's write JS");

async function getsong() {
  try {
    let a = await fetch('http://127.0.0.1:5500/songs/');
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    let songs = [];
    for (let index = 0; index < as.length; index++) {
      const element = as[index];
      if (element.href.endsWith('.mp3')) {
        songs.push(element.href);
      }
    }
    console.log(songs);
    return songs;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
}

async function main() {
  let songs = await getsong();
  if (songs.length === 0) {
    console.error("No songs found.");
    return;
  }

  let songUl = document.querySelector('.songlist ul');
  let currentAudio = null;

  for (const song of songs) {
    let li = document.createElement('li');
    li.innerHTML = `<img class="invert" width="20" src="music.svg" alt=""> ${song}`;
    songUl.appendChild(li);



   li.addEventListener('click', () => {
      if (currentAudio && currentAudio.src !== song) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      if (currentAudio && currentAudio.src === song && !currentAudio.paused) {
        currentAudio.pause();
      } else {
   
        currentAudio = new Audio(song);
        currentAudio.play();
        currentAudio.addEventListener('loadedmetadata', () => {
          let duration = currentAudio.duration;
          console.log("Duration:", duration);
        });
      }
    });
  }
  await getSongs('songs/ncs')
    playMusic(songs[0], true)

 
    await displayAlbums()   

  play.addEventListener('click', () => {
    if (currentsong.paused) {
      currentsong.play()
      playbt.src = 'img/pause.svg'
    }
    else {
      currentsong.pause()
      pausebt.src = 'img/play.svg'
    }
  })
}
main();
