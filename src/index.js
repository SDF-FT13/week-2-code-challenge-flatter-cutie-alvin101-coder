// Your code here
document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000/characters';
  let currentCharacter = null;

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

  function showCharacterDetails(character) {
      currentCharacter = character;
      document.getElementById('name').textContent = character.name;
      const imageElement = document.getElementById('image');
      imageElement.src = character.image;
      imageElement.alt = character.name;
      document.getElementById('vote-count').textContent = character.votes;
  }

  document.getElementById('votes-form').addEventListener('submit', event => {
      event.preventDefault();

      const votesInput = document.getElementById('votes').value;
      if (currentCharacter) {
          currentCharacter.votes += parseInt(votesInput);
          document.getElementById('vote-count').textContent = currentCharacter.votes;

          updateCharacterVotes(currentCharacter);

          document.getElementById('votes').value = '';
      } else {
          alert('Please select a character first!');
      }
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
      if (currentCharacter) {
          currentCharacter.votes = 0;
          document.getElementById('vote-count').textContent = currentCharacter.votes;

          updateCharacterVotes(currentCharacter);
      } else {
          alert('Please select a character first!');
      }
  });

  document.getElementById('delete-btn').addEventListener('click', () => {
      if (currentCharacter) {
          deleteCharacter(currentCharacter);
      } else {
          alert('Please select a character first!');
      }
  });

  function updateCharacterVotes(character) {
      fetch(`${baseUrl}/${character.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ votes: character.votes }),
      })
          .then(response => {
              if (response.ok) {
                  console.log(`${character.name}'s votes updated successfully on the server!`);
              } else {
                  console.error('Failed to update votes.');
              }
          });
  }

  function deleteCharacter(character) {
      fetch(`${baseUrl}/${character.id}`, {
          method: 'DELETE',
      })
          .then(response => {
              if (response.ok) {
                  console.log(`${character.name} deleted successfully from the server!`);
                  location.reload(); 
              } else {
                  console.error('Failed to delete the character.');
              }
          });
  }
}); 