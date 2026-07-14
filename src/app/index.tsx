import { Link } from "expo-router";

export default function App() {
  return (
  <>
      <Link className="absolute top-50" href={"/preview"}> Chuyển hướng sang trang preview</Link>   
      <Link className="absolute top-100" href={"/private/test-private"}> Chuyển hướng sang trang private test</Link>   
  </>
  );
}
