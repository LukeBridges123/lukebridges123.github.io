import "../index.css"
import {Link} from "react-router-dom"
import assembly_lines_screenshot1 from "../images/assembly-lines-1.png"
export default function CodePage(){
    return (
        <div className="center-container">
            <p>Here you can find links to code I've written (and, where applicable, links to use that code online). Only the first few 
                are really usable by anyone who didn't write them, and the rest should probably be avoided unless you're morbidly curious.</p>

            <h1>Newer Projects</h1>
            <h2>Assembly Lines</h2>
            <img src = {assembly_lines_screenshot1} width = {800}/>
            <p>This was developed in collaboration with some other math students as part of the 2024 Polymath Jr. REU, under
                the mentorship of Not-A-Bot Studios. It's an open-source, browser-based educational game, targeted at middle schoolers and early high schoolers,
                where you solve physics puzzles by graphing lines; that is, you write the equations of lines using a Desmos-style
                UI, and the lines you graph become ramps that you use to roll a ball into a goal. 
            </p>

            <p> Currently we're putting the finishing touches (mainly graphics and some general polish) on a demo version which will then be tested in schools. Once that's 
                finished, I'll put a link here to a deployed version of the game, plus the code, which should eventually make it to 
                GitHub (development was originally done with the online game engine Playcanvas' built-in version control). 
            </p>

            <p> The demo has 28 levels total, divided into 4 worlds that progressively introduce more complicated mechanics. In the first, 
                you just need to get a single ball into a single goal; in the second, you have to pass through "subgoals" along the way in a 
                certain order; in the third, there are no subgoals, but there are multiple balls, each of which has to be guided into its 
                own goal; and in the last, the mechanics from worlds 2 and 3 are combined. 
            </p>

            <h2>RSA Demo Web App</h2>
            <p>This is a demo of the RSA encryption system; it lets you play around with all the basic functionality--
                key generation, encryption and decryption, digital signatures--and has a brief explanation of how it all works.
                
            </p>
            <p>
                The frontend was the first thing I ever wrote in React; the backend has an odd history--I wrote an older version of it
                as a standalone Python program a couple years ago, and more recently, I improved the key generation (with a better primality testing
                algorithm) and turned all the basic functions to AWS Lambda functions so they could serve as a lightweight backend for this.
            </p>

            <p><a href = '/personal_page/#/rsa'>It's hosted on this website, and you can try it out by clicking this link.</a></p>


            <h2>Spatial Iterated Prisoner's Dilemma</h2>
            <p>This is a cellular-automaton-esque variant on the classic prisoner's dilemma, which I learned about in Gary William
                Flake's book <i>The Computational Beauty of Nature</i>. It's played on a square grid like Conway's Game of Life,
                with each cell containing a certain strategy (e.g. "always cooperate", "always defect", "tit-for-tat", etc.); strategies
                play the iterated prisoner's dilemma against each their neighbors, then switch to the strategy used by whichever neighboring
                square won the most points in its games. 
            </p>

            <p>
                Currently, this is under construction; much of the underlying logic has been already written (in Python), and I plan to add 
                graphics and a UI via Pygame and then deploy to a web-based version via Pygbag.
            </p>

            <h1>Older Projects</h1>
            <h2>Symbolic Calculus</h2>
            <p>This was an attempt to write a fragment of a computer algebra system (like Wolfram Alpha or Sympy) in Scheme/Racket. The result
                is capable of symbolically differentiating basically anything built out of elementary functions (polynomials, trigonometric functions,
                exp and log, etc. combined in the usual ways), finding partial sums of the Taylor series of the same, and doing a few integrals and a smidge of vector calculus.
                All this was built on top of a system for handling algebraic expressions which included lots of rules for simplifying them,
                along with the ability to evaluate them at given values and even turn them into executable functions. 
            </p>
            <p>
                Development stalled out before I implemented anything like an user interface, and the final version has annoying limitations 
                (e.g. all expressions need to be fully parenthesized). Still, what's there does work.
            </p>

            <h2>Scheme Interpreter</h2>
            <p>
            This was an interpreter for the Scheme programming language, written in Racket. It was based heavily on the interpreter described in 
            <i>Structure and Interpretation of Computer Programs</i>, though with some additions and optimizations (e.g. using Racket's hash tables
            to store variable-value mappings, where the original has just used lists of pairs). It works well enough for what it is, and I enjoyed writing it,
            but it's definitely half-baked and unfinished, and I'm only putting it here for completeness. 
            </p>
        </div>
    )
}