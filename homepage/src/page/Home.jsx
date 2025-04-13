import { gsap }from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

function Home (){
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrollTrigger);
    useEffect(()=>{
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:".section-2",
                start:"top 80%",
                end:"50% 60%",
                scrub:true,
                markers: true
            }
        })
        
        tl.fromTo(".box",{
            x:100,
            y: 0,
            opacity:0
        },{
            x:500,
            y:500,
            opacity:1,
            duration:1,
        });
    },[])
    
    return(
        <>
            <section className="section section-1">
                <div className="section-1-text">
                    <h2>회사소개 문구, <span className="">샘플</span></h2>
                </div>
                <span className="section-1-scroll">scroll</span>
            </section>
            <section className="section section-2">
                aabbcc
                <div className="box green" style={{width:"200px", height:"200px",backgroundColor:"green"}}>test</div>
            </section>
        </>
    )
}

export default Home;