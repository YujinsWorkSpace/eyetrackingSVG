import {useEffect} from "react";

const useWindowMirror = (isActivated) => {
    let timer = null;
    useEffect(() => {
        let oMain = document.querySelector('#main');
        let oMirror = document.querySelector('#mirror');
        let oBigimg = document.querySelector('#mirror img');

        if (!oMain || !oMirror ) {
            console.error('Required elements not found in the DOM');
            return;
        } else {
            console.log('Required elements found in the DOM');
        }

        const handleMouseMove = e => {
            let x = e.clientX;
            let y = e.clientY;
            let x_left = oMain.offsetLeft;
            let x_right = oMain.offsetWidth + x_left;
            let y_top = oMain.offsetTop;
            let y_bottom = oMain.offsetHeight + y_top;

            (function checkForWindowMirror() {
                clearTimeout(timer);

                if ( adjustWindowMirror() ) {
                    timer = setTimeout(checkForWindowMirror, 300);
                    console.log(timer);
                }
            })();

            function adjustWindowMirror() {
                oMirror.style.left = x - x_left - oMirror.offsetWidth / 2 + 'px';
                oMirror.style.top = y - y_top - oMirror.offsetHeight / 2 + 'px';

                let bigImgLeft = (oBigimg.offsetWidth / oMain.offsetWidth) * (x - x_left) - oMirror.offsetWidth / 2;
                let bigImgTop = (oBigimg.offsetHeight / oMain.offsetHeight) * (y - y_top) - oMirror.offsetHeight / 2;

                oBigimg.style.left = -bigImgLeft + 'px';
                oBigimg.style.top = -bigImgTop + 'px';

                return x >= x_left && x <= x_right && y >= y_top && y <= y_bottom;
            }
        };

        oMain.addEventListener('mousemove', handleMouseMove);

        return () => {
            oMain.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isActivated]);
};

export default useWindowMirror;