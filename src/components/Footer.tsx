import Link from "next/link";
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" sticky buttom-0 left-0 bg-gray-100 text-center p-4 text-sm text-gray-600 mt-auto flex flex-col-reverse md:flex-row md:justify-between items-center">
      <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>

      <p>
        Need help?{" "}
        <Link href="/support" className="text-blue-600 hover:underline">
          Contact Support
        </Link>
      </p>
      <div className="flex justify-center gap-4 ">
        <Link href="https://twitter.com/yourcompany" target="_blank">
          <FaTwitter className="text-gray-600 hover:text-blue-500 text-lg" />
        </Link>
        <Link href="https://facebook.com/yourcompany" target="_blank">
          <FaFacebook className="text-gray-600 hover:text-blue-700 text-lg" />
        </Link>
        <Link href="https://linkedin.com/company/yourcompany" target="_blank">
          <FaLinkedin className="text-gray-600 hover:text-blue-800 text-lg" />
        </Link>
        <Link href="https://github.com/yourcompany" target="_blank">
          <FaGithub className="text-gray-600 hover:text-gray-900 text-lg" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
