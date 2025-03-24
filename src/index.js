// Your code here
document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://flirty-cuttie-2-0.vercel.app/characters';
    
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        const characterBar = document.getElementById('character-bar');
        data.forEach(character => {
          const span = document.createElement('span');
          span.textContent = character.name;
          span.addEventListener('click', () => showCharacterDetails(character));
          characterBar.appendChild(span);
        });
      });
  });

  function showCharacterDetails(character) {
    document.getElementById('name').textContent = character.name;
    const imageElement = document.getElementById('image');
    imageElement.src = character.image;
    imageElement.alt = character.name;
    document.getElementById('vote-count').textContent = character.votes;
  
    currentCharacter = character;
  }

  document.getElementById('votes-form').addEventListener('submit', event => {
    event.preventDefault();
  
    const votesInput = document.getElementById('votes').value;
    if (currentCharacter) {
      currentCharacter.votes += parseInt(votesInput);
      document.getElementById('vote-count').textContent = currentCharacter.votes;
  
      document.getElementById('votes').value = '';
    } else {
      alert('Please select a character first!');
    }
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    if (currentCharacter) {
      currentCharacter.votes = 0;
      document.getElementById('vote-count').textContent = currentCharacter.votes;
    } else {
      alert('Please select a character first!');
    }
  });