import {useEffect} from "react";

const useAutoScroll = (isActive, edgeSize = 200) => {
    let timer = null;
    useEffect( () => {
        if (!isActive) return;

        const handleMousemove = (event) => {
            //
            var viewportX = event.clientX;
            var viewportY = event.clientY;

            // Get the viewport dimensions.
            var viewportWidth = document.documentElement.clientWidth;
            var viewportHeight = document.documentElement.clientHeight;

            // Next, we need to determine if the mouse is within the "edge" of the
            // viewport, which may require scrolling the window. To do this, we need to
            // calculate the boundaries of the edge in the viewport (these coordinates
            // are relative to the viewport grid system).
            var edgeTop = edgeSize;
            var edgeLeft = edgeSize;
            var edgeBottom = ( viewportHeight - edgeSize );
            var edgeRight = ( viewportWidth - edgeSize );

            var isInLeftEdge = ( viewportX < edgeLeft );
            var isInRightEdge = ( viewportX > edgeRight );
            var isInTopEdge = ( viewportY < edgeTop );
            var isInBottomEdge = ( viewportY > edgeBottom );

            // If the mouse is not in the viewport edge, there's no need to calculate
            // anything else.
            if ( ! ( isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge ) ) {

                clearTimeout( timer );
                return;

            }

            // Get the document dimensions.
            var documentWidth = Math.max(
                document.body.scrollWidth,
                document.body.offsetWidth,
                document.body.clientWidth,
                document.documentElement.scrollWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth
            );
            var documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.body.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
                document.documentElement.clientHeight
            );

            // Calculate the maximum scroll offset in each direction. Since you can only
            // scroll the overflow portion of the document, the maximum represents the
            // length of the document that is NOT in the viewport.
            var maxScrollX = ( documentWidth - viewportWidth );
            var maxScrollY = ( documentHeight - viewportHeight );

            // As we examine the mousemove event, we want to adjust the window scroll in
            // immediate response to the event; but, we also want to continue adjusting
            // the window scroll if the user rests their mouse in the edge boundary. To
            // do this, we'll invoke the adjustment logic immediately. Then, we'll setup
            // a timer that continues to invoke the adjustment logic while the window can
            // still be scrolled in a particular direction.
            (function checkForWindowScroll() {

                clearTimeout( timer );

                if ( adjustWindowScroll() ) {

                    timer = setTimeout( checkForWindowScroll, 30 );

                }

            })();

            // Adjust the window scroll based on the user's mouse position. Returns True
            // or False depending on whether or not the window scroll was changed.
            function adjustWindowScroll() {

                // Get the current scroll position of the document.
                var currentScrollX = window.pageXOffset;
                var currentScrollY = window.pageYOffset;

                // Determine if the window can be scrolled in any particular direction.
                var canScrollUp = ( currentScrollY > 0 );
                var canScrollDown = ( currentScrollY < maxScrollY );
                var canScrollLeft = ( currentScrollX > 0 );
                var canScrollRight = ( currentScrollX < maxScrollX );


                var nextScrollX = currentScrollX;
                var nextScrollY = currentScrollY;

                // As we examine the mouse position within the edge, we want to make the
                // incremental scroll changes more "intense" the closer that the user
                // gets the viewport edge. As such, we'll calculate the percentage that
                // the user has made it "through the edge" when calculating the delta.
                // Then, that use that percentage to back-off from the "max" step value.
                var maxStep = 50;

                // Should we scroll left?
                if ( isInLeftEdge && canScrollLeft ) {

                    let intensity = ( ( edgeLeft - viewportX ) / edgeSize );

                    nextScrollX = ( nextScrollX - ( maxStep * intensity ) );

                    // Should we scroll right?
                } else if ( isInRightEdge && canScrollRight ) {

                    let intensity = ( ( viewportX - edgeRight ) / edgeSize );

                    nextScrollX = ( nextScrollX + ( maxStep * intensity ) );

                }

                // Should we scroll up?
                if ( isInTopEdge && canScrollUp ) {

                    let intensity = ( ( edgeTop - viewportY ) / edgeSize );

                    nextScrollY = ( nextScrollY - ( maxStep * intensity ) );

                    // Should we scroll down?
                } else if ( isInBottomEdge && canScrollDown ) {

                    let intensity = ( ( viewportY - edgeBottom ) / edgeSize );

                    nextScrollY = ( nextScrollY + ( maxStep * intensity ) );

                }

                // Sanitize invalid maximums. An invalid scroll offset won't break the
                // subsequent .scrollTo() call; however, it will make it harder to
                // determine if the .scrollTo() method should have been called in the
                // first place.
                nextScrollX = Math.max( 0, Math.min( maxScrollX, nextScrollX ) );
                nextScrollY = Math.max( 0, Math.min( maxScrollY, nextScrollY ) );

                if (
                    ( nextScrollX !== currentScrollX ) ||
                    ( nextScrollY !== currentScrollY )
                ) {

                    window.scrollTo( nextScrollX, nextScrollY );
                    return( true );

                } else {

                    return( false );

                }

            }
        };

        window.addEventListener("mousemove", handleMousemove);

        return () => {
            window.removeEventListener("mousemove", handleMousemove);
        };
    }, [isActive, edgeSize]);
};

export default useAutoScroll;