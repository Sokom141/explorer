<template>
  <Loader :data="wallets">
    <TableWrapper
      v-bind="$attrs"
      :has-pagination="false"
      :columns="columns"
      :rows="wallets"
      :sort-query="{ field: 'originalIndex', type: 'asc' }"
      :no-data-message="$t('No results')"
    >
      <template
        slot-scope="data"
      >
        <div v-if="data.column.field === 'originalIndex'">
          {{ getRank(data.row.originalIndex) }}
        </div>

        <div v-else-if="data.column.field === 'address'">
          <LinkWallet
            :address="data.row.address"
            :trunc="false"
          />
        </div>

        <div v-else-if="data.column.field === 'balance'">
          <span>
            {{ readableCrypto(data.row.balance) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'supply'">
          {{ readableNumber((data.row.balance / total) * 100) }}%
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'TableWalletsDesktop',

  props: {
    wallets: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    },

    total: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters('network', ['supply']),

    columns () {
      const columns = [
        {
          label: this.$t('Rank'),
          field: 'originalIndex',
          type: 'number',
          thClass: 'start-cell w-32',
          tdClass: 'start-cell w-32'
        },
        {
          label: this.$t('Address'),
          field: 'address'
        },
        {
          label: this.$t('Balance'),
          field: 'balance',
          type: 'number'
        },
        {
          label: this.$t('Supply'),
          field: 'supply',
          type: 'number',
          sortable: false,
          thClass: 'end-cell w-24',
          tdClass: 'end-cell w-24'
        }
      ]

      return columns
    }
  },

  methods: {
    getRank (value) {
      const page = this.$route.params.page > 1 ? this.$route.params.page - 1 : 0

      return page * 25 + (value + 1)
    }
  }
}
</script>
