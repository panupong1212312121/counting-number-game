import { writable } from 'svelte/store';

// Retrieve game settings from localStorage if available
const storedGameSettings = localStorage.getItem('gameSettings');
const initialGameSettings = storedGameSettings ? JSON.parse(storedGameSettings) : {
  inputValue: "",
  inputValue2: "",
  dropdownValue: "null"
};

export const gameSettings = writable(initialGameSettings);

// Subscribe to gameSettings and save changes to localStorage
gameSettings.subscribe(value => {
  localStorage.setItem('gameSettings', JSON.stringify(value));
});


////////////////////////////////////////////////////////////////////////////////////////////

// Retrieve sound state from localStorage if available
const storedSoundState = localStorage.getItem('soundState');
const initialSoundState = storedSoundState ? JSON.parse(storedSoundState) : {
  isSoundOn: true
};

export const soundState = writable(initialSoundState);

// Subscribe to soundState and save changes to localStorage
soundState.subscribe(value => {
  localStorage.setItem('soundState', JSON.stringify(value));
});
