import Animation from "./animation";
import Link from "next/link";

export default function Hero() {
    return (
        <>
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    CRC 생존 신호정보 연구센터
                    <br className="hidden lg:inline-block" />
                    안전지수 측정
                </h1>
                <p className="mb-8 leading-relaxed">
                    이 서비스는 CRC과제에 대한 연구 목적으로 개발 되었으며,
                    웨어러블 기기의 측정 값을 토대로 안전지수를 산출하기 위한
                    과정을 보여줍니다. 질문 내용은 측정 가능한 데이터를 임의로
                    선정한 것이며, 실제와 상이할 수 있습니다. 작성한 임의의 센서
                    측정 값을 토대로 안전지수 산출 공식에 의해 안전지수를
                    도출합니다.
                </p>
                <div className="flex justify-center">
                    <Link href="/profile">
                        <a className="btn-project">측정하기</a>
                    </Link>
                </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <Animation />
            </div>
        </>
    );
}
