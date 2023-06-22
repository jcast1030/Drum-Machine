const audioClip =[
    {
        keyCode: 81,
        keyTrig: 'Q',
        id: 'Heater-1',
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
        keyCode: 87,
        keyTrig: 'W',
        id: 'Heater-2',
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
        keyCode: 69,
        keyTrig: 'E',
        id: 'Heater-3',
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
        keyCode: 65,
        keyTrig: 'A',
        id: 'Heater-4',
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
        keyCode: 83,
        keyTrig: 'S',
        id: 'Clap',
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
        keyCode: 68,
        keyTrig: 'D',
        id: 'Open-Hat',
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
        keyCode: 90,
        keyTrig: 'Z',
        id: 'Kick-Hat',
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
        keyCode: 88,
        keyTrig: 'X',
        id: 'Kick',
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
        keyCode: 67,
        keyTrig: 'C',
        id: 'Closed-Hat',
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }

];

function App() {

    const [volume, setVolume] = React.useState(1);

    return(
        <div className="bg-info min-vh-100 text-white">
            <div className="text-center">
                <h2>Drum Machine</h2>
                {
                    audioClip.map((clip) => (
                        <Pad key={clip.id} clip={clip} volume={volume}/>
                    ))
                }
                <br />
                <input type="range" onChange={(e) => setVolume(e.target.value)} step="0.01" value={volume} max="1" min="0" className="w-50" />
            </div>
        </div>
    );
}

function Pad({ clip, volume }) {

    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [])


    const handleKeyPress = (e) => {
        if(e.keyCode === clip.keyCode) {
            playSound();
        }
    }

    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrig);
        setActive(true);
        setTimeout(() => setActive(false), 200)

        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
    }

    return (
        <div onClick={playSound} className={`btn btn-secondary p-4 m-3 ${active && 'btn-warning'}`}>
            <audio id={clip.keyTrig} src={clip.url}/>
            {clip.keyTrig}
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById("root"));