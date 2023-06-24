import Image from "next/image";
import Link from "next/link";
export default function ProjectItem({ data }) {
    const name = data.properties.Name.title[0].plain_text;

    const imgSrc = data.properties.img.url;
    const s1 = data.properties.s1.number; // 심박
    const s2 = data.properties.s2.number; // 체온
    const s3 = data.properties.s3.number; // 산소
    const s4 = data.properties.s4.number; // 수면
    const s4s = ["8시간 이상", "7~8시간", "6~7시간", "5~6시간", "5시간 이하"];
    const s5 = data.properties.s5.number; // 병력, 수술력
    const s5s = [
        "없음",
        "단순 맹장/충수염 절제술, 편도절제술 (또는 기타 수술 1회)",
        "담낭제거, 제왕절개 등 (또는 기타 수술 2회)",
        "심장우회술, 고관절교체술 등 (또는 기타 수술 3회)",
        "신장이식, 척추유합술, 기흉 등 (또는 기타 수술 4회 이상)",
    ];
    const s6 = data.properties.s6.number; // 공기오염도
    const s7 = data.properties.s7.number; // 기온
    const s8 = data.properties.s8.number; // 고도
    const s9 = data.properties.s9.number; // 자외선
    const s9s = ["~2", "3~5", "6~7", "8~10", "11~"];
    const s10 = data.properties.s10.number; // 열파지수
    const s10s = ["~27", "27~32", "32~41", "41~54", "54~"];
    const s11 = data.properties.s11.number; // 불안
    const s12 = data.properties.s12.number; // 스트레스
    const s13 = data.properties.s13.number; // 피로
    const s14 = data.properties.s14.number; // 우울
    const s1ns = ["전혀 그렇지 않음", "약간", "다소", "보통", "매우 그렇다", "극심하게 그렇다"];
    const s15 = data.properties.s15.number; // 약물
    const s15s = [
        "없음",
        "과거 복용력이 있다",
        "감기약또는 진통제를 복용중이다",
        "스테로이드성 약물, 항히스타민 계열(졸음을 유발하는 약물) 등을 복용중이다",
        "고혈압, 당뇨 관련 약물을 복용중이다",
        "위에 해당하는 약물/전문의약품을 장기간 처방받아 복용/투약중이다",
    ];
    const acc_data = data.properties.acc.rich_text;

    const calculatedPeriod = (start, end) => {
        const startDateStringArray = start.split("-");
        const endDateStringArray = end.split("-");

        var startDate = new Date(startDateStringArray[0], startDateStringArray[1], startDateStringArray[2]);
        var endDate = new Date(endDateStringArray[0], endDateStringArray[1], endDateStringArray[2]);

        console.log(`startDate: ${startDate}`);
        console.log(`endDate: ${endDate}`);

        const diffInMs = Math.abs(endDate - startDate);
        const result = diffInMs / (1000 * 60 * 60 * 24);

        console.log(`기간 : ${result}`);
        return result;
    };

    console.log(name);
    return (
        <div className="w-full md:w-96 md:max-w-full mx-auto">
            <div className="p-6 border border-gray-300 sm:rounded-md">
                <form method="POST" action="">
                    <label className="block mb-6">
                        <span className="">심박수(bpm)</span>
                        <input
                            disabled
                            name="s1"
                            type="number"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder={s1}
                        />
                    </label>
                    <label className="block mb-6">
                        <span className="">체온(°C)</span>
                        <input
                            disabled
                            name="s2"
                            type="number"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder={s2}
                        />
                    </label>
                    <label className="block mb-6">
                        <span className="">산소포화도(%)</span>
                        <input
                            disabled
                            name="s3"
                            type="number"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder={s3}
                        />
                    </label>
                    <label className="block mb-6">
                        <span className="">수면 시간(hour)</span>
                        <select disabled name="present" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>{s4s[s4 - 1]}</option>
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="">과거병력, 수술력 여부(times)</span>
                        <select disabled name="present" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>{s5s[s5 - 1]}</option>
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="">공기오염도(CAI)</span>
                        <input
                            disabled
                            name="s6"
                            type="number"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder={s6}
                        />
                    </label>
                    <label className="block mb-6">
                        <span className="">기온(°C)</span>
                        <input
                            disabled
                            name="s7"
                            type="number"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder={s7}
                        />
                    </label>
                    <label className="block mb-6">
                        <span className="">고도(m)</span>
                        <input
                            disabled
                            name="s8"
                            type="number"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder={s8}
                        />
                    </label>
                    <label className="block mb-6">
                        <span className="">자외선 지수(UV Index)</span>
                        <select disabled name="present" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>{s9s[s9 - 1]}</option>
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="">열지수/열파지수(Heat Index)</span>
                        <select disabled name="present" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>{s10s[s10 - 1]}</option>
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="">지금 얼마나 불안하다고 느끼십니까?</span>
                        <select disabled name="present" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>{s1ns[s11 - 1]}</option>
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="">현재 스트레스를 얼마나 느끼십니까?</span>
                        <select disabled name="present" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>{s1ns[s12 - 1]}</option>
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="">0~5점 척도 중 현재 얼마나 피로감을 느끼십니까?</span>
                        <select disabled name="present" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>{s1ns[s13 - 1]}</option>
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="">현재 우을증, 우울감 정도는 어떻습니까?</span>
                        <select disabled name="present" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>{s1ns[s14 - 1]}</option>
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="">복용력 또는 현재 복용중인 약물이 있습니까?</span>
                        <select disabled name="present" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option>{s15s[s15 - 1]}</option>
                        </select>
                    </label>
                    <label className="block mb-6">
                        <span className="">마지막으로 측정된 헬멧 충격 데이터</span>
                        <input
                            disabled
                            name="acc_data"
                            type="text"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder={acc_data}
                        />
                    </label>
                    <div className="mb-6"></div>
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
        //https://herotofu.com/solutions/forms-library/tailwind/questionnaire-form
    );
}
