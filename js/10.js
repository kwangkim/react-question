import QNAvideo from "./qnavideo.js";
import {render} from 'react-dom';
import React from "react";
var mainNode = document.getElementById('main');
var data=[
      {
          ID:'1',
          qtext:'Simplify. \\[7\\sqrt{24}-3\\sqrt{6}\\]',
          choices:[
              {ID:'A',ctext:'\\(42\\sqrt{2}-3\\sqrt{6}\\)'},
              {ID:'B',ctext:'\\(25\\sqrt{6}\\)'},
              {ID:'C',ctext:'\\(11\\sqrt{6}\\)'},
              {ID:'D',ctext:'\\(12\\sqrt{2}\\)'},
          ],
          ans: 'C',
          videoId:'Question-1.mp4',
      },

];
render(<QNAvideo title="MA441 Related Rates" backtitle="Go back to QCC Math & CS" backlink="http://www.qcc.cuny.edu/MathCS" data={data}/>, mainNode);