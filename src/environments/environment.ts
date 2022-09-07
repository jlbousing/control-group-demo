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
    login: '/api/login',
    assignaments: {
      list: '/api/asignaments/list',
      find: '/api/asignaments/find'
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
      create: '/api/users/create'
    },
    companies: {
      list: '/api/companies/',
      create: '/api/companies/create',
      find: '/api/companies/find'
    },
    categories: {
      list: '/api/categories/',
      subcategories: {
        list: '/api/categories/subcategories'
      }
    },
    suppliers: {
      list: '/api/suppliers/list',
      create: '/api/suppliers/create'
    },
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
