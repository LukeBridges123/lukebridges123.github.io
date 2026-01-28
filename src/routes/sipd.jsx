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
                view the source on <a href="https://github.com/lukeBridges123/SIPD">GitHub</a>.
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
        </div>
    )
}
