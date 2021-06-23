import store from '../store/module/index';

const routes = [
  {
    path: "/search",
    component: () => import("pages/Index.vue"),
    children: [
      {
        path: "",
        component: () => import("../components/Search.vue"),
        name: "Search",
      },
      {
        path: "/cardSelect",
        component: () => import("../components/DetailsCharacter.vue"),
        name: "CardSelect",
        beforeEnter(to, from, next) {
          if (store.state.step >= 2) {
            next();
          } else {
            next({
              name: "Search",
            });
          }
        },
      },
    ],
  },

  // Always leave this as last one,
  // // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/Error404.vue')
  // },
  { path: "/:catchAll(.*)*", redirect: "search" },
];

export default routes;

// import Index from '../pages/Index.vue';
// import Search from '../components/Search.vue';
