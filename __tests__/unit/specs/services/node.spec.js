import NodeService from '@/services/node'
import store from '@/store'

describe('Node Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io/api/v2')
  })

  it('should return network settings', async () => {
    const data = await NodeService.config()
    expect(Object.keys(data).sort()).toEqual([
      'nethash',
      'token',
      'symbol',
      'explorer',
      'version',
      'ports',
      'slip44',
      'constants',
      'transactionPool',
      'wif'
    ].sort())
  })

  it('should return the node status', async () => {
    const data = await NodeService.status()
    expect(Object.keys(data).sort()).toEqual([
      'synced',
      'now',
      'blocksCount',
      'timestamp'
    ].sort())
  })
})
