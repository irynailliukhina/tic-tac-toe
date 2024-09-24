export default function Log({ turns }) {
    let turnsLog = [];

    turns.map((turn) => {
        let player = turn.player;
        let coordinates = `${turn.square.row},` + `${turn.square.col}`;
        turnsLog = [...turnsLog, <li key={coordinates}>Player {player} marked {coordinates}</li>]
    })

    return <ol id="log">
    {turnsLog}
    </ol>
    
}