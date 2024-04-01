import {
  Event,
  ExitToApp,
  Home,
  LocalCafe,
  PeopleAlt,
  Person,
  RecentActors,
} from "@material-ui/icons";
import Profile from "pages/profile";
import Users from "pages/users";
import Producers from "pages/producers";
import ProducerProfile from "pages/producers/profile";
import Samples from "pages/samples";
import Dashboard from "pages/dashboard";
import SampleProfile from "pages/samples/profile";
import EventsList from "pages/events/list";
import NewEvent from "pages/events/new";
import EventDetail from "./pages/events/detail";

const commonRoutes = [
  {
    name: "Perfil",
    key: "perfil",
    route: "/perfil",
    icon: <Person size="12px" />,
    component: Profile,
    type: "collapse",
    visible: true,
  },
  {
    name: "Cerrar Sesión",
    key: "logout",
    icon: <ExitToApp size="12px" />,
    type: "collapse",
    logout: true,
    visible: true,
  },
];
const routes = {
  admin: [
    {
      name: "Usuarios",
      key: "usuarios",
      route: "/usuarios",
      icon: <PeopleAlt size="12px" />,
      component: Users,
      type: "collapse",
      visible: true,
    },
    ...commonRoutes,
  ],
  receptor: [
    {
      name: "Dashboard",
      key: "dashboard",
      route: "/dashboard",
      icon: <Home size="12px" />,
      component: Dashboard,
      type: "collapse",
      visible: true,
    },
    {
      name: "Eventos",
      key: "events",
      route: "/events",
      icon: <Event size="12px" />,
      type: "nested",
      visible: true,
      noCollapse: true,
    },
    {
      key: "events_profile",
      route: "/event/:id",
      component: EventDetail,
      type: "collapse",
      visible: false,
    },
    {
      key: "events_list",
      parent: "events",
      route: "/events/list",
      component: EventsList,
      name: "Listado",
      visible: false,
    },
    {
      key: "events_new",
      parent: "events",
      route: "/events/new",
      component: NewEvent,
      name: "Nuevo",
      visible: false,
    },
    {
      name: "Muestras",
      key: "samples",
      route: "/samples",
      icon: <LocalCafe size="12px" />,
      component: Samples,
      type: "collapse",
      visible: true,
    },
    {
      key: "samples_profile",
      route: "/samples/:id",
      component: SampleProfile,
      type: "collapse",
      visible: false,
    },
    {
      name: "Productores",
      key: "producers",
      route: "/producers",
      icon: <RecentActors size="12px" />,
      component: Producers,
      type: "collapse",
      visible: true,
    },
    {
      key: "producers_profile",
      route: "/producers/:id",
      component: ProducerProfile,
      type: "collapse",
      visible: false,
    },
    ...commonRoutes,
  ],
};

export default routes;
