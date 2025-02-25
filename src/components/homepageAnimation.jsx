import { useEffect, useRef } from 'react';
import gsap from "gsap";
import zerotoOne from '../assets/zerotoOne.jpg'

export default function HomepageAnimation() {
    const boxRef = useRef(null);
    useEffect(() => {
        gsap.context(() => { // Context for cleanup
            gsap.to(boxRef.current, { // Use the ref
                y: "-50vh", // Start from below the viewport (adjust as needed)
                opacity: 0, // Start invisible (optional)
                duration: 2,
                ease: "power2.out"
            });
            return () => gsap.revert(); // Cleanup function
        }, boxRef); // Scope to the box element
    }, []); //

    return (
        <div>
    <h1 className="Heading">Welcome to the eBook Store</h1>
    <p>Scroll down to see the magic happen!!</p>
    <div className="box green" ref={boxRef}>
        <img src={zerotoOne} alt="Zero to One"
             style={{maxWidth: '100%', height: 'auto'}}/> {/* Add the image */}
    </div>
        </div>
)

}
