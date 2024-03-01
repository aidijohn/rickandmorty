import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const CharacterDetails = () => {
  const router = useRouter();
  const { characterId } = router.query;
  const [characterDetails, setCharacterDetails] = useState(null);
  const [note, setNote] = useState('');
  const [isFetchingNote, setIsFetchingNote] = useState(true);

  useEffect(() => {
    if (characterId) {
      // Fetch character details based on characterId
      fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then((res) => res.json())
        .then((data) => {
          setCharacterDetails(data);
          setIsFetchingNote(false);

          // Fetch or load the persisted note for the character
          const persistedNote = localStorage.getItem(`characterNote_${characterId}`);
          setNote(persistedNote || '');
        })
        .catch((error) => {
          console.error('Error fetching character details:', error);
          setIsFetchingNote(false);
        });
    }
  }, [characterId]);

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleNoteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Save the note to local storage or your chosen persistence method
    localStorage.setItem(`characterNote_${characterId}`, note);
    alert('Note saved successfully!');
  };

  if (!characterDetails) {
    return <div>Loading...</div>;
  }

  const { name, status, species, gender, image } = characterDetails;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{name}</h1>
      {image ? (
        <img src={image} alt={`${name} thumbnail`} style={{ maxWidth: '100%', maxHeight: '400px', margin: '20px auto' }} />
      ) : (
        <div>No thumbnail available</div>
      )}
      <p>Status: {status}</p>
      <p>Species: {species}</p>
      <p>Gender: {gender}</p>

      {isFetchingNote ? (
        <div>Loading note...</div>
      ) : (
        <form onSubmit={handleNoteSubmit}>
          <label>
            Add Note:
            <textarea value={note} onChange={handleNoteChange} />
          </label>
          <br />
          <button type="submit">Save Note</button>
        </form>
      )}
    </div>
  );
};

export default CharacterDetails;
