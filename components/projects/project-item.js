import Image from "next/image";
import Link from "next/link";
import calc from "../calc";
import { useEffect, useState } from "react";
import { fetchAccelerationData } from "./sensorvalue-item.js";

var previousEuclideanDistance = 0;
var previousX = 0.0;
var previousY = 0.0;
var previousZ = 0.0;
var previousData = { x: 0.0, y: 0.0, z: 0.0 };
const histStyle = { transitionProperty: "height", transitionDuration: "0.1s", transitionTimingFunction: "ease-in-out" };

export default function ProjectItem({ data }) {
    const name = data.properties.Name.title[0].plain_text;

    const imgSrc = data.properties.img.url;
    const [s1, setS1] = useState(data.properties.s1.number); // 심박
    const [s2, setS2] = useState(data.properties.s2.number); // 체온
    const [s3, setS3] = useState(data.properties.s3.number); // 산소
    const [s4, setS4] = useState(data.properties.s4.number); // 수면
    const [s5, setS5] = useState(data.properties.s5.number); // 병력, 수술력
    const [s6, setS6] = useState(data.properties.s6.number); // 공기오염도
    const [s7, setS7] = useState(data.properties.s7.number); // 기온
    const [s8, setS8] = useState(data.properties.s8.number); // 고도
    const [s9, setS9] = useState(data.properties.s9.number); // 자외선
    const [s10, setS10] = useState(data.properties.s10.number); // 열파지수
    const [s11, setS11] = useState(data.properties.s11.number); // 불안
    const [s12, setS12] = useState(data.properties.s12.number); // 스트레스
    const [s13, setS13] = useState(data.properties.s13.number); // 피로
    const [s14, setS14] = useState(data.properties.s14.number); // 우울
    const [s15, setS15] = useState(data.properties.s15.number); // 약물

    const s4s = ["8시간 이상", "7~8시간", "6~7시간", "5~6시간", "5시간 이하"];
    const s5s = [
        "없음",
        "단순 맹장/충수염 절제술, 편도절제술 (또는 기타 수술 1회)",
        "담낭제거, 제왕절개 등 (또는 기타 수술 2회)",
        "심장우회술, 고관절교체술 등 (또는 기타 수술 3회)",
        "신장이식, 척추유합술, 기흉 등 (또는 기타 수술 4회 이상)",
    ];
    const s9s = ["~2", "3~5", "6~7", "8~10", "11~"];
    const s10s = ["~27", "27~32", "32~41", "41~54", "54~"];
    const s1ns = ["전혀 그렇지 않음", "약간", "다소", "보통", "매우 그렇다", "극심하게 그렇다"];
    const s15s = [
        "없음",
        "과거 복용력이 있다",
        "감기약또는 진통제를 복용중이다",
        "스테로이드성 약물, 항히스타민 계열(졸음을 유발하는 약물) 등을 복용중이다",
        "고혈압, 당뇨 관련 약물을 복용중이다",
        "위에 해당하는 약물/전문의약품을 장기간 처방받아 복용/투약중이다",
    ];
    const acc_data = data.properties.acc.rich_text;

    //sensor
    const [sensorData, setData] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            const newData = await fetchAccelerationData();
            setData(newData);
        };

        fetchAllData();

        const intervalId = setInterval(fetchAllData, 300);

        return () => clearInterval(intervalId);
    }, []);
    // const lastXValue = sensorData.length > 0 ? sensorData[sensorData.length - 1].x : previousX;
    // const lastYValue = sensorData.length > 0 ? sensorData[sensorData.length - 1].y : previousY;
    // const lastZValue = sensorData.length > 0 ? sensorData[sensorData.length - 1].z : previousZ;
    function checkData(data, idx) {
        if (data == undefined) {
            console.log("error1");
            return previousData[idx];
        } else if (!(idx in data)) {
            console.log("error2");
            return previousData[idx];
        } else {
            previousData[idx] = data[idx];
            return data[idx];
        }
    }
    console.log("test: ", sensorData[sensorData.length - 1]);

    let sensorDataObj = sensorData[sensorData.length - 1];
    const lastXValue = checkData(sensorDataObj, "x");
    const lastYValue = checkData(sensorDataObj, "y");
    const lastZValue = checkData(sensorDataObj, "z");

    const res = calc(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, lastXValue, lastYValue, lastZValue);
    const safety_index = Number(res[0]);
    const safety_level = res[1];

    let EuclideanDistance;
    if ((isNaN(lastXValue) || isNaN(lastYValue) || isNaN(lastZValue)) == false) {
        EuclideanDistance = Math.sqrt(Math.pow(lastXValue, 2) + Math.pow(lastYValue, 2) + Math.pow(lastZValue, 2)).toFixed(7);
        previousEuclideanDistance = EuclideanDistance;
    } else {
        EuclideanDistance = previousEuclideanDistance;
    }

    function SensorDataScaling(sensorVal) {
        sensorVal = (sensorVal / 0.1) * 100 + 50;
        return Math.max(0, Math.min(sensorVal, 100));
    }
    function EuclideanDistanceScaling(sensorVal) {
        sensorVal = (sensorVal / 10) * 100 + 50;
        return Math.max(0, Math.min(sensorVal, 100));
    }

    return (
        <>
            <div className="w-full md:w-96 md:max-w-full mx-auto">
                <div className="p-6 border border-gray-300 sm:rounded-md">
                    <form method="POST" action="">
                        <label className="block mb-6">
                            <span className="">심박수(bpm)</span>
                            <input
                                name="s1"
                                type="number"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder={s1}
                                onChange={(e) => setS1(e.target.value)}
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="">체온(°C)</span>
                            <input
                                name="s2"
                                type="number"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder={s2}
                                onChange={(e) => setS2(e.target.value)}
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="">산소포화도(%)</span>
                            <input
                                name="s3"
                                type="number"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder={s3}
                                onChange={(e) => setS3(e.target.value)}
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="">수면 시간(hour)</span>
                            <select
                                name="present"
                                onChange={(e) => setS4(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value={s4}>{s4s[s4 - 1]}</option>
                                <option value="1">8시간 이상</option>
                                <option value="2">7~8시간</option>
                                <option value="3">6~7시간</option>
                                <option value="4">5~6시간</option>
                                <option value="5">5시간 이하</option>
                            </select>
                        </label>
                        <label className="block mb-6">
                            <span className="">과거병력, 수술력 여부(times)</span>
                            <select
                                name="present"
                                onChange={(e) => setS5(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value={s5}>{s5s[s5 - 1]}</option>
                                <option value="1">없음</option>
                                <option value="2">단순 맹장/충수염 절제술, 편도절제술 (또는 기타 수술 1회)</option>
                                <option value="3">담낭제거, 제왕절개 등 (또는 기타 수술 2회)</option>
                                <option value="4">심장우회술, 고관절교체술 등 (또는 기타 수술 3회)</option>
                                <option value="5">신장이식, 척추유합술, 기흉 등 (또는 기타 수술 4회 이상)</option>
                            </select>
                        </label>
                        <label className="block mb-6">
                            <span className="">공기오염도(CAI)</span>
                            <input
                                name="s6"
                                type="number"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder={s6}
                                onChange={(e) => setS6(e.target.value)}
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="">기온(°C)</span>
                            <input
                                name="s7"
                                type="number"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder={s7}
                                onChange={(e) => setS7(e.target.value)}
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="">고도(m)</span>
                            <input
                                name="s8"
                                type="number"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder={s8}
                                onChange={(e) => setS8(e.target.value)}
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="">자외선 지수(UV Index)</span>
                            <select
                                name="present"
                                onChange={(e) => setS9(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value={s9}>{s9s[s9 - 1]}</option>
                                <option value="1">~2</option>
                                <option value="2">3~5</option>
                                <option value="3">6~7</option>
                                <option value="4">8~10</option>
                                <option value="5">11~</option>
                            </select>
                        </label>
                        <label className="block mb-6">
                            <span className="">열지수/열파지수(Heat Index)</span>
                            <select
                                name="present"
                                onChange={(e) => setS10(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value={s10}>{s10s[s10 - 1]}</option>
                                <option value="1">~27</option>
                                <option value="2">27~32</option>
                                <option value="3">32~41</option>
                                <option value="4">41~54</option>
                                <option value="5">54~</option>
                            </select>
                        </label>
                        <label className="block mb-6">
                            <span className="">지금 얼마나 불안하다고 느끼십니까?</span>
                            <select
                                name="present"
                                onChange={(e) => setS11(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value={s11}>{s1ns[s11 - 1]}</option>
                                <option value="1">전혀 그렇지 않음</option>
                                <option value="2">약간</option>
                                <option value="3">다소</option>
                                <option value="4">보통</option>
                                <option value="5">매우 그렇다</option>
                                <option value="6">극심하게 그렇다</option>
                            </select>
                        </label>
                        <label className="block mb-6">
                            <span className="">현재 스트레스를 얼마나 느끼십니까?</span>
                            <select
                                name="present"
                                onChange={(e) => setS12(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value={s12}>{s1ns[s12 - 1]}</option>
                                <option value="1">전혀 그렇지 않음</option>
                                <option value="2">약간</option>
                                <option value="3">다소</option>
                                <option value="4">보통</option>
                                <option value="5">매우 그렇다</option>
                                <option value="6">극심하게 그렇다</option>
                            </select>
                        </label>
                        <label className="block mb-6">
                            <span className="">0~5점 척도 중 현재 얼마나 피로감을 느끼십니까?</span>
                            <select
                                name="present"
                                onChange={(e) => setS13(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value={s13}>{s1ns[s13 - 1]}</option>
                                <option value="1">전혀 그렇지 않음</option>
                                <option value="2">약간</option>
                                <option value="3">다소</option>
                                <option value="4">보통</option>
                                <option value="5">매우 그렇다</option>
                                <option value="6">극심하게 그렇다</option>
                            </select>
                        </label>
                        <label className="block mb-6">
                            <span className="">현재 우을증, 우울감 정도는 어떻습니까?</span>
                            <select
                                name="present"
                                onChange={(e) => setS14(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value={s14}>{s1ns[s14 - 1]}</option>
                                <option value="1">전혀 그렇지 않음</option>
                                <option value="2">약간</option>
                                <option value="3">다소</option>
                                <option value="4">보통</option>
                                <option value="5">매우 그렇다</option>
                                <option value="6">극심하게 그렇다</option>
                            </select>
                        </label>
                        <label className="block mb-6">
                            <span className="">복용력 또는 현재 복용중인 약물이 있습니까?</span>
                            <select
                                name="present"
                                onChange={(e) => setS15(e.target.value)}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value={s15}>{s15s[s15 - 1]}</option>
                                <option value="1">없음</option>
                                <option value="2">과거 복용력이 있다</option>
                                <option value="3">감기약또는 진통제를 복용중이다</option>
                                <option value="4">스테로이드성 약물, 항히스타민 계열(졸음을 유발하는 약물) 등을 복용중이다</option>
                                <option value="5">고혈압, 당뇨 관련 약물을 복용중이다</option>
                                <option value="6">위에 해당하는 약물/전문의약품을 장기간 처방받아 복용/투약중이다</option>
                            </select>
                        </label>
                        <label className="block mb-6">
                            <span className="">마지막으로 측정된 헬멧 충격 데이터</span>
                            <input
                                name="acc_data"
                                type="text"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder={Math.abs(lastXValue) + Math.abs(lastXValue) + Math.abs(lastXValue)}
                            />
                        </label>
                        {/* <div className="mb-6">
                            <button
                                type="submit"
                                className="
                          h-10
                          px-5
                          text-indigo-100
                          bg-indigo-700
                          rounded-lg
                          transition-colors
                          duration-150
                          focus:shadow-outline
                          hover:bg-indigo-800
                      "
                            >
                                저장
                            </button>
                        </div> */}

                        <div>
                            <div className="mt-2  text-right text-xs">
                                by
                                <Link href="https://mdtlab.github.io/">
                                    <a className="hover:underline" target="_blank">
                                        MDTLab
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full md:w-96 md:max-w-full mx-auto">
                <iframe src="https://crc-safety-index.kro.kr/grafana/d-solo/dac45951-a9f0-4bc9-a473-7f013ffbb578/new-dashboard?orgId=1&refresh=1s&panelId=1" width={450} height={200} frameBorder={0} />
                <div className="bg-white shadow-lg rounded-xl flex items-start max-w-1/2 w-[90%] lg:w-full justify-center py-4 px-4 mx-4 my-2">
                    <div className="flex items-center justify-start w-full">
                        <div className="flex-col w-[85%]">
                            <div className="text-sm font-medium text-violet-600 my-2">최근 헬멧 데이터</div>
                            <div className="class flex items-center">
                                <div className="text-3xl font-bold text-gray-700">{EuclideanDistance}m/s²</div>
                                <div className="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium "></div>
                            </div>
                            <div className="flex items-center justify-between mt-4 ">
                                <div className="flex-col">
                                    <div className="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                        <div style={{ height: `${SensorDataScaling(lastXValue)}%`, ...histStyle }} className="w-6 rounded-tr rounded-tl bg-green-300" />
                                    </div>
                                    <div className="text-xs font-medium ml-2 text-gray-500">x axis</div>
                                    <div className="text-xs font-medium ml-2 text-gray-500">{lastXValue >= 0 ? `+${lastXValue.toFixed(3)}` : lastXValue.toFixed(3)}</div>
                                </div>
                                <div className="flex-col">
                                    <div className="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                        <div style={{ height: `${SensorDataScaling(lastYValue)}%`, ...histStyle }} className="w-6 rounded-tr rounded-tl bg-green-300" />
                                    </div>
                                    <div className="text-xs font-medium ml-2 text-gray-500">y axis</div>
                                    <div className="text-xs font-medium ml-2 text-gray-500">{lastYValue >= 0 ? `+${lastYValue.toFixed(3)}` : lastYValue.toFixed(3)}</div>
                                </div>
                                <div className="flex-col">
                                    <div className="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                        <div style={{ height: `${SensorDataScaling(lastZValue)}%`, ...histStyle }} className="w-6 rounded-tr rounded-tl bg-green-300" />
                                    </div>
                                    <div className="text-xs font-medium ml-2 text-gray-500">z axis</div>
                                    <div className="text-xs font-medium ml-2 text-gray-500">{lastZValue >= 0 ? `+${lastZValue.toFixed(3)}` : lastZValue.toFixed(3)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-full justify-center py-4 px-8 mx-4 my-2">
                    <div className="flex items-center justify-start w-full">
                        <div className="flex-col w-[85%]">
                            <div className="text-sm font-medium text-violet-600 my-2">안전지수</div>
                            <div className="class flex items-center">
                                <div className="text-3xl font-bold text-gray-700">{safety_index}</div>
                                <div
                                    className={`flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl ${
                                        ["text-red-500", "text-orange-500", "text-yellow-500", "text-green-500"][safety_level]
                                    } font-medium`}
                                >
                                    <div className={`text-xs ${["bg-red-200", "bg-orange-200", "bg-yellow-200", "bg-green-200"][safety_level]} px-2 rounded-lg`}>{(safety_index * 10).toFixed(2)}%</div>
                                </div>
                            </div>
                            <div className="w-full h-1 rounded bg-gray-300 my-1">
                                <div
                                    style={{ width: `${safety_index * 10}%` }}
                                    className={`w-[${safety_index * 10}%] h-1 rounded ${["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"][safety_level]}`}
                                />
                            </div>
                            <div className="text-xs font-medium text-gray-400 ">{["매우 위험", "위험", "주의", "안전"][safety_level]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        //https://herotofu.com/solutions/forms-library/tailwind/questionnaire-form
        //https://tailblocks.org/stats3
    );
}
