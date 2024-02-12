import {useEffect, useRef, useState} from 'react'

import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation} from 'react-router-dom';

import './App.css';
import TargetAcquisition from "./targetAcquisition.jsx";
import ReadingTask from "./ReadingTask.jsx";
import useAutoScroll from './useAutoScroll';
import DropDownMenu from "./DropDownMenu.jsx";
import ZoomModeDropDown from "./DropDownButton.jsx";
import jpg from './cactus-8250996_1280.jpg'
import BarChart from "./barchart.svg";
import useWindowMirror from "./useWindowMirror.js";
import BarchartSVG from "./components/BarchartSVG.jsx";

function App() {
    const [darkTheme, setDarkTheme] = useState(false);
    const [svgSize, setSvgSize] = useState(100); // Default SVG size
    const [openDropDown, setOpenDropDown] = useState(false);
    const [selected, setSelected] = useState('Default');
    const [onWindow, setOnWindow] = useState(false);


    // const mainRef = useRef(null);

    const handleSelectionChange = (item) => {
        setSelected(item);

        if (item === 'Default') {
            setSvgSize(100);
            setOnWindow(false);
        } else if (item === 'Window') {
            setOnWindow(true);

        } else {
            setOnWindow(false);
        }
    };

    useAutoScroll(selected === 'Pan', 100);

    useWindowMirror(selected === 'Window');

    const toggleTheme = () => {
        setDarkTheme(prevDarkTheme => {
            const newTheme = !prevDarkTheme;

            // Change the CSS variable for background color
            if (newTheme) {
                document.documentElement.style.setProperty('--background-color', '#242424');
                document.documentElement.style.setProperty('--color', '#FFFFFF');
            } else {
                document.documentElement.style.setProperty('--background-color', '#FFFFFF');
                document.documentElement.style.setProperty('--color', '#000000');
            }

            return newTheme;
        });
    };

    return (
      <div className={darkTheme ? 'dark-theme' : ''}>
          <Router>
              <nav className="navbar">
                  <ul className="nav-links">
                      <li><Link to="/first">Visual Field Test</Link></li>
                      <li><Link to="/targetAcquisition">Target Acquisition Task</Link></li>
                      <li><Link to="/readingTask">Reading Test</Link></li>
                      <li><a href="#">Obs Reading Eval</a></li>
                      <li><button className="switch-theme-button" onClick={toggleTheme}>Switch Theme</button></li>
                      <li onClick={() => setOpenDropDown(prevState => !prevState)}><ZoomModeDropDown/></li>
                      {openDropDown && <li onClick={() => setOpenDropDown(prevState => !prevState)}><DropDownMenu onSelect={handleSelectionChange} selected={selected}/></li>}
                      { (selected === 'Pan' || selected === 'Window') &&
                          <li>
                          <span className="slider-label nav-links">Zoom: </span>
                          <div><input
                              type="range"
                              className="slider"
                              id="svg-size-slider"
                              min="50"
                              max="200"
                              value={svgSize}
                              onChange={(e) => {
                                  (selected === 'Pan') && setSvgSize(e.target.value)
                              }}
                          />
                          </div>
                      </li>
                      }
                  </ul>
              </nav>
              <Routes>
                  <Route path="/first">
                  </Route>
                  <Route path="/targetAcquisition" element={<TargetAcquisition/>}/>
                  <Route path="/readingTask" element={
                        onWindow ? (
                            // <div id="main">
                            //     {/*<BarChart className="svg" style={{ width: "100%"}}/>*/}
                            //     <img src={BarChart} width="100%" />
                            //     {/*<ReadingTask svgSize={100} />*/}
                            //     <div id="mirror" >
                            //         {/*<ReadingTask svgSize={svgSize} />*/}
                            //         <img src={BarChart}/>
                            //         {/*<BarChart className="svg"/>*/}
                            //     </div>
                            // </div>

                            <BarchartSVG width={700} height={580}/>
                            )
                            :
                      <ReadingTask svgSize={svgSize}/>
                  }/>
              </Routes>
          </Router>
      </div>


  )
}

export default App
