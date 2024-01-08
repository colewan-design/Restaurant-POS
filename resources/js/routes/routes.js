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
                path: 'customers',
                component: () => import('../views/admin/customers/create.vue'),
                meta: { breadCrumb: 'customers' }
            },
            {
                name: 'customers.edit',
                path: 'customers',
                component: () => import('../views/admin/customers/edit.vue'),
                meta: { breadCrumb: 'customers' }
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


                {
                    name: 'billings.bsumpc_billings.edit',
                    path: '/admin/bsumpc_billings/edit/:id', 
                    component: () => import('../views/admin/billings/bsumpc_billings/edit.vue'),
                    meta: { breadCrumb: 'bsumpc_billings' }
                },
                {
                    name: 'billings.bsumpc_billings.create',
                    path: 'bsumpc_billings/create',
                    component: () => import('../views/admin/billings/bsumpc_billings/create.vue'),
                    meta: { breadCrumb: 'bsumpc_billings' }
                },
                //reports
                    {
                        name: 'payrolls.general_plantilla_payrolls.reports.index',
                        path: 'general_plantilla_payrolls_reports',
                        component: () => import('../views/admin/payrolls/general_plantilla_payrolls/reports/index.vue'),
                            meta: { breadCrumb: 'general_plantilla_payrolls_reports' }
                    },
            // billings
              // hdmf billings
            {
                name: 'billings.hdmf_billings.index',
                path: 'hdmf_billings',
                component: () => import('../views/admin/billings/hdmf_billings/index.vue'),
                meta: { breadCrumb: 'hdmf_billings' }
            },
            {
                name: 'billings.hdmf_billings.edit',
                path: '/admin/hdmf_billings/edit/:id', 
                component: () => import('../views/admin/billings/hdmf_billings/edit.vue'),
                meta: { breadCrumb: 'hdmf_billings' }
            },
            {
                name: 'billings.hdmf_billings.create',
                path: 'hdmf_billings/create',
                component: () => import('../views/admin/billings/hdmf_billings/create.vue'),
                meta: { breadCrumb: 'hdmf_billings' }
            },
            

               // bsumpc billings
               {
                name: 'billings.bsumpc_billings.index',
                path: 'bsumpc_billings',
                component: () => import('../views/admin/billings/bsumpc_billings/index.vue'),
                meta: { breadCrumb: 'bsumpc_billings' }
                },
                {
                    name: 'billings.bsumpc_billings.edit',
                    path: '/admin/bsumpc_billings/edit/:id', 
                    component: () => import('../views/admin/billings/bsumpc_billings/edit.vue'),
                    meta: { breadCrumb: 'bsumpc_billings' }
                },
                {
                    name: 'billings.bsumpc_billings.create',
                    path: 'bsumpc_billings/create',
                    component: () => import('../views/admin/billings/bsumpc_billings/create.vue'),
                    meta: { breadCrumb: 'bsumpc_billings' }
                },

                
               // bsuhof billings
               {
                name: 'billings.bsuhof_billings.index',
                path: 'bsuhof_billings',
                component: () => import('../views/admin/billings/bsuhof_billings/index.vue'),
                meta: { breadCrumb: 'bsuhof_billings' }
                },
                {
                    name: 'billings.bsuhof_billings.edit',
                    path: '/admin/bsuhof_billings/edit/:id', 
                    component: () => import('../views/admin/billings/bsuhof_billings/edit.vue'),
                    meta: { breadCrumb: 'bsuhof_billings' }
                },
                {
                    name: 'billings.bsuhof_billings.create',
                    path: 'bsuhof_billings/create',
                    component: () => import('../views/admin/billings/bsuhof_billings/create.vue'),
                    meta: { breadCrumb: 'bsuhof_billings' }
                },
                

                // cbs billings
               {
                name: 'billings.cbs_billings.index',
                path: 'cbs_billings',
                component: () => import('../views/admin/billings/cbs_billings/index.vue'),
                meta: { breadCrumb: 'cbs_billings' }
                },
                {
                    name: 'billings.cbs_billings.edit',
                    path: '/admin/cbs_billings/edit/:id', 
                    component: () => import('../views/admin/billings/cbs_billings/edit.vue'),
                    meta: { breadCrumb: 'cbs_billings' }
                },
                {
                    name: 'billings.cbs_billings.create',
                    path: 'cbs_billings/create',
                    component: () => import('../views/admin/billings/cbs_billings/create.vue'),
                    meta: { breadCrumb: 'cbs_billings' }
                },

                  // coco billings
               {
                name: 'billings.coco_billings.index',
                path: 'coco_billings',
                component: () => import('../views/admin/billings/coco_billings/index.vue'),
                meta: { breadCrumb: 'coco_billings' }
                },
                {
                    name: 'billings.coco_billings.edit',
                    path: '/admin/coco_billings/edit/:id', 
                    component: () => import('../views/admin/billings/coco_billings/edit.vue'),
                    meta: { breadCrumb: 'coco_billings' }
                },
                {
                    name: 'billings.coco_billings.create',
                    path: 'coco_billings/create',
                    component: () => import('../views/admin/billings/coco_billings/create.vue'),
                    meta: { breadCrumb: 'coco_billings' }
                },

                    // electric billings
               {
                name: 'billings.electric_billings.index',
                path: 'electric_billings',
                component: () => import('../views/admin/billings/electric_billings/index.vue'),
                meta: { breadCrumb: 'electric_billings' }
                },
                {
                    name: 'billings.electric_billings.edit',
                    path: '/admin/electric_billings/edit/:id', 
                    component: () => import('../views/admin/billings/electric_billings/edit.vue'),
                    meta: { breadCrumb: 'electric_billings' }
                },
                {
                    name: 'billings.electric_billings.create',
                    path: 'electric_billings/create',
                    component: () => import('../views/admin/billings/electric_billings/create.vue'),
                    meta: { breadCrumb: 'electric_billings' }
                },

                     // water billings
               {
                name: 'billings.water_billings.index',
                path: 'water_billings',
                component: () => import('../views/admin/billings/water_billings/index.vue'),
                meta: { breadCrumb: 'water_billings' }
                },
                {
                    name: 'billings.water_billings.edit',
                    path: '/admin/water_billings/edit/:id', 
                    component: () => import('../views/admin/billings/water_billings/edit.vue'),
                    meta: { breadCrumb: 'water_billings' }
                },
                {
                    name: 'billings.water_billings.create',
                    path: 'water_billings/create',
                    component: () => import('../views/admin/billings/water_billings/create.vue'),
                    meta: { breadCrumb: 'water_billings' }
                },

                
                     // lwop billings
               {
                name: 'billings.lwop_billings.index',
                path: 'lwop_billings',
                component: () => import('../views/admin/billings/lwop_billings/index.vue'),
                meta: { breadCrumb: 'lwop_billings' }
                },
                {
                    name: 'billings.lwop_billings.edit',
                    path: '/admin/lwop_billings/edit/:id', 
                    component: () => import('../views/admin/billings/lwop_billings/edit.vue'),
                    meta: { breadCrumb: 'lwop_billings' }
                },
                {
                    name: 'billings.lwop_billings.create',
                    path: 'lwop_billings/create',
                    component: () => import('../views/admin/billings/lwop_billings/create.vue'),
                    meta: { breadCrumb: 'lwop_billings' }
                },

                         // withholding billings
               {
                name: 'billings.wholding_billings.index',
                path: 'wholding_billings',
                component: () => import('../views/admin/billings/wholding_billings/index.vue'),
                meta: { breadCrumb: 'wholding_billings' }
                },
                {
                    name: 'billings.wholding_billings.edit',
                    path: '/admin/wholding_billings/edit/:id', 
                    component: () => import('../views/admin/billings/wholding_billings/edit.vue'),
                    meta: { breadCrumb: 'wholding_billings' }
                },
                {
                    name: 'billings.wholding_billings.create',
                    path: 'wholding_billings/create',
                    component: () => import('../views/admin/billings/wholding_billings/create.vue'),
                    meta: { breadCrumb: 'wholding_billings' }
                },


                      // landbank billings
               {
                name: 'billings.landbank_billings.index',
                path: 'landbank_billings',
                component: () => import('../views/admin/billings/landbank_billings/index.vue'),
                meta: { breadCrumb: 'landbank_billings' }
                },
                {
                    name: 'billings.landbank_billings.edit',
                    path: '/admin/landbank_billings/edit/:id', 
                    component: () => import('../views/admin/billings/landbank_billings/edit.vue'),
                    meta: { breadCrumb: 'landbank_billings' }
                },
                {
                    name: 'billings.landbank_billings.create',
                    path: 'landbank_billings/create',
                    component: () => import('../views/admin/billings/landbank_billings/create.vue'),
                    meta: { breadCrumb: 'landbank_billings' }
                },

                        // coa billings
               {
                name: 'billings.coa_billings.index',
                path: 'coa_billings',
                component: () => import('../views/admin/billings/coa_billings/index.vue'),
                meta: { breadCrumb: 'coa_billings' }
                },
                {
                    name: 'billings.coa_billings.edit',
                    path: '/admin/coa_billings/edit/:id', 
                    component: () => import('../views/admin/billings/coa_billings/edit.vue'),
                    meta: { breadCrumb: 'coa_billings' }
                },
                {
                    name: 'billings.coa_billings.create',
                    path: 'coa_billings/create',
                    component: () => import('../views/admin/billings/coa_billings/create.vue'),
                    meta: { breadCrumb: 'coa_billings' }
                },

                
                      // ucpb billings
               {
                name: 'billings.ucpb_billings.index',
                path: 'ucpb_billings',
                component: () => import('../views/admin/billings/ucpb_billings/index.vue'),
                meta: { breadCrumb: 'ucpb_billings' }
                },
                {
                    name: 'billings.ucpb_billings.edit',
                    path: '/admin/ucpb_billings/edit/:id', 
                    component: () => import('../views/admin/billings/ucpb_billings/edit.vue'),
                    meta: { breadCrumb: 'ucpb_billings' }
                },
                {
                    name: 'billings.ucpb_billings.create',
                    path: 'ucpb_billings/create',
                    component: () => import('../views/admin/billings/ucpb_billings/create.vue'),
                    meta: { breadCrumb: 'ucpb_billings' }
                },

                         // pldt billings
               {
                name: 'billings.pldt_billings.index',
                path: 'pldt_billings',
                component: () => import('../views/admin/billings/pldt_billings/index.vue'),
                meta: { breadCrumb: 'pldt_billings' }
                },
                {
                    name: 'billings.pldt_billings.edit',
                    path: '/admin/pldt_billings/edit/:id', 
                    component: () => import('../views/admin/billings/pldt_billings/edit.vue'),
                    meta: { breadCrumb: 'pldt_billings' }
                },
                {
                    name: 'billings.pldt_billings.create',
                    path: 'pldt_billings/create',
                    component: () => import('../views/admin/billings/pldt_billings/create.vue'),
                    meta: { breadCrumb: 'pldt_billings' }
                },

              // gsis billings
              {
                name: 'billings.gsis_billings.index',
                path: 'gsis_billings',
                component: () => import('../views/admin/billings/gsis_billings/index.vue'),
                meta: { breadCrumb: 'gsis_billings' }
            },
            {
                name: 'billings.gsis_billings.edit',
                path: '/admin/gsis_billings/edit/:id', 
                component: () => import('../views/admin/billings/gsis_billings/edit.vue'),
                meta: { breadCrumb: 'gsis_billings' }
            },
            {
                name: 'billings.gsis_billings.create',
                path: 'gsis_billings/create',
                component: () => import('../views/admin/billings/gsis_billings/create.vue'),
                meta: { breadCrumb: 'gsis_billings' }
            },

              // withholding tax billings
              {
                name: 'billings.withholding_tax_billings.index',
                path: 'withholding_tax_billings',
                component: () => import('../views/admin/billings/withholding_tax_billings/index.vue'),
                meta: { breadCrumb: 'withholding_tax_billings' }
            },
            {
                name: 'billings.withholding_tax_billings.edit',
                path: '/admin/withholding_tax_billings/edit/:id', 
                component: () => import('../views/admin/billings/withholding_tax_billings/edit.vue'),
                meta: { breadCrumb: 'withholding_tax_billings' }
            },
            {
                name: 'billings.withholding_tax_billings.create',
                path: 'withholding_tax_billings/create',
                component: () => import('../views/admin/billings/withholding_tax_billings/create.vue'),
                meta: { breadCrumb: 'withholding_tax_billings' }
            },

              // ppsta tax billings
              {
                name: 'billings.ppsta_billings.index',
                path: 'ppsta_billings',
                component: () => import('../views/admin/billings/ppsta_billings/index.vue'),
                meta: { breadCrumb: 'ppsta_billings' }
            },
            {
                name: 'billings.ppsta_billings.edit',
                path: '/admin/ppsta_billings/edit/:id', 
                component: () => import('../views/admin/billings/ppsta_billings/edit.vue'),
                meta: { breadCrumb: 'ppsta_billings' }
            },
            {
                name: 'billings.ppsta_billings.create',
                path: 'ppsta_billings/create',
                component: () => import('../views/admin/billings/ppsta_billings/create.vue'),
                meta: { breadCrumb: 'ppsta_billings' }
            },

              // phil am tax billings
              {
                name: 'billings.philam_billings.index',
                path: 'philam_billings',
                component: () => import('../views/admin/billings/philam_billings/index.vue'),
                meta: { breadCrumb: 'philam_billings' }
            },
            {
                name: 'billings.philam_billings.edit',
                path: '/admin/philam_billings/edit/:id', 
                component: () => import('../views/admin/billings/philam_billings/edit.vue'),
                meta: { breadCrumb: 'philam_billings' }
            },
            {
                name: 'billings.philam_billings.create',
                path: 'philam_billings/create',
                component: () => import('../views/admin/billings/philam_billings/create.vue'),
                meta: { breadCrumb: 'philam_billings' }
            },

              // bsu cmpc tax billings
              {
                name: 'billings.cmpc_billings.index',
                path: 'cmpc_billings',
                component: () => import('../views/admin/billings/cmpc_billings/index.vue'),
                meta: { breadCrumb: 'cmpc_billings' }
            },
            {
                name: 'billings.cmpc_billings.edit',
                path: '/admin/cmpc_billings/edit/:id', 
                component: () => import('../views/admin/billings/cmpc_billings/edit.vue'),
                meta: { breadCrumb: 'cmpc_billings' }
            },
            {
                name: 'billings.cmpc_billings.create',
                path: 'cmpc_billings/create',
                component: () => import('../views/admin/billings/cmpc_billings/create.vue'),
                meta: { breadCrumb: 'cmpc_billings' }
            },
            
            
             // wht group
             {
                name: 'libraries.wht_groups.index',
                path: 'wht_groups',
                component: () => import('../views/admin/libraries/wht_groups/index.vue'),
                meta: { breadCrumb: 'wht_groups' }
            },
            {
                name: 'libraries.wht_groups.edit',
                path: '/admin/wht_groups/edit/:id', 
                component: () => import('../views/admin/libraries/wht_groups/edit.vue'),
                meta: { breadCrumb: 'wht_groups' }
            },
            {
                name: 'libraries.wht_groups.create',
                path: 'wht_groups/create',
                component: () => import('../views/admin/libraries/wht_groups/create.vue'),
                meta: { breadCrumb: 'wht_groups' }
            },
            
              // salary matrix
              {
                name: 'salary_matrix.index',
                path: 'salary_matrix',
                component: () => import('../views/admin/libraries/salary_matrix/index.vue'),
                meta: { breadCrumb: 'salary_matrix' }
            },
            {
                name: 'salary_matrix.edit',
                path: '/admin/salary_matrix/edit/:id', 
                component: () => import('../views/admin/libraries/salary_matrix/edit.vue'),
                meta: { breadCrumb: 'salary_matrix' }
            },
            {
                name: 'salary_matrix.create',
                path: 'salary_matrix/create',
                component: () => import('../views/admin/libraries/salary_matrix/create.vue'),
                meta: { breadCrumb: 'salary_matrix' }
            },
             // compensation benefit
             {
                name: 'admin.libraries.compensations.index',
                path: 'admin/libraries/compensations',
                component: () => import('../views/admin/libraries/compensations/index.vue'),
                meta: { breadCrumb: 'Compensations' }
            },
            {
                name: 'admin.libraries.compensations.edit',
                path: '/admin/libraries/compensations/edit/:id', 
                component: () => import('../views/admin/libraries/compensations/edit.vue'),
                meta: { breadCrumb: 'Compensations' }
            },
            {
                name: 'admin.libraries.compensations.create',
                path: 'admin/libraries/compensations/create',
                component: () => import('../views/admin/libraries/compensations/create.vue'),
                meta: { breadCrumb: 'Compensations' }
            },

            // System Configuration
            {
            name: 'system_configuration.index',
            path: 'system_configuration',
            component: () => import('../views/admin/system_configuration/index.vue'),
            meta: { breadCrumb: 'system_configuration' }
            },
           
            //benefits
              // pera
             {
                name: 'benefits.pera.index',
                path: 'pera',
                component: () => import('../views/admin/benefits/pera/index.vue'),
                meta: { breadCrumb: 'pera' }
            },
            {
                name: 'benefits.pera.edit',
                path: '/admin/pera/edit/:id', 
                component: () => import('../views/admin/benefits/pera/edit.vue'),
                meta: { breadCrumb: 'pera' }
            },
            {
                name: 'benefits.pera.create',
                path: 'pera/create',
                component: () => import('../views/admin/benefits/pera/create.vue'),
                meta: { breadCrumb: 'pera' }
            },
              // awards
            {
                name: 'libraries.awards.index',
                path: '/libraries/awards',
                component: () => import('../views/admin/libraries/awards/index.vue'),
                meta: { breadCrumb: 'Awards' }
            },
            {
                name: 'libraries.awards.edit',
                path: '/libraries/awards/edit/:id', 
                component: () => import('../views/admin/libraries/awards/edit.vue'),
                meta: { breadCrumb: 'Awards' }
            },
            {
                name: 'libraries.awards.create',
                path: '/libraries/awards/create',
                component: () => import('../views/admin/libraries/awards/create.vue'),
                meta: { breadCrumb: 'Awards' }
            },
               // positions
               {
                name: 'libraries.positions.index',
                path: '/libraries/positions',
                component: () => import('../views/admin/libraries/positions/index.vue'),
                meta: { breadCrumb: 'positions' }
            },
            {
                name: 'libraries.positions.edit',
                path: '/libraries/positions/edit/:id', 
                component: () => import('../views/admin/libraries/positions/edit.vue'),
                meta: { breadCrumb: 'positions' }
            },
            {
                name: 'libraries.positions.create',
                path: '/libraries/positions/create',
                component: () => import('../views/admin/libraries/positions/create.vue'),
                meta: { breadCrumb: 'positions' }
            },

                // disallowance categories
                {
                    name: 'libraries.disallowance_categories.index',
                    path: '/libraries/disallowance_categories',
                    component: () => import('../views/admin/libraries/disallowance_categories/index.vue'),
                    meta: { breadCrumb: 'disallowance_categories' }
                },
                {
                    name: 'libraries.disallowance_categories.edit',
                    path: '/libraries/disallowance_categories/edit/:id', 
                    component: () => import('../views/admin/libraries/disallowance_categories/edit.vue'),
                    meta: { breadCrumb: 'disallowance_categories' }
                },
                {
                    name: 'libraries.disallowance_categories.create',
                    path: '/libraries/disallowance_categories/create',
                    component: () => import('../views/admin/libraries/disallowance_categories/create.vue'),
                    meta: { breadCrumb: 'disallowance_categories' }
                },

                //remittances

                           // coa disallowance
               {
                name: 'remittances.coa_disallowance.index',
                path: 'coa_disallowance',
                component: () => import('../views/admin/remittances/coa_disallowance/index.vue'),
                meta: { breadCrumb: 'coa_disallowance' }
                },
                {
                    name: 'remittances.coa_disallowance.edit',
                    path: '/admin/coa_disallowance/edit/:id', 
                    component: () => import('../views/admin/remittances/coa_disallowance/edit.vue'),
                    meta: { breadCrumb: 'coa_disallowance' }
                },
                {
                    name: 'remittances.coa_disallowance.create',
                    path: 'coa_disallowance/create',
                    component: () => import('../views/admin/remittances/coa_disallowance/create.vue'),
                    meta: { breadCrumb: 'coa_disallowance' }
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
