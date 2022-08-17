'use strict'

const Permission = use('Permission')
const Role = use('Role')
const Module = use('App/Models/Module')
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')

class InitializeDataBaseSeeder {
  async run() {
    const trx = await Database.beginTransaction()
    const tmp = await Module.getCount()
    if (tmp === 0) {
      const apiAuth = await Module.create({
        name: 'auth',
        description: 'api-auth',
      })

      const apiErp = await Module.create({
        name: 'erp',
        description: 'api-erp',
      })

      await Permission.createMany([
        {
          slug: 'show_user',
          name: 'Show User',
          module_id: apiAuth.id,
          description: 'show user on api-auth',
        },
        {
          slug: 'update_user',
          name: 'Update User',
          module_id: apiAuth.id,
          description: 'update user on api-auth',
        },
        {
          slug: 'delete_user',
          name: 'Delete User',
          module_id: apiAuth.id,
          description: 'delete user on api-auth',
        },
        {
          slug: 'store_session',
          name: 'Store Permissions',
          module_id: apiAuth.id,
          description: 'store permission on api-auth',
        },
        {
          slug: 'delete_session',
          name: 'Delete session',
          module_id: apiAuth.id,
          description: 'Delete session on api-store',
        },
        {
          slug: 'validate_session',
          name: 'Validate session',
          module_id: apiAuth.id,
          description: 'Delete session on api-store',
        },
        {
          slug: 'store_user',
          name: 'Store User',
          module_id: apiAuth.id,
          description: 'store user on api-auth',
        },
        {
          slug: 'forgot_password',
          name: 'Forgot password',
          module_id: apiAuth.id,
          description: 'Forgot password on api-store',
        },
        {
          slug: 'forgot_password_save',
          name: 'Forgot password Save',
          module_id: apiAuth.id,
          description: 'Forgot password save on api-store',
        },
        {
          slug: 'index_permission',
          name: 'Index permission',
          module_id: apiAuth.id,
          description: 'Index permission on api-auth',
        },
        {
          slug: 'store_permission',
          name: 'Store permission',
          module_id: apiAuth.id,
          description: 'Store permission on api-auth',
        },
        {
          slug: 'show_permission',
          name: 'Show permission',
          module_id: apiAuth.id,
          description: 'Show permission on api-auth',
        },
        {
          slug: 'update_permission',
          name: 'Update permission',
          module_id: apiAuth.id,
          description: 'Update permission on api-auth',
        },
        {
          slug: 'delete_permission',
          name: 'Delete permission',
          module_id: apiAuth.id,
          description: 'Delete permission on api-auth',
        },
        {
          slug: 'index_role',
          name: 'Index role',
          module_id: apiAuth.id,
          description: 'Index role on api-auth',
        },
        {
          slug: 'store_role',
          name: 'Store role',
          module_id: apiAuth.id,
          description: 'store role on api-auth',
        },
        {
          slug: 'show_role',
          name: 'Show role',
          module_id: apiAuth.id,
          description: 'show role on api-auth',
        },
        {
          slug: 'update_role',
          name: 'Update role',
          module_id: apiAuth.id,
          description: 'Update role on api-auth',
        },
        {
          slug: 'delete_role',
          name: 'Delete role',
          module_id: apiAuth.id,
          description: 'Delete role on api-auth',
        },
        {
          slug: 'index_module',
          name: 'Index module',
          module_id: apiAuth.id,
          description: 'Index module on api-auth',
        },
        {
          slug: 'store_module',
          name: 'Store module',
          module_id: apiAuth.id,
          description: 'Store module on api-auth',
        },
        {
          slug: 'update_module',
          name: 'Update module',
          module_id: apiAuth.id,
          description: 'Update module on api-auth',
        },
        {
          slug: 'delete_module',
          name: 'Delete module',
          module_id: apiAuth.id,
          description: 'Delete module on api-auth',
        },
        {
          slug: 'index_user',
          name: 'Index user',
          module_id: apiErp.id,
          description: 'index user on api-auth',
        },
        {
          slug: 'index_type_work',
          name: 'Index Type Work',
          module_id: apiErp.id,
          description: 'Index type work on api-erp',
        },
        {
          slug: 'index_type_employees',
          name: 'Index Type Employees',
          module_id: apiErp.id,
          description: 'Index type employees on api-erp',
        },
        {
          slug: 'store_type_employees',
          name: 'Store Type Employees',
          module_id: apiErp.id,
          description: 'Store type employees on api-erp',
        },
        {
          slug: 'show_type_employees',
          name: 'Show Type Employees',
          module_id: apiErp.id,
          description: 'Show type employees on api-erp',
        },
        {
          slug: 'update_type_employees',
          name: 'Update Type Employees',
          module_id: apiErp.id,
          description: 'Update type employees on api-erp',
        },
        {
          slug: 'delete_type_employees',
          name: 'Delete Type Employees',
          module_id: apiErp.id,
          description: 'Delete type employees on api-erp',
        },
        {
          slug: 'index_offices',
          name: 'Index Offices',
          module_id: apiErp.id,
          description: 'Index offices on api-erp',
        },
        {
          slug: 'post_offices',
          name: 'Post Offices',
          module_id: apiErp.id,
          description: 'Post offices on api-erp',
        },
        {
          slug: 'show_offices',
          name: 'Show Offices',
          module_id: apiErp.id,
          description: 'Show offices on api-erp',
        },
        {
          slug: 'update_offices',
          name: 'Update Offices',
          module_id: apiErp.id,
          description: 'update offices on api-erp',
        },
        {
          slug: 'delete_offices',
          name: 'Delete Offices',
          module_id: apiErp.id,
          description: 'Delete offices on api-erp',
        },
        {
          slug: 'index_employees',
          name: 'Index Employees',
          module_id: apiErp.id,
          description: 'Index employees on api-erp',
        },
        {
          slug: 'store_employees',
          name: 'Store Employees',
          module_id: apiErp.id,
          description: 'Index employees on api-erp',
        },
        {
          slug: 'update_mployees',
          name: 'Update Employees',
          module_id: apiErp.id,
          description: 'Update employees on api-erp',
        },
        {
          slug: 'show_mployees',
          name: 'Show Employees',
          module_id: apiErp.id,
          description: 'Show employees on api-erp',
        },
        {
          slug: 'update_phones',
          name: 'Update Phones',
          module_id: apiErp.id,
          description: 'Update phones on api-erp',
        },
        {
          slug: 'index_contract',
          name: 'Index Contracts',
          module_id: apiErp.id,
          description: 'Index contract on api-erp',
        },
        {
          slug: 'store_contract',
          name: 'Store Contracts',
          module_id: apiErp.id,
          description: 'Store contract on api-erp',
        },
        {
          slug: 'show_contract',
          name: 'Show Contracts',
          module_id: apiErp.id,
          description: 'Show contract on api-erp',
        },
        {
          slug: 'update_contract',
          name: 'Update Contracts',
          module_id: apiErp.id,
          description: 'Update contract on api-erp',
        },
        {
          slug: 'send_contract',
          name: 'Send Contracts',
          module_id: apiErp.id,
          description: 'Send contract on api-erp',
        },
        {
          slug: 'signature_contract',
          name: 'Signature Contracts',
          module_id: apiErp.id,
          description: 'Signature contract on api-erp',
        },
        {
          slug: 'status_contract',
          name: 'Status Contracts',
          module_id: apiErp.id,
          description: 'Status contract on api-erp',
        },
        {
          slug: 'index_employee_file',
          name: 'Index Employee file',
          module_id: apiErp.id,
          description: 'Index Employee file on api-erp',
        },
        {
          slug: 'store_employee_file',
          name: 'Store Employee file',
          module_id: apiErp.id,
          description: 'Store Employee file on api-erp',
        },
        {
          slug: 'show_employee_file',
          name: 'Show Employee file',
          module_id: apiErp.id,
          description: 'Show Employee file on api-erp',
        },
        {
          slug: 'update_employee_file',
          name: 'Update Employee file',
          module_id: apiErp.id,
          description: 'Update Employee file on api-erp',
        },
        {
          slug: 'delete_employee_file',
          name: 'Delete Employee file',
          module_id: apiErp.id,
          description: 'Delete Employee file on api-erp',
        },
        {
          slug: 'index_erp_file',
          name: 'Index Erp file',
          module_id: apiErp.id,
          description: 'Index Erp file on api-erp',
        },
        {
          slug: 'store_erp_file',
          name: 'Store Erp file',
          module_id: apiErp.id,
          description: 'Store Erp file on api-erp',
        },
        {
          slug: 'delete_erp_file',
          name: 'Delete Erp file',
          module_id: apiErp.id,
          description: 'Delete Erp file on api-erp',
        },
        {
          slug: 'delete_file_type',
          name: 'delete File Type',
          module_id: apiErp.id,
          description: 'Delete File Type on api-erp',
        },
      ])

      const permissions = await Permission.ids()

      const role = await Role.create({
        name: 'admin',
        slug: 'admin',
        description: 'admin',
      })

      const user = await User.create({
        username: 'UAU-FI',
        email: 'adm@uaufi.com',
        password: '123456',
        is_active: 1,
      })

      await role.permissions().attach(permissions)
      await user.permissions().attach(permissions)

      await apiErp.roles().attach([role.id])
      await apiAuth.roles().attach([role.id])
      await user.modules().attach([apiErp.id])
      await user.modules().attach([apiAuth.id])
      await user.roles().attach([role.id])

      await trx.commit()
    }
  }
}

module.exports = InitializeDataBaseSeeder
