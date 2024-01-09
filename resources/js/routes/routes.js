import Cookies from 'js-cookie'
import store from "../store";

const AuthenticatedLayout = () => import('../layouts/Authenticated.vue')
const GuestLayout = ()  => import('../layouts/Guest.vue');

const PostsIndex  = ()  => import('../views/admin/posts/Index.vue');
const PostsCreate  = ()  => import('../views/admin/posts/Create.vue');
const PostsEdit  = ()  => import('../views/admin/posts/Edit.vue');

function requireLogin(to, from, next) {
    let isLogin = false;
    isLogin = !!store.state.auth.authenticated;

    if (isLogin) {
        next()
    } else {
        next('/login')
    }
}

function guest(to, from, next) {
    let isLogin;
    isLogin = !!store.state.auth.authenticated;

    if (isLogin) {
        next('/')
    } else {
        next()
    }
}

export default [
    {
        path: '/',
        component: GuestLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/home/index.vue'),
            },
            {
                path: 'posts',
                name: 'public-posts.index',
                component: () => import('../views/posts/index.vue'),
            },
            {
                path: 'posts/:id',
                name: 'public-posts.details',
                component: () => import('../views/posts/details.vue'),
            },
            {
                path: 'category/:id',
                name: 'category-posts.index',
                component: () => import('../views/category/posts.vue'),
            },
            {
                path: 'login',
                name: 'auth.login',
                component: () => import('../views/login/Login.vue'),
                beforeEnter: guest,
            },
            {
                path: 'register',
                name: 'auth.register',
                component: () => import('../views/register/index.vue'),
                beforeEnter: guest,
            },
            {
                path: 'forgot-password',
                name: 'auth.forgot-password',
                component: () => import('../views/auth/passwords/Email.vue'),
                beforeEnter: guest,
            },
            {
                path: 'reset-password/:token',
                name: 'auth.reset-password',
                component: () => import('../views/auth/passwords/Reset.vue'),
                beforeEnter: guest,
            },
        ]
    },
    {
        path: '/admin',
        component: AuthenticatedLayout,
        beforeEnter: requireLogin,
        children: [
            {
                name: 'admin.index',
                path: '/main-admin',
                component: () => import('../views/admin/index.vue'),
                meta: { breadCrumb: 'Admin' }
            },
            //home-POS
            {
                name: 'pos.index',
                path: 'pos',
                component: () => import('../views/admin/pos/index.vue'),
                meta: { breadCrumb: 'pos' }
            },
            //customers
            {
                name: 'customers.index',
                path: 'customers',
                component: () => import('../views/admin/customers/index.vue'),
                meta: { breadCrumb: 'customers' }
            },
            {
                name: 'customers.create',
                path: 'customers/create',
                component: () => import('../views/admin/customers/create.vue'),
                meta: { breadCrumb: 'customers' }
            },
            {
                 name: 'customers.edit',
                path: 'customers/edit/:id',
                component: () => import('../views/admin/customers/edit.vue'),
            },

             //cashiers
             {
                name: 'cashiers.index',
                path: 'cashiers',
                component: () => import('../views/admin/cashiers/index.vue'),
                meta: { breadCrumb: 'cashiers' }
            },
            {
                name: 'cashiers.create',
                path: 'cashiers/create',
                component: () => import('../views/admin/cashiers/create.vue'),
                meta: { breadCrumb: 'cashiers' }
            },
            {
                 name: 'cashiers.edit',
                path: 'cashiers/edit/:id',
                component: () => import('../views/admin/cashiers/edit.vue'),
            },

            {
                name: 'reports.index',
                path: 'reports',
                component: () => import('../views/admin/reports/index.vue'),
                meta: { breadCrumb: 'reports' }
            },
            {
                name: 'employees.index',
                path: 'employees',
                component: () => import('../views/admin/employees/index.vue'),
                meta: { breadCrumb: 'employees' }
            },
            {
                name: 'employees.create',
                path: 'employees/create',
                component: () => import('../views/admin/libraries/employees/Create.vue'),
                meta: { breadCrumb: 'Admin' }
            },
            {
                name: 'EditEmployee',
                path: '/admin/employees/edit/:id', 
                component: () => import('../views/admin/libraries/employees/edit.vue'),
                meta: { breadCrumb: 'Admin' }
            },
            {
                name: 'analytics.index',
                path: 'analytics',
                component: () => import('../views/admin/analytics/index.vue'),
                meta: { breadCrumb: 'Admin' }
            },
            {
                name: 'data-management.index',
                path: 'data-management',
                component: () => import('../views/admin/data-management/index.vue'),
                meta: { breadCrumb: 'Admin' }
            },
            {
                name: 'profile.index',
                path: 'profile',
                component: () => import('../views/admin/profile/index.vue'),
                meta: { breadCrumb: 'Profile' }
            },
            {
                name: 'admin.libraries.index',
                path: 'employee',
                component: () => import('../views/admin/libraries/employees/index.vue'),
                meta: { breadCrumb: 'Profile' }
            },

            {
                name: 'admin.activity_logs.index',
                path: 'activity_logs',
                component: () => import('../views/admin/activity_logs/index.vue'),
                    meta: { breadCrumb: 'activity_logs' }
            },
            //contracts transmittals
            // {
            //     name: 'admin.contracts_transmittals.index',
            //     path: '',
            //     component: () => import('../views/admin/contracts_transmittals/index.vue'),
            //     meta: { breadCrumb: 'contracts_transmittals' }
            // },
            {
                name: 'contracts_transmittals.index',
                path: 'contracts_transmittals',
                component: () => import('../views/admin/contracts_transmittals/index.vue'),
                meta: { breadCrumb: 'contracts_transmittals' }
            },
            {
                name: 'contracts_transmittals.create',
                path: 'contracts_transmittals/create',
                component: () => import('../views/admin/contracts_transmittals/create.vue'),
                meta: { breadCrumb: 'contracts_transmittals' }
            },
            {
                name: 'contracts_transmittals.edit',
                path: 'contracts_transmittals/edit/:id',
                component: () => import('../views/admin/contracts_transmittals/edit.vue'),
                meta: { breadCrumb: 'contracts_transmittals' }
            },
            //mandatory
            {
                name: 'admin.obligations.mandatory.index',
                path: 'obligations/mandatory',
                component: () => import('../views/admin/obligations/mandatory/index.vue'),
                meta: { breadCrumb: 'Profile' }
            },
            {
                name: 'admin.obligations.mandatory.create',
                path: 'obligations/mandatory/create',
                component: () => import('../views/admin/obligations/mandatory/create.vue'),
                meta: { breadCrumb: 'Profile' }
            },
            {
                name: 'admin.obligations.mandatory.edit',
                path: 'obligations/mandatory/edit/:id',
                component: () => import('../views/admin/obligations/mandatory/edit.vue'),
                meta: { breadCrumb: 'Profile' }
            },
            //disallowances
            {
                name: 'admin.obligations.disallowance.index',
                path: 'obligations/disallowance',
                component: () => import('../views/admin/obligations/disallowance/index.vue'),
                meta: { breadCrumb: 'Profile' }
            },
            {
                name: 'admin.obligations.disallowance.create',
                path: 'obligations/disallowance/create',
                component: () => import('../views/admin/obligations/disallowance/create.vue'),
                meta: { breadCrumb: 'Profile' }
            },
            {
                name: 'admin.obligations.disallowance.edit',
                path: 'obligations/disallowance/edit/:id',
                component: () => import('../views/admin/obligations/disallowance/edit.vue'),
                meta: { breadCrumb: 'Profile' }
            },
            // projects
            {
                name: 'projects.index',
                path: 'projects',
                component: () => import('../views/admin/libraries/projects/index.vue'),
                meta: { breadCrumb: 'Projects' }
            },
            {
                name: 'projects.edit',
                path: '/admin/projects/edit/:id', 
                component: () => import('../views/admin/libraries/projects/edit.vue'),
                meta: { breadCrumb: 'Projects' }
            },
            {
                name: 'projects.create',
                path: 'projects/create',
                component: () => import('../views/admin/libraries/projects/create.vue'),
                meta: { breadCrumb: 'Projects' }
            },

             // hdmf loan
             {
                name: 'loans.hdmf_loans.index',
                path: 'hdmf_loans',
                component: () => import('../views/admin/loans/hdmf_loans/index.vue'),
                meta: { breadCrumb: 'hdmf_loans' }
            },
            {
                name: 'loans.hdmf_loans.edit',
                path: '/admin/hdmf_loans/edit/:id', 
                component: () => import('../views/admin/loans/hdmf_loans/edit.vue'),
                meta: { breadCrumb: 'hdmf_loans' }
            },
            {
                name: 'loans.hdmf_loans.create',
                path: 'hdmf_loans/create',
                component: () => import('../views/admin/loans/hdmf_loans/create.vue'),
                meta: { breadCrumb: 'hdmf_loans' }
            },


              // gsis loan
              {
                name: 'loans.gsis_loans.index',
                path: 'gsis_loans',
                component: () => import('../views/admin/loans/gsis_loans/index.vue'),
                meta: { breadCrumb: 'gsis_loans' }
            },
            {
                name: 'loans.gsis_loans.edit',
                path: '/admin/gsis_loans/edit/:id', 
                component: () => import('../views/admin/loans/gsis_loans/edit.vue'),
                meta: { breadCrumb: 'gsis_loans' }
            },
            {
                name: 'loans.gsis_loans.create',
                path: 'gsis_loans/create',
                component: () => import('../views/admin/loans/gsis_loans/create.vue'),
                meta: { breadCrumb: 'gsis_loans' }
            },
            //payrolls
               // general plantiall payrolls
               {
                    name: 'payrolls.general_plantilla_payrolls.index',
                    path: 'general_plantilla_payrolls',
                    component: () => import('../views/admin/payrolls/general_plantilla_payrolls/index.vue'),
                        meta: { breadCrumb: 'general_plantilla_payrolls' }
                },
                {
                    name: 'payrolls.general_plantilla_payrolls.create',
                    path: 'general_plantilla_payrolls/create',
                    component: () => import('../views/admin/payrolls/general_plantilla_payrolls/create.vue'),
                        meta: { breadCrumb: 'general_plantilla_payrolls' }
                },
                {
                    name: 'payrolls.general_plantilla_payrolls.edit',
                    path: 'general_plantilla_payrolls/edit:id',
                    component: () => import('../views/admin/payrolls/general_plantilla_payrolls/edit.vue'),
                        meta: { breadCrumb: 'general_plantilla_payrolls' }
                },
                {
                    name: 'payrolls.general_plantilla_payrolls.history',
                    path: 'general_plantilla_payrolls/history',
                    component: () => import('../views/admin/payrolls/general_plantilla_payrolls/history.vue'),
                        meta: { breadCrumb: 'general_plantilla_payrolls' }
                },

            //monthly contributions
            // hdmf premium
            {
                name: 'contributions.hdmf_premiums.index',
                path: 'hdmf_premiums',
                component: () => import('../views/admin/contributions/hdmf_premiums/index.vue'),
                    meta: { breadCrumb: 'hdmf_premiums' }
            },
            {
                name: 'contributions.hdmf_premiums.create',
                path: 'hdmf_premiums/create',
                component: () => import('../views/admin/contributions/hdmf_premiums/create.vue'),
                    meta: { breadCrumb: 'hdmf_premiums' }
            },
            {
                name: 'contributions.hdmf_premiums.edit',
                path: 'hdmf_premiums/edit:id',
                component: () => import('../views/admin/contributions/hdmf_premiums/edit.vue'),
                    meta: { breadCrumb: 'hdmf_premiums' }
            },

             // hdmf mp2
             {
                name: 'contributions.hdmf_mpii.index',
                path: 'hdmf_mpii',
                component: () => import('../views/admin/contributions/hdmf_mpii/index.vue'),
                    meta: { breadCrumb: 'hdmf_mpii' }
            },
            {
                name: 'contributions.hdmf_mpii.create',
                path: 'hdmf_mpii/create',
                component: () => import('../views/admin/contributions/hdmf_mpii/create.vue'),
                    meta: { breadCrumb: 'hdmf_mpii' }
            },
            {
                name: 'contributions.hdmf_mpii.edit',
                path: 'hdmf_mpii/edit:id',
                component: () => import('../views/admin/contributions/hdmf_mpii/edit.vue'),
                    meta: { breadCrumb: 'hdmf_mpii' }
            },

             // gsis premium
             {
                name: 'contributions.gsis_premiums.index',
                path: 'gsis_premiums',
                component: () => import('../views/admin/contributions/gsis_premiums/index.vue'),
                    meta: { breadCrumb: 'gsis_premiums' }
            },
            {
                name: 'contributions.gsis_premiums.create',
                path: 'gsis_premiums/create',
                component: () => import('../views/admin/contributions/gsis_premiums/create.vue'),
                    meta: { breadCrumb: 'gsis_premiums' }
            },
            {
                name: 'contributions.gsis_premiums.edit',
                path: 'gsis_premiums/edit:id',
                component: () => import('../views/admin/contributions/gsis_premiums/edit.vue'),
                    meta: { breadCrumb: 'gsis_premiums' }
            },

            
             // gsis premium
             {
                name: 'contributions.coco_premiums.index',
                path: 'coco_premiums',
                component: () => import('../views/admin/contributions/coco_premiums/index.vue'),
                    meta: { breadCrumb: 'coco_premiums' }
            },
            {
                name: 'contributions.coco_premiums.create',
                path: 'coco_premiums/create',
                component: () => import('../views/admin/contributions/coco_premiums/create.vue'),
                    meta: { breadCrumb: 'coco_premiums' }
            },
            {
                name: 'contributions.coco_premiums.edit',
                path: 'coco_premiums/edit:id',
                component: () => import('../views/admin/contributions/coco_premiums/edit.vue'),
                    meta: { breadCrumb: 'coco_premiums' }
            },

             // philhealth premium
             {
                name: 'contributions.philhealth_premiums.index',
                path: 'philhealth_premiums',
                component: () => import('../views/admin/contributions/philhealth_premiums/index.vue'),
                    meta: { breadCrumb: 'philhealth_premiums' }
            },
            {
                name: 'contributions.philhealth_premiums.create',
                path: 'philhealth_premiums/create',
                component: () => import('../views/admin/contributions/philhealth_premiums/create.vue'),
                    meta: { breadCrumb: 'philhealth_premiums' }
            },
            {
                name: 'contributions.philhealth_premiums.edit',
                path: 'philhealth_premiums/edit:id',
                component: () => import('../views/admin/contributions/philhealth_premiums/edit.vue'),
                    meta: { breadCrumb: 'philhealth_premiums' }
            },


               
                //reports
                    {
                        name: 'payrolls.general_plantilla_payrolls.reports.index',
                        path: 'general_plantilla_payrolls_reports',
                        component: () => import('../views/admin/payrolls/general_plantilla_payrolls/reports/index.vue'),
                            meta: { breadCrumb: 'general_plantilla_payrolls_reports' }
                    },
           
             


        
            {
                name: 'posts.index',
                path: 'posts',
                component: PostsIndex,
                meta: { breadCrumb: 'Posts' }
            },
            {
                name: 'posts.create',
                path: 'posts/create',
                component: PostsCreate,
                meta: { breadCrumb: 'Add new post' }
            },
            {
                name: 'posts.edit',
                path: 'posts/edit/:id',
                component: PostsEdit,
                meta: { breadCrumb: 'Edit post' }
            },
            {
                name: 'categories.index',
                path: 'categories',
                component: () => import('../views/admin/categories/Index.vue'),
                meta: { breadCrumb: 'Categories' }
            },
            {
                name: 'categories.create',
                path: 'categories/create',
                component: () => import('../views/admin/categories/Create.vue'),
                meta: { breadCrumb: 'Add new category' }
            },
            {
                name: 'categories.edit',
                path: 'categories/edit/:id',
                component: () => import('../views/admin/categories/Edit.vue'),
                meta: { breadCrumb: 'Edit Category' }
            },
            {
                name: 'permissions.index',
                path: 'permissions',
                component: () => import('../views/admin/permissions/Index.vue'),
                meta: { breadCrumb: 'Permissions' }
            },
            {
                name: 'permissions.create',
                path: 'permissions/create',
                component: () => import('../views/admin/permissions/Create.vue'),
                meta: { breadCrumb: 'Create Permission' }
            },
            {
                name: 'permissions.edit',
                path: 'permissions/edit/:id',
                component: () => import('../views/admin/permissions/Edit.vue'),
                meta: { breadCrumb: 'Permission Edit' }
            },
            {
                name: 'roles.index',
                path: 'roles',
                component: () => import('../views/admin/roles/Index.vue'),
                meta: { breadCrumb: 'Roles' }
            },
            {
                name: 'roles.create',
                path: 'roles/create',
                component: () => import('../views/admin/roles/Create.vue'),
                meta: { breadCrumb: 'Create Role' }
            },
            {
                name: 'roles.edit',
                path: 'roles/edit/:id',
                component: () => import('../views/admin/roles/Edit.vue'),
                meta: { breadCrumb: 'Role Edit' }
            },
            {
                name: 'users.index',
                path: 'users',
                component: () => import('../views/admin/users/Index.vue'),
                meta: { breadCrumb: 'Users' }
            },
            {
                name: 'users.create',
                path: 'users/create',
                component: () => import('../views/admin/users/Create.vue'),
                meta: { breadCrumb: 'Add New' }
            },
            {
                name: 'users.edit',
                path: 'users/edit/:id',
                component: () => import('../views/admin/users/Edit.vue'),
                meta: { breadCrumb: 'User Edit' }
            },
            
            
            
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        component: () => import("../views/errors/404.vue"),
    },
];
