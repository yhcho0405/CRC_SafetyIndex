import Layout from "../components/layout";
import Head from "next/head";
import { TOKEN, DATABASE_ID } from "../config";
import ProjectItem from "../components/projects/project-item";

export default function Projects({ projects }) {
    console.log(projects);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen px-3 mb-10">
                <Head>
                    <title>CRC 안전지수 측정</title>
                    <meta
                        name="description"
                        content="CRC 안전지수 측정
"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1 className="text-4xl font-bold sm:text-6xl">
                    사용자 명 :
                    <span className="pl-4 text-blue-500">
                        {
                            projects.results[0].properties.Name.title[0]
                                .plain_text
                        }
                    </span>
                </h1>

                <div className="grid grid-cols-1 gap-8 p-12 m-4 md:grid-cols-2">
                    {projects.results.map((aProject) => (
                        <ProjectItem key={aProject.id} data={aProject} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

// 빌드 타임에 호출
// export async function getStaticProps() {

// 각 요청 때마다 호출
export async function getServerSideProps() {
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
            Authorization: `Bearer secret_n5tRbTlKooEljgIsVY0iiBkNnC49vJEcssrNKQvblJv`,
        },
        body: JSON.stringify({
            sorts: [
                {
                    property: "Name",
                    direction: "ascending",
                },
            ],
            page_size: 100,
        }),
    };

    const res = await fetch(
        `https://api.notion.com/v1/databases/9323a6a299df4ff88960d79d83705f45/query`,
        options
    );

    const projects = await res.json();

    const projectNames =
        projects &&
        projects.results.map(
            (aProject) => aProject.properties.Name.title[0].plain_text
        );

    console.log(`projectNames : ${projectNames}`);

    return {
        props: { projects }, // will be passed to the page component as props
        // getStaticProps() 메소드를 사용한다면 revalidate 로 데이터 변경시 갱신가능!
        // revalidate: 1 // 데이터 변경이 있으면 갱신 1초 마다
    };
}
