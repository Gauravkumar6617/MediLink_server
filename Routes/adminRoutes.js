// routes/admin.js
import express from 'express'
import { adminJs, buildAdminRouter } from '../admin/index.js'

const router = express.Router()
router.use(adminJs.options.rootPath, buildAdminRouter())

export default router
