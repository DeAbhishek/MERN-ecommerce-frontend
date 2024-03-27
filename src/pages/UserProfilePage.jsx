import Navbar from "../components/Navbar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <Navbar pageName="My Profile">
      <UserProfile />
    </Navbar>
  );
};

export default UserProfilePage;
