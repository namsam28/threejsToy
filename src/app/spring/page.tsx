import Link from "next/link";

const CONFIG_LINK = [
  {
    title: "기본 이동",
    link: "/spring/move",
  },
  {
    title: "클릭 이동",
    link: "/spring/clickMove",
  },
  {
    title: "useChain 이벤트 처리",
    link: "/spring/chainEvent",
  },
];

function Page() {
  return (
    <div>
      <h1 className="p-20 text-20">react-spring 링크 처리</h1>
      <ul className="px-40 py-50">
        {CONFIG_LINK.map((item, idx) => {
          return (
            <li key={idx} className="p-10 border-gray-300 border-b-1">
              <Link href={item.link} className="hover:text-red-700">{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Page;
