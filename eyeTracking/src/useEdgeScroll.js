let lastX = 0, lastY = 0, lastTime = Date.now();
let scrollIntervalX, scrollIntervalY;
const maxScrollSpeed = 30; // Maximum scroll speed
const accelerationFactor = 0.1; // Adjust this to control acceleration
const scrollInterval = 20; // Adjust interval time as needed (in ms)
const threshold = 50; // Distance from the edge in pixels

const calculateScrollSpeed = (velocity) => {
    return Math.min(velocity * accelerationFactor, maxScrollSpeed);
};

const useEdgeScroll = (mode, svgSize) => {
    const mouseMoveHandler = (event) => {
        if (mode !== 'Pan') return; // Enable scrolling only in Pan mode

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const { clientX, clientY } = event;

        const currentTime = Date.now();
        const timeDiff = currentTime - lastTime;

        const deltaX = clientX - lastX;
        const deltaY = clientY - lastY;

        const velocityX = deltaX / timeDiff;
        const velocityY = deltaY / timeDiff;

        lastX = clientX;
        lastY = clientY;
        lastTime = currentTime;

        const scrollSpeedX = calculateScrollSpeed(Math.abs(velocityX));
        const scrollSpeedY = calculateScrollSpeed(Math.abs(velocityY));

        // Horizontal Scrolling
        if (clientX < threshold || clientX > viewportWidth - threshold) {
            window.scrollBy({
                left: clientX < threshold ? -scrollSpeedX : scrollSpeedX,
                behavior: 'auto'
            });
        }

        // Vertical Scrolling
        if (clientY < threshold || clientY > viewportHeight - threshold) {
            window.scrollBy({
                top: clientY < threshold ? -scrollSpeedY : scrollSpeedY,
                behavior: 'auto'
            });
        }
    };

    document.addEventListener('mousemove', mouseMoveHandler);

    // Cleanup function
    return () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        clearInterval(scrollIntervalX);
        clearInterval(scrollIntervalY);
    };
};


export default useEdgeScroll;
