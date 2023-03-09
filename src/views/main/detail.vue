<template>
  <div class="detail">
    <div class="px-4 py-5 my-5 text-center">
      <img class="mb-4 w-50" :src="momentDetail?.momentUrl" />
      <h1 class="display-5 fw-bold">{{ momentDetail?.title }}</h1>
      <p>{{ momentDetail?.description }}</p>
      <button
        v-if="momentDetail?.author.id + '' == userId"
        type="button"
        class="btn btn-sm btn-outline-secondary mx-1"
        publicType="edit"
        @click="goEditor"
      >
        编辑
      </button>
      <button
        v-if="momentDetail?.author.id + '' == userId"
        type="button"
        class="btn btn-sm btn-outline-danger"
        @click.prevent="modalIsVisible = true"
      >
        删除
      </button>
      <div class="col-lg-8 mx-auto">
        <v-md-preview
          :text="momentDetail?.content"
          ref="preview"
        ></v-md-preview>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center"></div>
      </div>

      <!-- 评论 -->

      <div class="col-lg-8 mx-auto">
        <div class="my-3 p-3 bg-body rounded shadow-sm">
          <h3 class="border-bottom pb-2 mb-0">
            评论大区
            <button
              type="button"
              class="btn btn-outline-dark btn-sm"
              @click.prevent="commentModal = true"
            >
              发表评论
            </button>
          </h3>
          <div
            class="d-flex text-muted pt-3"
            v-if="comments?.length"
            v-infinite-scroll="loadMore"
            infinite-scroll-immediate-check="false"
            :infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10"
            v-for="(item, index) in comments"
            :key="index"
          >
            <img
              :src="item.reviewer.avatarUrl"
              alt=""
              class="bd-placeholder-img flex-shrink-0 me-2 rounded"
              width="32"
              height="32"
            />

            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div class="d-flex justify-content-between">
                <strong class="text-gray-dark"
                  >@ {{ item.reviewer.name }}</strong
                >
                <div class="d-flex">
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    @click="onReply(item.id, item.userId)"
                  >
                    回复
                  </button>
                  <button
                    v-if="userId == item.userId"
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="deleteComment(item.id, '')"
                  >
                    删除
                  </button>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <span class="d-block d-flex">{{ item.content }}</span>
                <button
                  type="button"
                  class="btn btn-link btn-sm"
                  @click="getReply(item.id)"
                  style="color: gray"
                >
                  更多回复
                </button>
                <span>{{ formatUtcString(item.updateAt) }}</span>
              </div>

              <!-- 回复 -->

              <div
                class="my-3 p-3 bg-body rounded shadow-sm"
                v-if="item.reply?.length !== 0"
              >
                <div
                  class="d-flex text-muted pt-3"
                  v-for="(reply, index) in item.reply"
                  :key="index"
                >
                  <img
                    :src="reply.reviewer.avatarUrl"
                    alt=""
                    class="bd-placeholder-img flex-shrink-0 me-2 rounded"
                    width="32"
                    height="32"
                  />

                  <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex">
                        <strong class="text-gray-dark"
                          >@ {{ reply.reviewer.name }} </strong
                        >&nbsp;&nbsp; 回复&nbsp;&nbsp;
                        <strong class="text-gray-dark"
                          >@ {{ reply.replyUser.name }}</strong
                        >
                      </div>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-secondary btn-sm mx-1"
                          @click="onReply(item.id, reply.userId)"
                        >
                          回复
                        </button>
                        <button
                          v-if="userId == reply.userId"
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="deleteComment(reply.id, item.id)"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span class="d-block d-flex fs-6">
                        {{ reply.content }}
                      </span>
                      <span>{{ formatUtcString(reply.updateAt) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="my-3 p-3 bg-body rounded shadow-sm fs-5">
                暂无更多回复~~
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <modal
      title="删除文章"
      :visible="modalIsVisible"
      @model-on-close="modalIsVisible = false"
      @model-on-confirm="onConfirm"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
    <modal
      title="发表评论"
      :visible="commentModal"
      @model-on-close="commentModal = false"
      @model-on-confirm="onConfirmComment"
    >
      <textarea
        class="form-control"
        v-model="commentText"
        aria-label="评论"
        aria-describedby="basic-addon1"
      ></textarea>
    </modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getMomentByIdRequest,
  deleteMomentRequest,
} from '@/service/main/moment'
import { MomentType } from '@/service/main/moment'
import { CommentType, addReplyType } from '@/service/main/comment'
import { IDataType } from '@/service/type'
import createMessage from '@/components/createMessage'
import Modal from '@/components/Modal.vue'
import { useUserStore, useCommentStore } from '@/store'
import { formatUtcString } from '@/utils/date-format'
type reloadType = () => void
const route = useRoute()
const router = useRouter()
let momentDetail = ref<MomentType>()
getMomentByIdRequest(route.params.id as string).then(
  (res: IDataType<MomentType>) => {
    momentDetail.value = res.data
  }
)

const goEditor = () => {
  router.push({
    name: 'editor',
    params: {
      id: momentDetail.value?.id,
      publicType: 'edit',
    },
  })
}
const modalIsVisible = ref(false)
const onConfirm = async () => {
  modalIsVisible.value = false
  const id = route.params.id
  const res = await deleteMomentRequest(id)
  // 确认删除弹窗
  if (res.code == 200) {
    createMessage('删除成功', 'success')
    router.push('/user')
  }
}

const userStore = useUserStore()
const userId = userStore.userInfo.id

// 获取评论
const limit = ref(10)
const offset = ref(0)
const commentStore = useCommentStore()
const comments = ref<any>([])
const currentMomentId = ref()
onMounted(async () => {
  currentMomentId.value = route.params.id
  getCommentList()
})

// busy代表是否禁用滚动事件
let busy = ref(false)
const loadMore = () => {
  offset.value = offset.value + 10
  getCommentList()
  busy.value = false
}
const getCommentList = async () => {
  if (busy.value) {
    // 数据加载完毕
    busy.value = true
  } else {
    const res = await commentStore.getCommentsAction(
      currentMomentId.value,
      limit.value,
      offset.value
    )
    console.log(res)

    if (res?.length !== 0) {
      if (comments.value?.length !== 0) {
        console.log(comments.value)

        console.log('111')

        comments.value = comments.value?.concat(res)
        busy.value = false
      } else {
        console.log('222')
        console.log(comments.value)
        comments.value = res
        busy.value = false
      }
    } else {
      comments.value = comments.value?.concat(res)
      busy.value = true
    }
  }
}

const commentModal = ref(false)
const commentText = ref('')
const reloadFn: reloadType = inject('reload') as reloadType
const onConfirmComment = async () => {
  if (commentText.value !== '') {
    if (replyCommentId.value) {
      // 二级评论
      const query: addReplyType = {
        momentId: currentMomentId.value,
        commentId: replyCommentId.value,
        content: commentText.value,
        beUserId: replyBeUserId.value,
      }
      const res = await commentStore.addReplyAction(query)
    } else {
      // 一级评论
      const res = commentStore.addCommentAction(
        currentMomentId.value,
        commentText.value
      )
    }
    commentModal.value = false
    createMessage('发表成功', 'success')
    setTimeout(() => {
      reloadFn() // 刷新
    }, 1000)
  } else {
    createMessage('评论不能为空', 'error')
  }
}
const getReply = async (commentId: string) => {
  const res = await commentStore.getReplyAction(
    currentMomentId.value,
    commentId
  )
  const index = comments.value.findIndex((i: CommentType) => i.id == commentId)
  setTimeout(() => {
    Reflect.set(comments.value[index], 'reply', res)
  }, 500)
}

const replyCommentId = ref('')
const replyBeUserId = ref('')
const onReply = (commentId: string, beUserId: string) => {
  commentModal.value = true
  replyCommentId.value = commentId
  replyBeUserId.value = beUserId
}

const deleteComment = async (id: string, commentId: string) => {
  await commentStore.deleteCommentAction(id)
  if (commentId == '') {
    busy.value = false
    offset.value = 0
    comments.value = []
    getCommentList()
  } else {
    getReply(commentId)
  }
}
</script>
<style scoped lang="less"></style>
