# kaanakgul.github.io

Source for my personal website, served at [kaanakgul.dev](https://kaanakgul.dev) through GitHub Pages.

The site is a small terminal-style interface written in plain HTML, CSS and JavaScript, with no framework or build step. Visitors type commands such as `about`, `experience`, `projects` and `contact`, and the output is rendered with a typewriter effect.

It also hosts a Unity WebGL build of **[Ninja Survivors](https://github.com/kaanakgul/NinjaSurvivors)** under [`/ninjasurvivors`](ninjasurvivors/), a Unity/C# game developed with Batuhan Balım during my training at MANC Games. The game is desktop only.

## Structure

```
index.html        Page markup and terminal container
script.js         Command handling and typewriter output
style.css         Styling
sounds/           Typing sound and background music
ninjasurvivors/   Unity WebGL build of Ninja Survivors
CNAME             Custom domain for GitHub Pages
```

## Running locally

Any static file server works, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. A server is needed rather than opening `index.html` directly, so the audio and the WebGL build can load.

## Credits

Background music by Morax_BloodTubers on Pixabay.
