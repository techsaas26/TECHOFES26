import Legacy from "../Legacy/Legacy";
import StickCard from "./StickCard";


const Test = () => {
  return (
    <>
      <section className="intro">
        <Legacy/>
      </section>

      <StickCard />

      <section className="outro">
        <h1>About US - past things, youtube videos</h1>
      </section>
    </>
  );
};

export default Test;