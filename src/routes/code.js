import "../index.css"
import {Link} from "react-router-dom"
import assembly_lines_screenshot1 from "../images/assembly-lines-1.png"
import compiler_display from "../images/compiler-display.png"
import sipd from "../images/sipd.png"
export default function CodePage(){
    return (
        <div className="center-container">
            <p>Here you can find links to code I've written (and, where applicable, links to use that code online). Only the first few 
                are really usable by anyone who didn't write them, and the rest should probably be avoided unless you're morbidly curious.</p>

            <h1>Newer Projects</h1>
            <h2>Assembly Lines</h2>
            <img src = {assembly_lines_screenshot1} className="inline-image"/>
            <p>This is an open-source, browser-based educational game, written in Javascript using the Playcanvas game engine. 
                It's targeted at middle schoolers and early high schoolers. In it, you solve physics puzzles by graphing lines; that is, you write the equations of lines using a Desmos-style
                UI, and the lines you graph become ramps that you use to roll a ball into a goal. 
            </p>

            <p> The game was developed in collaboration with some other math students as part of the 2024 Polymath Jr. REU, under
            the mentorship of Not-A-Bot Studios.Currently we're putting the finishing touches (mainly graphics and some general polish) on a demo version which will then be tested in schools. Once that's 
                finished, I'll put a link here to a deployed version of the game, plus the code, which should eventually make it to 
                GitHub (development was originally done with Playcanvas' built-in version control). 
            </p>

            <p> The demo has 28 levels total, divided into 4 worlds that progressively introduce more complicated mechanics. In the first, 
                you just need to get a single ball into a single goal; in the second, you have to pass through "subgoals" along the way in a 
                certain order; in the third, there are no subgoals, but there are multiple balls, each of which has to be guided into its 
                own goal; and in the last, the mechanics from worlds 2 and 3 are combined. 
            </p>

            <h2>RSA Demo Web App</h2>
            <p>This is an online demo of the RSA encryption system, with a frontend built in React and a serverless backend using AWS Lambda to 
                call Python functions. It lets you play around with all the basic functionality of RSA--
                key generation, encryption and decryption, digital signatures--and has a brief explanation of how it all works.
                
            </p>
            <p>
                The frontend was the first thing I ever wrote in React; the backend has an odd history--I wrote an older version of it
                as a standalone Python program a couple years ago, and more recently, I improved the key generation (with a better primality testing
                algorithm) and turned all the basic functions to AWS Lambda functions so they could serve as a lightweight backend for this.
            </p>

            <p><a href = '/#/rsa'>It's hosted on this website, and you can try it out by clicking this link.</a></p>

            <h2>WebAssembly Compiler</h2>
            <img src={compiler_display} className="inline-image"/>
            <p>As part of CSE 450, the undergraduate compilers elective at 
                MSU, <a href="https://www.linkedin.com/in/rosespangler/">Rose Spengler</a>, <a href="https://www.linkedin.com/in/lewianamo/">Lewi Anamo</a>, and I wrote a 
                simple imperative language which can be compiled to WebAssembly, via a compiler written in C++; it includes most of the basic functionality 
                you'd expect from such a language (loops, conditionals, function definitions and calls, static types, etc.) and
                a number of built-in operations on numeric types and strings. 
            </p>

            <p>I've decided to continue work on it on my own, and plan to add more features (e.g. arrays for arbitrary types, a larger
                "standard library" of functions and operations, etc.) as well as a web-based frontend (most likely compiling the compiler 
                itself to WebAssembly via Emscripten, and creating some kind of interface to allow the user to write, compile, and run 
                code in their own browser). In the meantime, you can see the existing code on Github <a href="https://github.com/LukeBridges123/CompilerProject">here</a>.
            </p>
            <h2>Spatial Iterated Prisoner's Dilemma</h2>
            <img src={sipd} className="inline-image"/>
            <p>This is a cellular-automaton-esque variant on the classic prisoner's dilemma, implemented in Python via Pygame and hosted online
                using the Pygbag library. The SIPD, which I learned about in Gary William
                Flake's book <i>The Computational Beauty of Nature</i>, is played on a square grid like Conway's Game of Life,
                with each cell containing a certain strategy (e.g. "always cooperate", "always defect", "tit-for-tat", etc.). Strategies
                play the iterated prisoner's dilemma against each their neighbors, then switch to the strategy used by whichever neighboring
                square won the most points in its games. 
            </p>

            <p>
                Currently, this is under construction; much of the underlying logic has been already written, and I already have
                a basic UI which can be run in a web browser. The main things left to be done are improving and adding to 
                the UI so that the user can control some of the main parameters of the simulation, refactoring some of the Pygame code (the 
                fundamentals in Python are already decently solid, but the Pygame code used to run the display is a bit messy), and actually hosting it online (probably on itch.io, which can handle Pygbag 
                projects.) The code is <a href="https://github.com/lukeBridges123/SIPD">here</a>, though bear in mind that it's unfinished.
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
                (e.g. all expressions need to be fully parenthesized). Still, what's there does work. You can find the code for it <a href="https://github.com/LukeBridges123/scheme_symbolic_math">here, 
                on my Github</a>.
            </p>

            <h2>Scheme Interpreter</h2>
            <p>
            This was an interpreter for the Scheme programming language, written in Racket. It was based heavily on the interpreter described in 
            <i>Structure and Interpretation of Computer Programs</i>, though with some additions and optimizations (e.g. using Racket's hash tables
            to store variable-value mappings, where the original has just used lists of pairs). It works well enough for what it is, and I enjoyed writing it,
            but it's definitely half-baked and unfinished, and I'm only putting it here for completeness. 
            See <a href="https://github.com/LukeBridges123/scheme_interpreter">here</a> for the code.
            </p>
        </div>
    )
}