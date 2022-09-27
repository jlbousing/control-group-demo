// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://safe-plateau-23354.herokuapp.com',
  apikey: '62baee13ddde2867c6901ad4b0ef17103dd7694d5bc977ad',
  port: '',
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoxLCJpYXQiOjE2NjIwMTYwMTR9.yKiS86GG19niW43DSEeP6orDEMZ9PMwMV4xvxmHbf-I",
  endpoints: {
    admin: {
      recovery: '/api/admin/recovery',
      reset: '/api/admin/change/password'
    },
    login: '/api/login',
    assignaments: {
      list: '/api/asignaments/list',
      find: '/api/asignaments/find',
      create: '/api/asignaments/create',
      changes: '/api/asignaments/changes/',
    },
    conciliations: {
      inquiry: {
        supplier: '/api/clap/conciliations/inquiry/supplier'
      }
    },
    dispatch: {
      list: '/api/clap/dispatch/',
      create: '/api/clap/dispatch/create',
      revert: '/api/clap/dispatch/revert/',
      changes: '/api/clap/dispatch/changes/'
    },
    status: {
      status_type_list: '',
      list: '/api/status/'
    },
    users: {
      list: '/api/users/',
      roles: {
        list: '/api/users/rols'
      },
      create: '/api/users/create',
      changes: '/api/users/changes/'
    },
    companies: {
      list: '/api/companies/',
      create: '/api/companies/create',
      find: '/api/companies/find'
    },
    categories: {
      list: '/api/categories/',
      create: '/api/categories/create',
      changes: '/api/categories/changes/',
      subcategories: {
        list: '/api/categories/subcategories',
        changes: '/api/categories/subcategory/changes/',
        find: '/api/categories/subcategory/find'
      }
    },
    instructions: {
      create_group: '/api/instructions/create/group',
      change: "/api/instructions/changes/",
    },
    items: {
      list: '/api/clap/items',
      create: '/api/clap/items/create',
      changes: '/api/clap/items/changes/',
      find: '/api/clap/items/find',
    },
    municipality: {
      list: '/api/clap/municipality',
      create: '/api/clap/municipality/create',
      changes: '/api/clap/municipality/changes/',
      find: '/api/clap/municipality/find'
    },
    parish: {
      list: '/api/clap/parish',
      create: '/api/clap/parish/create',
      changes: '/api/clap/parish/changes/',
      find: '/api/clap/parish/find'
    },
    productions: {
      list: '/api/clap/production/',
      create: '/api/clap/production/create',
      find: '/api/clap/production/find',
      revert: '/api/clap/production/revert/'
    },
    recipes: {
      list: '/api/clap/recipes',
      create: '/api/clap/recipes/create',
      find: '/api/clap/recipes/find'
    },
    states: {
      list: '/api/clap/states/',
      create: '/api/clap/states/create',
      find: '/api/clap/states/find',
      changes: '/api/clap/states/changes/'
    },
    suppliers: {
      list: '/api/suppliers/',
      create: '/api/suppliers/create',
      findById: '/api/suppliers/finder'
    }
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
