function Header({ title, action }) {
  return (
    <div className="flex justify-between border-4 pt-5 pb-5">
      <div className="ml-5">{title}</div>
      <div className="mr-5">{action}</div>
    </div>
  );
}

export default Header;
