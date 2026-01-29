import "../index.css"
import { Link } from "react-router-dom"

export default function SIPDPage() {
    return (
        <div className="center-container">
            <h1>Spatial Iterated Prisoner's Dilemma</h1>
            <p>
                This is a cellular-automaton-esque variant on the classic prisoner's dilemma,
                implemented in Python via Pygame and running in your browser through WebAssembly
                (compiled using <a href="https://pygame-web.github.io/">Pygbag</a>).
                Click the game area below to start it. You may need to wait a moment for it to load.
            </p>
            <p>
                See the <Link to="/code">Code page</Link> for more details, or
                view the source on <a href="https://github.com/lukeBridges123/SIPD">GitHub</a>. Look below the game view for 
                some explanations of the UI.
            </p>
            <div style={{
                width: "100%",
                maxWidth: "1048px",
                aspectRatio: "1024 / 600",
                border: "2px solid #ccc",
                borderRadius: "6px",
                overflow: "hidden",
                marginTop: "1em",
            }}>
                <iframe
                    src="/sipd/index.html"
                    title="Spatial Iterated Prisoner's Dilemma"
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                    }}
                    allow="autoplay; fullscreen"
                />
            </div>
            <h2>Quick Guide</h2>

            <h3>Grid View Parameters</h3>
            <ul>
                <li>"Rows" and "columns" just adjust the size of the grid.</li>
                <li>"Rounds" and "matches" control how we generate the matchup table between strategies. At the start of a new game,
                    we have each strategy play a certain number of matches against each other strategy, where each match is an iterated
                    prisoner's dilemma over a certain number of rounds. For eacch pair of strategies, we take the average score across 
                    all rounds played by those strategies and take that to be what the two strategies win when they play against each other.
                    Increasing these parameters will make the simulation take a bit longer to start up, but will lead to less variance across
                    different seeds with the same parameters. (In the presence of noise you can get rollouts where e.g. Tit-for-Tat happens to do badly
                    against itself in a given match; averaging over many matches means that these rare outcomes affect things less.)
                </li>
                <li>
                    "Noise" is the probability per round that, when a strategy tries to play a move, it'll get flipped to the opposite move 
                    (e.g. a strategy tries to cooperate but this gets flipped to defecting).
                </li>
                <li>"Mutation" is the probability that each cell will randomly flip to a different strategy on a given turn.</li>
                <li>"Speed" is just the number of simulation steps per second when you're running the simulation with the "play" button.</li>
            </ul>
            <h3>Other Views</h3>
            <ul>
                <li>"Payoff" lets you view and adjust the payoffs for each outcome (both cooperate, both defect, one cooperates and one defects).</li>
                <li>"Matchup" shows the matchup table used to store the result of two strategies playing against each other.</li>
                <li>"Mix" lets you adjust the proportion of each strategy in the randomly-generated initial grid.</li>
                <li>"Stats" shows you the "population" of each strategy at the current time-step, and how the populations changed over the course of the simulation.</li>
            </ul>
            <h3>Strategies</h3>
            <ul>
                <li>"Always cooperate" and "always defect" just, well, always cooperate and always defect.</li>
                <li>"Tit-for-tat" begins each match by cooperating. From there on out, it copies its opponent, cooperating if they
                    cooperated on the previous round and defecting if they defected.
                </li>
                <li>"Pavlov" also starts out by cooperating. From there on out, it switches between always-cooperate and always-defect 
                    whenever its opponent defects against it. E.g. if it cooperated and its opponent defected on a given round, it will 
                    defect on the next round and keep doing that until its opponent defects.
                </li>
                <li>
                    "Revenger" starts out by cooperating. When its opponent defects, it switches to defecting for the rest of the match,
                    no matter what else its opponent does.
                </li>
                <li>
                    "Tit-for-two-tats" starts by cooperating, defects if its opponent defected in the past two rounds in a row, and otherwise
                    cooperates.
                </li>
                <li>
                    "Generous" (an odd name, but apparently the standard one) cooperates with 95% probability and defects otherwise.
                </li>
                <li>
                    "Prober" cooperates on the first round and defects on the second and third. If its opponent defects back, then it switches
                    to always cooperating; otherwise, it switches to always defecting.
                </li>
            </ul>
        </div>
    )
}
