const audioContext = window.AudioContext ? new AudioContext() : new webkitAudioContext();

const notes = [
    { name: "C", frequency: 261.63 },
    { name: "D", frequency: 293.66 },
    { name: "E", frequency: 329.63 },
    { name: "F", frequency: 349.23 },
    { name: "G", frequency: 392.0 },
    { name: "A", frequency: 440.0 },
    { name: "B", frequency: 493.88 },

    { name: "C", frequency: 523.25 },
    { name: "D", frequency: 587.32 },
    { name: "E", frequency: 659.25 },
    { name: "F", frequency: 698.45 },
    { name: "G", frequency: 783.99 },
    { name: "A", frequency: 880.00 },
    { name: "B", frequency: 987.76 },
  ];

  const notesSharp = [
    { name: "C#", frequency: 277.18 },
    { name: "D#", frequency: 311.13 },
    { name: "F#", frequency: 369.99 },
    { name: "G#", frequency: 415.30 },
    { name: "A#", frequency: 466.16 },

    { name: "C#", frequency: 554.36 },
    { name: "D#", frequency: 622.25 },
    { name: "F#", frequency: 739.98 },
    { name: "G#", frequency: 830.60 },
    { name: "A#", frequency: 932.32 },
  ]

// Connect all of our audio nodes to this gain node so their volume is lower.
const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);
primaryGainControl.connect(audioContext.destination);

// Fetch the keys from the DOM
let noteButton = document.getElementsByClassName('key');
noteButton = Array.prototype.slice.call(noteButton);
let blackNoteButton = document.getElementsByClassName('black-key');
blackNoteButton = Array.prototype.slice.call(blackNoteButton);


// WHITE KEYS
for(let i = 0; i < 14; i++){
    noteButton[i].addEventListener("click", () => {
        // Create an oscillator at the note's frequency
        const noteOscillator = audioContext.createOscillator();
        noteOscillator.type = "square";
        noteOscillator.frequency.setValueAtTime(
            notes[i]['frequency'],
            audioContext.currentTime
        );

        noteOscillator.connect(primaryGainControl);
        noteOscillator.start();
        noteOscillator.stop(audioContext.currentTime + 1);
    });
}

// BLACK KEYS
for(let i = 0; i < 10; i++){
    blackNoteButton[i].addEventListener("click", () => {
        // Create an oscillator at the note's frequency
        const noteOscillator = audioContext.createOscillator();
        noteOscillator.type = "square";
        noteOscillator.frequency.setValueAtTime(
            notesSharp[i]['frequency'],
            audioContext.currentTime
        );

        noteOscillator.connect(primaryGainControl);
        noteOscillator.start();
        noteOscillator.stop(audioContext.currentTime + 1);
    });
}
  


// Oscilator nodes creates a sine wave by default, can be changed to square, sawtooth etc