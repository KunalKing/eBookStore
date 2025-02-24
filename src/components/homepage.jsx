import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import zerotoOne from '../assets/zerotoOne.jpg'

export default function Homepage() {
    const boxRef = useRef(null); // Ref for the box

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
    }, []); // Empty dependency array: runs only once after mount

    return (
        <div>
            <h1 className="Heading">Welcome to the eBook Store</h1>
            <p>Scroll down to see the magic happen!!</p>
            <div className="box green" ref={boxRef}>
                <img src={zerotoOne} alt="Zero to One" style={{ maxWidth: '100%', height: 'auto' }} /> {/* Add the image */}
            </div>
        </div>
    );
}