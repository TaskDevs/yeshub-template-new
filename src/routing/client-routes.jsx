import { Route, Routes } from "react-router-dom";
import {client} from "../globals/route-names";
import ManageJobs from "../app/pannels/employer/components/jobs/manage-jobs";
import Error404Page from "../app/pannels/public-user/components/pages/error404";
import ClientDashboard from "../app/pannels/public-user/sections/dashboard/client-dashboard";
import ClientProfile  from "../app/pannels/public-user/sections/profile/client-profile";
function ClientRoutes() {
    return (
        <Routes>
        <Route path={client.DASHBOARD} element={<ClientDashboard />} />
        <Route path={client.NEW_MANAGE_JOBS} element={<ManageJobs />} />
        <Route path={client.PROFILE} element={<ClientProfile />} />
        <Route path="*" element={<Error404Page />} />
        </Routes>
    );  

}

export default ClientRoutes;