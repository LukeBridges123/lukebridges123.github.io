import { Link } from "react-router-dom"
import "../index.css"
export default function AboutPage(){
    return (
        <div className="center-container">
            <p>My name is Luke Bridges; I am a junior at Michigan State University, double-majoring in mathematics and computer 
            science. This website (currently under construction) is meant as a portfolio to host my personal coding projects.</p>
            
            <p>You can use the tabs above to see some of the work I've done, or check out my <a href="https://www.linkedin.com/in/luke-bridges-425127235/">
            Linkedin</a> or <a href="https://github.com/LukeBridges123/">Github</a>. I've also put much of my resume below, though
            you'll have to go to the <Link to="/code">the Code tab above</Link> for descriptions of personal projects.</p>

            <h1>Experience</h1>
            <h2>Supervisor — MSU Math Learning Center (Sep. 2024-Present)</h2>
            <ul>
                <li>Led and supervised a team of tutors to ensure that students got matched with tutors in a timely manner. </li>
                <li>Provided additional tutoring to help tutors who were stuck and students who couldn't get tutoring from anyone else during busy periods.</li>
            </ul>
            <h2>Game Developer — Not-a-Bot Studios (Jun. 2024-Sep. 2024)</h2>
            <ul>
                <li>Designed and programmed in Javascript, through the PlayCanvas engine, a feature-complete demo of an
                open-source, web-based game for math education, to be released as part of a platform serving over 20 schools.</li>
                <li>Wrote significant portions of the code for the game’s underlying mechanics, designed and implemented 7 out of 28
                of the levels in the demo, and implemented another 14.</li>
                <li>See also <Link to="/code">the Code page here</Link> for more information.</li>

            </ul>
            <h2>Student Course Assistant — MSU Department of Mathematics (Aug. 2023-Apr. 2024)</h2>
            <ul>
                <li>Worked with another student under a professor to prepare over 175 total pages of typed lecture notes for an honors
                linear algebra class.</li>
                <li>Developed substantial additional material on topics not covered in the lectures, created worked examples
                (amounting to over 50 pages of new content), and typeset old handwritten notes in LaTeX.</li>
            </ul>
            <h2>Researcher — Michigan State University (May 2023-Jul. 2023)</h2>
            <ul>
                <li>Collaborated with students from several other universities to research recursive polynomial sequences, including
                related problems from analysis and combinatorics.</li>
                <li>Delivered regular presentations on our research to faculty mentors and representatives of our sponsors at the NSA,
                presented at the Joint Mathematics Meetings conference, and drafted a paper</li>
                <li>Wrote Python code in Sympy and Matplotlib to generate data for forming and testing conjectures and plots for our
                presentations.</li>
                <li>See also <Link to="/math">the Math page here</Link> for more information.</li>
            </ul>
            <h2>Student Library Assistant — MSU Libraries (Aug. 2022-Present)</h2>
            <ul>
                <li>Aided library patrons with research, answered questions about the library's policies and collections, 
                    provided technical support for electronic resource access, and redirected questions to other people 
                    and departments in the library when necessary.</li>
            </ul>
        </div>
    )
}