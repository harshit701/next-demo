import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
        <Link href="/post">Post</Link>
        <Link href="/dashboard">DashBoard</Link>
      </nav>
    </>
  );
};

export default NavBar;
