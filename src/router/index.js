import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Executors from "../pages/Executors";
import ExecutorIdPage from "../pages/ExecutorIdPage";
import AlbumIdPage from "../pages/AlbumIdPage";
import Playlists from "../pages/Playlists";
import PlayListIdPage from "../pages/PlayListIdPage";
import AdminPage from "../pages/AdminPage";
import RegisterAdmin from "../pages/RegisterAdmin";
import LoginAdmin from "../pages/LoginAdmin";
import Main from "../pages/Main"
import PlayListsUser from "../components/PlayListsUser";


export const privateRoutes = [
    {path: '/about', component: <About />, exact: true},
    {path: '/executors', component: <Executors />, exact: true},
    {path: '/executors/:id', component: <ExecutorIdPage />, exact: true},
    {path: '/albums/:id', component: <AlbumIdPage />, exact: true},
    {path: '/playlists', component: <Playlists />, exact: true},
    {path: '/', component: <Playlists />, exact: true},
    {path: '/playlists/:id', component: <PlayListIdPage />, exact: true},
    {path: '/main', component: <Main />, exact: true},
    {path: '/admin', component: <AdminPage />, exact: true},
    {path: '/myPlaylists', component: <PlayListsUser />, exact: true},
    // {path: '/myExecutors', component: <ExecutorListUser />, exact: true},
    // {path: '/myAlbums', component: <AlbumListUser />, exact: true},
    // {path: '/myTracks', component: <TrackListUser />, exact: true},

]

export const publicRoutes = [
    {path: '/login', component: <Login />, exact: true},
    {path: '/', component: <Login />, exact: true},
    {path: '/loginAdmin', component: <LoginAdmin />, exact: true},
    {path: '/registration', component: <Register />, exact: true},
    {path: '/registrationAdmin', component: <RegisterAdmin />, exact: true},
]
