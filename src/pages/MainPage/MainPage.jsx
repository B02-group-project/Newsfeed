import Header from "../../components/commons/Header/Header";
import Postbox from "../../components/posting/Postbox";
import { MainWrapper } from "./MainPage.styled";
const MainPage = () => {
  return (
    <div>
      <Header />
      <MainWrapper>
        <Postbox />
      </MainWrapper>
    </div>
  );
};

export default MainPage;
