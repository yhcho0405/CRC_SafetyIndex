import { useEffect, useState } from "react";
import { fetchAccelerationData } from "./projects/sensorvalue-item.js";

function scalingBpm(heart_rate) {
    if (heart_rate >= 60 && heart_rate <= 100) {
        return 0;
    } else if (heart_rate >= 100 && heart_rate < 110) {
        return 1;
    } else if (heart_rate >= 110 && heart_rate < 120) {
        return 2;
    } else if (heart_rate >= 120 && heart_rate < 140) {
        return 3;
    } else if (heart_rate >= 140 && heart_rate < 160) {
        return 4;
    } else {
        return 5;
    }
}

function scalingBodyTemperture(btmp) {
    if (btmp >= 35 && btmp <= 37.5) {
        return 0;
    } else if (btmp >= 37.6 && btmp < 38) {
        return 1;
    } else if (btmp >= 38.1 && btmp < 38.5) {
        return 2;
    } else if (btmp >= 38.6 && btmp < 39) {
        return 3;
    } else if (btmp >= 39.1 && btmp < 40) {
        return 4;
    } else {
        return 5;
    }
}

function scalingOxygen(oxygen_saturation) {
    if (oxygen_saturation >= 95) {
        return 0;
    } else if (oxygen_saturation >= 92 && oxygen_saturation < 95) {
        return 1;
    } else if (oxygen_saturation >= 90 && oxygen_saturation < 92) {
        return 2;
    } else if (oxygen_saturation >= 85 && oxygen_saturation < 90) {
        return 3;
    } else if (oxygen_saturation >= 80 && oxygen_saturation < 85) {
        return 4;
    } else {
        return 5;
    }
}
function scalingImpulse(impact_force) {
    if (impact_force >= 0 && impact_force < 80) {
        return 0; // negligible impact force
    } else if (impact_force >= 80 && impact_force < 180) {
        return 1; // minor impact force
    } else if (impact_force >= 180 && impact_force < 380) {
        return 2; // moderate impact force
    } else if (impact_force >= 380 && impact_force < 580) {
        return 3; // significant impact force
    } else if (impact_force >= 580 && impact_force < 780) {
        return 4; // severe impact force
    } else {
        return 5; // extremely dangerous impact force
    }
}
function scalingAcceleration(acceleration) {
    if (acceleration <= 0) {
        return 0;
    } else if (acceleration <= 2.5) {
        return 1;
    } else if (acceleration <= 5) {
        return 2;
    } else if (acceleration <= 7.5) {
        return 3;
    } else if (acceleration <= 10) {
        return 4;
    } else {
        return 5;
    }
}

function scalingImpactDuration(impact_duration) {
    if (impact_duration <= 0.5) {
        return 0;
    } else if (impact_duration <= 1) {
        return 1;
    } else if (impact_duration <= 2) {
        return 2;
    } else if (impact_duration <= 3) {
        return 3;
    } else if (impact_duration <= 4) {
        return 4;
    } else {
        return 5;
    }
}

function scalingCAI(cai) {
    if (cai >= 0 && cai < 50) {
        return 0;
    } else if (cai >= 50 && cai < 100) {
        return 1;
    } else if (cai >= 100 && cai < 150) {
        return 2;
    } else if (cai >= 150 && cai < 200) {
        return 3;
    } else if (cai >= 250 && cai < 300) {
        return 4;
    } else {
        return 5;
    }
}

function scalingAmbientTemperture(ambtmp) {
    if (ambtmp >= 15 && ambtmp <= 30) {
        return 0; // normal temperature
    } else if (ambtmp >= 10 && ambtmp < 15) {
        return 1; // slightly abnormal temperature
    } else if ((ambtmp >= 5 && ambtmp < 10) || (ambtmp > 30 && ambtmp <= 35)) {
        return 2; // moderately abnormal temperature
    } else if ((ambtmp >= -5 && ambtmp < 5) || (ambtmp > 35 && ambtmp <= 40)) {
        return 3; // significantly abnormal temperature
    } else if ((ambtmp >= -10 && ambtmp < -5) || (ambtmp > 40 && ambtmp <= 45)) {
        return 4; // dangerously abnormal temperature
    } else {
        return 5; // extreme temperature, potentially fatal
    }
}

function scalingAltitude(altitude) {
    if (altitude >= 0 && altitude < 1000) {
        return 0; // normal
    } else if (altitude >= 1000 && altitude < 2000) {
        return 1;
    } else if (altitude >= 2000 && altitude < 3000) {
        return 2;
    } else if (altitude >= 3000 && altitude < 4000) {
        return 3;
    } else if (altitude >= 4000 && altitude < 5000) {
        return 4;
    } else {
        return 5; // abnormal and dangerous
    }
}
function scalingAcc(acc) {
    acc = Math.abs(acc);
    return Math.min(5, acc * 5);
}
function pearsonCorrelation(x, y) {
    if (x.length !== y.length) {
        //throw "same length";
    }

    var n = x.length;

    var sumX = 0,
        sumY = 0,
        sumXY = 0,
        sumX2 = 0,
        sumY2 = 0;
    for (var i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
        sumY2 += y[i] * y[i];
    }

    var numerator = n * sumXY - sumX * sumY;
    var denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return numerator / (denominator + Math.random() / 100); // Migaehada
}

