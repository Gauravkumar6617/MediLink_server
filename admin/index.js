import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import Admin from '../Model/AdminModel.js'
import Doctor from '../Model/DoctorModel.js'
import Hospital from '../Model/HospitalModel.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

AdminJS.registerAdapter(AdminJSMongoose)

const adminJs = new AdminJS({
  rootPath: '/admin',
  resources: [
    {
      resource: Admin,
      options: {
        navigation: 'Admin Management',
        properties: {
          password: {
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload?.password) {
                request.payload.password = await bcrypt.hash(request.payload.password, 10)
              }
              return request
            },
          },
        },
      },
    },
    {
      resource: Doctor,
      options: {
        navigation: 'App Users',
      },
    },
    {
      resource: Hospital,
      options: {
        navigation: 'Inventory',
      },
    },
  ],
  branding: {
    companyName: 'My Admin Dashboard',
    softwareBrothers: false,
  },
})

// Authentication using Admin model
const buildAdminRouter = () =>
  AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      const adminUser = await Admin.findOne({ email, role: 'admin' })
      if (adminUser && await bcrypt.compare(password, adminUser.password)) {
        return adminUser
      }
      return null
    },
    cookieName: 'adminjs',
    cookiePassword: 'some-secret-cookie',
  })

export { adminJs, buildAdminRouter }
