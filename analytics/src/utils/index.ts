import { getDarkmodeColor as color} from "./colorGenerator";

export const depressionTypeFromScore =  (score: number) => {
    if(score > 40) return 5;
    else if(score >= 31) return 4;
    else if(score >= 21) return 3;
    else if(score >= 17) return 2;
    else if(score >= 11) return 1;
    else return 0;
}

const colors = [ 
    color(100), 
    color(80), 
    color(60),
    color(40),
    color(20),
    color(0)
];

export const getColorFromType = (type: number) => {
    return colors[type];
}