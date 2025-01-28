document.addEventListener("DOMContentLoaded", () => {
    const terminalInput = document.getElementById("terminal-input");
    const output = document.getElementById("output");
    const asciiArt = `                               
                 ....####**.:..                   
                .*%%%%#%%%%%%#%%.                 
            ..=*%%#@%%%%%%#%%%@%%.                
            .-%%%%%%%%%@@%%%%%%%@%..              
           .-#%%*====+***####%%%%%%.              
            :%%%===--------==+#%%%#.              
            #%#+=----::::----==++##               
            .%%*==------:-----=++%%               
            .*%+==+=-------==**=+%#               
            .=%===+%%=+--=*%@#+++#*.              
           .=-==========-=+======*-+              
            :-===-----==-===---===-=              
            .--*=-----=-:-=----====.              
              ..==---=*#=#+---===.                
               .==-=#======+#===-                 
                -==+--==-=+=*==+                  
                -=*#=-=##*-=+*#+                  
                ===%%#*++*+##*==                  
               .==--=+%#%##=====.                 
             .#==------------==++%@               
           .*#%%==-----------===%%%%%.            
        .*#%%%%%%+=---------===*%%%%%%%%%         
     .*#%%%%%%%%@%%%-------=-=%%%%%%%%%%%%%%.     
 ..##%%%%%%%%%%%%%%@%@@%%%%@@@@%%%%%%%%%%%%%%%%.  
.##%%%%%%%%%%%%%%%%%%%%%%@%%%%%%%%%%%%%%%%%%%%%%% 
##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    `;
    const asciiContainer = document.getElementById("ascii-art");
    asciiContainer.innerHTML = `<pre>${asciiArt}</pre>`;
    let music = null; // Define the music variable globally
    let typingSound = null; // Define the typing sound variable globally
    let isTyping = false; // Flag to track whether typing is in progress

    terminalInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const input = terminalInput.value.trim();
            processCommand(input);
            terminalInput.value = ""; // Clear input after Enter
        }
    });

    function processCommand(command) {
        if (command === "help") {
            printOutput("Available commands: about, projects, contact, music, mute, joke, clear, ninja survivors");
        } else if (command === "about") {
            printOutput(
                "Hi, I'm Kaan! I'm a passionate software engineer and game developer based in Turkey.<br>" +
                "With a strong foundation in Unity and C#, I specialize in creating immersive gaming experiences and interactive systems.<br>" +
                "Beyond game development, I have experience in web design, blending creativity with technical expertise to build engaging web solutions.<br>" +
                "<br>" +
                "What drives me? Innovation, problem-solving, and the thrill of turning ideas into reality. Whether it's crafting a new gameplay mechanic,<br>" +
                "designing a seamless user interface, or composing music for games, I love exploring every aspect of development.<br>" +
                "<br>" +
                "In my free time, you’ll find me practicing Brazilian Jiu-Jitsu, creating hip-hop beats, or diving into new RPGs.<br>" +
                "Let's connect and bring your ideas to life!"
            );
        } else if (command === "projects") {
            printOutput("Below is a list of all my projects:<br>1. Pishty: a traditional Turkish card game adapted into a pc game - My first unity project.<br>2. Ninja Survivors - Horde Survivor/Rougelike<br>3. Poker Game developed on Unity (WIP)<br>4. GENMER Architecture & Stone (Website)<br>5. This website!<br>6. Secret Project (TBA)");
        } else if (command === "contact") {
            printOutput("Email: kaanakguldev@gmail.com<br>LinkedIn: linkedin.com/in/kaan-akgul/");
        } else if (command === "ninja survivors") {
            window.location.href = "https://kaanakguldev.com/ninjasurvivors";
        } else if (command === "clear") {
            output.innerHTML = "";
            if (music) stopMusic();
            stopTypingSound(); // Stops typing sound and animation
        } else if (command === "music") {
            playMusic();
        } else if (command === "mute") {
            stopMusic();
        } else if (command === "") {
            printOutput("Please enter a command. Type 'help' for a list of commands.");
        } else if (command === "joke") {
            printOutput("- Erol says hi.<br>+ Which Erol?<br>- Profiterol!");
        } else {
            printOutput(`Command not found: ${command}`);
        }
    }

    function printOutput(text) {
        const newLine = document.createElement("p");
        output.appendChild(newLine);

        typingSound = new Audio("sounds/type-sound.wav"); // Path to your typing sound file
        typingSound.loop = false; // Disable looping, as we play it per character
        typingSound.volume = 0.6; // Adjust volume

        // Split the text into segments (HTML tags and plain text)
        const segments = text.split(/(<[^>]+>)/g); // Regex splits by HTML tags
        let i = 0;
        const typingSpeed = 50; // Typing speed in milliseconds
        const startDelay = 500; // Delay before typing starts

        isTyping = true; // Set typing flag to true

        function typeWriter() {
            if (!isTyping) return; // Exit if typing has been canceled

            if (i < segments.length) {
                const segment = segments[i];

                if (segment.startsWith("<") && segment.endsWith(">")) {
                    // Append HTML tags immediately
                    newLine.innerHTML += segment;
                } else {
                    // Type out plain text one character at a time
                    const chars = segment.split("");
                    chars.forEach((char, charIndex) => {
                        setTimeout(() => {
                            if (!isTyping) return; // Exit if typing has been canceled
                            newLine.innerHTML += char;

                            // Adjust pitch and play typing sound
                            typingSound.currentTime = 0; // Reset sound
                            typingSound.playbackRate = 0.9 + Math.random() * 0.2; // Random pitch between 0.9 and 1.1
                            typingSound.play().catch((error) => {
                                console.error("Error playing sound:", error);
                            });
                        }, charIndex * typingSpeed);
                    });
                }

                // Move to the next segment after the current one finishes
                i++;
                setTimeout(typeWriter, segment.length * typingSpeed);
            } else {
                isTyping = false; // Reset the flag when typing finishes
            }
        }

        // Start the typewriter animation after the delay
        setTimeout(() => {
            if (isTyping) typeWriter();
        }, startDelay);
    }

    function playMusic() {
        if (!music) { // Create a new Audio object if it doesn't exist
            music = new Audio("sounds/music.mp3"); // Replace with the path to your music file
            music.loop = true; // Set to true if you want the track to loop
            music.volume = 0.5; // Adjust volume as needed
        }

        // Start playing the track
        music.play().then(() => {
            printOutput("Credits go to Morax_BloodTubers on Pixabay 🎵");
        }).catch((error) => {
            printOutput("Failed to play music. Make sure the file exists and your browser supports it.");
            console.error("Music play error:", error);
        });
    }

    function stopMusic() {
        if (music) { // Check if the music is playing
            music.pause(); // Pause the music
            music.currentTime = 0; // Reset to the beginning
            printOutput("Music stopped.");
        } else {
            printOutput("No music is currently playing.");
        }
    }

    function stopTypingSound() {
        if (typingSound) { // Ensure the typing sound is initialized
            typingSound.pause(); // Pause the sound
            typingSound.currentTime = 0; // Reset to the beginning
        }
        isTyping = false; // Cancel the typewriter animation
    }
});
