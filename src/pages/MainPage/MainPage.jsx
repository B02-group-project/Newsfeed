import FetchData from '../../components/FetchData';
import Header from '../../components/commons/Header/Header';
import SideBar from '../../components/commons/Side/SideBar';
import Postbox from '../../components/posting/Postbox';

const MainPage = () => {
    return (
        <div>
            <Header />
            MainPage
            <Postbox />
            <FetchData />
        </div>
    );
};

export default MainPage;
