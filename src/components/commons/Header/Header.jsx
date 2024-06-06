import Button from "../Button";
import Log from "../Log";
import SideBar from "../Side/SideBar";
import { HeaderWrapper, SideBarBtn } from "./Header.styled";

const Header = () => {
  return (
    <HeaderWrapper>
      <SideBarBtn>
        <input type="checkbox" id="menuicon" />
        <label htmlFor="menuicon">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <SideBar />
      </SideBarBtn>
      <Log width={"300px"} height={"80px"} left={"50%"} />
      <Button
        text={"게시하다"}
        width={"130px"}
        height={"40px"}
        fontSize={"20px"}
      />
    </HeaderWrapper>
  );
};

export default Header;
