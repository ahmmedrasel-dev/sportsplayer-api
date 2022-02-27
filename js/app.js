const getResult = () => {
  let searchValue = document.getElementById('search-box').value;
  document.getElementById('loader').style.display = 'block';
  // console.log(searchValue);

  document.getElementById('player-container').innerHTML = ''
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.player == null) {
        document.getElementById('loader').style.display = 'block';
      } else {
        displayResult(data.player);
        document.getElementById('loader').style.display = 'none';
      }
    });
}


const displayResult = (players => {
  document.getElementById('loader').style.display = 'none';
  for (const player of players) {
    let playerParentDiv = document.getElementById('player-container');
    let div = document.createElement('div')
    div.classList.add('col-md-4')
    div.innerHTML = `
     <div class="card">
        <img src="${player.strThumb}" class="card-img-top" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title">Full Name : ${player.strPlayer}</h5>
          <h5 class="card-title">Nationality: ${player.strNationality}</h5>
          <a href="#" class="btn btn-primary" onclick="getDetails('${player.idPlayer}')">Check Details</a>
        </div>
      </div>
    `;
    playerParentDiv.appendChild(div);
  }

})

const getDetails = playerId => {
  document.getElementById('player-details').innerHTML = ''
  document.getElementById('loader').style.display = 'block';
  const url2 = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;

  fetch(url2)
    .then(response => response.json())
    .then(data => displayDetails(data.players[0]))
}

const displayDetails = playerDetails => {
  if (playerDetails) {
    document.getElementById('loader').style.display = 'none';
  } else {
    document.getElementById('loader').style.display = 'block';
  }
  const detailsContainer = document.getElementById('player-details')
  const div = document.createElement('div');
  div.classList.add('col-12')
  div.innerHTML = `
    <div class="card">
       <div class="card-header">
          <h2 class="text-center">Players Details</h2>
        </div>
      <img src="${playerDetails.strThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${playerDetails.strPlayer}</h5>
        <p class="card-text">${playerDetails.strDescriptionEN.slice(0, 150)}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Date of Birth: ${playerDetails.dateBorn}</li>
        <li class="list-group-item">Playing: ${playerDetails.strSport}</li>
        <li class="list-group-item">Team of: ${playerDetails.strNationality}</li>
      </ul>
      <div class="card-body">
        <a href="${playerDetails.strFacebook}" class="card-link">Facebook Link</a>
        <a href="${playerDetails.strInstagram}" class="card-link">Instagrm link</a>
      </div>
    </div>
  `
  detailsContainer.appendChild(div);
}