function calc_index(A, B, C, D, a, b, c) {
    var answer = 0;

    for (var i = 0; i < A.length; i++) answer += parseInt(A[i]);
    var AA = answer / A.length;
    answer = 0;
    for (var i = 0; i < B.length; i++) answer += parseInt(B[i]);
    var BB = answer / B.length;
    answer = 0;
    for (var i = 0; i < C.length; i++) answer += parseInt(C[i]);
    var CC = answer / C.length;
    answer = 0;
    for (var i = 0; i < D.length; i++) answer += parseInt(D[i]);
    var DD = answer / D.length;

    return Math.sqrt(AA ** 2 + (a * BB) ** 2 + (b * CC) ** 2 + (c * DD) ** 2);
}

function sign_check(flag) {
    if (flag == 0) return 0;
    else return 1;
}
function safe_level(s_result) {
    if (0 <= s_result && s_result < 2.5) {
        return 0;
    } else if (2.5 <= s_result && s_result < 5) {
        return 1;
    } else if (5 <= s_result && s_result < 7.5) {
        return 2;
    } else {
        return 3;
    }
}
export default function calc(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, lastXValue, lastYValue, lastZValue) {
    var q1_b = parseInt(s1); //심박수 40~120 6/1
    var q2_b = parseInt(s2); //온도
    var q3_b = parseInt(s3); //산소포화도 < 95, >95
    var q6_b = parseInt(s6);
    var q7_b = parseInt(s7);
    var q8_b = parseInt(s8);
    var q10_b = s11 - 1;
    var q11_b = s12 - 1;
    var q12_b = s13 - 1;
    var q13_b = [0, 1, 2, 3.5, 5][s4 - 1]; //수면
    var q14_b = [0, 1, 3, 4, 5][s5 - 1]; // 수술력
    var q17_b = [0, 1, 2, 3.5, 5][s9 - 1]; // 자외선
    var q18_b = [0, 2, 2.5, 4, 5][s10 - 1]; // 열파
    var q19_b = s14 - 1;
    var q20_b = s15 - 1;

    // 헬멧
    var q4_b = scalingAcc(lastXValue); //
    var q5_b = scalingAcc(lastYValue); //
    var q9_b = scalingAcc(lastZValue); //
    var q15_b = 2;
    var q16_b = 2;

    var q1 = scalingBpm(q1_b); //+ Math.random()/100;
    var q2 = scalingBodyTemperture(q2_b); // + Math.random()/100;
    var q3 = scalingOxygen(q3_b); // + Math.random()/100;
    var q4 = q4_b; //scalingImpulse(q4_b); // + Math.random()/100;
    var q5 = q5_b; //scalingAcceleration(q5_b); // + Math.random()/100;
    var q6 = scalingCAI(q6_b); // + Math.random()/100;
    var q7 = scalingAmbientTemperture(q7_b); // + Math.random()/100;
    var q8 = scalingAltitude(q8_b); // + Math.random()/100;
    var q9 = q9_b; //scalingImpactDuration(q9_b); // + Math.random()/100;
    var q10 = Number(q10_b); // + Math.random()/100;
    var q11 = Number(q11_b); /// + Math.random()/100;
    var q12 = Number(q12_b); // + Math.random()/100;
    var q13 = Number(q13_b); /// + Math.random()/100;
    var q14 = Number(q14_b); // + Math.random()/100;
    var q15 = Number(q15_b); // + Math.random()/100;
    var q16 = Number(q16_b); // + Math.random()/100;
    var q17 = Number(q17_b); // + Math.random()/100;
    var q18 = Number(q18_b); /// + Math.random()/100;
    var q19 = Number(q19_b); // + Math.random()/100;
    var q20 = Number(q20_b); // + Math.random()/100;

    //console.log(q7);
    //console.log(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12);
    var A = [q1, q2, q3, q13, q14];
    var B = [q10, q11, q12, q19, q20];
    var C = [q4, q5, q9, q15, q16];
    var D = [q6, q7, q8, q17, q18];

    var a = pearsonCorrelation(A, D);
    var b = pearsonCorrelation(A, B); //생체-심리
    var c = pearsonCorrelation(A, C);
    var d = pearsonCorrelation(B, D); //심리-환경
    var e = pearsonCorrelation(B, C); //심리-사물손상
    var f = pearsonCorrelation(C, D);
    //생체-환경
    //생체-사물
    //사물-환경
    var newA = calc_index(A, D, B, C, 1, 1, 1); //a, b, c);
    var newB = calc_index(B, A, D, C, 1, 1, 1); // b, d, e);
    var newC = calc_index(C, B, C, D, 1, 1, 1); // c, e, f);
    var newD = calc_index(D, A, D, B, 1, 1, 1); // a, d, f);
    var temp;
    if (
        Math.max(newA, newB, newC, newD) >= 8 ||
        Math.max(q4 + q5 + q9 + q15 + q16, q6 + q7 + q8 + q17 + q18, q10 + q11 + q12 + q19 + q20, q1 + q2 + q3 + q13 + q14) >= 14 ||
        Math.max(q4, q5, q9, q15, q16, q6, q7, q8, q17, q18, q10, q11, q12, q19, q20, q1, q2, q3, q13, q14) == 5
    ) {
        temp = 0;
    } else {
        temp = (newA + newB + newC + newD) / 4;
        temp = 10 - temp;
    }

    return [temp.toFixed(2), safe_level(temp.toFixed(2))];
}
