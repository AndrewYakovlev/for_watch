import { createRouter, createWebHistory } from "vue-router";

import store from "@/store";
import {actionTypes as authActions} from "@/store/modules/auth";

const routes = [
  {
    path: "/signin",
    name: "SignIn",
    meta: { layout: "auth", auth: false },
    component: () =>
      import(/* webpackChunkName: "Auth" */ "@/pages/auth/SignIn"),
  },
  {
    path: "/signup",
    name: "SignUp",
    meta: { layout: "auth", auth: false },
    component: () =>
      import(/* webpackChunkName: "Auth" */ "@/pages/auth/SignUp"),
  },
  {
    path: "/",
    name: "Dashboard",
    meta: { layout: "main", auth: true },
    component: () => import(/* webpackChunkName: "main" */ "@/pages/Dashboard"),
  },
  {
    path: "/requests",
    name: "Requests",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "requests" */ "@/pages/Requests"),
  },
  {
    path: "/requests/:id",
    name: "Request",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "requests" */ "@/pages/Request"),
  },
  {
    path: "/orders",
    name: "Orders",
    meta: { layout: "main", auth: true },
    component: () => import(/* webpackChunkName: "orders" */ "@/pages/Orders"),
  },
  {
    path: "/orders/:id",
    name: "Order",
    meta: { layout: "main", auth: true },
    component: () => import(/* webpackChunkName: "orders" */ "@/pages/Order"),
  },
  {
    path: "/tasks",
    name: "Tasks",
    meta: { layout: "main", auth: true },
    component: () => import(/* webpackChunkName: "tasks" */ "@/pages/Tasks"),
  },
  {
    path: "/events",
    name: "Events",
    meta: { layout: "main", auth: true },
    component: () => import(/* webpackChunkName: "events" */ "@/pages/Events"),
  },
  {
    path: "/catalog",
    name: "Catalog",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "catalog" */ "@/pages/Catalog"),
  },
  {
    path: "/purchases",
    name: "Purchases",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "purchases" */ "@/pages/Purchases"),
  },
  {
    path: "/purchases/:id",
    name: "Purchase",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "purchases" */ "@/pages/Purchase"),
  },
  {
    path: "/payments",
    name: "Payments",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "payments" */ "@/pages/Payments"),
  },
  {
    path: "/contacts",
    name: "Contacts",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "contacts" */ "@/pages/Contacts"),
  },
  {
    path: "/contacts/:id",
    name: "Contact",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "contacts" */ "@/pages/Contact"),
  },
  {
    path: "/settings",
    name: "Settings",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/pages/Settings"),
    children: [
      {
        path: "",
        name: "SettingsIndex",
        meta: { layout: "main", auth: true },
        component: () =>
          import(/* webpackChunkName: "settings" */ "@/pages/settings/Index"),
      },
      {
        path: "brigades",
        name: "Brigades",
        meta: { layout: "main", auth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/pages/settings/Brigades"
          ),
      },
      {
        path: "cashboxes",
        name: "Cashboxes",
        meta: { layout: "main", auth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/pages/settings/Cashboxes"
          ),
      },
      {
        path: "documents/templates",
        name: "DocumentTemplates",
        meta: { layout: "main", auth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/pages/settings/DocumentTemplates"
          ),
      },
      {
        path: "employees",
        name: "Employees",
        meta: { layout: "main", auth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/pages/settings/Employees"
          ),
      },
      {
        path: "expenses",
        name: "Expenses",
        meta: { layout: "main", auth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/pages/settings/Expenses"
          ),
      },
      {
        path: "integrations",
        name: "Integrations",
        meta: { layout: "main", auth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/pages/settings/Integrations"
          ),
      },
      {
        path: "legals",
        name: "Legals",
        meta: { layout: "main", auth: true },
        component: () =>
          import(/* webpackChunkName: "settings" */ "@/pages/settings/Legals"),
      },
      {
        path: "offices",
        name: "Offices",
        meta: { layout: "main", auth: true },
        component: () =>
          import(/* webpackChunkName: "settings" */ "@/pages/settings/Offices"),
      },
      {
        path: "statuses/:type",
        name: "Statuses",
        meta: { layout: "main", auth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/pages/settings/Statuses"
          ),
      },
      {
        path: "storages",
        name: "Storages",
        meta: { layout: "main", auth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/pages/settings/Storages"
          ),
      },
      {
        path: "suppliers",
        name: "Suppliers",
        meta: { layout: "main", auth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "@/pages/settings/Suppliers"
          ),
      },
    ],
  },
  {
    path: "/reports",
    name: "Reports",
    meta: { layout: "main", auth: true },
    component: () =>
      import(/* webpackChunkName: "reports" */ "@/pages/Reports"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: { layout: "error", auth: false },
    component: () => import("@/pages/NotFound"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.auth)
  if (requireAuth) {
    let currentUser = store.state.auth.user
    let isLoggedIn = store.state.auth.isLoggedIn

    if (!currentUser || !isLoggedIn) {
      store.dispatch(authActions.getCurrentUser)
        .then(() => {
          currentUser = store.state.auth.user
          isLoggedIn = store.state.auth.isLoggedIn

          if (!currentUser || !isLoggedIn) {
            next('/signin')
          } else {
            const role = currentUser.role.role
            next()
          }
        })
    } else{
      next()
    }
  }else{
    next()
  }
});

export default router;
