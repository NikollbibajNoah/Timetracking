export const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-800 text-white py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Timetracking App. All rights
          reserved.
        </p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};
