<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import Mock from 'mockjs'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getLists() {
      // var list = []
      // for (var i = 0; i < 10; i++) {
      //   var moc = Mock.mock({
      //     id: '@increment',
      //     // timestamp: +Mock.Random.date('T'),
      //     author: '@first',
      //     reviewer: '@first',
      //     title: '@title(5, 10)',
      //     content_short: 'mock data',
      //     // content: baseContent,
      //     forecast: '@float(0, 100, 2, 2)',
      //     importance: '@integer(1, 3)',
      //     'type|1': ['CN', 'US', 'JP', 'EU'],
      //     'status|1': ['published', 'draft', 'deleted'],
      //     display_time: '@datetime',
      //     comment_disabled: true,
      //     pageviews: '@integer(300, 5000)',
      //     // image_uri,
      //     platforms: ['a-platform']
      //   })
      //   list.push(moc)
      // }
      const data = Mock.mock({
        'items|30': [
          {
            id: '@id',
            title: '@sentence(10, 20)',
            'status|1': ['published', 'draft', 'deleted'],
            author: 'name',
            display_time: '@datetime',
            pageviews: '@integer(300, 5000)'
          }
        ]
      })
      return data.items
    },
    fetchData() {
      this.listLoading = true
      this.list = this.getLists()
      this.listLoading = false
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }
  }
}
</script>
