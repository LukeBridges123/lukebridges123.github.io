import "../index.css"
import jmm_poster from "../images/jmm-poster.png"
export default function MathPage(){
    return(
        <div className="center-container">
            <p>As part of the SURIEM REU (Summer Undergraduate Research Institute in Experimental Mathematics) at Michigan 
                State, I worked in collaboration with fellow undergraduates Max Budnick, Zach Martin, and Janine Wang, under the
                direction of Dr. Aklilu Zeleke and Peikai Qi, on research into recursive polynomial sequences: that is, sequences 
                of polynomials defined by recurrence relations similar to the one that defines the Fibonacci numbers. Below, I've 
                put an image of the poster we presented at the 2024 Joint Mathematics Meetings if you'd like to know more. 
            </p>
            <img src = {jmm_poster} width = {1000}/>
        </div>
    )
}