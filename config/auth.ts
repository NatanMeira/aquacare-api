/**
 * Config source: https://git.io/JY0mp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'api',
  guards: {
    api: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'user_id',
      },
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/User'),
      },
    },
    device: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'device_id',
      },
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['device_id'],
        model: () => import('App/Models/Device'),
      },
    },
  },
}

export default authConfig
