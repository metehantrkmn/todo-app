// print rafce if you have es7 react code snipset extension to auto generate the function base component

const Header = (props) => {
  return (
    <header className="myHeader">
      <h1>{props.title}</h1>
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracer",
};

export default Header;
